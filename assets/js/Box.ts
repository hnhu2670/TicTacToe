import { _decorator, Component, Node, Vec2, Rect, Size } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Box")
export class Box extends Component {
  @property(Size) size: Size = new Size(10, 10);

  private rect: Rect = new Rect();

  protected start(): void {
    this.rect.size = this.size;
  }

  public getRect() {
    this.rect.x = this.node.position.x - this.rect.width / 2;
    this.rect.y = this.node.position.y - this.rect.height / 2;
    return this.rect;
  }
  public nhap() {
    console.log("duoc roi nha");
  }
}
