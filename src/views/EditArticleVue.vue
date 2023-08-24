<template>
    <Loader v-if="isLoading" />
    <EditArticle v-else :articleDetail="articleDetail" />
</template>
<script>
import EditArticle from "../components/EditArticle.vue";
import { mapState } from "vuex";
export default {
  components: {
    EditArticle,
  },
  computed: {
    ...mapState({
      articleDetail: (state) => state.articles.articleDetail,
      isLoading: (state) => state.articles.isLoading,
    }),
  },
  mounted() {
    this.$store.dispatch("articleDetail", this.$route.params.slug);
  },
};
</script>
<style>
</style>