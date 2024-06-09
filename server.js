import "dotenv/config";
import { app } from "./src/app.js";
import connectDb from "./src/db/index.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 6000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    throw error;
  });
