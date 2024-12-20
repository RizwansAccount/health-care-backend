export const env = {
	nodeEnv: process.env.NODE_ENV || "development",
	mongodbUri: process.env.DB_URI || "mongodb://127.0.0.1:27017/health-care",
	jwtSecret: process.env.JWT_SECRET || "my_temporary_secret",
};