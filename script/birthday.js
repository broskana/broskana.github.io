'use strict';

const units = [
  ['ore', 'oră'],
  ['minute', 'minut'],
  ['secunde', 'secundă'],
];

const formatDuration = (num, i) => {
  if (num === 0) return '';
  let ret = `${num} `;
  if (num > 19) ret += 'de ';
  ret += `${units[i][num === 1 ? 1 : 0]}`;
  return ret;
};

const htmlBirthdayTooltip = document.getElementById('birthday-tooltip');
const showBirthdayTooltip = () => {
  const today = new Date();
  if (today.getFullYear() === birthday.date().getFullYear() &&
      today.getMonth() === birthday.date().getMonth() &&
      today.getDate() === birthday.date().getDate()) {
    htmlBirthdayTooltip.style.display = 'initial';
  } else {
    htmlBirthdayTooltip.style.display = 'none';
  }
};

const birthday = {
  container: document.getElementsByClassName('countdown'),
  date: function() {
    const today = new Date();
    const bday = new Date(today.getFullYear(), 3, 8, 12, 30, 28);
    if (today > bday) {
      bday.setFullYear(today.getFullYear() + 1);
    }
    return bday;
  },
  redirect: () => window.location.href = 'roxi.html',
  count: function() {
    const now = new Date().getTime();
    const distance = this.date().getTime() - now;
    const time = [
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      Math.floor((distance % (1000 * 60)) / 1000),
    ];
    for (let i = 0; i < this.container.length; i++) {
      this.container[i].innerHTML = `${formatDuration(time[i], i)}`;
    }
    return distance;
  },
};

let timeout;
const countdown = () => {
  const d = birthday.count();
  if (d < 0) {
    if (typeof timeout !== 'undefined') clearTimeout(timeout);
    birthday.redirect();
    return;
  }
  timeout = setTimeout(countdown, 1000);
};

showBirthdayTooltip();
countdown();
