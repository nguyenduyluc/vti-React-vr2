/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  // kiêm tra xem trạng thái người dùng đã đăng nhập chưa
  isAuthenticated: false,

  // function signin khi người dùng click nut login
  signin(callback) {

      // set lại giá trị isAuthenticated là true
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100); // fake async
    },

    // function signout khi người dùng click signout
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100); // fake async
  },
};

export { fakeAuthProvider };