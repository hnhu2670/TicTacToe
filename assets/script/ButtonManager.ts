import { _decorator, Component, director, native, Node, sys } from "cc";
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
  buttonWatchVideo() {
    if (sys.os === sys.OS.ANDROID) {
      let a = native.reflection.callStaticMethod(
        "com/cocos/game/AppActivity",
        "showRewarded",
        "()V"
      );
      console.log("success");
      // console.log("showtag from timer", DemoJava.getVideo());
      // this.winLabel.string = a;s
    } else {
      console.log("Platform is not Android");
    }
  }
}
// declare global {
//   interface Window {
//     ButtonManager: typeof ButtonManager;
//   }
// }
// window.ButtonManager = ButtonManager;
