const formatNumber = (numberString) => {
    return Number(numberString.replace(/[^0-9.-]+/g,""));
};

const generateResponse = (data, success = true) => {
    return { success, data };
};

module.exports = { formatNumber, generateResponse };
