import { useState } from "react";
import "../components/nutrition-form.css";
import axios from "axios";

const NutritionForm = () => {
  const [query, setQuery] = useState("apple");
  const [food, setFood] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFood([]);
    const options = {
      method: "GET",
      url: "https://nutrition-facts-glrose.herokuapp.com/foods",
      params: {
        ingr: query,
      },
    };

    axios
      .request(options)
      .then((response) => {
        const nutrientsCopy = JSON.parse(JSON.stringify(response.data.parsed[0].food.nutrients));
        console.log(response.data);
        for (const [key, value] of Object.entries(nutrientsCopy)) {
          console.log(`${key}: ${value}`);
          setFood((food) => [...food, key, value]);
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
                Search For food . . .
              </label>
            </li>
            <li className="nutrition-item nutrition-item-2">
              <input type="text" id="food-query" value={query} onChange={handleChange}></input>
            </li>
            <li className="nutrition-item nutrition-item-3">
              <input id="submit-button" type="submit" value="Search" onClick={handleClick} />
            </li>
            <li className="nutrition-item nutrition-item-4">
              <h1>{query}</h1>
              <h3>CALORIES: {food[1]}</h3>
              <h3>PROTIEN: {food[3]}</h3>
              <h3>FAT: {food[5]}</h3>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default NutritionForm;
