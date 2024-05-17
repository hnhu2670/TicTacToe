import { _decorator, Component, director, Node } from "cc";
import { AudioManager } from "./AudioManager";
import { GameData } from "./GameData";
const { ccclass, property } = _decorator;

@ccclass("ButtonManager")
export class ButtonManager extends Component {
  @property({ type: Node })
  public setting: Node;
  // private isOffSound: boolean = true;
  buttonBackHome() {
    if (GameData.getInstance().getActiveButton() == false) {
      director.loadScene("home");
    } else {
      console.log("no click");
    }
  }
  buttonPlayGame() {
    if (GameData.getInstance().getActiveButton() == false) {
      director.loadScene("game");
    } else {
      console.log("no click");
    }
  }
  buttonRestartGame() {
    if (GameData.getInstance().getActiveButton() == false) {
      director.loadScene("game");
    } else {
      console.log("no click");
    }
  }
  // buttonSetting() {
  //   this.setting.active = true;
  // }
  // buttonCloseSetting() {
  //   this.setting.active = false;
  // }
  // offSound() {
  //   this.node.getComponent(AudioManager).offSound(this.isOffSound);
  //   this.isOffSound = false;
  // }
}
