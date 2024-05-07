import {
  _decorator,
  CCInteger,
  Component,
  instantiate,
  Layout,
  Node,
  Prefab,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameController")
export class GameController extends Component {
  @property({ type: Prefab })
  public boardPrefab: Prefab | null;

  public layoutGrid: Layout;
  private board: Node[] | null = [];
  @property(CCInteger) boardSize: number = 0;

  start() {
    this.createBoard(this.boardSize);
    // console.log("currentPlayer", this.currentPlayer);
  }

  update(deltaTime: number) {}

  createBoard(boardSize: number) {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cel = instantiate(this.boardPrefab);
        cel.setPosition(i * 75, j * 75);
        this.node.addChild(cel);
        this.board.push(cel);
      }
    }
  }
}
