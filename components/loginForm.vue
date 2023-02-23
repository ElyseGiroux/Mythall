<template>
  <section class="py-32">
    <div class="flex flex-col items-center justify-center">
      <div class="mb-8 text-center">
        <h1 class="font-bold text-zinc-900">Connectez-vous</h1>
        <p>
          Ou
          <nuxt-link to="/inscription">créer un compte</nuxt-link>
        </p>
      </div>
      <form
        class="flex w-auto min-w-[320px] flex-col gap-4 rounded-lg bg-white px-6 py-4 shadow-lg"
        ref="loginForm"
        @submit.prevent="login(event)">
        <div class="form-group">
          <label
            class="form-label"
            for="email">
            Courriel
            <span class="text-red-500">*</span>
          </label>
          <input
            class="form-input"
            id="email"
            type="email"
            required />
        </div>
        <div class="form-group">
          <label
            class="form-label"
            for="password">
            Mot de passe
            <span class="text-red-500">*</span>
          </label>
          <input
            class="form-input"
            id="password"
            type="password"
            minlength="8"
            required />
        </div>
        <p>
          <nuxt-link to="/mot-de-passe-oublie">Mot de passe oublié?</nuxt-link>
        </p>
        <button
          class="btn-primary w-full"
          type="submit">
          Connexion
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
// States
const loginForm = ref(null);
const isSent = useState("isSent", () => false);
const isLoading = useState("isLoading", () => false);
const isSuccess = useState("isSuccess", () => false);

const login = async () => {
  // Set States
  isSent.value = true;
  isLoading.value = true;

  try {
    // Firebase Composable
    const credentials = await useSignIn(loginForm.value.email.value, loginForm.value.password.value);
    if (credentials?.user?.uid) {
      isSuccess.value = true;
      navigateTo("generateur");
    } else {
      isSuccess.value = false;
      addNotification("<strong class='text-red-500'>Une erreure est survenue</strong>");
    }
  } catch (error) {
    isSuccess.value = false;
    addNotification(`<strong class='text-red-500'>${error.message}</strong>`);
  } finally {
    isLoading.value = false;
  }
};
</script>
