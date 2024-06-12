import {
  _decorator,
  Component,
  director,
  Node,
  sp,
  Tween,
  v2,
  v3,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Move")
export class Move extends Component {
  private activeA: boolean = false;
  private activeW: boolean = true;
  private activeD: boolean = false;

  private _direction: Vec3;
  start() {}

  update(deltaTime: number) {
    if (this.activeA) {
      this.rotatePlayer(this._direction, deltaTime); // Điều chỉnh góc xoay theo ý của bạn
    }
    if (this.activeD) {
      this.rotatePlayer(this._direction, deltaTime); // Điều chỉnh góc xoay theo ý của bạn
    }
    // Di chuyển player khi phím "up" được nhấn
    if (this.activeW) {
      this.walkByStep(this._direction, deltaTime); // Di chuyển theo hướng lên (thay đổi theo ý của bạn)
    }
  }

  walkByStep(direction: Vec3, deltaTime: number) {
    let character = this.node.getPosition();
    let speed = 700;
    let rotation = this.currentRotation;
    let radian = rotation * (Math.PI / 180);
    let moveVector = v2(Math.cos(radian), Math.sin(radian)).normalize();

    character.x += moveVector.x * speed * deltaTime * direction.x;
    character.y += moveVector.y * speed * deltaTime * direction.y;

    this.node.setPosition(character);

    // console.log("location in move", this.node.getPosition());
    return this.node.getPosition();
  }
  rotationSpeed: number = 100; // Tốc độ xoay
  currentRotation: number = 0;

  rotatePlayer(direction: Vec3, deltaTime: number) {
    this.currentRotation += direction.z * this.rotationSpeed * deltaTime;
    this.node.eulerAngles = v3(0, 0, Math.floor(this.currentRotation));
    // console.log("rotation", Math.floor(this.currentRotation));
  }
  setActive(
    activeA: boolean,
    activeUp: boolean,
    activeD: boolean,
    direction: Vec3
  ) {
    this.activeA = activeA;
    this.activeW = activeUp;
    this.activeD = activeD;
    this._direction = direction;
  }
  // khoảng cách di chuyển
  // đối tượng di chuyển
  // tgian di chuyển
  // automove(direction: Vec3, character: Node, deltaTime: number) {}
}
