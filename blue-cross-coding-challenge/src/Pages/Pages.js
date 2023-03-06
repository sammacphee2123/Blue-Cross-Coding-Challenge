import { Routes, Route, useLocation } from "react-router-dom";
import Home from './Home';
import RecipeDetails from "./RecipeDetails";

const Pages = () => {
    return (
        <Routes Location={useLocation()} key={ useLocation().pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/recipe-details/:id" element={<RecipeDetails />} />
        </Routes>
    )
}

export default Pages;