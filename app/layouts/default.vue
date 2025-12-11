<script setup>
import { useNuxtApp } from "#app";
import { signOut } from "firebase/auth";
import { useAuth } from "@/composables/useAuth";

const { $auth } = useNuxtApp();
const { setUser, user } = useAuth();

const logout = async () => {
  await signOut($auth);
  setUser(null);
  navigateTo("/login");
};
</script>

<template>
  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2 class="brand">🔥 Blog Admin</h2>

      <nav>
        <NuxtLink to="/posts" class="nav-item">Posts</NuxtLink>
        <NuxtLink to="/categories" class="nav-item">Categories</NuxtLink>
        <NuxtLink to="/" class="nav-item" target="_blank">View web</NuxtLink>
      </nav>
    </aside>

    <!-- MAIN CONTENT -->
    <div class="main">

      <!-- HEADER -->
      <header class="topbar">
        <div></div>
        <button v-if="user" @click="logout" class="logout-btn">Logout</button>
      </header>

      <!-- PAGE CONTENT -->
      <div class="content">
        <slot />
      </div>

    </div>

  </div>
</template>

<style scoped>
/* --- LAYOUT GRID --- */
.layout {
  display: flex;
  min-height: 100vh;
  background: #f5f6fa;
}

/* --- SIDEBAR --- */
.sidebar {
  width: 250px;
  background: #1e293b;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.brand {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 30px;
}

.nav-item {
  display: block;
  padding: 12px 15px;
  margin-bottom: 5px;
  border-radius: 6px;
  color: #cbd5e1;
  transition: 0.2s;
}

.nav-item:hover {
  background: #334155;
  color: #fff;
}

.nav-item.router-link-active {
  background: #0ea5e9;
  color: white;
}

/* --- MAIN AREA --- */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* --- TOPBAR --- */
.topbar {
  height: 60px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logout-btn {
  padding: 8px 16px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.logout-btn:hover {
  background: #dc2626;
}

/* --- PAGE CONTENT --- */
.content {
  padding: 25px;
}
</style>
