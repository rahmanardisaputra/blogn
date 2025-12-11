<!-- layouts/auth.vue -->
<template>
  <div class="auth-layout">
    <slot />
  </div>
</template>

<style scoped>
.auth-layout {
  height: 100vh;                 /* full layar */
  display: flex;
  justify-content: center;
  align-items: center;

  /* padding hanya kiri-kanan, bukan atas-bawah */
  padding: 0 20px;

  background: linear-gradient(135deg, #ffffff, #e8f3ff);
}
</style>
