import Header from "./Header";

function Welcome() {
  return (
    <div>
      <div id="welcome">
        <Header />
        <div id="greeting_bg">
          <div className="greeting_definition">
            <i className="fa-solid fa-ribbon"></i>
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
    </div>
  );
}

export default Welcome;
