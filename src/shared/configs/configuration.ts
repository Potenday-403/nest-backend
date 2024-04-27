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
    accessExp: process.env.ACCESS_JWT_EXP,
  },
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID,
    redirectedUri: process.env.KAKAO_REDIRECTED_URI,
    generateTokenUri: process.env.KAKAO_GENERATE_TOKEN_URI,
  },
});
