import { _decorator, Component, Label, native, Node, sys } from "cc";
import { DemoJava } from "./DemoJava";
const { ccclass, property } = _decorator;
declare global {
  interface Window {
    Timer: typeof Timer;
  }
}
@ccclass("Timer")
export class Timer extends Component {
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
  updateTimer() {
    this.timer--;
    this.updateTimerLabel();
    if (this.timer <= 0) {
      this.updateTimer;
      // this.unschedule(this.updateTimer);
      this.endTime = true;
      console.log("end timer", this.endTime);
    }
    this.node.emit("endTime", this.endTime);
  }
  updateTimerLabel() {
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
  addScore() {
    console.log("add score in cocos");
  }
}

window.Timer = Timer;
