import InputField from "./InputField";
import PasswordField from "./PasswordField";
import Button from "./Button";
import SelectField from "./SelectField";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import DialogBox from "./DialogBox";

// Component SignUp
function SignUp() {
  const url = process.env.REACT_APP_IN_STATES_URL;
  const [statesDetails, setStatesDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [cityLoading, setCityLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [districtDetails, setDistrictDetails] = useState({});
  const state = useRef(null);
  const district = useRef(null);
  const [stateValue, setStateValue] = useState("Select State");
  const [districtValue, setDistrictValue] = useState("Select District");
  const [userDetails, setUserDetails] = useState({fullName: "",
    email: "",
    mobile: "",
    state: "",
    district: "",
    password: "",
    confirmPassword: "",});
  const passwordChecker = useRef(null);
  const [dialogBox, setDialogBox] = useState({});

  // fetch details of states of India
  useEffect(() => {
    async function fetchStateDetails() {
      await axios
        .get(`${url}/states`)
        .then((response) => {
          setStatesDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setErr(error); // Handle any errors
          setLoading(false);
        });
    }
    fetchStateDetails();
  },[]);

  // fetching details of district depends on selected state
  const fetchDistrictDetails = async function (event) {
    event.preventDefault();
    setStateValue(event.target.innerText);
    setUserDetails((prev) => ({ ...prev, ["state"]: event.target.innerText }));
    if (state.current) {
      state.current.menuToggle(); //calling function which defined inside SelectField Component by using useImperativeHandle Hook
    }
    await axios
      .get(`${url}/districts/:${event.target.id}`)
      .then((response) => {

        setDistrictDetails(response.data);
        setCityLoading(false);
      })
      .catch((error) => {

        setErr(error); // Handle any errors
        setCityLoading(false);
      });
    setDistrictValue("Select District");
  };

  const setDistrict = function (event) {

    setDistrictValue(event.target.innerText);
    setUserDetails((prev) => ({ ...prev, ["district"]: event.target.innerText }));
    if (district.current) {

      district.current.menuToggle(); //calling function which defined inside SelectField Component by using useImperativeHandle Hook
    }
  };

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validateMobile(mobile) {
    const regex = /^\d{10}$/;
    return regex.test(mobile);
  }
  
  const alignMent = {

    alignSelf: "end",
    position: "relative",
    right: "10px",
  };
  const handleClick = function() {

    if(userDetails.fullName === "") {

      const dialogBox = document.getElementById("dialogBox");
      setDialogBox({
        type: "name",
        title: "Name is empty",
        definition: "Please fill your name",
        buttonTitle: "OK",
      })
      dialogBox.style.display = "block";
    }else if(userDetails.email === "") {
      
      const dialogBox = document.getElementById("dialogBox");
      setDialogBox({
        type: "email",
        title: "E-mail is empty",
        definition: "Please fill your email",
        buttonTitle: "OK",
      })
      dialogBox.style.display = "block";
    }else if(!validateEmail(userDetails.email)) {
      
      const dialogBox = document.getElementById("dialogBox");
      setDialogBox({
        type: "email",
        title: "E-mail is invalid",
        definition: "Please enter valid email",
        buttonTitle: "OK",
      })
      dialogBox.style.display = "block";
    }else if(userDetails.mobile === "") {
      
      const dialogBox = document.getElementById("dialogBox");
      setDialogBox({
        type: "mobile",
        title: "Mobile number is empty",
        definition: "Please fill your mobile number",
        buttonTitle: "OK",
      })
      dialogBox.style.display = "block";
    }else if(!validateMobile(userDetails.mobile)) {
      
      const dialogBox = document.getElementById("dialogBox");
      setDialogBox({
        type: "mobile",
        title: "Mobile number is invalid",
        definition: "Please enter valid mobile number",
        buttonTitle: "OK",
      })
      dialogBox.style.display = "block";
    }else if(userDetails.state === "") {
      
      const dialogBox = document.getElementById("dialogBox");
      setDialogBox({
        type: "state",
        title: "State is empty",
        definition: "Please select your state",
        buttonTitle: "OK",
      })
      dialogBox.style.display = "block";
    }else if(userDetails.district === "") {
      
      const dialogBox = document.getElementById("dialogBox");
      setDialogBox({
        type: "district",
        title: "District is empty",
        definition: "Please select your district",
        buttonTitle: "OK",
      })
      dialogBox.style.display = "block";
    }else if(userDetails.password === "") {
      
      const dialogBox = document.getElementById("dialogBox");
      setDialogBox({
        type: "password",
        title: "Password is empty",
        definition: "Please fill your password",
        buttonTitle: "OK",
      })
      dialogBox.style.display = "block";
    }else if(userDetails.email === "") {
      
      const dialogBox = document.getElementById("dialogBox");
      setDialogBox({
        type: "confirmPassword",
        title: "Confirm Password is empty",
        definition: "Please fill your comfirm password",
        buttonTitle: "OK",
      })
      dialogBox.style.display = "block";
    }
    const userJson = JSON.stringify(userDetails);
    console.log(userJson);
  }

  // Log initial state
  // useEffect(() => {

  //   console.log("Initial userDetails:", userDetails);
  // }, [userDetails, stateValue]);

  const handleChange = (event) => {

    const { name, value } = event.target;
    if(!(name === "state") && !(name === "district")) {

      setUserDetails((prev) => ({ ...prev, [name]: value }));
    }
    if(name === "confirmPassword") {

      if(!(value === userDetails.password)) {

        passwordChecker.current.style.display = "block";
      }else {

        passwordChecker.current.style.display = "none";
      }
    }
    event.preventDefault();
  };

  if (loading) return <Loader />;
  if (err) return <h1>Tech issue...</h1>;

  return (
      <form id="sign_in" >
      <div style={{ margin: "100px 0 10px 0" }}>
        <h1>Sign Up</h1>
        <div>
          <InputField
            id="fullname"
            name = "fullName"
            input="text"
            label="Full Name"
            placeholder="Full Name"
            value = {userDetails.fullName}
            onChange = {handleChange}
          />
          <InputField
            id="email"
            name = "email"
            input="email"
            label="E-mail"
            placeholder="E-mail"
            value = {userDetails.email}
            onChange = {handleChange}
          />
          <InputField
            id="mobileNumber"
            name = "mobile"
            input="phone"
            label="Mobile Number"
            placeholder="Mobile Number"
            value = {userDetails.mobile}
            onChange = {handleChange}
          />
          <SelectField
            label="State"
            name = "state"
            placeholder={stateValue}
            ref={state}
            options={[statesDetails, "state"]}
            handleClick={fetchDistrictDetails}
            value = {userDetails.state}
            onChange = {handleChange}
          />
          {stateValue != "Select State" && (
            <SelectField
              label="District"
              name = "district"
              placeholder={!cityLoading ? districtValue : "Loading..."}
              ref={district}
              options={[districtDetails, "city"]}
              handleClick={setDistrict}
              value = {userDetails.district}
              onChange = {handleChange}
            />
          )}
          <PasswordField
            id="password"
            name = "password"
            label="Password"
            placeholder="Password"
            value = {userDetails.password}
            onChange = {handleChange}
          />
          <PasswordField
            id="confirmpassword"
            name = "confirmPassword"
            placeholder="Confirm Password"
            label="Confirm Password"
            value = {userDetails.confirmPassword}
            onChange = {handleChange}
          />
          <p id = "passwordChecker" ref={passwordChecker}>Mismatched password</p>
        </div>
        <Button style={alignMent} title="Sign Up" onClick = {handleClick} />
        <div id="circle"></div>
        <DialogBox
          type={dialogBox.type}
          title={dialogBox.title}
          definition={dialogBox.definition}
          buttonTitle={dialogBox.buttonTitle}
        />
      </div>
    </form>
  );
}
export default SignUp;
