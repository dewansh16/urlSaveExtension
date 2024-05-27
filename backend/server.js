const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your Firebase project details
const FIREBASE_PROJECT_ID = "urlsaveextension";
const FIREBASE_API_KEY = "AIzaSyAvedjxQbIzdyECxTSdWDaU-i3vJCJp1Ko";

// Firestore URL for REST API
const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/urls`;

// Endpoint to save URL
app.post("/api/save-url", async (req, res) => {
  const { url } = req.body;
  try {
    // console.log("url = ", url);
    const response = await axios.post(
      `${FIRESTORE_URL}?key=${FIREBASE_API_KEY}`,
      {
        fields: {
          url: { stringValue: url },
          timestamp: { timestampValue: new Date().toISOString() },
        },
      }
    );
    res.status(200).json({ success: true, id: response.data.name });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to retrieve saved URLs
app.get("/api/get-urls", async (req, res) => {
  try {
    const response = await axios.get(
      `${FIRESTORE_URL}?key=${FIREBASE_API_KEY}`
    );
    console.log("response = ", response);
    const urls = response.data.documents.map((doc) => ({
      id: doc.name.split("/").pop(),
      url: doc.fields.url.stringValue,
      timestamp: doc.fields.timestamp.timestampValue,
    }));
    res.status(200).json({ success: true, urls });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
