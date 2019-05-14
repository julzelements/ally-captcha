
const hasInts = (myString) => {
    const chars = myString.split("");
    return chars.map(x => typeof(x))
    return myString.split("")
}

module.exports = {
    hasInts
};