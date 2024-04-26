<!-- src/components/AddArticle.vue -->
<template>
  <div class="add-article-container">
    <h1 class="main-title">Add New Article</h1>
    <form @submit.prevent="submitArticle">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Enter the article title"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Enter a brief description"
          rows="2"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea
          id="body"
          v-model="form.body"
          placeholder="Enter the full article"
          rows="6"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <input
          id="published"
          v-model="form.published"
          type="checkbox"
        />
        <label for="published">Published</label>
      </div>
      <button type="submit" class="submit-button">Add Article</button>
    </form>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddArticle',
  data() {
    return {
      form: {
        title: '',
        description: '',
        body: '',
        published: false,
      },
      error: null,
    };
  },
  methods: {
    submitArticle() {
      this.error = null; // Reset any previous error messages
      axios
        .post('http://localhost:3000/articles', this.form)
        .then((response) => {
          console.log('Article added:', response.data);
          this.resetForm();
        })
        .catch((error) => {
          console.error(error);
          this.error = 'Failed to add article. Please try again.';
        });
    },
    resetForm() {
      // Clear form fields after successful submission
      this.form.title = '';
      this.form.description = '';
      this.form.body = '';
      this.form.published = false;
    },
  },
};
</script>

<style scoped>
.add-article-container {
  padding: 20px;
  background-color: #f0f0f0;
  font-family: 'Arial', sans-serif;
}

.main-title {
  font-size: 2em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 1.2em;
  color: #333;
}

input[type='text'],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type='checkbox'] {
  margin-right: 10px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #3498db; /* Blue */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #2980b9; /* Darker blue on hover */
}

.error-message {
  color: #e74c3c; /* Red */
  text-align: center;
  font-weight: bold;
}
</style>
