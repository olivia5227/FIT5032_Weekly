
<template>
    <!--Registration Form -->
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">Sign Up</h1>
          <p class="text-center">
            Thanks for your Register!
          </p>
          <form @submit.prevent="finishRegister">
            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  @blur="() => validateName(true)"
                  @input="() => validateName(false)"
                  v-model="formData.username"
                />
                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
              </div>
              <div class="col-md-6 col-sm-6">
                <label for="gender" class="form-label">Gender</label>
                <select class="form-select" id="gender" v-model="formData.gender" required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
  
              <div class="col-md-6 col-sm-6">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  @blur="() => validatePassword(true)"
                  @input="() => validatePassword(false)"
                  v-model="formData.password"
                />
                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              </div>
              <div class="col-md-6 col-sm-6">
                  <label for="confirm-password" class="form-label">Confirm password</label>
                  <input
                  type="password"
                  class="form-control"
                  id="confirm-password"
                  v-model="formData.confirmPassword"
                  @blur="() => validateConfirmPassword(true)"
                  />
                  <div v-if="errors.confirmPassword" class="text-danger">
                      {{ errors.confirmPassword }}
                  </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6 col-sm-6">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="isAustralian"
                    v-model="formData.isAustralian"
                  />
                  <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea
                class="form-control"
                id="reason"
                rows="3"
                v-model="formData.reason"
                @input="validateReason(false)" 
                @blur="validateReason(true)"
              ></textarea>
              <div v-if="errors.reasonMessage" class="text-success">{{ errors.reasonMessage }}</div>
            </div>
            <div class="mb-3">
              <label for="reason" class="form-label">Suburb</label>
              <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from '@/firebase/init';
  import router from '@/router';
  
  const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton'
  })
  
  const clearForm = () => {
    formData.value = {
      username: '',
      password: '',
      confirmPassword: '',
      isAustralian: false,
      reason: '',
      gender: ''
    }
  }
  
  const errors = ref({
    username: null,
    password: null,
    confirmPassword: null,
    reason: null,
    reasonMessage: null
  })
  
  const validateName = (blur) => {
    if (formData.value.username.length < 3) {
      if (blur) errors.value.username = 'Name must be at least 3 characters'
    } else {
      errors.value.username = null
    }
  }
  
  const validatePassword = (blur) => {
    const password = formData.value.password
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
    if (password.length < minLength) {
      if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
    } else if (!hasUppercase) {
      if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
    } else if (!hasLowercase) {
      if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
    } else if (!hasNumber) {
      if (blur) errors.value.password = 'Password must contain at least one number.'
    } else if (!hasSpecialChar) {
      if (blur) errors.value.password = 'Password must contain at least one special character.'
    } else {
      errors.value.password = null
    }
  }
  
  const validateConfirmPassword = (blur) => {
    if (formData.value.password !== formData.value.confirmPassword) {
      if (blur) errors.value.confirmPassword = 'Passwords do not match.'
    } else {
      errors.value.confirmPassword = null
    }
  }
  
  const validateReason = (blur) => {
    const reason = formData.value.reason.toLowerCase()
    if (reason.includes('friend')) {
      errors.value.reasonMessage = 'Great to have a friend!'
    } else {
      errors.value.reasonMessage = null
    }
  }
  
  const finishRegister = () => {
    validateName(true)
    validatePassword(true)
    validateConfirmPassword(true)
    validateReason(true)
    if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword && !errors.value.reason) {
      createUserWithEmailAndPassword(auth, formData.value.username, formData.value.password)
        .then((userCredential) => {
          const user = userCredential.user;
          router.push("/Firelogin");
          clearForm();
        }).catch((error) => {
          console.log(error.code, error.message);
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
  
  #username:focus,
  #password:focus,
  #isAustralian:focus,
  .card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .card-header {
    background-color: #275fda;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
  }
  .list-group-item {
    padding: 10px;
  }
  </style>
  
  