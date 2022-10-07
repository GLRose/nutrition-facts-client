import { useState } from "react";
import "../components/nutrition-form.css";
import axios from "axios";

const NutritionForm = () => {
  const [query, setQuery] = useState(" ");
  const [food, setFood] = useState({});
  const [label, setLabel] = useState(null);
  const [serving, setServing] = useState(null);
  const [servingLabel, setServingLabel] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const options = {
    method: "GET",
    url: "http://localhost:8080/foods",
    params: {
      upc: query,
    },
  };

  const nutrientsGetRequest = (e) => {
    axios
      .request(options)
      .then((response) => {
        setLabel(response.data.hints[0].food.label);
        setServing(response.data.hints[0].food.servingSizes[0].quantity)
        setServingLabel(response.data.hints[0].food.servingSizes[0].label)
        setFood(response.data.hints[0].food.nutrients);
        console.log(response.data.hints[0].food.nutrients)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    nutrientsGetRequest();
  };
  return (
    <div className="wrapper">
      <div className="nutrition-container">
        <form action="/">
          <ul className="nutrition-item-container">
            <li className="nutrition-item nutrition-item-1">
              <h1>Nutrition Information</h1>
              <label id="nutrition-label" htmlFor="food-query">
                Search Using UPC Code . . .
              </label>
            </li>
            <li className="nutrition-item nutrition-item-2">
              <input type="text" id="food-query" placeholder="UPC Code" value={query} onChange={handleChange}></input>
            </li>
            <li className="nutrition-item nutrition-item-3">
              <input id="submit-button" type="submit" value="Search" onClick={handleClick} />
            </li>
            <li className="nutrition-item nutrition-item-4">
              <h1>UPC Code: {query}</h1>
              <h2>{label}</h2>
              <h2>Serving Size: {`${serving} ${servingLabel}s`}</h2>
              {<p>Calories: {Object.values(food)[0]}</p>}
              {<p>Fat  {Object.values(food)[1]}</p>}
              {<p>Sugar : {Object.values(food)[6]}</p>}
              {<p>Sugar Added : {Object.values(food)[7]} grams</p>}
              {<p>Protein Content : {Object.values(food)[8]} %</p>}
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default NutritionForm;