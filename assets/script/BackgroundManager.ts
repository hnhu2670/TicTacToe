import { _decorator, Component, Node, UITransform, view } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BackgroundManager")
export class BackgroundManager extends Component {
  start() {}

  update(deltaTime: number) {
    this.onResized();
  }
  onResized() {
    const backgroundTransform = this.node.getComponent(UITransform);
    const screenSize = view.getVisibleSize();

    const scaleY = screenSize.height / backgroundTransform.height;

    this.node.setScale(scaleY, scaleY);
    this.node.children.forEach((c) => {
      c.setScale(scaleY, scaleY);
    });
    console.log("onResized");
  }
}
// nếu w < h => scale background
