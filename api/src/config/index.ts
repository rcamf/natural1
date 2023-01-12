process.env.NODE_ENV = process.env.SETUP_NODE_ENV || "development";

const configObject = {
	setup: {
		apiPrefix: process.env.SETUP_API_PREFIX,
		jwtSecret: process.env.SETUP_JWT_SECRET,
		port: parseInt(process.env.SETUP_PORT, 10),
		nodeENV: process.env.NODE_ENV
	},
	cors: {
		whitelist: process.env.CORS_WHITELIST?.split(",")
	},
	logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
	mongo: {
		mongoURI: process.env.MONGO_URI,
		mongoDbName: process.env.MONGO_DB_NAME,
		mongoUser: process.env.MONGO_USER,
		mongoPassword: process.env.MONGO_PASSWORD
	}
}

export default configObject;