<!-- src/components/ArticleList.vue -->
<template>
    <div class="article-list-container">
      <h1 class="main-title">Articles</h1>
      <div class="actions">
        <!-- Button to navigate to the Add Article page -->
        <button @click="goToAddArticle" class="add-article-button">
          Add New Article
        </button>
      </div>
      <div v-if="loading" class="loading">
        <span class="spinner"></span> Loading articles...
      </div>
      <div v-if="error" class="error-message">
        Error: {{ error }}
      </div>
      <ul v-if="result.length" class="article-list">
        <li v-for="article in result" :key="article.id" class="article-card">
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-description">{{ article.description }}</p>
          <div class="article-body">{{ article.body }}</div>
          <p class="article-status">
            Published: <span :class="article.published ? 'status-yes' : 'status-no'">{{ article.published ? 'Yes' : 'No' }}</span>
          </p>
        </li>
      </ul>
      <div v-if="!result.length && !loading && !error" class="no-articles">
        No articles found.
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'ArticleList',
    data() {
      return {
        result: [],
        loading: true,
        error: null,
      };
    },
    methods: {
    goToAddArticle() {
      this.$router.push('/addarticle');
      //console.log(this.$router.params.id) // Navigate to the Add Article page
    },
  },
    mounted() {
      axios
        .get('http://localhost:3000/articles/')
        .then((response) => {
          this.result = response.data;
          console.log(this.result);
        })
        .catch((error) => {
          this.error = 'Failed to load articles';
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  };
  </script>
  
  <style scoped>
  /* Basic layout and font styling */
  .actions {
    text-align: right; /* Align the button to the right */
    margin-bottom: 10px;
  }
  
  .add-article-button {
    padding: 10px 20px;
    background-color: #2ecc71; /* Green */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .add-article-button:hover {
    background-color: #27ae60; /* Darker green on hover */
  }
  .article-list-container {
    padding: 20px;
    background-color: #f9f9f9;
    font-family: 'Arial', sans-serif;
  }
  
  .main-title {
    font-size: 2em;
    color: #333;
  }
  
  .loading {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .spinner {
    border: 4px solid #ddd;
    border-top: 4px solid #333;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .error-message {
    color: #e74c3c; /* Red */
    font-weight: bold;
  }
  
  .article-list {
    list-style: none;
    padding: 0;
  }
  
  .article-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
  }
  
  .article-card:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  }
  
  .article-title {
    font-size: 1.5em;
    color: #333;
  }
  
  .article-description {
    font-size: 1em;
    color: #666;
  }
  
  .article-body {
    font-size: 1em;
    color: #333;
  }
  
  .article-status {
    font-size: 0.9em;
  }
  
  .status-yes {
    color: #2ecc71; /* Green */
  }
  
  .status-no {
    color: #e74c3c; /* Red */
  }
  
  .no-articles {
    text-align: center;
    color: #999;
    font-size: 1.2em;
  }
  </style>
  