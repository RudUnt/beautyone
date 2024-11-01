import { useRef, useState } from "react";

function PasswordField(props) {
  const eye = useRef(null);
  const psd = useRef(null);
  const [isEye, setIsEye] = useState(false);
  const eyeToggle = () => {
    setIsEye(!isEye);
  };

  return (
    <div id="input">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={psd}
        id={props.id}
        name = {props.name}
        type={isEye ? "text" : "password"}
        placeholder={props.placeholder}
        value = {props.value}
        onChange={props.onChange}
        required
      />
      <i
        ref={eye}
        onClick={eyeToggle}
        className={"fa-regular " + (isEye ? "fa-eye" : "fa-eye-slash")}
      ></i>
    </div>
  );
}
export default PasswordField;
