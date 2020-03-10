import React, { useEffect, useState } from "react";
const today = new Date();
export default function CountdownTimer(props) {
  let { totalhoursleft } = props;
  let morethanADay = false;
  let additionalHours;
  let totalDays = 0;
  let finalDays = 0;
  let increaseDay = 0;
  let finalHours = 0;
  let finalMonth = 0;
  let months = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };

  //Finding days based on the hours

  totalDays = Math.floor(parseInt(totalhoursleft) / 24);
  if (totalDays + today.getDate() > months[today.getMonth() + 1]) {
    let temp = totalDays + today.getDate();
    finalMonth = today.getMonth() + 1;
    while (temp > 0) {
      temp = temp - months[finalMonth];
      if (temp <= 0) {
        finalDays = months[finalMonth] + temp;
      }
      finalMonth = finalMonth + 1;
      if (finalMonth > 12) {
        finalMonth = 1;
      }
    }
  }

  //Calcualting the day hours left

  if (parseInt(totalhoursleft) > 24) {
    additionalHours = parseInt(totalhoursleft) - 24;
    morethanADay = true;
    additionalHours = additionalHours - 24 * Math.floor(additionalHours / 24);
    if (today.getHours() + additionalHours >= 24) {
      increaseDay = increaseDay + 1;
      finalHours = Math.abs(additionalHours - (24 - today.getHours()));
    } else {
      if (additionalHours === 0) {
        //increaseDay = increaseDay + 1;
      }
      finalHours = today.getHours() + additionalHours;
    }
  } else {
    if (today.getHours() + parseInt(totalhoursleft) >= 24) {
      totalDays = 1;
      morethanADay = true;
      finalHours = parseInt(totalhoursleft) - (24 - today.getHours());
    } else {
      finalHours = today.getHours() + parseInt(totalhoursleft);
    }
  }

  //calculating the time left
  const calculateTimeLeft = () => {
    let date =
      today.getFullYear() +
      "-" +
      (finalMonth === 0 ? today.getMonth() + 1 : finalMonth) +
      "-" +
      (today.getDate() +
        (morethanADay === false
          ? 0
          : finalDays === 0
          ? totalDays + increaseDay
          : finalDays));

    let time = finalHours + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    let difference = new Date(dateTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60)
      };
      setTimeLeft(timeLeft);
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout();
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}
