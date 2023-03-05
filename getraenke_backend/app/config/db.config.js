module.export = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456",
    DB: "testdb",
    dialect: "mariadb",
    pool: {
        max: 5,
        min: 0,
        acuire: 30000,
        idle: 10000
    }
};