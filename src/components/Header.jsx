import { useRef } from "react";
import logo from "../assets/BeautyOne.gif";
import MenuOptions from "./MenuOptions";
import MenuOptionsLargeScreen from "./MenuOptionsLargeScreen";

function Header() {
  const menuOptionsProps = [
    {
      name: "Sign In",
      address: "/signin",
    },
    {
      name: "Sing Up",
      address: "/signup",
    },
    {
      name: "About",
      address: "/about",
    },

    {
      name: "Contact",
      address: "/Contact",
    },
  ];
  const position = {
    menuOptions: {
      right: "30px",
      top: "70px",
    },
  };
  const menuBack = useRef(null);
  let menuToggleFlag = false;
  function menuToggle() {
    menuToggleFlag = !menuToggleFlag;
    console.log(menuBack.current);
    menuToggleFlag
      ? (menuBack.current.style.display = "flex")
      : (menuBack.current.style.display = "none");
  }
  // Close the modal if clicking outside of the modal content
  window.onclick = function (event) {
    if (event.target === menuBack.current) {
      menuToggle();
    }
  };
  return (
    <div id="header">
      <div id="logo">
        <img src={logo} alt="" />
      </div>
      <div id="menu">
        <i onClick={menuToggle} className="fa-solid fa-ellipsis-vertical"></i>
        <MenuOptions
        id="headerOptions"
          ref={{menuBack}}
          options={menuOptionsProps}
          style={position}
        />
        <MenuOptionsLargeScreen options={menuOptionsProps} />
      </div>
    </div>
  );
}

export default Header;
