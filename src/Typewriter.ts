type QueueType = () => Promise<void>;

export class Typewriter {
  #queue: QueueType[] = [];
  #element: Element;
  #loop: boolean;
  #typingSpeed: number;
  #deletingSpeed: number;

  constructor(
    parent: Element,
    { loop = false, typingSpeed = 50, deletingSpeed = 50 } = {}
  ) {
    this.#element = document.createElement('div');
    this.#element.classList.add('typewriter');
    parent.append(this.#element);
    this.#loop = loop;
    this.#typingSpeed = typingSpeed;
    this.#deletingSpeed = deletingSpeed;
  }

  typeString(string: string) {
    this.#addToQueue((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        this.#element.append(string[i]);
        i++;

        if (i >= string.length) {
          clearInterval(interval);
          resolve();
        }
      }, this.#typingSpeed);
    });

    return this;
  }

  deleteChars(number: number) {
    this.#addToQueue((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        const text: string = this.#element.innerHTML;
        this.#element.innerHTML = text.substring(0, text.length - 1);
        i++;

        if (i >= number) {
          clearInterval(interval);
          resolve();
        }
      }, this.#deletingSpeed);
    });

    return this;
  }

  deleteAll(deleteSpeed = this.#deletingSpeed) {
    this.#addToQueue((resolve) => {
      const interval = setInterval(() => {
        const text: string = this.#element.innerHTML;
        this.#element.innerHTML = text.substring(0, text.length - 1);

        if (text.length === 0) {
          clearInterval(interval);
          resolve();
        }
      }, deleteSpeed);
    });

    return this;
  }

  pauseFor(duration: number) {
    this.#addToQueue((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
    return this;
  }

  async start() {
    let callback = this.#queue.shift();

    while (callback) {
      await callback();
      if (this.#loop) this.#queue.push(callback);
      callback = this.#queue.shift();
    }

    return this;
  }

  #addToQueue(
    callback: (resolve: (value: void | PromiseLike<void>) => void) => void
  ) {
    this.#queue.push(() => new Promise(callback));
  }
}
