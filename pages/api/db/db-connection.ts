import mongoose from "mongoose";

let cachedDB: any = null;

export const connectDB = (): void => {
  if (cachedDB) {
    return cachedDB;
  }

  const pw = "M5Fq3mksr6Zd2PHH";
  const dbName = "nomurica";

  const connString = `mongodb+srv://nate:${pw}@cluster0.es9vt.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose.connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  cachedDB = mongoose.connection;

  cachedDB.on("error", console.error.bind(console, "connection error:"));
  cachedDB.once("open", function () {
    console.log("Connected to MongoDB!");
  });
};
