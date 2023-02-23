<template>
  <section class="py-32">
    <div class="flex flex-col items-center justify-center">
      <div class="mb-8 text-center">
        <h1 class="font-bold text-zinc-900">Mot de passe oublie?</h1>
        <p>
          Ou
          <nuxt-link to="connexion">connectez-vous</nuxt-link>
        </p>
      </div>
      <form class="flex w-auto min-w-[320px] flex-col gap-4 rounded-lg bg-white px-6 py-4 shadow-lg">
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
        <button
          class="btn-primary w-full"
          type="submit">
          Réinitialiser mon mot de passe
        </button>
      </form>
    </div>
  </section>
</template>
