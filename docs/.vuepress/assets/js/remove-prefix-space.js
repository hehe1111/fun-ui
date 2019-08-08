const removePrefixSpace = (code, spaceNumber = 8) => {
  const rule = ['^ {', spaceNumber, '}?'].join('');
  const pattern = new RegExp(rule, 'gm');
  return code.replace(pattern, '').trim();
};

export default removePrefixSpace;
