export const isLogin = () => {
  let token = localStorage.getItem("token");
  let checkLogin = false;
  if (token !== undefined && token !== null) {
    checkLogin = true;
  }
  return checkLogin;
};
