'use strict';

const jumate = {
  container: document.getElementById('jumate'),
  message: document.getElementById('jumate-message'),
  textHead: document.getElementById('jumate-message-head'),
  kirbyImg: document.getElementById('kirby-image'),
  kirbyImgNumber: 10,
  switch: {
    window: document.getElementById('jumate-switch-window'),
    label: document.getElementById('jumate-switch'),
    check: document.getElementById('jumate-disable'),
    image: document.getElementById('jumate-switch-image'),
    text: document.getElementById('jumate-switch-text'),
    changeEmoji: function() {
      if (this.check.checked) {
        this.image.src = 'resource/emojis/face-unwell-56.png';
        this.image.alt = this.text.innerHTML =
          'Jumate la fiecare minut inactiv...';
      } else {
        this.image.src = 'resource/emojis/face-affection-14.png';
        this.image.alt = this.text.innerHTML =
          'Jumate la fiecare minut activ!';
      }
    },
  },
  setBackground: function() {
    this.container.style.backgroundImage =
      'url("resource/confetti/jumate-min.gif")';
  },
  display: function(message, bgCol = 'black', textCol = 'white') {
    if (/\b0!/.test(message)) {
      message = 'E jumatea de la fix!';
    }
    const imgNumber = Math.floor(Math.random() * this.kirbyImgNumber + 1);
    this.container.style.visibility = 'visible';
    this.container.style.opacity = '1';
    this.message.style.backgroundColor = imgNumber === 2 ? bgCol : '';
    this.message.style.color = imgNumber === 2 ? textCol : '';
    this.textHead.innerHTML = message;
    this.kirbyImg.src = `resource/kirby/${imgNumber}.gif`;
  },
  hide: function() {
    this.container.style.opacity = '0';
    this.container.style.visibility = 'hidden';
  },
  atEveryMinute: function() {
    return !this.switch.check.checked;
  },
};

jumate.setBackground();

jumate.container.addEventListener(
    'click',
    (ev) => {
      if (isChildOf(ev.target, jumate.container)) return;

      jumate.hide();
    },
);

jumate.switch.label.addEventListener(
    'click',
    () => jumate.switch.changeEmoji(),
);
