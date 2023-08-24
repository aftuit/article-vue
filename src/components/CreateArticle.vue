<template>
  <div class="container text-center w-50 mx-auto">
    <h1>Create Article</h1>
    <form @submit.prevent>
      <Input v-model="title" type="text" label="Title" />
      <TextArea
        v-model="description"
        type="text"
        label="Description"
      ></TextArea>
      <TextArea v-model="body" type="text" label="Body"></TextArea>
      <Button type="submit" @click="createArticleHandler" :disabled="load"
        >
        <span
          v-if="isLoading"
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        >
        </span>
        <span class="d-inline-block ms-1">Create</span>
        </Button
      >
    </form>

    <p class="text-danger mt-3" v-if="warn">{{ warn }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      description: "",
      body: "",
      warn: "",
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.articles.isLoading,
      load: (state) => state.articles.load,
    }),
  },
  methods: {
    createArticleHandler() {
      this.warn = "";
      const article = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: [],
      };
      if (
        article.title !== "" &&
        article.description !== "" &&
        article.body !== ""
      ) {
        this.$store
          .dispatch("createArticle", article)
          .then(() => {
            const txt = "Article created successfully!";
            this.isLoading = false
            alert(txt);
            this.$router.push({name: 'home'})

          })
          .catch((err) => (this.warn = "Article with this title has already been created!"));
      } else {
        this.warn = "Fields can't be blank";
      }
    },
  },
};
</script>

<style>
</style>