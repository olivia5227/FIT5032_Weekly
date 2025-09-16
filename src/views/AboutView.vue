<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">About Our Library</h1>
        <span class="sub-title">Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</span>

        <!-- User Info Section -->
        <div v-if="user" class="user-info mt-4 p-3 border rounded bg-light">
          <h4>Welcome back!</h4>
          <p><strong>Logged in as:</strong> {{ user.email }}</p>
          <p><strong>User ID:</strong> {{ user.uid }}</p>
          <p><strong>Account created:</strong> {{ formatDate(user.metadata.creationTime) }}</p>
          <p><strong>Last sign in:</strong> {{ formatDate(user.metadata.lastSignInTime) }}</p>
        </div>

        <div v-else class="user-info mt-4 p-3 border rounded bg-warning">
          <p>You are not logged in. Please <router-link to="/Firelogin">sign in</router-link> to access your account.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '@/firebase/init'
import { onAuthStateChanged } from 'firebase/auth'

const user = ref(null)

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })
})
</script>
  
  <style>
  </style>