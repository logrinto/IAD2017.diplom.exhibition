import React from "react";

const GRID_X = 4;
const GRID_Y = 4;

const pathExtendedWidth = 0.24;
const PATHWIDTH = (pathExtendedWidth / 2) * Math.sqrt(2);

const SIZE = 250;
const MEDIA = 200;

// <rect
//   width={MEDIA}
//   height={MEDIA}
//   style={{ fill: "rgb(255,255,255)", strokeWidth: 0 }}
// />

export const SVG = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xlinkHref="http://www.w3.org/1999/xlink"
    preserveAspectRatio="xMinYMin slice"
    version="1.1"
    viewBox={`0 0 ${MEDIA} ${MEDIA * 3}`}
    width={MEDIA}
    height={MEDIA * 3}
  >
    <g transform={`translate(${(MEDIA - SIZE) / 2},${(MEDIA - SIZE) / 2})`}>
      {children}
    </g>
  </svg>
);

// http://stackoverflow.com/questions/24376951/find-new-coordinates-of-point-on-line
// http://jsfiddle.net/3SY8v/
export const shortenLine = (start, end, smallerLen) => {
  // Determine line lengths
  var xlen = end.x - start.x;
  var ylen = end.y - start.y;

  // Determine hypotenuse length
  var hlen = Math.sqrt(Math.pow(xlen, 2) + Math.pow(ylen, 2));

  // Determine the ratio between they shortened value and the full hypotenuse.
  var ratio = smallerLen / hlen;

  var smallerXLen = xlen * ratio;
  var smallerYLen = ylen * ratio;

  return {
    start: {
      // The new point is the starting plus the smaller length.
      x: start.x + smallerXLen,
      y: start.y + smallerYLen
    },
    end: {
      x: end.x - smallerXLen,
      y: end.y - smallerYLen
    }
  };
};

// http://stackoverflow.com/questions/17989148/javascript-find-point-on-perpendicular-line-always-the-same-distance-away
// http://jsfiddle.net/92jWG/6/
export const expandLine = (x1, y1, x2, y2, dist) => {
  var angle = Math.atan2(y2 - y1, x2 - x1);

  // Draw a normal to the line above
  return [
    {
      x: Math.sin(angle) * dist + x1,
      y: -Math.cos(angle) * dist + y1
    },

    {
      x: -Math.sin(angle) * dist + x1,
      y: Math.cos(angle) * dist + y1
    }
  ];
};

/*

         ┌ ─ ─ ┐
            P1
         │  ◎  │    ▲
          ─ ┼ ─     │
            │       │70
            │P1C    ▼
P1R ◎─ ─ ─ ─◎─ ─ ─ ─◎ P1L
    │       │       │
    │       │       │
    │       │       │
    │       │       │
    │◀─────▶│◀─────▶│
    │  70   │  70   │
    │       │       │
    │       │       │
    │       │       │
    │       │       │
    │       │       │
P2R ◎─ ─ ─ ─◎─ ─ ─ ─◎ P2L
            │P2C
            │
            │
         ┌ ─│─ ┐
            ◎
         │  P2 │
          ─ ─ ─

*/
export const calcStickOutLine = (p1, p2) => {
  let shortLine = shortenLine(p1, p2, pathExtendedWidth / 2);

  var topPoints = expandLine(
    shortLine.start.x,
    shortLine.start.y,
    shortLine.end.x,
    shortLine.end.y,
    pathExtendedWidth / 2
  );

  var p1r = topPoints[1];
  var p1l = topPoints[0];

  var bottomPoints = expandLine(
    shortLine.end.x,
    shortLine.end.y,
    shortLine.start.x,
    shortLine.start.y,
    pathExtendedWidth / 2
  );
  var p2r = bottomPoints[0];
  var p2l = bottomPoints[1];

  return {
    p1: p1,
    p2: p2,
    p1c: shortLine.start,
    p2c: shortLine.end,
    p1r: p1r,
    p1l: p1l,
    p2r: p2r,
    p2l: p2l
  };
};

export const DrawGrid = () => {
  let circles = [];

  for (var x = 0; x < GRID_X; x++) {
    for (var y = 0; y < GRID_Y; y++) {
      circles.push(
        <circle
          cx={(SIZE / (GRID_X - 1)) * x}
          cy={(SIZE / (GRID_Y - 1)) * y}
          r={0.05 * SIZE}
          stroke="none"
          fill="#555"
        />
      );
    }
  }

  return circles;
};

export const DrawStick = (prefs, color) => {
  const { start, end } = prefs;
  return (
    <path
      fill="none"
      stroke={color}
      strokeWidth={PATHWIDTH * SIZE}
      d={`M ${start.x * SIZE},${start.y * SIZE} L ${end.x * SIZE},${end.y *
        SIZE}`}
    />
  );
};

export const getRandom = list => {
  return list[Math.floor(Math.random() * list.length)];
};

export const DrawOutline = (prefs, color, drawPaths) => {
  const outline = calcStickOutLine(prefs.start, prefs.end);

  var points = [];

  for (var i = 0; i < drawPaths.length; i++) {
    var drawPoints = drawPaths[i];

    for (var pointIndex = 0; pointIndex < drawPoints.length; pointIndex++) {
      points.push(outline[drawPoints[pointIndex]]);
    }
  }

  let d = points
    .map(
      (item, index) =>
        `${index === 0 ? "M" : "L"} ${item.x * SIZE},${item.y * SIZE}`
    )
    .join(" ");

  return (
    <path
      strokeLinecap="square"
      strokeMiterlimit={10}
      stroke={color}
      strokeWidth={(pathExtendedWidth / 2) * SIZE}
      fill="none"
      d={d}
    />
  );
};

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const CalcStick = prefs => {
  const { minX, maxX, minY, maxY } = prefs;

  const width = randomBetween(minX, maxX);
  const height = randomBetween(minY, maxY);

  const xOffset = randomBetween(0, GRID_X - width - 1);
  const yOffset = randomBetween(0, GRID_Y - height - 1);

  const clockwise = Math.random() >= 0.5;

  if (clockwise) {
    return {
      start: {
        x: (1 / (GRID_X - 1)) * xOffset,
        y: (1 / (GRID_Y - 1)) * yOffset
      },
      end: {
        x: (1 / (GRID_X - 1)) * (xOffset + width),
        y: (1 / (GRID_Y - 1)) * (yOffset + height)
      }
    };
  } else {
    return {
      start: {
        x: (1 / (GRID_X - 1)) * (xOffset + width),
        y: (1 / (GRID_Y - 1)) * yOffset
      },
      end: {
        x: (1 / (GRID_X - 1)) * xOffset,
        y: (1 / (GRID_Y - 1)) * (yOffset + height)
      }
    };
  }
};
