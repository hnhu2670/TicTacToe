import { _decorator, Component, Node } from "cc";
import { GameController } from "./GameController";
import { Box } from "./Box";
import { EnemyController } from "./EnemyController";
import { StarController } from "./StarController";
const { ccclass, property } = _decorator;

@ccclass("CollisionManager")
export class CollisionManager extends Component {
  @property(GameController) gameController: GameController = null;

  start() {}
  update(dt: number): void {
    this.onCollision();
  }
  onCollision() {
    var player = this.gameController.Player;
    var playerRect = player.getComponent(Box).getRect();
    this.gameController.Enemies.forEach((enemy) => {
      var enemyRect = enemy.getComponent(Box).getRect();
      if (playerRect.intersects(enemyRect)) {
        // console.log("chạm");
        player.emit("collision", enemy); //thông báo chạm đến player
        // enemy.getComponent(EnemyController).node.emit("collision", enemy);
      }
    });

    this.gameController.Stars.forEach((star) => {
      var startsRect = star.getComponent(Box).getRect();
      // star.getComponent(Box).enabled = false;
      if (playerRect.intersects(startsRect)) {
        console.log("chạm");
        star.getComponent(StarController).node.emit("collision", star);
      }
    });
  }
}
