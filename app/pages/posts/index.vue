<script setup>
import { useNuxtApp } from "#app";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const { $db } = useNuxtApp();
const posts = ref([]);

const loadData = async () => {
  const snap = await getDocs(collection($db, "posts"));
  const allPosts = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  // Urutkan: pertama per kategori (A-Z), lalu per judul (A-Z)
  const sortedPosts = allPosts.sort((a, b) => {
    const catA = (a.categoryName || '').toLowerCase();
    const catB = (b.categoryName || '').toLowerCase();

    if (catA !== catB) {
      return catA.localeCompare(catB);
    }

    // Kategori sama → urutkan judul
    return (a.title || '').toLowerCase().localeCompare((b.title || '').toLowerCase());
  });

  posts.value = sortedPosts;
};

onMounted(loadData);

const hapus = async (id) => {
  if (!confirm("Yakin ingin menghapus post ini?")) return;
  await deleteDoc(doc($db, "posts", id));
  await loadData();
};
</script>

<template>
  <div class="page">

    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1 class="title">Daftar Posts</h1>
        <p class="subtitle">Kelola artikel blog Anda</p>
      </div>

      <NuxtLink to="/posts/create" class="btn-primary">+ Tambah Post</NuxtLink>
    </div>

    <!-- INFO CARD -->
    <div class="cards">
      <div class="card">
        <h3>Total Posts</h3>
        <p class="count">{{ posts.length }}</p>
      </div>
    </div>

    <!-- TABLE -->
    <table class="table">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Kategori</th>
          <th>Tanggal</th>
          <th style="width:160px;">Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in posts" :key="p.id">
          <td>{{ p.title }}</td>

          <td>
            <span class="badge">{{ p.categoryName }}</span>
          </td>

          <td>{{ new Date(p.createdAt?.seconds * 1000).toLocaleDateString() }}</td>

          <td class="aksi">
            <NuxtLink :to="`/post/${p.slug}`" target="_blank" class="btn-sm info">View</NuxtLink>
            <NuxtLink :to="`/posts/${p.id}`" class="btn-sm warn">Edit</NuxtLink>
            <button @click="hapus(p.id)" class="btn-sm danger">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>
/* --- PAGE LAYOUT --- */
.page {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.title {
  font-size: 26px;
  font-weight: bold;
}

.subtitle {
  color: #64748b;
}

/* --- BUTTON --- */
.btn-primary {
  background: #0ea5e9;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}
.btn-primary:hover {
  background: #0284c7;
}

/* --- CARDS --- */
.cards {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  width: 200px;
  text-align: center;
}

.count {
  margin-top: 5px;
  font-size: 32px;
  font-weight: bold;
  color: #0ea5e9;
}

/* --- TABLE --- */
.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.table thead {
  background: #f1f5f9;
}

.table th,
.table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.table tbody tr:hover {
  background: #f8fafc;
}

/* BADGE */
.badge {
  background: #0ea5e9;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
}

/* ACTION BUTTONS */
.aksi {
  display: flex;
  gap: 8px;
}

.btn-sm {
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.info { background: #3b82f6; color: white; }
.warn { background: #f59e0b; color: white; }
.danger { background: #ef4444; color: white; }

.info:hover { background: #2563eb; }
.warn:hover { background: #d97706; }
.danger:hover { background: #dc2626; }
</style>
