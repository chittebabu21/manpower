import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Admin from './Admin';
import Add from './Add';
import Edit from './Edit';

function App() {
  return (
    <div className="App">
      <div className="App vh-100 d-flex align-items-center justify-content-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Login}/>
            <Route path="/login" Component={Login}/>
            <Route path="/admin" Component={Admin}/>
            <Route path="/add" Component={Add}/>
            <Route path="/edit/:employeeId" Component={Edit}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
