const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    // eslint-disable-next-line max-len
    "sk_test_51NUuB8GzQVi5upvcdDYlwDSSgyimmrmDkBthfyuZuOGJiqlBagz5k4bWwE7aXenbjRkyNfRTEv9hWByaX0MYR4Sq00M9uP6dVM");

const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// Routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("payement request Received Boom for this amount >>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.clientSecret,
  });
});

// app.post("/payments/create", async (req, res) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//     });
//     res.status(201).json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Error creating payment intent:", error.message);
//     res.status(500).json({ error: "Failed to create payment intent." });
//   }
// });

// http://127.0.0.1:5001/challenge-e04e5/us-central1/api

exports.api = functions.https.onRequest(app);

// Start the server
// const PORT = 5000; // You can choose any available port
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
