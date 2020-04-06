'use strict';

const minecraftSlideshow = {
  slide: 0,
  button: {
    backward: document.getElementById('minecraft-slide-backward'),
    forward: document.getElementById('minecraft-slide-forward'),
  },
  container: document.getElementById('minecraft-slides'),
  forward: function(behavior) {
    if (++this.slide === this.container.children.length) {
      this.slide = 0;
    }
    this.container.scroll({
      left: this.container.children[this.slide]
          .getBoundingClientRect().width * this.slide,
      behavior: behavior,
    });
  },
  backward: function(behavior) {
    if (--this.slide === -1) {
      this.slide = this.container.children.length - 1;
    }
    this.container.scroll({
      left: this.container.children[this.slide]
          .getBoundingClientRect().width * this.slide,
      behavior: behavior,
    });
  },
};

minecraftSlideshow.button.forward.addEventListener(
    'click',
    () => minecraftSlideshow.forward('smooth'),
);

minecraftSlideshow.button.backward.addEventListener(
    'click',
    () => minecraftSlideshow.backward('smooth'),
);
