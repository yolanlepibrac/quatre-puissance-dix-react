import React, { FunctionComponent, useState, useEffect } from "react";
import "./ModalNewGame.css";

interface Props {
  setModalRules: any;
}

const ModalRules: FunctionComponent<Props> = props => {
  return (
    <div>
      <div id="modalNewGame">
        <div onClick={() => props.setModalRules(false)} id="modalNewGame_whiteBackground"></div>
      </div>
    </div>
  );
};

export default ModalRules;
