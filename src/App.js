import './App.css';
import Title from "./components/Title";
import Stock from "./components/Stock";
import Portfolio from './components/Portfolio';
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";

// npx json-server ./src/data/data.json  --watch --port 3001

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Title/>
            <Stock/>
            <Portfolio/>
          </Route>
          <Route>

          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
