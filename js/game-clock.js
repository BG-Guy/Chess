var gTimeWhite;
var gIntervalWhite;
var gMinutes = 10

var gTimeBlack;
var gIntervalBlack;

function timeStart(gWhiteTurn) {
  if (gWhiteTurn) {
    clearInterval(gIntervalBlack);
    gIntervalWhite = setInterval(() => {
      gTimeWhite -= 0.1;
      formatTime(gWhiteTurn);
      
    }, 100);
  }

  if (!gWhiteTurn) {
    clearInterval(gIntervalWhite);
    gIntervalBlack = setInterval(() => {
      gTimeBlack -= 0.1;
      formatTime(gWhiteTurn);
      if (gTimeBlack === 0) {
          
      }
    }, 100);
  }
}

function setTime(gMinutes) {
  gTimeWhite = gMinutes * 60;
  gTimeBlack = gMinutes * 60;
  if (gMinutes < 10) {
    elGameTimeBlack.innerHTML = `0${gMinutes}:00`;
    elGameTimeWhite.innerHTML = `0${gMinutes}:00`;
  } else {
    elGameTimeBlack.innerHTML = `${gMinutes}:00`;
    elGameTimeWhite.innerHTML = `${gMinutes}:00`;
  }
}

function formatTime(gWhiteTurn) {
  var minutesBlack = Math.floor(gTimeBlack / 60);
  var minutesWhite = Math.floor(gTimeWhite / 60);
  var secondsWhite = Math.floor(gTimeWhite % 60);
  var secondsBlack = Math.floor(gTimeBlack % 60);

  if (!gWhiteTurn) return renderTimeBlack(minutesBlack, secondsBlack);
  else return renderTimeWhite(minutesWhite, secondsWhite);
}

function renderTimeBlack(minutesBlack, secondsBlack) {
  minutesBlack =
    minutesBlack.toString().length < 2
      ? `${0}${minutesBlack}`
      : `${minutesBlack}`;
  secondsBlack =
    secondsBlack.toString().length < 2
      ? `${0}${secondsBlack}`
      : `${secondsBlack}`;

  elGameTimeBlack.innerHTML = `${minutesBlack}:${secondsBlack}`;
}

function renderTimeWhite(minutesWhite, secondsWhite) {
  minutesWhite =
    minutesWhite.length < 2
      ? `${0}${Math.floor(gTimeWhite / 60)}`
      : `${Math.floor(gTimeWhite / 60)}`;
  secondsWhite =
    secondsWhite.length < 2 ? `${0}${secondsWhite}` : `${secondsWhite}`;

  elGameTimeWhite.innerHTML = `${minutesWhite}:${secondsWhite}`;
}
