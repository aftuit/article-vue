<template >
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <Loader v-if="isLoading" />
      <ArticleCard
        v-else
        v-for="article in data"
        :key="article.slug"
        :article="article"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ArticleCard from "../components/ArticleCard.vue";

export default {
  components: {
    ArticleCard,
  },
  computed: {
    ...mapState({
      data: (state) => state.articles.data,
      isLoading: (state) => state.articles.isLoading,
    }),
  },
  mounted() {
    this.$store.dispatch("getArticles");
  },
};
</script>
<style >
</style>