declare global {
  interface Window {
    DemoJava: typeof DemoJava;
  }
}

export class DemoJava {
  public static getVideo() {
    console.log("showtag in cocos, finish shows");
    return true;
  }
}

// Register DemoJava as a global class
window.DemoJava = DemoJava;
