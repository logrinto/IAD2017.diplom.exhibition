import React, { useState, useEffect } from "react";
import {
  SVG,
  CalcStick,
  DrawStick,
  // DrawGrid,
  DrawOutline,
  getRandom
} from "./logo";
import { One, Two, Three, outlineDraw } from "./logo/prefs";
import "./App.css";

const OneOutlinePath = getRandom(outlineDraw);
const TwoOutlinePath = getRandom(outlineDraw);
const ThreeOutlinePath = getRandom(outlineDraw);

let OneStickStart = CalcStick(One);
let TwoStickStart = CalcStick(Two);
let ThreeStickStart = CalcStick(Three);

let OneStickEnd = CalcStick(One);
let TwoStickEnd = CalcStick(Two);
let ThreeStickEnd = CalcStick(Three);

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// start - beginning position
// e - ending position
// t - your current value (0–1)
const getTween = (start, end, t) => {
  return start + (easeInOut(t) / 1) * (end - start);
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
let skip = false;

function App() {
  const [count, setCount] = useState(0);

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change

  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = time => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setCount(prevCount => {
        const newState = (prevCount + (deltaTime * 1) / 50) % 50;

        OneStick = blend(OneStickStart, OneStickEnd, (1 / 50) * newState);
        TwoStick = blend(TwoStickStart, TwoStickEnd, (1 / 50) * newState);
        ThreeStick = blend(ThreeStickStart, ThreeStickEnd, (1 / 50) * newState);

        if (newState < prevCount) {
          if (skip) {
            skip = !skip; // no idea why it gets two times called
          } else {
            skip = !skip; // no idea why it gets two times called
            OneStickStart = OneStickEnd;
            OneStickEnd = CalcStick(One);
            TwoStickStart = TwoStickEnd;
            TwoStickEnd = CalcStick(Two);
            ThreeStickStart = ThreeStickEnd;
            ThreeStickEnd = CalcStick(Three);
          }
        }

        return newState;
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  return (
    <div className="App">
      <div className="App-bg">
        <SVG>
          {/* DrawGrid() */}
          {DrawStick(OneStick, One.color)}
          {DrawStick(TwoStick, Two.color)}
          {DrawStick(ThreeStick, Three.color)}
          {DrawOutline(OneStick, One.color, OneOutlinePath)}
          {DrawOutline(TwoStick, Two.color, TwoOutlinePath)}
          {DrawOutline(ThreeStick, Three.color, ThreeOutlinePath)}
        </SVG>
      </div>
      <div className="App-title">
        <div className="App-title--inner">
          <h1>
            D&#x200b;i&#x200b;p&#x200b;l&#x200b;o&#x200b;m&#x200b;a&#x200b;u&#x200b;s&#x200b;s&#x200b;t&#x200b;e&#x200b;l&#x200b;l&#x200b;u&#x200b;n&#x200b;g
          </h1>
        </div>
      </div>

      <div className="App-bg">
        <SVG>
          {/* DrawGrid() */}
          {DrawOutline(OneStick, One.color, OneOutlinePath)}
          {DrawOutline(TwoStick, Two.color, TwoOutlinePath)}
          {DrawOutline(ThreeStick, Three.color, ThreeOutlinePath)}
        </SVG>
      </div>

      <div className="App-text">
        <div className="App-text--inner">
          <h3>Diplomausstellung</h3>
          <p>
            HF Interaction Design
            <br />
            Schule&nbsp;für Gestaltung Zürich
          </p>
          <h3>11. 7. 2020 · 13.30­&nbsp;Uhr</h3>
          <p>Eröffnung &amp; Apéro</p>
          <h3>Ort</h3>
          <p>
            SiloSilo Halle <br />
            Limmatstrasse&nbsp;254
            <br />
            8005&nbsp;Zürich
          </p>

          <a
            rel="noopener noreferrer"
            href="https://forms.gle/U5eY7ohNSczT8S2D7"
            target="_blank"
          >
            Bitte Anmelden
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
