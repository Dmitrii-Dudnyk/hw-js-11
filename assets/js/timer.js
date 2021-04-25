class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = document.querySelector(selector);
    this.targetDate = targetDate;

    this.refs = {
      daysEl: this.selector.querySelector('[data-value="days"]'),
      hoursEl: this.selector.querySelector('[data-value="hours"]'),
      minsEl: this.selector.querySelector('[data-value="mins"]'),
      secsEl: this.selector.querySelector('[data-value="secs"]'),
    };
  }

  start() {
    this.updateTime(this.targetDate);

    const timerId = setInterval(() => {
      if (Date.now() > this.targetDate) {
        clearInterval(timerId);
        alert("Время истекло!");
        return;
      }
      this.updateTime(this.targetDate);
    }, 1000);
  }

  updateTime(date) {
    const deltaTime = date - Date.now();
    const remaningTime = this.getTimeComponents(deltaTime);
    this.updateTextContent(remaningTime);
  }

  updateTextContent({ days, hours, mins, secs }) {
    this.refs.daysEl.textContent = days;
    this.refs.hoursEl.textContent = hours;
    this.refs.minsEl.textContent = mins;
    this.refs.secsEl.textContent = secs;
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const newTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("May 18, 2021"),
});

newTimer.start();
