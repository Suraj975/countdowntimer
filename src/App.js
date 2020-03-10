import React from "react";
import "./styles.css";
import CountdownTimer from "./components/countDownTimer";
export default function App() {
  return (
    <div className="App">
      <h1>CountDown Timer</h1>
      <CountdownTimer totalhoursleft={480} />
    </div>
  );
}
