const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

// 🔥 IMPORTANT: Load DB pool ONCE
require("./db");

const app = express();

/* ✅ ENABLE CORS */
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

/* ✅ Handle JSON */
app.use(express.json());

/* ✅ GraphQL Route */
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (err) => {
      console.error("❌ GraphQL Error:", err.message);
      return {
        message: err.message,
        status: err.status || 500,
      };
    },
  })
);

app.listen(4000, () => {
  console.log("🚀 GraphQL Server running on http://localhost:4000/graphql");
});
