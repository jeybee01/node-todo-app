
module.exports = (sequelize, DataTypes)=>{
        const users = sequelize.define('user', {
            firstname : {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastname : {
                type: DataTypes.STRING,
                allowNull: false
            },
            email : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password : {
                type: DataTypes.STRING,
                allowNull: false
            }
        })
        return users;
}