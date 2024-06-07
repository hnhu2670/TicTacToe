import {
  _decorator,
  Animation,
  CCInteger,
  Color,
  Component,
  director,
  instantiate,
  Label,
  Layout,
  math,
  Node,
  Prefab,
  Sprite,
  tween,
  Vec3,
  view,
} from "cc";
import { CellManager } from "./CellManager";
import { Timer } from "./Timer";
import { AudioManager } from "./AudioManager";
import { BoardManager } from "./BoardManager";
import { BotManager } from "./BotManager";
import { PopupManager } from "./PopupManager";
import { PlayerManager } from "./PlayerManager";
import { GameData } from "./GameData";
import { AnimationManager } from "./AnimationManager";
import { DemoJava } from "./DemoJava";
const { ccclass, property } = _decorator;
declare global {
  interface Window {
    GameController: typeof GameController;
  }
}
@ccclass("GameController")
export class GameController extends Component {
  @property({ type: Prefab })
  public boardPrefab: Prefab | null;
  private board: Node[] | null = [];
  @property(CCInteger) boardSize: number = 0;
  @property({ type: Node })
  public result: Node;

  @property({ type: Node })
  public video: Node;
  public static watchVideo;
  @property({ type: Node })
  public player1: Node;

  @property({ type: Node })
  public player2: Node;
  // @property({ type: Node })
  // public player2: Node;
  private player: Node;
  @property({ type: Node })
  public bot: Node;

  @property({ type: Label })
  public winLabel: Label = null;
  @property({ type: Label })
  public viewLabel: Label = null;

  public listValues: number[];
  public loacationList: number[] = [];
  public blockWin: number[];
  private static isActive: boolean = true;
  private cellChosen: number = 0;
  private time: number = 10;

  @property({ type: Node })
  public win: Node;
  @property({ type: Node })
  public lose: Node;
  @property({ type: Node })
  public tie: Node;
  private winningIndexes: number[];
  public static componentTimer;
  public static view = 3;
  public static afterVideo: boolean = false;
  start() {
    GameController.componentTimer = this.node.getComponent(Timer);
    GameController.watchVideo = this.video;
    this.getPointPlayer();
    this.createBoard(this.boardSize);
    GameController.componentTimer.startTimer(this.time);
    this.node.on("endTime", this.checkEndTime, this);
  }

  init() {
    this.createBoard(this.boardSize);
    GameController.componentTimer.startTimer(this.time);
    this.playerIsPlayer();
    this.listValues = [];
  }
  update(deltaTime: number) {}

