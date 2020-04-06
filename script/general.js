/* eslint-disable no-unused-vars */
'use strict';

/**
 * @global elemente HTML
 */
/**
 * @const htmlHeader headerul paginii
 */
const htmlHeader = document.getElementById('header');
/**
 * @const htmlTitle butonul de titlu al paginii
 * (folosit pentru afisarea @const htmlPorecle)
 */
const htmlTitle = document.getElementById('title');
/**
 * @const htmlPorecle lista de porecle
 */
const htmlPorecle = document.getElementById('porecle');
/**
 * @const htmlPorecleHide butonul pentru ascunderea poreclelor
 */
const htmlPorecleHide = document.getElementById('porecle-hide');
const htmlSidewindows = document.getElementById('sidewindows');
const htmlSidewindowsShow = document.getElementById('show-sidewindows');
const htmlContent = document.getElementById('content');
const htmlContentMain = document.getElementById('main');
const htmlTime = document.getElementById('time');
const htmlDate = document.getElementById('date');
const htmlFooter = document.getElementById('footer');
/**
 * @const {number} rem - unitatea de baza de marime
 */
const rem =
  window.getComputedStyle(document.body).fontSize.replace('px', '') - 0;
/**
 * @var {number} width - Latimea ecranului, in pixeli
 */
let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
/**
 * @var {number} height - Inaltimea ecranului, in pixeli
 */
let height = window.innerHeight > 0 ? window.innerHeight : screen.height;
/**
 * @global {boolean} isTouch - Ia valoarea true daca dispozitivul
 * de pe care site-ul este accesat are touchscreen.
 */
const isTouch = (function() {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  const mq = function(query) {
    return window.matchMedia(query).matches;
  };
  if (
    'ontouchstart' in window ||
    (window.DocumentTouch && document instanceof DocumentTouch)
  ) {
    return true;
  }
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(
      '',
  );
  return mq(query);
})();
/**
 * @const {boolean} isDesktop - Ia valoarea true daca
 *  dispozitivul de pe care site-ul este accesat are ecran mare.
 * @return {boolean} valoarea de adevar a proprietatii mentionate
 */
const isDesktop =
  () => window.matchMedia('screen and (min-width: 71em)').matches;
/**
 * Verifica daca un element este descendend al unui parinte
 * @param {HTMLElement} child Obiectul de verificat
 * @param {HTMLElement} parent Obiectul in care se verifica
 * @return {Boolean} true, daca este descendent
 */
function isChildOf(child, parent) {
  for (let node = child.parentNode; node != null; node = node.parentNode) {
    if (node == parent) {
      return true;
    }
  }
  return false;
};
/**
 * Converteste intr-un vector de numere proprietatile CSS cum ar fi:
 * "margin", "padding" etc.
 * Nota: acestea trebuie sa fie obtinute folosind
 * window.getComputedStyle, altfel nu sunt returnate ca si pixeli!
 * @param {CSSStyleDeclaration} property proprietatea pentru conversie
 * @param {function(v, i): boolean} filterFunc functia de filtare;
 * returneaza "false" daca niciun element nu trebuie eliminat
 * @return {number[]} proprietatea convertita
 */
function getPropertyAsNumbers(property, filterFunc) {
  return property.split(/px ?/g).map(Number).filter(filterFunc);
}
/**
 * Obtine inaltimea ramasa pentru ultimul descendent direct
 * al parintelui, astfel incat sa nu existe overflow in
 * container. Se considera proprietatea CSS "box-sizing"
 * cu valoarea "border-box";
 * @param {Element | HTMLElement} parent containerul
 * in care se efectueaza calculele
 * @return {Number} inaltimea (in pixeli)
 */
function getLastChildHeight(parent) {
  const totalHeight = (() => {
    const parentCoords = parent.getBoundingClientRect();
    return parentCoords.bottom - parentCoords.top;
  })();

  let subtractedHeight = (() => {
    const duplicateElement = (arr) => arr.push(arr.length === 1 ? arr[0] : 0);
    const last = parent.children.length - 1;
    let result = 0;
    const paddingParent =
        getPropertyAsNumbers(
            window.getComputedStyle(parent).padding,
            (v, i) => i % 2 === 0,
        );
    duplicateElement(paddingParent);
    const marginParent =
        getPropertyAsNumbers(
            window.getComputedStyle(parent).margin,
            (v, i) => i % 2 == 0,
        );
    duplicateElement(marginParent);
    const total = [...paddingParent, ...marginParent];
    total.forEach((v) => result += v);
    return result;
  })();

  for (let i = 0; i < parent.children.length - 1; i++) {
    const child = parent.children[i];
    subtractedHeight += child.scrollHeight;
  }
  return totalHeight - subtractedHeight;
}
/**
 * Functie ce returneaza coordonatele relative ale elementului
 * "child" fata de un ascendent al acestuia, "parent".
 * @param {HTMLElement | Element} child Descendentul pentru care
 * se obtin coordonatele
 * @param {HTMLElement | Element} parent Ascendentul fata de care
 * se obtin coordonatele
 * @return {{
     top: number,
     left: number,
     bottom: number,
     right: number
   }} obiect ce contine coordonatele
 */
function getRelativePosition(child, parent) {
  const childCoords = child.getBoundingClientRect();
  const parentCoords = parent.getBoundingClientRect();
  const relativePosition = {
    top: childCoords.top - parentCoords.top,
    left: childCoords.left - parentCoords.left,
    bottom: childCoords.bottom - parentCoords.bottom,
    right: childCoords.right - parentCoords.right,
  };
  return relativePosition;
}
/**
 * Verifica daca un descendent al parintelui se afla perfect
 * in aria vizibila parintelui.
 * @param {HTMLElement | Element} child Descendentul pentru care
 * se verifica proprietatea
 * @param {HTMLElement | Element} parent Ascendentul fata de care
 * se verifica proprietatea
 * @return {boolean} true, daca este perfect vizibil, altfel false.
 */
function isInView(child, parent) {
  const coords = getRelativePosition(child, parent);
  return (coords.top === 0 && coords.left ===0);
}

window.addEventListener('resize', () => {
  width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  height = window.innerHeight > 0 ? window.innerHeight : screen.height;
});
