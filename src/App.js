import Dragable from "./components/Dragable/";
import MasterCode from "./components/MasterCode";
import ColorListContext from "./context/ColorListContext";
import GameContext from "./context/GameContext";
import "./App.css";

function App() {
  return (
    <ColorListContext>
      <GameContext>
        <MasterCode />
        <Dragable />
      </GameContext>
    </ColorListContext>
  );
}

export default App;
