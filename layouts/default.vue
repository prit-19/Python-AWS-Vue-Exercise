<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
          <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <slot></slot>
    <footer>This is footer</footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
div {
  background-color: lightgreen;
}
</style>
