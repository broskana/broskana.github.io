/* eslint-disable no-unused-vars */
'use strict';

/**
 * Verifica daca proeclele ar trebui sa apara de la stanga sau de sus.
 * @return {boolean}
 */
function isSlidable() {
  return !window.matchMedia('screen and (min-width: 25em)').matches ||
  // eslint-disable-next-line max-len
  window.matchMedia('screen and (max-height: 30em) and (orientation: landscape)').matches;
}
/**
 * Modifica marimea containerului @const htmlPorecle, in functie de dispozitiv
 */
function initPorecle() {
  if (isSlidable()) {
    htmlPorecle.style.width =
    htmlPorecle.style.maxHeight =
    htmlPorecle.style.top = '';
    htmlPorecle.style.left = '-100%';
    htmlPorecleHide.children[0].style.transform = '';
  } else {
    htmlPorecle.style.width =
      `${htmlTitle.children[0].getBoundingClientRect().width}px`;
    htmlPorecle.style.maxHeight = '0px';
    htmlPorecle.style.top =
      `${htmlHeader.getBoundingClientRect().height}px`;
    htmlPorecle.style.left =
      `${htmlTitle.children[0].getBoundingClientRect().left}px`;
    htmlPorecleHide.children[0].style.transform = 'rotate(90deg)';
  }
}

const showPorecle = () => {
  htmlPorecle.style.visibility = 'visible';
  if (isSlidable()) {
    htmlPorecle.style.left = '0px';
  } else {
    htmlPorecle.style.maxHeight =
        `${height - htmlHeader.getBoundingClientRect().height}px`;
  }
};

const hidePorecle = () => {
  if (isSlidable()) {
    htmlPorecle.style.left = '-100%';
  } else {
    htmlPorecle.style.maxHeight = `0px`;
  }
  htmlPorecle.style.visibility = 'hidden';
};
/**
 * Comuta afisarea @const htmlPorecle
 */
function displayPorecle() {
  if (htmlPorecle.style.visibility === 'hidden') {
    showPorecle();
  } else {
    hidePorecle();
  }
}

initPorecle();
['orientationchange', 'resize'].forEach((eventName) =>
  window.addEventListener(eventName, initPorecle));
