<template>
  <Loader v-if="isLoading"/>
  <ArticleDetail v-else :articleDetail="articleDetail"/>
</template>
<script>
import ArticleDetail from "../components/ArticleDetail.vue";
import { mapState } from "vuex";
export default {
  components: {
    ArticleDetail,
  },
  computed: {
    ...mapState({
      articleDetail: (state) => state.articles.articleDetail,
      isLoading: state => state.articles.isLoading
    }),
  },
  mounted() {
    this.$store.dispatch("articleDetail", this.$route.params.slug);
  },
};
</script>
<style>
</style>