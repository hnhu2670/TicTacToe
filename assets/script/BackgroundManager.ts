import { _decorator, Component, Node, UITransform, view } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BackgroundManager")
export class BackgroundManager extends Component {
  start() {}

  update(deltaTime: number) {
    this.onResized();
  }
  onResized() {
    var backgroundSize = this.node.getComponent(UITransform).contentSize;
    var screenSize = view.getVisibleSize();

    const changeSize = Math.min(
      screenSize.width / backgroundSize.width,
      screenSize.height / backgroundSize.height
    );
    // const changeSize = Math.min(
    //   backgroundSize.width / screenSize.width,
    //   backgroundSize.height / screenSize.height
    // );
    const newWidth = backgroundSize.width * changeSize;
    const newHeight = backgroundSize.height * changeSize;

    // this.node.getComponent(UITransform).setContentSize(newWidth, newHeight);
    this.node.setScale(changeSize, changeSize);
  }
}
// nếu w < h => scale background
