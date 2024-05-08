import {
  _decorator,
  CCInteger,
  Component,
  instantiate,
  Layout,
  Node,
  Prefab,
  view,
} from "cc";
import { CellManager } from "./CellManager";
const { ccclass, property } = _decorator;

@ccclass("GameController")
export class GameController extends Component {
  @property({ type: Prefab })
  public boardPrefab: Prefab | null;
  private board: Node[] | null = [];
  @property(CCInteger) boardSize: number = 0;
  public listValues: number[];
  public currentPlayer: string = "Player";
  private activeRound: boolean = true;
  start() {
    this.createBoard(this.boardSize);
    this.clickCell();
  }

  init() {
    this.createBoard(this.boardSize);
    this.listValues = [];
  }
  update(deltaTime: number) {}

  // createBoard(boardSize: number) {
  //   for (let i = 0; i < boardSize; i++) {
  //     for (let j = 0; j < boardSize; j++) {
  //       const cel = instantiate(this.boardPrefab);
  //       cel.setPosition(i * 75, j * 75);
  //       this.node.addChild(cel);
  //       this.board.push(cel);
  //     }
  //   }
  // }
  createBoard(boardSize: number) {
    this.board = [];
    const screenSize = view.getVisibleSize();
    const cellSize = 75;
    const maxBoardSize = Math.floor(
      Math.min(screenSize.width, screenSize.height) / cellSize
    );
    boardSize = Math.min(boardSize, maxBoardSize);

    const boardWidth = boardSize * cellSize;
    const boardHeight = boardSize * cellSize;

    const startX = -boardWidth / 2 + cellSize / 2;
    const startY = -boardHeight / 2 + cellSize / 2;

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = instantiate(this.boardPrefab);
        const cellX = startX + i * cellSize;
        const cellY = startY + j * cellSize;
        cell.setPosition(cellX, cellY);
        this.node.addChild(cell);
        this.board.push(cell);
      }
    }
  }

  clickCell() {
    this.board.forEach((b) => {
      b.on(Node.EventType.MOUSE_DOWN, () => {
        if (b.getComponent(CellManager).check === false) {
          b.getComponent(CellManager).ClickToChange(this.currentPlayer);
          //  luu value
          this.addValues();
          // console.log("==============", this.checkWin());
          // ktra thắng chưa
          if (this.checkWin() == false) {
            // ktra người chơi hiện tại
            if (this.currentPlayer == "Player") {
              this.currentPlayer = "Bot";
            } else {
              this.currentPlayer = "Player";
            }
          }
        }
      });
    });
  }
  addValues() {
    let data = 0;
    this.listValues = [];
    this.board.forEach((b) => {
      data = b.getComponent(CellManager).values;
      // console.log("data", data);
      this.listValues.push(data);
    });
    // console.log("list", this.listValues);
  }

  checkWin(): boolean {
    // ktra hàng dọc
    for (let i = 0; i < this.listValues.length; i += 3) {
      // console.log("value", i, this.listValues[i]);
      if (this.listValues[i] != 0) {
        if (
          this.listValues[i] == this.listValues[i + 1] &&
          this.listValues[i + 1] == this.listValues[i + 2]
        ) {
          console.log("win col");
          return true;
        }
      }
    }
    // hàng ngang
    for (let i = 0; i < this.listValues.length; i++) {
      // console.log("value", i, this.listValues[i]);
      if (this.listValues[i] != 0) {
        if (
          this.listValues[i] == this.listValues[i + 3] &&
          this.listValues[i + 6] == this.listValues[i + 3]
        ) {
          console.log("win row");
          return true;
        }
      }
    }
    // đường chéo
    console.log(this.listValues[0], this.listValues[4], this.listValues[8]);
    if (
      this.listValues[0] == this.listValues[4] &&
      this.listValues[4] == this.listValues[8] &&
      this.listValues[0] != 0 &&
      this.listValues[4] != 0 &&
      this.listValues[8] != 0
    ) {
      console.log("win 048");
      return true;
    }
    if (
      this.listValues[2] == this.listValues[4] &&
      this.listValues[4] == this.listValues[6] &&
      this.listValues[2] != 0 &&
      this.listValues[4] != 0 &&
      this.listValues[6] != 0
    ) {
      console.log("win 246");
      return true;
    }
    return false;
  }
}
// ktra thắng thua khi xong 1 lượt
// win => tạo map mới
