import Header from "./Header";
import Button from "./Button"

function Welcome() {
  return (
    <div>
      <div id="welcome">
        <Header />
        {/* <Button style = {{display: "inline"}} title="Make Up"/>
        <Button style = {{display: "inline"}} title="Cosmatics"/>
        <Button style = {{display: "inline"}}  title="Jewellary"/> */}
        <div id="greeting_bg">
          {/* <i className="fa-solid fa-ribbon"></i> */}
          <div className="greeting_definition">
            <h1>
              Welcome to <br />
              BeautyOne
            </h1>
            <p>
              Step into a world where makeup isn't just a routine but a
              transformative experience, where confidence is enhanced and
              individuality celebrated.
            </p>
          </div>
        </div>
        <div id="artist">
          <div>
            <div>Guari Untwal</div>
            <div>MakeUp Artist</div>
          </div>
        </div>
      </div>
      <br/>
    </div>
  );
}

export default Welcome;
