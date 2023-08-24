<template>
  <div class="col">
    <div class="card shadow-sm">
      <img
        class="bd-placeholder-img card-img-top"
        width="100%"
        height="225"
        :src="bg"
      />
      
      <div class="card-body overflow-hidden" style="max-height: 220px;">
        <h4 class="text-truncate">{{ article.title }}</h4>
        <p class="card-text " style="white-space: wrap; text-overflow: ellipsis; overflow: hidden;">
          {{ article.description.slice(0, 130) }}
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-success"
              @click="moveArticle(article.slug)"
            >
              View
            </button>

            <button
              v-if="article.author.username === user?.username"
              type="button"
              class="btn btn-sm btn-outline-primary"
              @click="editArticleHandler"
            >
              Edit
            </button>

            <button
              v-if="article.author.username === user?.username"
              type="button"
              class="btn btn-sm btn-outline-danger"
              @click="deteleArticle(article.slug)"
              :disabled="isDeleting && isLoading"
            >
              <span
                v-if="isDeleting && isLoading"
                class="spinner-grow spinner-grow-sm"
                style="vertical-align: -0.225em;"
                role="status"
                aria-hidden="true"
              > </span>
              <span class="d-inline-block ms-1"> Delete</span>
            </button>
          </div>
          <small class="text-muted">{{
            new Date(article.updatedAt).toLocaleDateString("us")
          }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { bg } from '../constants';

export default {
  data() {
    return {
      slug: this.article.slug,
      isLoading: false,
      bg,
    }
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      isDeleting: (state) => state.articles.isDeleting,
    }),
  },
  methods: {
    moveArticle(slug) {
      this.$router.push(`/article/${slug}`);
    },
    deteleArticle(slug) {
      if(this.slug === slug) {
        this.isLoading = true;
      }
      this.$store.dispatch("deleteArticle", slug)
        .then(() => {
          this.isLoading = false;
          this.$store.dispatch("getArticles");
        })      
    },
    editArticleHandler() {
      this.$router.push(`/edit-article/${this.article.slug}`)
    }

  },
};
</script>
<style>
</style>