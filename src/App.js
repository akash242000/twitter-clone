import './App.css';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';

function App() {

  return (
    <div className="main-container">
      <div className="container">

              <Sidebar/>
              <Home/>
              <Widgets/>

      </div>
    </div>
  );
}

export default App;
