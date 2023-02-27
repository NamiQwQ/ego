export default {
  namespaced: true,
  state: {
    userinfo: {
      user: "",
      token: "",
    },
  },
  getters: {

  },
  mutations: {
    setUser(state, payload) {
      state.userinfo = payload;
    },
    deleteUser(state) {
      state.userinfo = {
        user: "",
        token: "",
      };
    },
  },
};
