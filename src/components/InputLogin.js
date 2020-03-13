import React from "react";
import { render } from "react-dom";
import { TransitionMotion, spring } from "react-motion";
import "./InputLogin.css";

export default class InputLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      active: (props.locked && props.active) || false,
      error: props.error || "",
      label: props.label || "Label"
    };
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  }

  toggleVisibility = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    const { active, error, label } = this.state;
    const { predicted, locked } = this.props;
    const fieldClassName = `field ${(locked ? active : active) && "active"} ${locked && !active && "locked"}`;

    return (
      <div className={fieldClassName}>
        {active && this.props.value && predicted && predicted.includes(this.props.value) && (
          <p className="predicted">{predicted}</p>
        )}
        {this.props.visibilityActive && (
          <div id="InputLogin_toggleVisibility" onClick={() => this.toggleVisibility()}>
            {!this.state.visible ? (
              <img src={require("../assets/oeilouvert.png")} width="30" className="InputLogin_imageVisibility" />
            ) : (
              <img src={require("../assets/oeilferme.png")} width="30" />
            )}
          </div>
        )}
        <input
          id={1}
          type={this.props.visibilityActive && !this.state.visible ? "password" : "text"}
          value={this.props.value}
          placeholder={label}
          onChange={e => this.props.onChange(e.target.value)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}
