import { _decorator, Component, director, game, Node } from "cc";
import { AudioManager } from "./AudioManager";
import { GameData } from "./GameData";
const { ccclass, property } = _decorator;

@ccclass("PopupManager")
export class PopupManager extends Component {
  @property({ type: Node })
  public result: Node;
  @property({ type: Node })
  public setting: Node;
  private isOffSound: boolean = false;
  private isOffMusic: boolean = false;
  start() {}
  onLoad() {
    director.addPersistRootNode(this.node);
  }
  buttonSetting() {
    this.setting.active = true;
    GameData.getInstance().setActiveButton(true);
  }
  buttonCloseSetting() {
    this.setting.active = false;
    GameData.getInstance().setActiveButton(false);
  }
  buttonPlayGame() {
    console.log(
      "(GameData.getInstance().getActiveButton()",
      GameData.getInstance().getActiveButton()
    );
    if (GameData.getInstance().getActiveButton() == false) {
      director.loadScene("game");
    } else {
      console.log("no click");
    }
  }
  offSound() {
    if (this.isOffSound) this.isOffSound = false;
    else this.isOffSound = true;
    this.node.getComponent(AudioManager).clickChosen(this.isOffSound);
  }
  offMusic() {
    if (this.isOffMusic) this.isOffMusic = false;
    else this.isOffMusic = true;
    this.node.getComponent(AudioManager).offMusic(this.isOffMusic);
  }
  update(deltaTime: number) {}
}
