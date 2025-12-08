<script setup>
import { useNuxtApp, useRoute } from "#app";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const { $db } = useNuxtApp();
const route = useRoute();

const name = ref("");

onMounted(async () => {
  const snap = await getDoc(doc($db, "categories", route.params.id));
  const data = snap.data();
  name.value = data.name;
});

const save = async () => {
  await updateDoc(doc($db, "categories", route.params.id), {
    name: name.value,
    slug: name.value.toLowerCase().replace(/ /g, "-")
  });

  navigateTo("/categories");
};
</script>

<template>
  <div style="padding:20px;">
    <h2>Edit Kategori</h2>

    <input v-model="name" />
    <button @click="save">Update</button>
  </div>
</template>
