import {
  _decorator,
  Animation,
  AudioClip,
  Component,
  director,
  EventKeyboard,
  Input,
  input,
  KeyCode,
  math,
  Node,
  Quat,
  v2,
  v3,
  Vec2,
  Vec3,
} from "cc";
import { Move } from "./Move";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  public moveCtrl: Move | null = null;

  private _direction: Vec3 = new Vec3(0, 0, 0); //dùng để xác định di chuyển hướng nào

  @property({ type: Node })
  public camera: Node = null;
  @property ani: Animation = null;
  protected onLoad(): void {
    this.ani = this.getComponent(Animation);
    this.ani.play("player");
    // this.ani.play("move");
  }
  start() {
    this.ani.play("player");
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

    this.moveCtrl = this.getComponent(Move);
    this.node.on("collision", this.onCollision, this);
  }
  // Góc xoay hiện tại
  private isAPressed = false;
  private isDPressed = false;
  private isWPressed = false;

  onKeyDown(event: EventKeyboard) {
    let direction = new Vec3(0, 0, 0);
    // console.log("key", event.keyCode);
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.isAPressed = true;
        direction.z = 1;
        break;
      case KeyCode.KEY_D:
        this.isDPressed = true;
        direction.z = -1;
        break;
      case KeyCode.KEY_W:
        this.isWPressed = true;
        direction.x = 1;
        direction.y = 1;
        break;
    }
    this._direction = direction;
    this.moveCtrl.setActive(
      this.isAPressed,
      true,
      this.isDPressed,
      this._direction
    );
  }
  onKeyUp() {
    this.moveCtrl.setActive(false, true, false, Vec3.ZERO);
  }
  getPlayer() {
    return this.node.getPosition();
  }

  update(deltaTime: number) {}

  onCollision(other: Node) {
    // this.node.emit("chạm", this.node);
    if (this.node.getPosition().x > other.getPosition().x) {
      this.node.setPosition(
        this.node.getPosition().x + 20,
        this.node.getPosition().y
      );
    } else {
      this.node.setPosition(
        this.node.getPosition().x - 20,
        this.node.getPosition().y
      );
    }
    this.ani.play("rotate");
    this.moveCtrl.enabled = false;
    setTimeout(() => {
      this.moveCtrl.enabled = true;
      this.ani.stop();
      this.ani.play("player");
      // this.node.setPosition(Vec3.ZERO);
    }, 3000);
    this.node.emit("reduce", this.node);
    console.log("chạm", other.name);
  }

  reset() {
    this.node.setPosition(Vec3.ZERO);
    this.moveCtrl.enabled = false;
    console.log("this.moveCtrl.enabled ", this.moveCtrl.enabled);
  }
}
// xoay nhẹ, sau 1s mới chuyển hướng
// khi di chuyển mới có animation
// xoay xong => set lại vị trí
