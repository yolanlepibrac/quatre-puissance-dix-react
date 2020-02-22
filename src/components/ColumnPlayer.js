import React, { useEffect } from "react";
import vectorHelper from "./vectorHelper";

import gameHelper from "./gameHelper";

export default function ColumnPlayer(props) {
  return (
    <div
      id="ColumnPlayer"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "25%",
        height: "100%",
        margin: 10,
        marginTop: 20,
        padding: 5,
        backgroundColor: "white",
        boxShadow: "2px 2px 2px 1px rgba(100, 100, 100, 0.7)"
      }}
    >
      <div style={{ marginBottom: 10 }}>{props.name}</div>
      <div style={{ width: "100%", display: "flex", flexDirection: "row", marginBottom: 10 }}>
        {props.tabOfVectors &&
          props.tabOfVectors[0] &&
          gameHelper.letterArray(props.tabOfVectors[0].length).map((dimension, numero) => {
            return (
              <div key={numero} style={{ width: "100%", fontWeight: "bold" }}>
                {dimension}
              </div>
            );
          })}
      </div>
      {props.tabOfVectors &&
        props.tabOfVectors.map((vector, key) => {
          return (
            <div
              key={key}
              style={{
                backgroundColor: props.hoveredBoules.includes(key) ? props.color : "white",
                display: "flex",
                flexDirection: "row",
                height: 40
              }}
            >
              {vector.map((coordinate, key) => {
                return (
                  <div key={key} style={{ width: "100%", flexDirection: "row" }}>
                    {coordinate}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
