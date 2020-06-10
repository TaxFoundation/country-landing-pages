const numberRankString = num => {
  if (num === 11 || num === 12 || num === 13) {
    return `${num}th`;
  }
  const stringifyNum = num.toString();
  const lastNum = stringifyNum.charAt(stringifyNum.length - 1);
  switch (+lastNum) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
};

export { numberRankString };
