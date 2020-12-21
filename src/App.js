import Dragable from "./components/Dragable/";
import ColorListContext from "./context/ColorListContext";
import "./App.css";

function App() {
  return (
    <ColorListContext>
      <Dragable />
    </ColorListContext>
  );
}

export default App;
