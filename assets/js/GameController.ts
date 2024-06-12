import {
  _decorator,
  Camera,
  CCInteger,
  Component,
  instantiate,
  Label,
  math,
  Node,
  Prefab,
  randomRange,
  Vec3,
} from "cc";
import { PlayerController } from "./PlayerController";

const { ccclass, property } = _decorator;

@ccclass("GameController")
export class GameController extends Component {
  @property({ type: Label })
  public markLabel: Label | null = null;

  @property({ type: Node })
  public startMenu: Node = null;

  @property({ type: Node })
  public winMenu: Node = null;

  private _count: number = 0;

  // @property(Prefab) playerPrefab: Node = null;
  @property(Node) player: Node = null;
  @property({ type: [Prefab] })
  public enemyPrefab: Prefab[] | null = [];
  @property({ type: [Prefab] })
  public starPrefab: Prefab[] | null = [];
  @property({ type: [Prefab] })
  public blingPrefab: Prefab[] | null = [];
  @property(CCInteger) enemySize: number = 10;
  @property(CCInteger) starSize: number = 10;
  @property(Vec3) enemySpawnRangeX: Vec3 = new Vec3(-100, 100, 0);
  @property(Vec3) enemySpawnRangeY: Vec3 = new Vec3(-100, 100, 0);

  // private player: Node = null; //node player
  private enemies: Node[] | null = [];
  private stars: Node[] | null = [];
  private blings: Node[] | null = [];
  start() {
    this.startMenu.active = true;
    this.winMenu.active = false;
    this.player.on("reduce", this.onCollision, this);
  }
  create() {
    this.startMenu.active = false;
    console.log("score", this._count);
    this.generateRoad(this.enemySize);
    this.createStar(this.starSize);
    this.createBling(100);
  }
  init() {
    // menu
    this.node.removeAllChildren();
    this.winMenu.active = false;
    this.markLabel.string = "Score: 0";
    this._count = 0;
    console.log("score", this._count);
    this.generateRoad(this.enemySize);
    this.createStar(this.starSize);
    this.createBling(100);
  }
  update(deltaTime: number) {
    // this._star.on("destroyed", this.onDestroyed, this);
  }

  // createPlayer(): void {
  //   this.player = instantiate(this.playerPrefab);
  //   this.player.setPosition(0, 0, 0);
  //   this.node.addChild(this.player);
  //   console.log("đã tạo", this.node.getPosition());
  // }
  generateRoad(size: number) {
    for (let i = 0; i < size; i++) {
      let random = Math.floor(math.randomRangeInt(0, 3));
      const enemy = instantiate(this.enemyPrefab[random]);
      enemy.setPosition(
        math.randomRangeInt(this.enemySpawnRangeX.x, this.enemySpawnRangeX.y),
        math.randomRangeInt(this.enemySpawnRangeX.x, this.enemySpawnRangeX.y),
        0
      );
      this.node.addChild(enemy);
      this.enemies.push(enemy);
    }
  }
  createBling(size: number) {
    // this.node.removeAllChildren();
    for (let i = 0; i < size; i++) {
      let random = Math.floor(math.randomRangeInt(0, 2));
      const bling = instantiate(this.blingPrefab[random]);
      bling.setPosition(
        math.randomRangeInt(this.enemySpawnRangeX.x, this.enemySpawnRangeX.y),
        math.randomRangeInt(this.enemySpawnRangeX.x, this.enemySpawnRangeX.y),
        0
      );
      this.node.addChild(bling);
      this.blings.push(bling);
    }
  }
  createStar(size: number) {
    // this.node.removeAllChildren();
    for (let i = 0; i < size; i++) {
      let random = Math.floor(math.randomRangeInt(0, 2));
      const star = instantiate(this.starPrefab[random]);
      star.setPosition(
        math.randomRangeInt(this.enemySpawnRangeX.x, this.enemySpawnRangeX.y),
        math.randomRangeInt(this.enemySpawnRangeX.x, this.enemySpawnRangeX.y),
        0
      );
      this.node.addChild(star);
      star.on("destroyed", this.onDestroyed, this);
      this.stars.push(star);
    }
  }
  onDestroyed(star: Node) {
    console.log("destroyed", star.name);
    this.stars = this.stars.filter((e) => e !== star);
    this._count += 10;
    console.log("điểm", this._count);
    if (this.stars.length === 0) {
      this.winMenu.active = true;
      if (this.markLabel) {
        this.markLabel.string = "Score: " + this._count;
      }
      this.player.getComponent(PlayerController).reset();
    }
  }
  onCollision() {
    // this._count -= 10;
    // console.log("Scrore.onCollisiton", this._count);
    // // if (this.markLabel) {
    // if (this._count < 0) {
    //   this.markLabel.string = "Score: 0";
    //   this.winMenu.active = true;
    //   this.player.getComponent(PlayerController).reset();
    // }
    // }
  }
  onStartButtonClicked() {
    setTimeout(() => {
      this.create();
    }, 300);
  }
  onWinButtonClicked() {
    this.init();
  }

  public get Player(): Node {
    return this.player;
  }

  public get Enemies(): Node[] {
    return this.enemies;
  }
  public get Stars(): Node[] {
    return this.stars;
  }
}
