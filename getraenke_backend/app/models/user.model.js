//const { sequelize, Sequelize } = require(".");  //wurde automatisch hinzugefügt

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        vorname: {
            type: Sequelize.STRING
        },
        nachname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        isFAHO: {
            type: Sequelize.BOOLEAN
        },
        splitwise: {
            type: Sequelize.BOOLEAN
        },
        zimmerNr: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

    return User;
};