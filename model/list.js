module.exports = (sequelize, dataType)=>{
    const list = sequelize.define("item", {
        todo:{
            type:dataType.STRING}
    })
    return list;
}