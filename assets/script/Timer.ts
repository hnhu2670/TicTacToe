import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

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
    this.updateTimerLabel();

    this.schedule(this.updateTimer, 1);
  }
  stopTime() {
    this.unschedule(this.updateTimer);
  }

  updateTimer() {
    this.timer--;
    // console.log("end time in timer", this.endTime);

    // Cập nhật hiển thị thời gian
    this.updateTimerLabel();

    if (this.timer <= 0) {
      this.unschedule(this.updateTimer);
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
}
// truyền end time qua game controller
// end time =true => thua
