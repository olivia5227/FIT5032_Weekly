<template>
    <div class="book-list">
      <h2>Books with ISBN > 1000</h2>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import db from '@/firebase/init'; 
  
  export default {
    setup() {
      const books = ref([]);
  
      const fetchBooks = async () => {
        try {
          const q = query(collection(db, 'books'), where('isbn', '>', 1000));
          const querySnapshot = await getDocs(q);
          const booksArray = [];
          querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
          });
          books.value = booksArray;
        } catch (error) {
          console.error('Error fetching books: ', error);
        }
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books,
        fetchBooks 
      };
    }
  };
  </script>
  
  <style scoped>
  .book-list {
    margin-top: 30px;
  }
  
  .book-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .book-list li {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  </style>
  