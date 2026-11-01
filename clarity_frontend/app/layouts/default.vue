<template>
  <!-- a progress bar while a page's data is being fetched (the old page stays on screen until then) -->
  <NuxtLoadingIndicator color="#0f766e" />
  <Header />
  <main><slot /></main>
  <Newsletter />
  <Footer />
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Newsletter from "@/components/Newsletter.vue";
</script>
