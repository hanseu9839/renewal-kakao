import "dotenv/config";
import "./db";
import "./models/User";
import app from "./server";

const PORT = 4040;

const handleLitening= () =>
    console.log(`Server connect on port http://loacalhost:${PORT}`);
app.listen(PORT,handleLitening);
