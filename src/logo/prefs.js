// the green bar can just be tillt no straight
export const One = {
  minX: 1,
  maxX: 2,
  minY: 3,
  maxY: 3,
  color: "#558779" // '#00ff99',
};

export const Three = {
  minX: 0,
  maxX: 0,
  minY: 2,
  maxY: 2,
  color: "#899f95" // '#330099',
};

export const Two = {
  minX: 1,
  maxX: 1,
  minY: 1,
  maxY: 1,
  color: "#b1a455" // '#9966cc',
};

export const outlineDraw = [
  // L-shape A
  [
    ["p1", "p1l", "p2l"],
    ["p2", "p2r", "p1r"]
  ],

  // L-shape B
  [
    ["p1", "p1r", "p2r"],
    ["p2", "p2l", "p1l"]
  ],

  // D-shape A
  [
    ["p1", "p1l", "p2l", "p2"],
    ["p2r", "p1r"]
  ],

  // D-shape B
  [
    ["p1", "p1r", "p2r", "p2"],
    ["p2l", "p1l"]
  ],

  // O-shape A
  [["p1", "p1l", "p2l", "p2", "p2r", "p1r"]],

  // O-shape B
  [["p1l", "p2l", "p2", "p2r", "p1r", "p1"]],

  // O-shape C
  [["p2", "p2r", "p1r", "p1", "p1l", "p2l"]],

  // O-shape C
  [["p2r", "p1r", "p1", "p1l", "p2l", "p2"]]
];
