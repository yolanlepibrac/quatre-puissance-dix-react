import React, { FunctionComponent } from "react";

interface Props {
  style: any;
}

const Surounded: FunctionComponent<Props> = props => {
  return (
    <div style={{ ...props.style, position: "absolute", top: 0, left: 0 }}>
      <svg viewBox="0 0 1000 1000">
        <g stroke="red" strokeWidth="10" fill="none">
          <path d="M 200 0 Q 1000 0, 1000 500 T 500 1000, T 0 500, T 700 0" />
        </g>
      </svg>
    </div>
  );
};

export default Surounded;