  createBoard(boardSize: number) {
    this.board = [];
    const screenSize = view.getVisibleSize(); //size màn hình
    // console.log("size screen", screenSize);
    const cellSize = 55;

    const boardWidth = boardSize * cellSize;
    const boardHeight = boardSize * cellSize;
    // console.log("boardSize", boardWidth, boardHeight);
    const startX = -boardWidth / 2 + cellSize / 2; //x: ô đầu
    const startY = -boardHeight / 2 + cellSize / 2; //y: ô đầu

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
  // lưu những ô đã chọn
  addValues() {
    let data = 0;
    this.cellChosen = 0;
    this.listValues = [];
    this.board.forEach((b) => {
      data = b.getComponent(CellManager).values;
      if (data != 0) {
        this.cellChosen++;
      }
      this.listValues.push(data);
    });
  }
  animationWin() {
    // console.log("block win", this.winningIndexes);
    for (var i = 0; i < this.winningIndexes.length; i++) {
      //
      // console.log("this.winningIndexes", this.winningIndexes[i]);
      var block = this.winningIndexes[i];
      // console.log("block", block);
      // console.log("this.board[block]", this.board[block]);

      // console.log("this.winningIndexes", this.winningIndexes[2]);
      tween(this.board[block])
        .repeatForever(
          tween()
            .to(0.5, { scale: new Vec3(1.2, 1.2, 1.2) })
            .by(1.0, { scale: new Vec3(-0.5, -0.5, -0.5) })
            .to(1.0, { scale: new Vec3(1, 1, 1) })
        )
        .start();
    }
  }
  // ktra win theo player
  checkWin(current: string): boolean {
    this.winningIndexes = [];
    // ktra hàng dọc
    for (let i = 0; i < this.listValues.length; i += 3) {
      if (this.listValues[i] != 0) {
        if (
          this.listValues[i] == this.listValues[i + 1] &&
          this.listValues[i + 1] == this.listValues[i + 2]
        ) {
          this.winningIndexes = [i, i + 1, i + 2];

          return true;
        }
      }
    }
    // hàng ngang
    for (let i = 0; i < this.listValues.length; i++) {
      if (this.listValues[i] != 0) {
        if (
          this.listValues[i] == this.listValues[i + 3] &&
          this.listValues[i + 6] == this.listValues[i + 3]
        ) {
          this.winningIndexes = [i, i + 3, i + 6];

          return true;
        }
      }
    }
    // đường chéo
    // console.log(this.listValues[0], this.listValues[4], this.listValues[8]);
    if (
      this.listValues[0] == this.listValues[4] &&
      this.listValues[4] == this.listValues[8] &&
      this.listValues[0] != 0 &&
      this.listValues[4] != 0 &&
      this.listValues[8] != 0
    ) {
      this.winningIndexes = [0, 4, 8];

      return true;
    }
    if (
      this.listValues[2] == this.listValues[4] &&
      this.listValues[4] == this.listValues[6] &&
      this.listValues[2] != 0 &&
      this.listValues[4] != 0 &&
      this.listValues[6] != 0
    ) {
      this.winningIndexes = [2, 4, 6];
      return true;
    }
    return false;
  }
  // ktra thời gian của player
  checkEndTime(time: boolean) {
    if (this.cellChosen == 9) {
      GameController.componentTimer.stopTime();
      this.winLabel.string = "TIE";
      this.tie.active = true;
      this.result.active = true;
    }
    if (time) {
      GameController.isActive = false;
      if (GameController.view > 0) {
        GameController.componentTimer.stopTime();
        GameController.watchVideo.active = true;
        this.viewLabel.string = GameController.view + " ";
      } else {
        this.animationWin();
        GameController.componentTimer.stopTime();
        this.winLabel.string = "Bot Win";
        this.lose.active = true;
        this.result.active = true;
      }
    } else {
      if (GameController.isActive) {
        this.player.getComponent(AnimationManager).playerActive();
        this.playerIsPlayer();
      } else {
        if (this.cellChosen < 9) {
          this.bot.getComponent(AnimationManager).playerActive();
          this.scheduleOnce(this.playerIsBot, 3);
        }
      }
    }
  }
  // kết thúc video
  static afterShowVideo() {
    GameController.componentTimer.startTimer(10);
    GameController.watchVideo.active = false;
    GameController.isActive = true;
    GameController.afterVideo = true;
    this.view--;
  }

  playerIsPlayer() {
    this.board.forEach((b) => {
      b.on(Node.EventType.TOUCH_START, () => {
        if (!GameController.isActive) {
          return;
        }
        if (b.getComponent(CellManager).check === false) {
          b.getComponent(CellManager).changeCell("Player");
          let index = this.board.indexOf(b);
          this.loacationList.push(index);
          console.log("index", this.loacationList);
          this.node
            .getComponent(AudioManager)
            .clickChosen(GameData.getInstance().getShowSound());
          GameController.componentTimer.stopTime();
          this.addValues();
          if (this.checkWin("Player")) {
            this.animationWin();
            this.winLabel.string = "Player Win";
            this.win.active = true;
            this.result.active = true;
            GameController.componentTimer.stopTime();
            this.player.getComponent(PlayerManager).saveLocalData();
          } else {
            GameController.isActive = false;
            GameController.componentTimer.startTimer(10);
          }
        }
      });
    });
  }
  playerIsBot() {
    if (this.loacationList && this.loacationList.length > 0) {
      var loacation = this.loacationList[this.loacationList.length - 1];
      console.log("this.loacationList", loacation);
      var blockWin = this.checkBlockPlayerWin();
      if (blockWin.getComponent(CellManager).check === false) {
        blockWin.getComponent(CellManager).changeCell("Bot");
        this.addValues();
        if (this.checkWin("Bot")) {
          if (GameController.view > 0) {
            GameController.componentTimer.stopTime();
            this.viewLabel.string = GameController.view + "";
            GameController.watchVideo.active = true;
            this.scheduleOnce(() => {
              this.board[loacation]
                .getComponent(CellManager)
                .changeCell("Null");
              blockWin.getComponent(CellManager).changeCell("Null");
            }, 3);
          } else {
            this.animationWin();
            GameController.componentTimer.stopTime();
            this.winLabel.string = "Bot Win";
            this.lose.active = true;
            this.result.active = true;
          }
        } else {
          GameController.isActive = true;
          GameController.componentTimer.startTimer(10);
        }
      }
    }
  }

  checkBlockPlayerWin() {
    var blockPlayerWin = [];
    var blockBotWin = [];

    for (let i = 0; i <= this.listValues.length; i++) {
      var playerValue = [1, 2]; // Lưu giá trị của người chơi (1 hoặc 2)

      for (let j = 0; j <= 1; j++) {
        if (this.listValues[i] == 0) {
          this.listValues[i] = playerValue[j];

          var check = this.checkWin(playerValue[j] == 1 ? "Player" : "Bot");
          if (check) {
            // console.log("player can win");
            if (playerValue[j] == 1) {
              blockPlayerWin.push(this.board[i]);
            } else {
              blockBotWin.push(this.board[i]);
            }
          }

          this.listValues[i] = 0;
        }
      }
    }
    if (blockBotWin.length > 0) {
      blockPlayerWin = blockBotWin;
    } else {
      if (blockPlayerWin.length <= 0) {
        // console.log("player not win");
        for (let i = 0; i <= this.listValues.length; i++) {
          if (this.listValues[i] == 0) {
            blockPlayerWin.push(this.board[i]);
          }
        }
      }
    }
    return blockPlayerWin[math.randomRangeInt(0, blockPlayerWin.length)];
  }
  getPointPlayer() {
    var getPlayer = GameData.getInstance().getPlayerGame();
    if (getPlayer == "Player1") {
      this.player1.active = true;
      this.player = this.player1;
    } else {
      this.player2.active = true;
      this.player = this.player2;
    }
  }
  buttonCloseVideo() {
    GameController.componentTimer.stopTime();
    this.winLabel.string = "Bot Win";
    GameController.watchVideo.active = false;
    this.lose.active = true;
    this.result.active = true;
    GameController.isActive = true;
  }
  buttonRestart() {
    GameController.componentTimer.startTimer(10);
    this.createBoard(this.boardSize);
    GameController.isActive = true;
    this.result.active = false;
    this.listValues = [];
    this.cellChosen = 0;
  }
}
window.GameController = GameController;
