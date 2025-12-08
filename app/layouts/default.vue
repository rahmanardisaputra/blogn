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
  <div>
    <header style="padding:10px;background:#eee;margin-bottom:20px;">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/categories" style="margin-left:15px;">Kategori</NuxtLink>
      <NuxtLink to="/posts" style="margin-left:15px;">Post</NuxtLink>

      <button v-if="user" @click="logout" style="float:right;">Logout</button>
    </header>

    <slot />
  </div>
</template>
