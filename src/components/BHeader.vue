<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addBook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li v-if="!user" class="nav-item">
          <router-link to="/Firelogin" class="nav-link" active-class="active">Firebase login</router-link>
        </li>
        <li v-if="!user" class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Sign Up</router-link>
        </li>
      </ul>

      <!-- User Info Section -->
      <div v-if="user" class="d-flex align-items-center">
        <span class="me-3 text-muted">Hello, {{ user.email }}</span>
        <button @click="logout" class="btn btn-outline-secondary btn-sm">Logout</button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '@/firebase/init'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import router from '@/router'

const user = ref(null)

const logout = async () => {
  try {
    await signOut(auth)
    router.push('/Firelogin')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })
})
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
