const hourHand = document.querySelector(".hour-hand");
const minHand = document.querySelector(".minute-hand");
const secHand = document.querySelector(".second-hand");
const body = document.getElementsByTagName("body")[0];
const btn = document.querySelector(".btn");

const rotateValue = {
  sec: 6,
  min: 6,
  hr: 30,
};

function setRotation(value, angle, hand) {
  hand.style.setProperty("--rotation", value * angle + "deg");
}

function setTimeRotation(s, m, h) {
  setRotation(s, rotateValue.sec, secHand);
  setRotation(m, rotateValue.min, minHand);
  setRotation(h, rotateValue.hr, hourHand);
}

function setTheme(ele, hour) {
  if (hour >= 18 || hour <= 6) {
    ele.style.background = "var(--bg-night)";
    ele.style.color = "var(--clr-primary-night)";
    hourHand.style.backgroundColor = "var(--clr-primary-night)";
    minHand.style.backgroundColor = "var(--clr-primary-night)";
    secHand.style.backgroundColor = "var(--clr-primary-night)";
  } else {
    ele.style.background = "var(--bg-day)";
    ele.style.color = "var(--clr-primary-day)";
    hourHand.style.backgroundColor = "var(--clr-primary-day)";
    minHand.style.backgroundColor = "var(--clr-primary-day)";
    secHand.style.backgroundColor = "var(--clr-primary-day)";
  }
}

function setTime() {
  const date = new Date();

  let second = date.getSeconds();
  let minute = date.getMinutes();
  let hours = date.getHours();

  let minuteRatio;
  let secondRatio;
  let hourRatio;

  setInterval(() => {
    secondRatio = second % 60;

    if (second / 60 === 1) {
      minuteRatio = minute + 1;
      minute += 1;
      second = 0;
    } else {
      minuteRatio = minute + second / 60;
    }

    if (minuteRatio / 60 === 1) {
      hourRatio = hours + 1;
      hours += 1;
      minute = 0;
    } else {
      hourRatio = hours + minuteRatio / 60;
    }

    if (hourRatio / 24 === 0) {
      hour = 0;
    }

    console.log(secondRatio, minuteRatio, hourRatio);

    setTimeRotation(secondRatio, minuteRatio, hourRatio);

    setTheme(body, hours);

    second++;
  }, 1000);
}

btn.addEventListener("click", setTime);
