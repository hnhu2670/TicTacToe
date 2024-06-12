import {
  _decorator,
  Color,
  Component,
  Label,
  Node,
  Sprite,
  sys,
  tween,
} from "cc";
import { GameData } from "./GameData";
import { AnimationManager } from "./AnimationManager";
const { ccclass, property } = _decorator;

@ccclass("PlayerManager")
export class PlayerManager extends Component {
  @property({ type: Label })
  public score: Label = null;

  start() {
    this.node.on(Node.EventType.TOUCH_START, this.showScore, this);
  }
  update(deltaTime: number) {}
  // lấy player
  saveLocalData() {
    let point = this.getPointOfPerson();
    point += 1;
    const dataToSave = { person: this.node.name, point: point };
    console.log("dataToSave", dataToSave);
    if (sys.localStorage) {
      sys.localStorage.setItem(this.node.name, JSON.stringify(dataToSave));
    } else {
    }
  }
  // chosen player
  getPointOfPerson() {
    // console.log("chosen player", this.node.name);
    this.node.getComponent(AnimationManager).animationPlayer();
    GameData.getInstance().setPlayerGame(this.node.name);
    if (sys.localStorage) {
      const data = sys.localStorage.getItem(this.node.name);

      if (data) {
        const savedData = JSON.parse(data);
        if (savedData.person === this.node.name) {
          return savedData.point;
        }
      }
    }
    return 0;
  }

  // getPointOfPerson() {
  //   this.node.getComponent(AnimationManager).animationPlayer();
  //   GameData.getInstance().setPlayerGame(this.node.name);
  //   if (localStorage) {
  //     // Thay sys.localStorage bằng localStorage
  //     const data = localStorage.getItem(this.node.name);

  //     if (data) {
  //       const savedData = JSON.parse(data);
  //       if (savedData.person === this.node.name) {
  //         return savedData.point;
  //       }
  //     }
  //   }
  //   return 0;
  // }
  // show score
  showScore() {
    var score = this.getPointOfPerson();
    if (score == null) this.score.string = "High Score: " + 0 + " ";
    else this.score.string = "High Score: " + score + " ";
  }

  // chosenPlayer() {
  //   GameData.getInstance().setPlayerGame(this.node.name);
  // }
}
// sys.localStorage: lưu cục bộ
// lấy tên được lưu, truyền qua đối tượng bên kia
// chọn nv => truyền nv => truyền điểm
