import MenuOptions from "./MenuOptions";
import {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

const SelectField = forwardRef(function SelectField(props, ref) {
  const [menuToggleFlag, setMenuToggleFlag] = useState(false);
  function getPosition() {
    if (width >= 1201) {
      return {
        menuBack: {
          justifyContent: "center",
          alignItems: "center",
        },
        menuOptions: {
          top: "242px",
          left: "10px",
          height: "300px",
        },
      };
    } else {
      return {
        menuBack: {
          justifyContent: "center",
          alignItems: "center",
        },
        menuOptions: {
          top: "170px",
          left: "10px",
          height: "300px",
        },
      };
    }
  }
  const menuBack = useRef(null);
  const arrow = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [position, setPosition] = useState(getPosition);
  useEffect(() => {
    setWidth(window.innerWidth);
    setPosition(getPosition());
  }, []);

  // Expose the menuToggle function to the parent
  useImperativeHandle(ref, () => ({
    menuToggle,
  }));

  function menuToggle() {
    if (!menuToggleFlag) {
      arrow.current.classList.replace("fa-angle-down","fa-angle-up");
      menuBack.current.style.display = "flex";
    } else {
      arrow.current.classList.replace("fa-angle-up","fa-angle-down");
      menuBack.current.style.display = "none";
    }
    
    setMenuToggleFlag(!menuToggleFlag);
  }
  // Close the modal if clicking outside of the modal content
  window.onclick = function (event) {
    if (event.target === menuBack.current) {
      menuToggle();
    }
  };
  return (
    <div id="select">
      <label htmlFor="select" onClick={menuToggle}>
        {props.label}
      </label>
      <div id="select_box" onClick={menuToggle}>
        {props.placeholder}
      </div>
      <i
        ref={arrow}
        onClick={menuToggle}
        className="fa-solid fa-angle-down"
      ></i>
        {/* <i class="fa-solid fa-angle-up"></i> */}
        <MenuOptions
        id="selectFieldOptions"
        ref={{ menuBack, ref }}
        options={props.options}
        style={position}
        handleClick={props.handleClick}
      />
    </div>
  );
});
export default SelectField;
