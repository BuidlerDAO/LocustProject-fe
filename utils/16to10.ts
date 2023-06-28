/**
 * @description 将十六进制数字转化为十进制数字
 * @param hex - 十六进制数字，以字符串形式输入
 * @return 返回一个十进制字符串
 */
export const convertHexToDecimal = (hex: string): string => {
  return BigInt('0x' + hex).toString();
};

/**
 * @description 将十六进制数字转化为十进制数字，并除以 10 的 decimal 次方
 * @param hex - 十六进制数字，以字符串形式输入
 * @param decimal - 10 的次方数
 * @return 返回一个十进制的字符串
 */
export const convertHexToDecimalWithScale = (
  hex: string,
  decimal: number
): string => {
  const value = BigInt('0x' + hex);
  const scale = BigInt(10) ** BigInt(decimal);
  return (value / scale).toString();
};
