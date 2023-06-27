/**
 * get client cookie
 * @param {String} name cookie name
 */
export const getCookie = (name: string): string | undefined => {
  const value = `; ${typeof window === 'undefined' ? '' : document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const ppop = parts.pop();
    if (ppop) {
      return ppop.split(';').shift();
    }
  }
  return '';
};

/**
 * delete client cookie
 * @param {String} name cookie name
 * @param {String} path cookie path
 * @param {String} domain cookie domain
 */
export const deleteCookie = (name: string, path = '/', domain = '') => {
  const date = new Date();
  date.setTime(date.getTime() - 10000);

  let cookie = `${name}=; expires=${date.toUTCString()}; path=${path}`;
  if (domain) {
    cookie += `; domain=${domain}`;
  }

  document.cookie = cookie;
};

/**
 * set client cookie
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {String} path cookie path
 * @param {String} domain cookie domain
 */
export const setCookie = (
  name: string,
  value: string,
  path = '/',
  domain = '',
  days = 30
) => {
  const exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);

  let cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${exp.toUTCString()}; path=${path}`;
  if (domain) {
    cookie += `; domain=${domain}`;
  }

  document.cookie = cookie;
};
