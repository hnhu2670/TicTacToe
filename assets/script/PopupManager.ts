import {
  _decorator,
  Color,
  Component,
  director,
  game,
  Node,
  Sprite,
  UI,
  UITransform,
} from "cc";
import { AudioManager } from "./AudioManager";
import { GameData } from "./GameData";
const { ccclass, property } = _decorator;

@ccclass("PopupManager")
export class PopupManager extends Component {
  @property({ type: Node })
  public result: Node;
  @property({ type: Node })
  public setting: Node;
  @property({ type: Node })
  public btnMusic: Node;
  @property({ type: Node })
  public btnSound: Node;
  private isOffSound: boolean = false;
  private isOffMusic: boolean = false;
  start() {}
  onLoad() {
    director.addPersistRootNode(this.node);
  }
  buttonSetting() {
    this.setting.active = true;
    GameData.getInstance().setActiveButton(true);
  }
  buttonCloseSetting() {
    this.setting.active = false;
    GameData.getInstance().setActiveButton(false);
  }
  buttonPlayGame() {
    console.log(
      "(GameData.getInstance().getActiveButton()",
      GameData.getInstance().getActiveButton()
    );
    if (GameData.getInstance().getActiveButton() == false) {
      director.loadScene("game");
    } else {
      console.log("no click");
    }
  }
  offSound() {
    console.log("off sound", this.isOffSound);
    //  isOffSound=true => off sound
    // ngược lại => on sound
    if (this.isOffSound) {
      GameData.getInstance().setShowSound(false);
      this.isOffSound = false;
      this.btnSound.getComponent(Sprite).color = new Color(255, 255, 255, 255);
    } else {
      GameData.getInstance().setShowSound(true);
      this.isOffSound = true;
      this.btnSound.getComponent(Sprite).color = new Color(95, 95, 95, 255);
    }
    // this.node.getComponent(AudioManager).clickChosen(this.isOffSound);
  }
  offMusic() {
    if (this.isOffMusic) {
      this.isOffMusic = false;
      this.btnMusic.getComponent(Sprite).color = new Color(255, 255, 255, 255);
    } else {
      this.isOffMusic = true;
      this.btnMusic.getComponent(Sprite).color = new Color(95, 95, 95, 255);
    }
    this.node.getComponent(AudioManager).offMusic(this.isOffMusic);
  }
  update(deltaTime: number) {}
}
