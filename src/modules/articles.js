import ArticleService from "../service/articles";

const state = {
  data: null,
  isLoading: false,
  error: null,
  articleDetail: null,
  load: null,
  isDeleting: null,
};

const mutations = {
  getArticleStart(state) {
    state.isLoading = true;
    state.isCreated = true;
    state.articleDetail = null;
  },
  getArticleSuccess(state, payload) {
    state.isLoading = false;
    state.isCreated = true;
    state.data = payload;
    state.isDeleting = false;

  },
  getArticleFailure(state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  getArticleDetailStart(state) {
    state.isLoading = true;
    state.articleDetail = null;
    state.data = null;
  },
  getArticleDetailSuccess(state, payload) {
    state.isLoading = false;
    state.articleDetail = payload;

  },
  getArticleDetailFailure(state, payload) {
    state.isLoading = false;
  },
  createArticleStart(state) {
    state.isLoading = true;
    state.load = true;
  },
  createArticleSuccess(state) {
    state.isLoading = false;
    state.load = false;
  },
  createArticleFailure(state) {
    state.isLoading = false;
    state.load = false;
  },
  deleteStart(state) {
    state.isDeleting = true;
  },
  deleteSuccess(state) {
    state.isDeleting = false;
  },
  deleteFailure(state) {
    state.isDeleting = false;
  },
  editStart(state) {
    state.load = true;
  },
  editSuccess(state) {
    state.load = false;
  },
  editFailure(state) {
    state.load = false;
  },
};

const actions = {
  getArticles(context) {
    return new Promise((resolve) => {
      context.commit("getArticleStart");
      ArticleService.articles()
        .then((res) => {
          context.commit("getArticleSuccess", res.data.articles);
          resolve(res.data.articles);
        })
        .catch((err) => {
          console.log("getArticleSuccess: ", err);
        });
    });
  },

  articleDetail(context, slug) {
    return new Promise(() => {
      context.commit("getArticleDetailStart");
      ArticleService.articleDetail(slug)
        .then((res) => {
          context.commit("getArticleDetailSuccess", res.data.article);
          console.log(res);
        })
        .catch((err) => {
          context.commit("getArticleDetailFailure");
          console.log(err);
        });
    });
  },

  createArticle(context, article) {
    return new Promise((resolve, reject) => {
      context.commit("createArticleStart");
      ArticleService.createArticle(article)
        .then((res) => {
          console.log(res);
          context.commit("createArticleSuccess");
          resolve();
        })
        .catch((err) => {
          console.log(err);
          context.commit("createArticleFailure");
          reject(err.response.data.errors.title);
        });
    });
  },

  deleteArticle(context, slug) {
    return new Promise((resolve) => {
      context.commit("deleteStart");
      ArticleService.deleteArticle(slug)
        .then(() => {
          context.commit("deleteSuccess");
          resolve();
        })
        .catch(() => {
          context.commit("deleteFailure");
        });
    });
  },

  editArticle(context, article) {
    return new Promise((resolve, reject) => {
      context.commit("editStart");
      ArticleService.editArticle(article, article.slug)
        .then((res) => {
          console.log(res);
          context.commit("editSuccess");
          resolve();
        })
        .catch((err) => {
          console.log(err);
          context.commit("editFailure");
          reject(err.response.data.errors.title);
        });
    });
  },
};

export default { state, mutations, actions };
