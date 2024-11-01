import InputField from "./InputField";
import PasswordField from "./PasswordField";
import Button from "./Button";
import SelectField from "./SelectField";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

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

  const alignMent = {

    alignSelf: "end",
    position: "relative",
    right: "10px",
  };
  const handleClick = function() {

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
        </div>
        <Button style={alignMent} title="Sign Up" onClick = {handleClick} />
        <div id="circle"></div>
      </div>
    </form>
  );
}
export default SignUp;
