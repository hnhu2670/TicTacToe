import { _decorator, AudioClip, AudioSource, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AudioManager")
export class AudioManager extends Component {
  @property([AudioClip])
  private audio: AudioClip[] | null = [];
  public audioSource: AudioSource = new AudioSource();
  start() {
    this.audioSource.clip = this.audio[2];
    this.audioSource.loop = true;
    this.audioSource.play();
  }

  update(deltaTime: number) {}

  clickChosen(isOff: boolean) {
    if (!isOff) {
      console.log("is off", isOff);
      this.audioSource.playOneShot(this.audio[0]);
    }
  }
  completion() {
    // this.audioSource.pause();
    this.audioSource.playOneShot(this.audio[1]);
  }
  clickPlayGame() {
    this.audioSource.clip = this.audio[2];
    this.audioSource.loop = true;
    this.audioSource.play();
  }
  offMusic(isOff: boolean) {
    if (isOff) {
      console.log("isOff", isOff);
      this.audioSource.stop();
    } else {
      console.log("isOff", isOff);
      this.audioSource.clip = this.audio[2];
      this.audioSource.loop = true;
      this.audioSource.play();
    }
  }
}
