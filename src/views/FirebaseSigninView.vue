<template>
  <!--Login Form -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Login</h1>
        <p class="text-center">
          Please login to access your account.
        </p>
        <form @submit.prevent="finishLogin">
          <div class="row mb-3">
            <div class="col-md-12 col-sm-12">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="formData.email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>

            <div class="col-md-12 col-sm-12">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase/init';
import router from '@/router';

const formData = ref({
  email: '',
  password: '',
})

const errors = ref({
  email: null,
  password: null,
})

const clearForm = () => {
  formData.value = {
    email: '',
    password: '',
  }
}

const validateEmail = (blur) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    if (blur) errors.value.email = 'Please enter a valid email address';
  } else {
    errors.value.email = null;
  }
}

const validatePassword = (blur) => {
  if (formData.value.password.length < 6) {
    if (blur) errors.value.password = 'Password must be at least 6 characters long.';
  } else {
    errors.value.password = null;
  }
}

const finishLogin = () => {
  validateEmail(true);
  validatePassword(true);

  if (!errors.value.email && !errors.value.password) {
    signInWithEmailAndPassword(auth, formData.value.email, formData.value.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login successful:", user);
        router.push("/about"); // Redirect user to dashboard or any other page
      })
      .catch((error) => {
        console.log(error.code, error.message);
        if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
          errors.value.password = "Incorrect password.";
        } else if (error.code === "auth/user-not-found") {
          errors.value.email = "User not found. Please register first.";
        } else if (error.code === "auth/invalid-email") {
          errors.value.email = "Invalid email format.";
        } else if (error.code === "auth/user-disabled") {
          errors.value.email = "This account has been disabled.";
        } else if (error.code === "auth/too-many-requests") {
          errors.value.email = "Too many failed attempts. Please try again later.";
        } else {
          errors.value.email = `Login failed: ${error.message}`;
        }
      });
  }
}
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.form {
  text-align: center;
  margin-top: 50px;
}

#email:focus,
#password:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
