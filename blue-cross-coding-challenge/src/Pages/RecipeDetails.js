import { useState, useEffect} from 'react';
import { useParams, } from "react-router-dom";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router'

const RecipeDetails = () => {
    const [details, setDetails] = useState([]);
    const healthInfo = ["No", "No", "No", "No"];
    const params = useParams();//The selected recipe to query for details.
    const navigate = useNavigate()

    //Query the spoonacular API to GET all details regarding the selected recipe.
    const fetchDetails = async () => {
      const resp = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=b700f5c1e3de4335996681d44b999fe1`
      );
      const data = await resp.json();
      return data;
    };

    useEffect(() => {
      let isMounted = true;
  
      fetchDetails().then((data) => {
        if (isMounted) {
          setDetails(data);
          console.log(data);
          storeHealthInfo();
        }
      });
      return () => {
        isMounted = false;
      };
    }, [params.id]);

    const storeHealthInfo = () => {
      if (details.vegan) {
        healthInfo[0] = ("Yes");
      }
      if (details.vegetarian) {
        healthInfo[1] = ("Yes");
      }
      if (details.dairyFree) {
        healthInfo[2] = ("Yes");
      }
      if(details.glutenFree) {
        healthInfo[3] = ("Yes");
      }
    }

    const goHome = () => {
      navigate('/');
      navigate(0);
    }

    return(
        <Grid container>
          <Grid item xs={6} paddingTop={5} paddingLeft={5}>
            <Button variant="contained" onClick={() => goHome()}>Home</Button>
            
            <h1>{details.title}</h1>
            <h2>Health Information:</h2>
            <h3>Vegan: {healthInfo[0]}</h3>
            <h3>Vegetarian: {healthInfo[1]}</h3>
            <h3>Dairy Free: {healthInfo[2]}</h3>
            <h3>Gluten Free: {healthInfo[3]}</h3>
          </Grid>
          <Grid item xs={6} paddingLeft={5} paddingTop={5}>
            <img src={details.image} alt={details.title} />
          </Grid>
          
          <Grid item xs={12} paddingLeft={5} paddingRight={5} paddingBottom={5}>
            <h2>Ingredients: </h2>
            {/* This is causing the appication to crash due to details being undefined
            <ul>
              {details.extendedIngredients.map(({ id, original }) => (
                <li key={id}>{original}</li>
              ))}
            </ul>
            */}
            <h2>Instructions: </h2>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </Grid>   
        </Grid>       
    )
}

export default RecipeDetails;