import config from "../config";

const corsOptions = {
  credentials: true,
  origin: (origin: string | undefined, callback: any) => {
    if (origin == undefined) {
      return callback(null, true);
    }

    if (config.cors.whitelist.findIndex(element => origin.match(element)) != -1) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  }
}

export default corsOptions;