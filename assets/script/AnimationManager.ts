import {
  _decorator,
  Color,
  Component,
  Label,
  Node,
  Quat,
  Tween,
  tween,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("AnimationManager")
export class AnimationManager extends Component {
  @property({ type: Label })
  public labelName: Label = null;

  start() {
    this.ticktactok();
  }

  ticktactok() {
    tween(this.labelName)
      .repeatForever(
        tween(this.labelName)
          .target(this.labelName)
          // blue
          .to(0.5, { color: new Color(0, 82, 243, 255) })
          .to(0.5, { color: new Color(125, 82, 243, 255) })
          .to(0.5, { color: new Color(195, 82, 243, 255) })
          .to(0.5, { color: new Color(255, 82, 243, 255) })
          .to(0.5, { color: new Color(195, 82, 243, 255) })
          .to(0.5, { color: new Color(125, 82, 243, 255) })
        // gold
        // .to(0.5, { color: new Color(243, 206, 10, 255) })
        // .to(0.5, { color: new Color(185, 206, 10, 255) })
        // .to(0.5, { color: new Color(117, 206, 10, 255) })
        // .to(0.5, { color: new Color(27, 206, 10, 255) })
        // .to(0.5, { color: new Color(117, 206, 10, 255) })
        // .to(0.5, { color: new Color(185, 206, 10, 255) })
      )
      .start();
  }
  update(deltaTime: number) {}

  playerActive() {
    // Tween.stopAll();
    // tween(this.node)
    //   .repeatForever(
    //     tween(this.node)
    //       .to(1.0, { rotation: new Quat(10) })
    //       .to(1.0, { rotation: new Quat(0) })
    //       .to(1.0, { rotation: new Quat(-10) })
    //       .to(1.0, { rotation: new Quat(0) })
    //   )
    //   .start();
    Tween.stopAll();
    tween(this.node)
      .repeatForever(
        tween(this.node)
          .to(0.5, { scale: new Vec3(1.2, 1.2, 1.2) })
          .by(1.0, { scale: new Vec3(-0.5, -0.5, -0.5) })
          .to(1.0, { scale: new Vec3(1, 1, 1) })
      )
      .start();
  }

  animationPlayer() {
    Tween.stopAll();
    this.ticktactok();
    tween(this.node)
      .repeatForever(
        tween(this.node)
          .to(0.5, { scale: new Vec3(1.2, 1.2, 1.2) })
          .by(1.0, { scale: new Vec3(-0.5, -0.5, -0.5) })
          .to(1.0, { scale: new Vec3(1, 1, 1) })
      )
      .start();
  }
}
// to: đặt giá trị mới cho thuộc tính
// by: tắng giảm giá trị hiện tại
