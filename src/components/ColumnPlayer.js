import React, { useEffect } from "react";
import vectorHelper from "./vectorHelper";

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
      <div style={{ marginBottom: 20 }}>{props.name}</div>
      {props.tabOfVectors &&
        props.tabOfVectors.map((vector, key) => {
          return (
            <div
              key={key}
              style={{
                backgroundColor: vectorHelper.vectorContain(
                  props.hoveredBoules,
                  vector
                )
                  ? props.color
                  : "white",
                display: "flex",
                flexDirection: "row",
                height: 40
              }}
            >
              {vector.map((coordinate, key) => {
                return (
                  <div
                    key={key}
                    style={{ width: "100%", flexDirection: "row" }}
                  >
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
