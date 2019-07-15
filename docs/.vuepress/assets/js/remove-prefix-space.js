const removePrefixSpace = (code, spaceNumber = 8) => {
  const rule = [' ', '{', spaceNumber, '}'].join('');
  const pattern = new RegExp(rule, 'g');
  return code.replace(pattern, '');
};

export default removePrefixSpace;
