function Button(props) {
  
  return <div id="button" style={props.style} onClick={props.onClick}>{props.title}</div>;
}
export default Button;
