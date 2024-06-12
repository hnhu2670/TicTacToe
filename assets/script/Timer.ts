import {
  _decorator,
  Color,
  Component,
  Label,
  native,
  Node,
  sys,
  tween,
  Vec3,
} from "cc";
import { DemoJava } from "./DemoJava";
import { AudioManager } from "./AudioManager";
const { ccclass, property } = _decorator;
declare global {
  interface Window {
    Timer: typeof Timer;
  }
}
@ccclass("Timer")
export class Timer extends Component {
  @property({ type: Node })
  public clock: Node = null;
  @property({ type: Label })
  public timerLabel: Label = null;
  private time: number = 10; // Thời gian đếm ngược
  private timer: number = 0;
  private endTime: boolean = false; //cộng lên nữa ko
  start() {}
  update(deltaTime: number) {
    // console.log("timer", this.endTime);
  }
  startTimer(time: number) {
    this.timer = time;
    this.endTime = false;
    console.log("start time in timer");
    this.updateTimerLabel();
    this.schedule(this.updateTimer, 1);
  }
  stopTime() {
    this.unschedule(this.updateTimer);
    console.log("stop time in timer");
  }
  continuousTime() {
    this.stopTime();
    console.log("this.timer", this.timer);
  }
  updateTimer() {
    // console.log("téttttttttttttttttt time");
    this.timer--;
    // console.log("current time", this.timer);
    this.updateTimerLabel();
    if (this.timer <= 0) {
      this.updateTimer;
      // this.unschedule(this.updateTimer);
      this.endTime = true;
      console.log("END TIME", this.endTime);
    }
    this.node.emit("endTime", this.endTime, this.timer);
  }
  updateTimerLabel() {
    if (this.timer <= 4) {
      this.animationEndTime();
      // this.node.getComponent(AudioManager).clock();
      console.log("current time", this.timer);
      this.timerLabel.color = Color.RED; // Thiết lập màu chữ thành màu đỏ
    } else {
      this.timerLabel.color = Color.BLUE;
    }
    if (this.timerLabel) {
      this.timerLabel.string = this.timer.toString();
    }
  }
  showVideo() {
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
  animationEndTime() {
    tween(this.clock)
      .repeatForever(
        tween()
          .by(0.5, { eulerAngles: new Vec3(0, 0, 10) }) // Xoay trái 180 độ
          .by(0.5, { eulerAngles: new Vec3(0, 0, -10) }) // Xoay phải 180 độ
      )
      .start();
  }
  addScore() {
    console.log("add score in cocos");
  }
}

window.Timer = Timer;
