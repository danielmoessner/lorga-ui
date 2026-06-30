export function getCookie(cname: string) {
  const name = cname + "=";
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookies = decodedCookies.split(";");
  for (const cookie of cookies) {
    let ret = cookie;
    while (ret.charAt(0) == " ") {
      ret = ret.substring(1);
    }
    if (ret.indexOf(name) == 0) {
      return ret.substring(name.length, ret.length);
    }
  }
  return "";
}
