<template>
  <section class="py-32">
    <div class="flex flex-col items-center justify-center">
      <div class="mb-8 text-center">
        <h1 class="font-bold text-zinc-900">Créer un compte</h1>
        <p>
          Ou
          <a href="connexion">connectez-vous</a>
        </p>
      </div>
      <form class="flex w-auto min-w-[320px] flex-col gap-4 rounded-lg bg-white px-6 py-4 shadow-lg">
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="form-group">
            <label for="firstname">
              Prénom
              <span class="text-red-500">*</span>
            </label>
            <input
              class="form-input"
              id="firstname"
              type="text"
              required />
          </div>
          <div class="form-group">
            <label for="lastname">
              Nom
              <span class="text-red-500">*</span>
            </label>
            <input
              class="form-input"
              id="lastname"
              type="text"
              required />
          </div>
        </div>
        <div class="form-group">
          <label for="birthdate">
            Date de naissance
            <span class="text-red-500">*</span>
          </label>
          <input
            class="form-input"
            id="birthdate"
            type="date"
            required />
        </div>
        <div class="form-group">
          <label for="email">
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
          <label for="password">
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
        <div class="form-group">
          <label for="confirm">
            Confirmer le mot de passe
            <span class="text-red-500">*</span>
          </label>
          <input
            class="form-input"
            id="confirm"
            type="password"
            minlength="8"
            required />
        </div>
        <button
          class="btn-primary"
          type="submit">
          S'enregistrer
        </button>
      </form>
    </div>
  </section>
</template>
