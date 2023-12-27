<script setup>
import PasswordGenerator from '../components/PasswordGenerator.vue'
import PasswordOptions from '../components/PasswordOptions.vue'
</script>

<template>
  <div class="container">
    <div class="first-div">
      <PasswordGenerator aria-label="Password Generator Component" />
    </div>
    <div class="second-div">
      <PasswordOptions aria-label="Password Options" />
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  height: 100vh; /* Set the container height to full viewport height */
}

.first-div {
  width: 48%;
  float: left;
  margin: 1%;
  box-sizing: border-box;
}

.second-div {
  width: 48%;
  float: right;
  margin: 1%;
  box-sizing: border-box;
}
</style>
