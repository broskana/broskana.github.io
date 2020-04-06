'use strict';

const luna = [
  'ianuarie',
  'februarie',
  'martie',
  'aprilie',
  'mai',
  'iunie',
  'iulie',
  'august',
  'septembrie',
  'octombrie',
  'noiembrie',
  'decembrie',
];

const zi = [
  'duminică',
  'luni',
  'marți',
  'miercuri',
  'joi',
  'vineri',
  'sâmbătă',
];

/**
 * Functie ce odata apelata, actualizeaza data si ora afisata
 * in elementele HTML "htmlTime" si "htmlDate"
 */
function currentTime() {
  const tm = new Date();
  const date = {};
  const time = {};

  date.y = tm.getFullYear();
  date.m = tm.getMonth();
  date.d = tm.getDate();
  date.wd = tm.getDay();

  time.h = tm.getHours();
  time.m = tm.getMinutes();
  time.s = tm.getSeconds();

  if (time.s === 30) {
    if (time.m === 30) {
      if (time.h === 12) {
        if (date.wd === 4) {
          if (date.d === 15) {
            if (date.m === 5) {
              if (date.y % 100 === 50) {
                console.log('E JUMATEA SUPREMA DE JOI A SECOLULUI');
                jumate.display(
                    `E JUMATEA SUPREMĂ DE JOI A SECOLULUI ${
                      Math.floor(date.y / 100) + 1
                    }`,
                );
              } else {
                console.log('e jumatea suprema de joi a anului');
                jumate.display(`E jumatea supremă a anului ${date.y}!`);
              }
            } else {
              console.log('e jumatea suprema de joi a lunii');
              jumate.display(`E jumatea supremă a lunii ${luna[date.m]}!`);
            }
          } else {
            console.log('e jumatea suprema a saptamanii');
            jumate.display(`E jumatea supremă de joi a săptămânii!`);
          }
        } else if (date.d === 15) {
          if (date.m === 5) {
            if (date.y % 100 === 50) {
              console.log('e jumatea suprema a secolului');
              jumate.display(
                  // eslint-disable-next-line max-len
                  `E jumatea suprema a secolului ${Math.floor(date.y / 100) + 1}!`,
              );
            } else {
              console.log('e jumatea suprema a anului');
              jumate.display(`E jumatea supremă a anului ${date.y}!`);
            }
          } else {
            console.log('e jumatea suprema a lunii');
            jumate.display(`E jumatea supremă a lunii ${luna[date.m]}!`);
          }
        } else {
          console.log('e jumatea suprema a zilei!');
          jumate.display(`E jumatea supremă a zilei de ${zi[date.wd]}!`);
        }
      } else {
        console.log('e jumatea suprema a orei ' + time.h);
        jumate.display(`E jumatea supremă a orei ${time.h}!`);
      }
    } else if (jumate.atEveryMinute()) {
      console.log(`e jumatea minutului ${time.m}`);
      jumate.display(`E jumatea minutului ${time.m}!`);
    }
  }

  htmlDate.innerHTML = `${zi[date.wd]}, ${date.d} ${luna[date.m]} ${date.y}`;

  time.h = addZero(time.h);
  time.m = addZero(time.m);
  time.s = addZero(time.s);

  htmlTime.innerHTML = time.h + ':' + time.m + ':' + time.s;

  setTimeout(currentTime, 1000);
}
/**
 * Adauga un zero la inceput daca numarul are o singura cifra.
 * Util pentru afisarea timpului
 * @param {number} k
 * @return {string | number} k formatat
 */
function addZero(k) {
  if (k < 10) return '0' + k;
  else return k;
}

currentTime();
