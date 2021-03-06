import React, { useEffect } from "react";
import vectorHelper from "./vectorHelper";
import Constantes from "./Constantes";
import "./ColumnPlayer.css";

import gameHelper from "./gameHelper";
import { constants } from "buffer";

export default function ColumnPlayer(props) {
  return (
    <div id="ColumnPlayer">
      <div
        id="ColumnPlayer_top"
        style={{
          marginBottom: 10,
          backgroundColor: props.playerIs1 ? Constantes.colorPlayer1 : Constantes.colorPlayer2,
          borderWidth: 0,
          borderBottomWidth: 5,
          borderStyle: "solid",
          borderColor: "white",
          position: "relative",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              height: 20,
              position: "relative"
            }}
          >
            <div
              style={{
                height: 40,
                position: "relative",
                top: 0,
                left: 0,
                zIndex: 3
              }}
            >
              {props.name}
            </div>

            <div
              style={{
                height: 10,
                backgroundColor: props.playerIsMe ? Constantes.colorApp1 : "rgba(0,0,0,0)",
                position: "absolute",
                top: 10,
                left: 0,
                width: "100%",
                zIndex: 2
              }}
            ></div>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "row", marginBottom: 10, minHeight: 20 }}>
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
      <div style={{ overflow: "auto" }}>
        {props.tabOfVectors &&
          props.tabOfVectors.map((vector, key) => {
            return (
              <div
                key={key}
                style={{
                  backgroundColor: props.hoveredBoules.includes(key) ? props.color : "white",
                  display: "flex",
                  flexDirection: "row",
                  minHeight: 30
                }}
              >
                {vector.map((coordinate, key) => {
                  return (
                    <div
                      key={key}
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        color:
                          props.game.finish && vectorHelper.vectorContain(props.game.vectorsWinner, vector)
                            ? Constantes.colorApp1
                            : "black"
                      }}
                    >
                      {parseInt(coordinate, 10) + 1}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
