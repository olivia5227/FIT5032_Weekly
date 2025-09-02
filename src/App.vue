<script setup>
  import JSON from './components/JSON.vue'
  //import JSONSolution from "./components/JSONSolution.vue"
  //import Form from "./components/Form.vue"
  import BHeader from './components/BHeader.vue'

  </script>
  
<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>
    
    <main class="main-box">
      <!-- <JSON /> -->
      <!-- <JSONSolution /> -->
      <!--<Form />-->
      <router-view></router-view>
    </main>
  </div>
</template>  
