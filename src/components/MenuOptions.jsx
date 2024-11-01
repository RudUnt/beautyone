import { forwardRef, useState, useEffect } from "react";

const MenuOptions = forwardRef(function MenuOptions(props, refs) {
  const { menuBack, ref } = refs;
  const data = function () {
    if (props.id === "headerOptions") {
      return props.options.length > 0 ? (
        props.options.map((option, index) => {
          return (
            <li key={index}>
              <a key={index} href={option.address}>
                {option.name}
              </a>
            </li>
          );
        })
      ) : (
        <h1>No options</h1>
      );
    } else if (props.options[1] === "state") {
      return props.options[0].states.length > 0 ? (
        props.options[0].states
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
          .map((option, index) => {
            return (
              <li
                key={index}
                ref={ref}
                id={option.iso2}
                onClick={props.handleClick}
              >
                {option.name}
              </li>
            );
          })
      ) : (
        <h1>No options</h1>
      );
    } else if (props.options[1] === "city") {
      if (Object.keys(props.options[0]).length !== 0) { //inside if condition we checking whether the object is empty or not.
        return props.options[0].districts.length > 0 ? (
          props.options[0].districts.map((option, index) => {
            return (
              <li key={index} ref={ref} onClick={props.handleClick}>
                {option.name}
              </li>
            );
          })
        ) : (
          <h1>No options</h1>
        );
      }
    } else {
      return null;
    }
  };
  return (
    <div ref={menuBack} id="menu_back" style={{ ...props.style.menuBack }}>
      <div id="menu_options" style={props.style.menuOptions}>
        <ul>{data()}</ul>
      </div>
    </div>
  );
});

export default MenuOptions;
