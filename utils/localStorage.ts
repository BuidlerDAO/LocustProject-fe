// //封装三个函数，存储、获取、删除
// export const setItem = (key: string, value: any) => {
//   if (typeof window !== 'undefined') {
//     if (typeof value === 'object') {
//       value = JSON.stringify(value);
//     }
//     window.localStorage.setItem(key, value);
//   }
// };

// export const getItem = (key: string) => {
//   //当window存在时，才执行下面的代码
//   //console.log('window', window);
//   if (typeof window !== 'undefined') {
//     const value = window.localStorage.getItem(key);
//     try {
//       return JSON.parse(value || '');
//     } catch (error) {
//       return value;
//     }
//   }
// };

// export const removeItem = (key: string) => {
//   if (typeof window !== 'undefined') window.localStorage.removeItem(key);
// };
