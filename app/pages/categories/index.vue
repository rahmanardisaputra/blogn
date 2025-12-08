<script setup>
import { useNuxtApp } from "#app";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const { $db } = useNuxtApp();
const categories = ref([]);

const loadData = async () => {
  const snap = await getDocs(collection($db, "categories"));
  categories.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

onMounted(loadData);

const hapus = async (id) => {
  await deleteDoc(doc($db, "categories", id));
  loadData();
};
</script>

<template>
  <div class="container" style="padding:20px;">
    <h2>Daftar Kategori</h2>

    <NuxtLink to="/categories/create" class="btn btn-primary">Tambah</NuxtLink>

    <table border="1" cellpadding="10" style="margin-top:20px;">
  <thead>
    <tr>
      <th>Nama</th>
      <th>Slug</th>
      <th>Aksi</th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="c in categories" :key="c.id">
      <td>{{ c.name }}</td>
      <td>{{ c.slug }}</td>
      <td>
        <NuxtLink :to="`/categories/${c.id}`">Edit</NuxtLink>
        |
        <button @click="hapus(c.id)">Hapus</button>
      </td>
    </tr>
  </tbody>
</table>

  </div>
</template>
