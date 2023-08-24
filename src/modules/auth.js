import { setItem, removeItem } from "../helpers/persistanceStorage";
import AuthService from "../service/auth";
import { gettersTypes } from "./types";
const state = {
  isLoading: false,
  user: null,
  errors: null,
  isLoggedIn: null,
};

const getters = {
  [gettersTypes.currentUser]: (state) => {
    return state.user;
  },
  [gettersTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
  [gettersTypes.isAnonymous]: (state) => {
    return !state.isLoggedIn;
  },
};

const mutations = {
  loggedIn(state) {
    state.isLoggedIn = true;
  },
  requestStart(state) {
    state.isLoading = true;
    state.user = null;
    state.errors = null;
  },
  requestSuccess(state, payload) {
    state.isLoading = false;
    console.log("PAYLOAD", payload);
    state.user = payload;
  },
  requestFailure(state, payload) {
    state.isLoading = false;
    console.log("PAYLOAD", payload);
    state.errors = payload.errors;
  },
  getUserStart(state) {
    state.isLoading = true;
  },
  getUserSuccess(state, payload) {
    state.isLoading = false;
    state.user = payload;
    state.isLoggedIn = true;
  },
  getUserFailure(state) {
    state.isLoading = false;
    state.isLoggedIn = false;
  },
  logout(state) {
    state.user = null;
    state.isLoggedIn = false;
  },
};

const actions = {
  register(context, user) {
    return new Promise((resolve, reject) => {
      context.commit("requestStart");
      AuthService.register(user)
        .then((res) => {
          context.commit("requestSuccess", res.data.user);
          resolve(res.data.user);
        })
        .catch((err) => {
          context.commit("requestFailure", err.response.data);
          reject(err.response.data);
        });
    });
  },
  login(context, user) {
    return new Promise((resolve, reject) => {
      context.commit("requestStart");
      AuthService.login(user)
        .then((res) => {
          context.commit("requestSuccess", res.data.user);
          context.commit("loggedIn");
          setItem("token", res.data.user.token);
          setItem("user", res.data.user);
          resolve(res.data.user);
        })
        .catch((err) => {
          context.commit("requestFailure", err.response.data);
          reject(err.response.data);
        });
    });
  },
  getUser(context) {
    if (localStorage.getItem("user")) {
      context.commit(
        "getUserSuccess",
        JSON.parse(localStorage.getItem("user"))
      );
    } else {
      return new Promise(() => {
        context.commit("getUserStart");
        AuthService.getUser()
          .then((res) => {
            context.commit("getUserSuccess", res.data.user);
            console.log(res);
          })
          .catch((err) => {
            context.commit("getUserFailure");
            console.log(err);
          });
      });
    }
  },
  logout(context) {
    context.commit("logout");
    removeItem("token");
    removeItem("user");
  },
};

export default { state, mutations, actions, getters };
