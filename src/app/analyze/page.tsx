"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Prediction() {
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Automatically fetch prediction when this component mounts
    axios
      .get("https://sfps7p8b-7000.asse.devtunnels.ms/")
      .then((response) => {
        console.log("Prediction Response:", JSON.stringify(response.data, null, 2));
        setPrediction(response.data);
      })
      .catch((err) => {
        if (err.response) {
          // Server responded with a status code outside the range 2xx
          console.error("Error Response:", err.response);
          setError(`Error: ${err.response.status} - ${err.response.data}`);
        } else if (err.request) {
          // The request was made but no response was received
          console.error("Error Request:", err.request);
          setError("No response received from the server.");
        } else {
          // Something else triggered the error
          console.error("Error Message:", err.message);
          setError(`Error: ${err.message}`);
        }
      });
  }, []);

  return (
    <div>
      <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src="https://sfps7p8b-7000.asse.devtunnels.ms/"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Flask App"
      />
    </div>
    </div>
  );
}
