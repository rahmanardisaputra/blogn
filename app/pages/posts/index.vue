<script setup>
import { useNuxtApp } from "#app";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const { $db } = useNuxtApp();
const posts = ref([]);

const loadData = async () => {
  const snap = await getDocs(collection($db, "posts"));
  posts.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

onMounted(loadData);

const hapus = async (id) => {
  await deleteDoc(doc($db, "posts", id));
  loadData();
};
</script>

<template>
  <div style="padding:20px;">
    <h2>Daftar Post</h2>

    <NuxtLink to="/posts/create">Tambah</NuxtLink>

    <table border="1" cellpadding="10" style="margin-top:20px;">
        <thead>
            <tr>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Aksi</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="p in posts" :key="p.id">
            <td>{{ p.title }}</td>
            <td>{{ p.categoryName }}</td>
            <td>
                <NuxtLink :to="`/post/${p.slug}`" target="_blank">View</NuxtLink>
                |
                <NuxtLink :to="`/posts/${p.id}`">Edit</NuxtLink>
                |
                <button @click="hapus(p.id)">Hapus</button>
            </td>
            </tr>
        </tbody>
        </table>

  </div>
</template>
