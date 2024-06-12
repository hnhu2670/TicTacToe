import { _decorator, Component, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CameraManager")
export class CameraManager extends Component {
  @property({ type: Node })
  public playerNode: Node = null;

  start() {}

  update(deltaTime: number) {
    let playerPosition = this.playerNode.getPosition();
    let cameraPosition = this.node.getPosition();
    cameraPosition.lerp(playerPosition, 0.1);
    this.node.setPosition(playerPosition);
  }
}
