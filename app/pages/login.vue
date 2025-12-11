<script setup>
import { useNuxtApp } from "#app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/composables/useAuth";

definePageMeta({
  layout: "auth",
});

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
    navigateTo("/posts");
  } catch (err) {
    errorMsg.value = "Email atau password salah!";
  }
};
</script>

<template>
  <div class="login-box">
    <h2 class="title">Admin Login</h2>
    <p class="subtitle">Masuk ke dashboard blog Anda</p>

    <input v-model="email" class="input" placeholder="Email" />
    <input v-model="password" type="password" class="input" placeholder="Password" />

    <button @click="login" class="btn">Login</button>

    <p class="error" v-if="errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<style scoped>
/* Biar padding+border ikut hitung width → nggak melebar */
* {
  box-sizing: border-box;
}

.login-box {
  width: 100%;
  max-width: 380px;
  padding: 30px 28px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
  text-align: center;
}

.title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 22px;
  font-size: 13px;
}

.input {
  width: 100%;
  padding: 11px 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f8fafc;
  font-size: 14px;
  transition: .2s;
}

.input:focus {
  border-color: #3b82f6;
  background: #ffffff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59,130,246,0.15);
}

.btn {
  width: 100%;
  padding: 11px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin-top: 6px;
  transition: .2s;
}

.btn:hover {
  background: #2563eb;
}

.error {
  margin-top: 10px;
  color: #ef4444;
  font-size: 13px;
}
</style>
