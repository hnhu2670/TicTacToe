import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BoardManager")
export class BoardManager extends Component {
  public currentPlayer: string = "Player";
  start() {}

  update(deltaTime: number) {
    // this.getCurrentPlayer();
  }
  getCurrentPlayer() {
    console.log("board currentPlayer", this.currentPlayer);
    return this.currentPlayer;
  }
}
