import './App.css';
import { BrowserRouter,Route, Switch, NavLink, Link, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Weather from './Components/Weather';
function App() {
  return (
    <>
    <Weather></Weather>
      {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar></Navbar>}></Route>
        <Route path='/' element={<Weather/>}></Route>

      </Routes>
      </BrowserRouter> */}
    </>
    
  );
}

export default App;
