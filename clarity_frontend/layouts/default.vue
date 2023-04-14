<template>
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
