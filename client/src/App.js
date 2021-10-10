import './App.css';

import { Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.page';
import AddHabitPage from './pages/add-habit-page/AddHabit.page';

import history from './history.js';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add-habit" component={AddHabitPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
