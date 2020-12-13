import React, { Component } from "react";
import { Context } from "./Context";
import DatGui, {
  DatBoolean,
  DatButton,
  DatColor,
  DatFolder,
  DatNumber,
  DatSelect,
  DatString,
} from "react-dat-gui";
import App from "./App";


import "react-dat-gui/dist/index.css";

/**
 * Demonstrates presets that extend the default preset (initial state)
 * as well as presets which extend the current state
 *
 * @see https://github.com/claus/react-dat-gui/pull/33
 */
class DatGUI extends Component {
  render() {
    return (
      <main className="react-dat-gui">
        <Context.Consumer>
          {([state, dispatch]) => (
            <DatGui
              data={state}
              onUpdate={(newData) =>
                dispatch({
                  type: "setState",
                  data: newData,
                })
              }
              className="react-dat-gui-relative-position"
            >
              <DatString path="string" label="String" />
              <DatNumber
                path="speed"
                label="Sluggishness"
                min={0}
                max={100}
                step={1}
              />
              <DatNumber path="speed" label="Sluggishness" />
              <DatNumber path="size" label="Size" />
              <DatBoolean path="boolean" label="Boolean" />
              <DatColor label="Color" path="color" />
            </DatGui>
          )}
        </Context.Consumer>
      </main>
    );
  }
}

export default DatGUI;
