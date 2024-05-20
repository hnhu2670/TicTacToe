import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  Sprite,
  SpriteFrame,
  tween,
  Vec3,
} from "cc";
import { GameController } from "./GameController";
import { BoardManager } from "./BoardManager";
import { AnimationManager } from "./AnimationManager";
const { ccclass, property } = _decorator;

@ccclass("CellManager")
export class CellManager extends Component {
  @property(SpriteFrame) public spriteX: SpriteFrame;
  @property(SpriteFrame) public spriteO: SpriteFrame;
  public check = false;
  public values: number = 0;
  start() {}

  changeCell(current: string) {
    if (current === "Player") {
      this.node.getComponent(Sprite).spriteFrame = this.spriteO;
      this.values = 1;
    }
    if (current === "Bot") {
      this.node.getComponent(Sprite).spriteFrame = this.spriteX;
      this.values = 2;
    }
    this.check = true;
  }
}
// lưu người chơi là ai
// 2 có player => làm sao để biết nó là player nào
