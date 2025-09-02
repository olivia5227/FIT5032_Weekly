<template>
    <div class="add-book-container">
      <h1>Add a New Book</h1>
      <form @submit.prevent="addBook">
        <div class="form-group">
          <label for="isbn">ISBN</label>
          <input 
            type="number" 
            id="isbn" 
            v-model="isbn" 
            required 
            placeholder="Enter ISBN"
          />
          <div v-if="isbnError" class="text-danger">{{ isbnError }}</div>
        </div>
        <div class="form-group">
          <label for="name">Book Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="name" 
            required 
            placeholder="Enter Book Name"
          />
        </div>
        <button type="submit">Add Book</button>
      </form>

      <BookList ref="bookList" />

    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import db from '@/firebase/init';
  import { collection, addDoc } from 'firebase/firestore';
  import BookList from '@/components/BookList.vue';
  
  const isbn = ref(null);
  const name = ref('');
  const isbnError = ref(''); 

  const addBook = async () => {
    if (isbn.value <= 0) {
        isbnError.value = 'ISBN must be greater than 0'
        alert('ISBN must be greater than 0');
        return;
    } else {
        isbnError.value = '';
    }
    try {
      const bookData = {
        isbn: Number(isbn.value),
        name: name.value
      };
  
      await addDoc(collection(db, 'books'), bookData);
      alert('Book added successfully!');
      
      isbn.value = null;
      name.value = '';

      const bookListComponent = this.$refs.bookList;
      bookListComponent.fetchBooks();

    } catch (error) {
      console.error('Error adding book: ', error);
      alert('Failed to add book, please try again.');
    }
  };
  </script>
  
  <style scoped>
  .add-book-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  button {
    padding: 10px 15px;
    background-color: #5cb85c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #4cae4c;
  }
  </style>
  