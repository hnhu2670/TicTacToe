import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  Sprite,
  SpriteFrame,
} from "cc";
import { GameController } from "./GameController";
import { BoardManager } from "./BoardManager";
const { ccclass, property } = _decorator;

@ccclass("CellManager")
export class CellManager extends Component {
  @property(SpriteFrame) public spriteX: SpriteFrame;
  @property(SpriteFrame) public spriteO: SpriteFrame;
  private _currentPlayer: string = "Player";
  private boardManage: BoardManager;
  start() {
    this.node.on(Node.EventType.MOUSE_DOWN, this.ClickToChange, this);
    this.boardManage = this.node.getComponent(BoardManager);
  }

  update(deltaTime: number) {}
  changeCell(current: string) {
    // this.boardManage.getCurrentPlayer();
    console.log("current", this.boardManage.getCurrentPlayer());
    if (current == "Player") {
      this.node.getComponent(Sprite).spriteFrame = this.spriteX;
    }
    if (current == "Bot") {
      this.node.getComponent(Sprite).spriteFrame = this.spriteO;
    }
  }
  ClickToChange() {
    console.log("click1", this._currentPlayer);
    this.changeCell(this._currentPlayer);
    console.log("click2");
    if (this._currentPlayer == "Player") {
      this._currentPlayer = "Bot";
    } else {
      this._currentPlayer = "Player";
    }
    console.log("click3", this._currentPlayer);
  }
}
// lưu người chơi là ai
// 2 có player => làm sao để biết nó là player nào
