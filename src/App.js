import React, { useState, useEffect, useRef } from "react";
import {
  BG,
  SVG,
  CalcStick,
  DrawStick,
  DrawGrid,
  DrawOutline,
  getRandom
} from "./logo";
import { One, Two, Three, outlineDraw } from "./logo/prefs";
import { useInterval } from "./util/useInterval";
import "./App.css";

function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = deepCopy(obj[key]);
      return newObj;
    }, {});
  }
}

const OneOutlinePath = getRandom(outlineDraw);
const TwoOutlinePath = getRandom(outlineDraw);
const ThreeOutlinePath = getRandom(outlineDraw);

let OneStickStart = CalcStick(One);
let TwoStickStart = CalcStick(Two);
let ThreeStickStart = CalcStick(Three);

let OneStickEnd = CalcStick(One);
let TwoStickEnd = CalcStick(Two);
let ThreeStickEnd = CalcStick(Three);

// start - beginning position
// e - ending position
// f - your current value (0–1)
const getTween = (start, end, f) => {
  return start + (f / 1) * (end - start);
};

const blend = (start, end, f) => {
  return {
    start: {
      x: getTween(start.start.x, end.start.x, f),
      y: getTween(start.start.y, end.start.y, f)
    },
    end: {
      x: getTween(start.end.x, end.end.x, f),
      y: getTween(start.end.y, end.end.y, f)
    }
  };
};

let OneStick = blend(OneStickStart, OneStickEnd, 0);
let TwoStick = blend(TwoStickStart, TwoStickEnd, 0);
let ThreeStick = blend(ThreeStickStart, ThreeStickEnd, 0);

function App() {
  let [count, setCount] = useState(0);

  useInterval(() => {
    // OneStick = blend(allOneStick[0], allOneStick[1], count);
    // TwoStick = blend(allTwoStick[0], allTwoStick[1], count);
    // ThreeStick = blend(allThreeStick[0], allThreeStick[1], count);
    // Your custom logic here
    OneStick = blend(OneStickStart, OneStickEnd, count);
    TwoStick = blend(TwoStickStart, TwoStickEnd, count);
    ThreeStick = blend(ThreeStickStart, ThreeStickEnd, count);

    if (count >= 1) {
      // allOneStick = [allOneStick[0], CalcStick(One)];
      // allTwoStick = [allTwoStick[0], CalcStick(Two)];
      // allThreeStick = [allThreeStick[0], CalcStick(Three)];

      // OneStickStart = OneStickEnd;
      // TwoStickStart = TwoStickEnd;
      // ThreeStickStart = ThreeStickEnd;

      // OneStickEnd = CalcStick(One);
      // TwoStickEnd = CalcStick(Two);
      // ThreeStickEnd = CalcStick(Three);

      // OneStickStart = CalcStick(One);
      // TwoStickStart = CalcStick(Two);
      // ThreeStickStart = CalcStick(Three);

      // OneStickEnd = deepCopy(OneStickStart);
      OneStickStart = OneStickEnd;
      OneStickEnd = CalcStick(One);

      TwoStickStart = TwoStickEnd;
      TwoStickEnd = CalcStick(Two);

      ThreeStickStart = ThreeStickEnd;
      ThreeStickEnd = CalcStick(Three);
      // deepCopy(OneStickEnd);
      // OneStickEnd = CalcStick(One);
      setCount(0);
    } else {
      setCount(count + 1 / 2 / 60);
    }
  }, 1000 / 60);

  // useInterval(() => {
  //   // Your custom logic here
  //   setCount(count + 1);
  // }, 500);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <SVG>
          {DrawGrid()}
          {DrawStick(OneStick, One.color)}
          {DrawStick(TwoStick, Two.color)}
          {DrawStick(ThreeStick, Three.color)}
          {DrawOutline(OneStick, One.color, OneOutlinePath)}
          {DrawOutline(TwoStick, Two.color, TwoOutlinePath)}
          {DrawOutline(ThreeStick, Three.color, ThreeOutlinePath)}
        </SVG>
      </header>
    </div>
  );
}

export default App;
