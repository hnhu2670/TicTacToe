import { _decorator, Component, isValid, Node } from "cc";
import { Box } from "./Box";
const { ccclass, property } = _decorator;

@ccclass("EnemyController")
export class EnemyController extends Component {
  // start() {
  //   this.node.on("collision", this.onCollision, this); //nhận sự kiện chạm
  // }
  // onCollision(other: Node) {
  //   console.log("enemy controller", other.name);
  //   this.node.emit("destroyed", this.node); //truyền sự kiện xoá
  //   // this.node.destroy(); //xoá cái node đó
  // }
}
