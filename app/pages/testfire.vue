<script setup>
import { useNuxtApp } from '#app'
import { collection, addDoc } from 'firebase/firestore'

const { $db } = useNuxtApp()

const test = async () => {
  await addDoc(collection($db, "testing"), {
    text: "Halo dari Nuxt kerennnnn",
    createdAt: new Date()
  })

  alert("Berhasil menyimpan ke Firestore!")
}
</script>

<template>
  <div style="padding:20px;">
    <h1>Test Firestore</h1>

    <button @click="test">Tambah Data</button>
  </div>
</template>
