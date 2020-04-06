'use strict';

const htmlImages = document.getElementsByClassName('image');
const htmlBackground = document.getElementById('bg');

const setBackground = (child) => {
  htmlBackground.style.backgroundImage =
    `url("${htmlImages[child].children[0].src}")`;
};

setBackground(0);

for (let i = 0; i < htmlImages.length; i++) {
  htmlImages[i].addEventListener(
      'click',
      () => {
        setBackground(i);
      },
  );
}
