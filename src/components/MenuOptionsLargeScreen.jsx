function MenuOptionsLargeScreen(props) {
  return (
    <div id="menu_options_lrg_scr">
      <ul>
        {props.options.length > 0 ? (
          props.options.map((option) => {
            return (
              <li>
                <a href={option.address}>{option.name}</a>
              </li>
            );
          })
        ) : (
          <h1>No options</h1>
        )}
      </ul>
    </div>
  );
}

export default MenuOptionsLargeScreen;
