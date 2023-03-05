module.exports = (sequelize, Sequelize) => {
    const Kauf = sequelize.define("kauf", {
        anzahl: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: true
    });

    return Kauf;
};