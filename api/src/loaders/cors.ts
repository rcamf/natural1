import config from "../config";

const corsOptions = {
  credentials: true,
  origin: (origin: any, callback: any) => {
    if (config.cors.whitelist.includes(origin)) {
      return callback(null, true);
    }

    if (origin == undefined) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  }
}

export default corsOptions;