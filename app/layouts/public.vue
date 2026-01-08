<script setup>
import { useAuth } from "@/composables/useAuth";

const { user } = useAuth();
</script>

<template>
  <div class="public-layout">

    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="container nav-flex">

        <NuxtLink to="/" class="brand">WokaBlog</NuxtLink>

        <div class="menu">
          <NuxtLink to="/" class="nav-item">Home</NuxtLink>

          <!-- BUTTON LOGIN / DASHBOARD -->
          <NuxtLink
            v-if="!user"
            to="/login"
            class="btn-login"
          >
            Login
          </NuxtLink>

          <NuxtLink
            v-else
            to="/posts"
            class="btn-dashboard"
          >
            Dashboard
          </NuxtLink>
        </div>

      </div>
    </nav>

    <!-- MAIN CONTENT -->
    <main class="container content">
      <slot />
    </main>

  </div>
</template>

<style scoped>
.public-layout {
  background: #f6f7f9;
  min-height: 100vh;
}

.navbar {
  background: white;
  padding: 15px 0;
  border-bottom: 1px solid #e5e7eb;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 15px;
}

/* NAVBAR FLEX */
.nav-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 22px;
  font-weight: 700;
  text-decoration: none;
  color: #0ea5e9;
}

.menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-item {
  text-decoration: none;
  color: #374151;
}

.nav-item:hover {
  color: #0ea5e9;
}

/* LOGIN BUTTON */
.btn-login {
  background: #0ea5e9;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: .2s;
}

.btn-login:hover {
  background: #0284c7;
}

/* DASHBOARD BUTTON */
.btn-dashboard {
  background: #10b981;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: .2s;
}

.btn-dashboard:hover {
  background: #059669;
}

.content {
  padding-top: 30px;
}
</style>
