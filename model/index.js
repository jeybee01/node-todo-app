const Sequelize = require('sequelize');
const sequelize = new Sequelize("tododb", "root", "", 
        {
            host: "localhost",
            dialect: "mysql",
        })

        sequelize.authenticate()
    .then(()=>{
        console.log("Database created Successfully")
    })
    .catch((err)=>{
        console.log(err.message)
    })

    const db = {};

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    db.items = require("./list")(sequelize, Sequelize);
    db.users = require('./register')(sequelize, Sequelize);

    module.exports = db