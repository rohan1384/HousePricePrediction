import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    medInc: "",
    houseAge: "",
    aveRooms: "",
    aveOccup: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/predict", {
        params: formData,
      });
      setPrediction(response.data.predictedPrice);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  return (
    <div className="container">
      <h2>🏠 House Price Prediction</h2>
      <input type="number" name="medInc" placeholder="Median Income" onChange={handleChange} />
      <input type="number" name="houseAge" placeholder="House Age" onChange={handleChange} />
      <input type="number" name="aveRooms" placeholder="Average Rooms" onChange={handleChange} />
      <input type="number" name="aveOccup" placeholder="Average Occupancy" onChange={handleChange} />
      <button onClick={handlePredict}>Predict</button>
      {prediction !== null && <h3>Predicted Price: ${prediction.toFixed(2)}</h3>}
    </div>
  );
}

export default App;
