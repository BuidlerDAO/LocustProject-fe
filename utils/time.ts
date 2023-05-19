export const getCurrentTime = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysLeft = daysInMonth - date.getDate();
  return [month, daysLeft];
};
