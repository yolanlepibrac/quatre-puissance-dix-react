import React, { FunctionComponent, useState, useEffect } from "react";
import "./PickNumber.css";

interface Props {
  onChange: any;
  value: number;
}

const PickNumber: FunctionComponent<Props> = props => {
  const [classNameInput, setClassNameInput] = useState("");

  function increment() {
    if (props.value + 1 <= 10) {
      setClassNameInput(" is-increment-hide");
      setTimeout(() => {
        setClassNameInput(" is-increment-visible is-increment-hide");
        props.onChange(props.value + 1);
      }, 100);
      setTimeout(() => {
        setClassNameInput("");
      }, 200);
    }
  }

  function decrement() {
    if (props.value - 1 > 1) {
      setClassNameInput(" is-decrement-hide");
      setTimeout(() => {
        setClassNameInput(" is-decrement-hide is-decrement-visible");
        props.onChange(props.value - 1);
      }, 100);
      setTimeout(() => {
        setClassNameInput("");
      }, 200);
    }
  }

  return (
    <div className="ctrl">
      <div className="ctrl__button ctrl__button--decrement" onClick={e => decrement()}>
        -
      </div>
      <div className="ctrl__counter">
        <div className={"ctrl__counter-num" + classNameInput}>{props.value}</div>
      </div>
      <div className="ctrl__button ctrl__button--increment" onClick={e => increment()}>
        +
      </div>
    </div>
  );
};

export default PickNumber;
