export const getCurrentTime = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysLeft = daysInMonth - date.getDate();
  return [month, daysLeft];
};

export const getFullMonth = () => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(i);
    const month = date.toLocaleString('en', { month: 'long' });
    months.push({ value: month, label: month });
  }
  return months;
};
