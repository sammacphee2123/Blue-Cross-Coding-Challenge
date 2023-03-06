/*This is a  small responsive website application that allows you to search for recipes using the spoonacular API.
Author: Samuel MacPhee*/

import './App.css';
import { BrowserRouter } from "react-router-dom";
import Header from './components/Header';
import Pages from './Pages/Pages';


const App = () => {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header/>
      <Pages/>
    </BrowserRouter>  
  );
}

export default App;
