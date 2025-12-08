<script setup>
import { useNuxtApp } from "#app";
import { collection, addDoc } from "firebase/firestore";

const { $db } = useNuxtApp();

const name = ref("");

const save = async () => {
  await addDoc(collection($db, "categories"), {
    name: name.value,
    slug: name.value.toLowerCase().replace(/ /g, "-")
  });

  navigateTo("/categories");
};
</script>

<template>
  <div class="container" style="padding:20px;">
    <h2>Tambah Kategori</h2>

    <input v-model="name" placeholder="Nama kategori" />

    <button @click="save">Simpan</button>
  </div>
</template>
