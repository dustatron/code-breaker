import Dragable from "./components/Dragable/";
import MasterCode from "./components/MasterCode";
import TurnList from "./components/TurnList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <MasterCode />
      <Dragable />
      <TurnList />
    </div>
  );
}

export default App;
