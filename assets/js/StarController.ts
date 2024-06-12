import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("StarController")
export class StarController extends Component {
  start() {
    this.node.on("collision", this.onCollision, this); //nhận sự kiện chạm
  }

  onCollision(other: Node) {
    console.log("star controller", other.name);
    this.node.emit("destroyed", this.node); //truyền sự kiện xoá
    this.node.destroy(); //xoá cái node đó
  }
}
