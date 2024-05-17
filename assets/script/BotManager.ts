import { _decorator, Animation, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BotManager")
export class BotManager extends Component {
  private ani: Animation;
  start() {}

  update(deltaTime: number) {}
  protected onLoad(): void {
    this.ani = this.getComponent(Animation);
    // this.ani.play("activePlayer");
  }

  playerActive() {
    this.ani.play("activePlayer");
  }

  botActive() {
    this.ani.play("activeBot");
  }
  stopAnimation() {
    this.ani.stop();
  }
}
