export default (): any => ({
  database: {
    host: process.env.DB_HOST,
    pass: process.env.DB_PASS,
    user: process.env.DB_USER,
    name: process.env.DB_NAME,
    port: +process.env.DB_PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
