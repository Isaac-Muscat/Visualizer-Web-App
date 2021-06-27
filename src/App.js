import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <Link className="nav-page-link" to="/">Home</Link> | 
            <Link className="nav-page-link" to="/sorting-visualizer"> Sorting Visualizer</Link> | 
            <Link className="nav-page-link" to="/pathfinding-visualizer"> Pathfinding Visualizer</Link>
          </nav>

          <Switch>
            <Route path="/sorting-visualizer">
              <SortingVisualizer />
            </Route>
            <Route path="/pathfinding-visualizer">
            <h1>PathfindingVisualizer</h1>
            </Route>
            <Route path="/">
              <h1>Home</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
