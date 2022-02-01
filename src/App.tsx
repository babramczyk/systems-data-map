import "./App.css";
import SAMPLE_DATA from "./sample-data.json";

function App() {
  return <div className="App">{JSON.stringify(SAMPLE_DATA, null, 2)}</div>;
}

export default App;
