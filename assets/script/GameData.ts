export class GameData {
  public chosenPlayer: string;
  public activeButton: boolean;

  constructor() {
    this.chosenPlayer = "Player1";
    this.activeButton = false;
  }

  public static getInstance(): GameData {
    if (!GameData.instance) {
      GameData.instance = new GameData();
    }
    return GameData.instance;
  }
  public getPlayerGame() {
    console.log("this.chosenPlayer", this.chosenPlayer);
    return this.chosenPlayer;
  }
  public setPlayerGame(chosen: string): void {
    this.chosenPlayer = chosen;
  }
  public getActiveButton() {
    console.log("getActiveButton", this.activeButton);
    return this.activeButton;
  }
  public setActiveButton(active: boolean): void {
    this.activeButton = active;
    console.log("setActiveButton", this.activeButton);
  }
  private static instance: GameData;
}
// lưu chế độ chơi xuống game data
// truyền vào getInstance
// gọi lại getInstance.gameMode
// liên quan đến kiến trúc Singleton   => khi nào xoá, clean Singleton.....
