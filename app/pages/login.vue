<script setup>
import { useNuxtApp } from "#app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/composables/useAuth";

const { $auth } = useNuxtApp();
const { setUser } = useAuth();

const email = ref("");
const password = ref("");
const errorMsg = ref("");

const login = async () => {
  errorMsg.value = "";

  try {
    const res = await signInWithEmailAndPassword($auth, email.value, password.value);
    setUser(res.user);

    navigateTo("/posts"); // redirect ke dashboard admin
  } catch (err) {
    errorMsg.value = "Email atau password salah!";
  }
};
</script>

<template>
  <div style="max-width:400px;margin:60px auto;">
    <h2>Login Admin</h2>

    <input v-model="email" placeholder="Email" style="width:100%;margin-bottom:10px;" />
    <input v-model="password" type="password" placeholder="Password" style="width:100%;margin-bottom:10px;" />

    <button @click="login">Login</button>

    <p style="color:red;" v-if="errorMsg">{{ errorMsg }}</p>
  </div>
</template>
