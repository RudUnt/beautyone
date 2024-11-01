function InputField(props) {
  return (
    <div id="input">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name= {props.name}
        type={props.input}
        placeholder={props.placeholder}
        value = {props.value}
        onChange={props.onChange}
        required
      />
    </div>
  );
}
export default InputField;
