import { _decorator, Component, director, native, Node, sys } from "cc";
import { AudioManager } from "./AudioManager";
import { GameData } from "./GameData";
import { GameController } from "./GameController";
const { ccclass, property } = _decorator;

@ccclass("ButtonManager")
export class ButtonManager extends Component {
  @property({ type: Node })
  public setting: Node;
  // private isOffSound: boolean = true;
  buttonBackHome() {
    console.log(
      "GameData.getInstance().getPopupVideo()",
      GameData.getInstance().getPopupVideo()
    );
    if (
      GameData.getInstance().getActiveButton() == false &&
      GameData.getInstance().getPopupVideo() == false &&
      GameData.getInstance().getActiveResult() == false
    ) {
      director.loadScene("home");
      // this.node.emit("back");
    } else {
      console.log("no click");
    }
  }
  buttonGoHome() {
    director.loadScene("home");
  }
  buttonPlayGame() {
    if (GameData.getInstance().getActiveButton() == false) {
      director.loadScene("game");
    } else {
      console.log("no click");
    }
  }
  buttonRestartGame() {
    console.log("restart");
    if (GameData.getInstance().getActiveButton() == false) {
      director.loadScene("game");
      console.log("load game");
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
  buttonReloadVideo() {
    if (sys.os === sys.OS.ANDROID) {
      let a = native.reflection.callStaticMethod(
        "com/cocos/game/AppActivity",
        "loadRewarded",
        "()V"
      );
      console.log("load success");
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
