import InputField from "./InputField";
import PasswordField from "./PasswordField";
import Button from "./Button";
function SignIn() {
  const alignMent = {
    alignSelf: "end",
    position: "relative",
    right: "10px",
  };
  return (
    <form id="sign_in">
      <div>
        <h1>Sign In</h1>
        <div>
          <InputField
            id="email"
            input="email"
            label="E-mail"
            placeholder="E-mail"
          />
          <PasswordField id ="password" label="Password" placeholder = "Password" />
        </div>
        <Button style={alignMent} title="Sign In" />
        <div id="circle"></div>
      </div>
   </form>
  );
}
export default SignIn;
