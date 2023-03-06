import { useState } from "react";
import SearchBar from "material-ui-search-bar";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ResultList from '../components/ResultList';
import Button from '@mui/material/Button'
import './Home.css';

const Home = () => {
    const cuisines = ['', 'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European',
   'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean',
    'Latin American', 'Mediterranean', 'Mexican', 'Midde Eastern', 'Nordic', 'Southern', 'Thai', 'Vietnamese'];

    const [cuisine, setCuisine] = useState(cuisines[0]);//The user input into the Filter Cuisine text field.
    const [selectedCuisine, setSelectedCuisine] = useState('');//The selection of cuisine from the filter cuisine text ield.
    const [query, setQuery] = useState('');    
    const [recipes, setRecipes] = useState(null);

    function getRecipes() {
        //Query the spoonacular API to get a list of all recipes that match user input through search bar and cuisine selection
        fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=b700f5c1e3de4335996681d44b999fe1&number=50&query=${query}&cuisine=${selectedCuisine}}`
        )
          .then((response) => response.json())
          .then(data => {
            setRecipes(data.results);
          })
          .catch(() => {
            console.log("Failed to GET recipes");
          });
    }

    const handleCancelSearch = () => {
        console.log("Cancelled");
        setRecipes(null);
        setQuery(null);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={0}>
                <Grid item xs={9} className="searchBar">
                    <SearchBar
                        value={query}
                        onChange={(newValue) => {setQuery(newValue)}}
                        onCancelSearch={handleCancelSearch}
                        onRequestSearch={getRecipes} 
                        placeholder='Search Recipes'/>
                </Grid>
                <Grid item xs={2} className="filter">
                    <Autocomplete
                        value={cuisine}
                        onChange={(event, newCuisine) => {setCuisine(newCuisine)}}
                        inputValue={selectedCuisine}
                        onInputChange={(event, newSelectedCuisine) => { setSelectedCuisine(newSelectedCuisine) }}
                        id="filter"
                        options={cuisines}
                        renderInput={(params) => <TextField {...params} label="Filter by Cuisine"/>}/>
                </Grid> 
                <Grid item xs={1} className="button">
                    <Button variant="contained" onClick={getRecipes}>Search</Button>
                </Grid>
                <Grid item xs={12} className="results">
                   {recipes && <ResultList recipes={recipes}/>}
                </Grid>
            </Grid> 
        </Box>  
    )
}

export default Home;