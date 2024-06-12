import {
  _decorator,
  AudioClip,
  AudioSource,
  Component,
  native,
  Node,
  sys,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("AudioManager")
export class AudioManager extends Component {
  @property([AudioClip])
  private audio: AudioClip[] | null = [];
  public audioSource: AudioSource = new AudioSource();
  start() {
    this.audioSource.clip = this.audio[2];
    this.audioSource.loop = true;
    this.audioSource.volume = 0.2;
    this.audioSource.play();
  }

  update(deltaTime: number) {}

  clickChosen(isOff: boolean) {
    if (this.audioSource) {
      if (!isOff) {
        console.log("is off", isOff);
        this.audioSource.playOneShot(this.audio[0]);
      }
    }
  }
  winner() {
    console.log("audio winner");
    this.audioSource.stop();
    // this.audioSource.volume = 0;
    this.audioSource.clip = this.audio[4];
    this.audioSource.volume = 1;
    if (this.audioSource) {
      this.audioSource.playOneShot(this.audio[4]);
    }
  }
  lose() {
    console.log("audio lose");
    // this.audioSource.volume = 0;
    this.audioSource.clip = this.audio[3];
    this.audioSource.volume = 1;
    if (this.audioSource) {
      this.audioSource.playOneShot(this.audio[3]);
    }
  }
  clock() {
    console.log("audio lose");
    // this.audioSource.volume = 0;
    this.audioSource.clip = this.audio[5];
    this.audioSource.volume = 1;
    if (this.audioSource) {
      this.audioSource.playOneShot(this.audio[5]);
    }
  }
  co;
  completion() {
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
