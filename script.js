// Get DOM elements
const alarmTimeInput = document.getElementById("alarm-time");
const alarmUI = document.getElementsByClassName("alarmUI");
const stopAlarmButton = document.getElementById("stop-alarm-btn");
const secondHand = document.getElementsByClassName("second");
const minuteHand = document.getElementsByClassName("minute");
const hourHand = document.getElementsByClassName("hour");
function updateClock() {
  const now = new Date();
  const alarmUI = document.getElementById("alarmUI");
  alarmUI.textContent = now;
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourHand = document.getElementById("hour-hand");
  const minuteHand = document.getElementById("minute-hand");
  const secondHand = document.getElementById("second-hand");

  // Calculate degrees for each hand
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  // Apply rotations to the hands
  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

function setAlarm() {
  const hour = document.getElementById("hour").value;
  const minute = document.getElementById("minute").value;
  const second = document.getElementById("second").value;
  const ampm = document.getElementById("ampm").value;
  const alarmTime = `${hour}:${minute}:${second} ${ampm}`;
  const alarmsList = document.getElementById("alarms");
  console.log();
  if (alarmTime == ":: AM" || alarmTime == ":: PM") {
    return;
  }
  const li = document.createElement("li");
  const alarmText = document.createElement("p");
  alarmText.textContent = alarmTime;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    li.remove();
  };
  li.appendChild(alarmText);
  li.appendChild(deleteButton);

  alarmsList.appendChild(li);
}

function checkAlarms() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();
  const ampm = currentHour >= 12 ? "PM" : "AM";
  const formattedHours = currentHour % 12 || 12;
  const formattedMinutes = currentMinute.toString().padStart(2, "0");
  const formattedSeconds = currentSecond.toString().padStart(2, "0");
  let currentTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

  const alarmsList = document.getElementById("alarms");
  const alarms = alarmsList.getElementsByTagName("li");

  for (const alarm of alarms) {
    let alarmTime = alarm.firstChild.textContent;
    if (alarmTime == currentTime) {
      alert("ALARM!");
      alarm.remove();
    }
  }
}
// Update the clock every second
setInterval(updateClock, 1000);
updateClock(); // Call once to prevent delay in initial rendering
// Check for alarms every second
setInterval(checkAlarms, 1000);
