<template>
  <div class="app-container">
    <div id="star-five"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

#star-five {
  cursor: pointer;
  width: 600px;
  height: 600px;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  animation: run 6s infinite linear;
}

@keyframes run {
  0% {
    background-color: red;
    transform: rotate(0deg);
  }
  10% {
    background-color: orangered;
  }
  20% {
    background-color: yellow;
  }
  30% {
    background-color: green;
  }
  40% {
    background-color: cyan;
  }
  50% {
    background-color: blue;
  }
  60% {
    background-color: purple;
  }
  100% {
    background-color: red;
    transform: rotate(360deg);
  }
}
</style>
