'use strict';

const resizeContent = () => {
  htmlSidewindowsShow.title = 'Afiseaza ferestrele';
  const headerWidth = htmlHeader.getBoundingClientRect().height;
  const footerWidth = htmlFooter.getBoundingClientRect().height;
  htmlContent.style.height =
    `calc(100% - ${headerWidth + footerWidth + 3 * rem}px)`;
};

if (isDesktop()) {
  resizeContent();
}

['orientationchange', 'resize'].forEach(
    (eventName) => window.addEventListener(
        eventName,
        () => {
          if (!isDesktop()) {
            htmlSidewindowsShow.title = 'Mergi jos';
            htmlContent.style.height = '';
            htmlSidewindows.style.display = 'flex';
          } else {
            resizeContent();
          }
        },
    ),
);
