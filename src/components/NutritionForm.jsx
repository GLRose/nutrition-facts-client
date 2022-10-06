import { useState } from "react";
import "../components/nutrition-form.css";
import axios from "axios";

const NutritionForm = () => {
  const [query, setQuery] = useState('');
  const [food, setFood] = useState([]);
  const [label, setLabel] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFood([]);
    const options = {
      method: "GET",
      url: "http://localhost:8080/foods",
      params: {
        upc: query,
      },
    };

    axios
      .request(options)
      .then((response) => {
        const nutrientsCopy = JSON.parse(JSON.stringify(response.data.hints[0].food.nutrients));
        // console.log(response.data);
        setLabel(response.data.hints[0].food.label);
        for (const [key, value] of Object.entries(nutrientsCopy)) {
          // console.log(`${key}: ${value}`);
          setFood((food) => [...food, key, value.toFixed(2)]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
              <h2>K CALORIES: {food[1]}</h2>
              <h2>Grams of FAT: {food[3]}</h2>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default NutritionForm;