const convertNumToString = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 10000) {
        return (num / 1000).toFixed(1) + "K";
    }

    return num;
};
export default convertNumToString;
