module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Roman@20",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  // HOST: "ls-a7e9117d13ec573dfbf28dfe82dee876e6839de3.cqr46uqem7fg.ap-south-1.rds.amazonaws.com",
  // USER: "dbmasteruser",
  // PASSWORD: "4p8K}g`l]*P=O9]ztnkn+9^IaiaLMxsQ",
  // DB: "postgres",
  // dialect: "postgres",
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
};