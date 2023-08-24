import { createStore } from "vuex";
import auth from "../modules/auth";
import articles from "../modules/articles";
const store = createStore({
  state() {},
  mutations: {},
  modules: {
    auth,
    articles,
  },
});

export default store;
