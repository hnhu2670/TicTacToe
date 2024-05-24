import { _decorator, Component, Label, native, Node, sys } from "cc";
const { ccclass, property } = _decorator;

@ccclass("DemoJava")
export class DemoJava extends Component {
  @property({ type: Label })
  public winLabel: Label = null;
  start() {
    this.testDemo();
  }

  update(deltaTime: number) {}

  testDemo() {
    //     if (sys.os === sys.OS.ANDROID) {
    //       let a = native.reflection.callStaticMethod(
    //         "com/cocos/game/Demo",
    //         "sum",
    //         "(II)I",
    //         9,
    //         7
    //       );
    //       this.winLabel.string = a;
    //     } else {
    //       console.log("Platform is not Android");
    //     }
    //   }
    if (sys.os === sys.OS.ANDROID) {
      let a = native.reflection.callStaticMethod(
        "com/cocos/game/Demo",
        "TestDemo",
        "()Ljava/lang/String;"
      );
      this.winLabel.string = a;
    } else {
      console.log("Platform is not Android");
    }
  }
}
