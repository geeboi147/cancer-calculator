import React, { useState } from "react";

const CancerForm = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    address: "",
    country: "",
    state: "",
    zone: "",
    age: "",
    breast: "",
    quadrant: "",
    tumorSize: "",
    invasiveNodes: "",
    history: "",
    menopause: "",
  });

  const [predictionResult, setPredictionResult] = useState(null); // For storing prediction result

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const data = {
      age: formData.age,
      tumorSize:
        formData.tumorSize === "small"
          ? 1
          : formData.tumorSize === "medium"
          ? 2
          : 3,
      invasiveNodes:
        formData.invasiveNodes === "none"
          ? 0
          : formData.invasiveNodes === "low"
          ? 1
          : formData.invasiveNodes === "moderate"
          ? 2
          : 3,
      breast: formData.breast === "left" ? 0 : 1, // Convert 'left' to 0, 'right' to 1
      quadrant: formData.quadrant, // Send quadrant as a string value like 'upper_inner'
      history: formData.history === "no" ? 0 : 1, // Convert 'no' to 0, 'yes' to 1
      menopause: formData.menopause === "no" ? 0 : 1, // Convert 'no' to 0, 'yes' to 1
    };

    // Send the POST request to backend
    fetch("https://cancer-calculator-backend.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send the form data as JSON
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Prediction Result:", result);

        // Handle the result
        const prediction = result.prediction === 1 ? "Positive" : "Negative";
        const probability = result.probability[0];

        // Format the probability for each class (if your model has two classes)
        const positiveProbability = probability[1].toFixed(2);
        const negativeProbability = probability[0].toFixed(2);

        // Set the prediction result state
        setPredictionResult({
          prediction,
          positiveProbability,
          negativeProbability,
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        alert("Error submitting data. Please try again.");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Cancer Calculator Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient ID */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block font-medium">Patient ID</label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Patient ID"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Name"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Address"
          />
        </div>

        {/* Country, State, Zone */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Country"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter State"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Zone</label>
            <input
              type="text"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Zone"
            />
          </div>
        </div>

        {/* Age */}
        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Age"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Breast</label>
            <select
              name="breast"
              value={formData.breast}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Quadrant</label>
            <select
              name="quadrant"
              value={formData.quadrant}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="upper_inner">Upper Inner</option>
              <option value="upper_outer">Upper Outer</option>
              <option value="lower_inner">Lower Inner</option>
              <option value="lower_outer">Lower Outer</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Tumor Size</label>
            <select
              name="tumorSize"
              value={formData.tumorSize}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="small">Small(&lt;=2cm)</option>
              <option value="medium">Medium(&gt;2cm &lt;=5cm)</option>
              <option value="large">Large(&gt;5cm)</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Invasive Nodes</label>
            <select
              name="invasiveNodes"
              value={formData.invasiveNodes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="none">None(0)</option>
              <option value="low">Low(1-3)</option>
              <option value="moderate">Moderate(4-9)</option>
              <option value="high">High(&gt;=10)</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">History</label>
            <select
              name="history"
              value={formData.history}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Menopause</label>
            <select
              name="menopause"
              value={formData.menopause}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* Display Prediction Results */}
      {predictionResult && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Prediction Results</h3>
          <p>Prediction: {predictionResult.prediction}</p>
          <p>Positive Probability: {predictionResult.positiveProbability}</p>
          <p>Negative Probability: {predictionResult.negativeProbability}</p>
        </div>
      )}
    </div>
  );
};

export default CancerForm;
