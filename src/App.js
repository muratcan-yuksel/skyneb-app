import "./style/app.css";
import SecondPart from "./components/SecondPart";
import FirstPart from "./components/firstPart";
import ThirdPart from "./components/thirdPart";
import LastPart from "./components/lastPart";

function App() {
  return (
    <div className="App">
      <div className="splitScreen">
        <div className="topPane">
          <FirstPart />
        </div>
        <div className="secondPane">
          <SecondPart />
        </div>
        <div className="middlePane">
          <LastPart />
          <ThirdPart />
        </div>
      </div>
    </div>
  );
}

export default App;
