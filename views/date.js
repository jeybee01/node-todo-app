
module.exports = getDate
function getDate(){
    const today = new Date();
    let option = {
        weekday: "long",
        day:"numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-us", option);
    return day;
}