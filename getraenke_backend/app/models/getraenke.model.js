module.exports = (sequelize, Sequelize) => {
    const Getraenk = sequelize.define("getraenk", {
        name: {
            type: Sequelize.STRING
        },
        preis: {
            type: Sequelize.DOUBLE
        }
    });

    return Getraenk;
};