<template>
  <header class="px-main flex justify-between border-b border-accent bg-gradient-to-br from-zinc-900 to-primary py-8 shadow-2xl">
    <nuxt-link to="/">
      <NuxtImg
        class="h-auto w-28"
        src="/img/logo-white.png"
        alt="Mythall"
        width="1462"
        height="502"
        format="webp" />
    </nuxt-link>
    <nav class="flex items-center justify-center gap-4">
      <NuxtLink
        class="border-b border-accent border-transparent font-bold text-white transition-colors hover:border-accent hover:text-accent"
        to="https://www.dropbox.com/s/xiq6apwh94ctojh/6-Bible%20de%20Mythall%20V3.5.pdf?dl=0"
        target="_blank">
        Bible
      </NuxtLink>
      <ClientOnly>
        <NuxtLink
          class="border-b border-accent border-transparent font-bold text-white transition-colors hover:border-accent hover:text-accent"
          to="/generateur">
          Générateur
        </NuxtLink>
        <NuxtLink
          v-if="!firebaseUser"
          class="border-b border-accent border-transparent font-bold text-white transition-colors hover:border-accent hover:text-accent"
          to="/connexion">
          Connexion
        </NuxtLink>
        <NuxtLink
          v-if="!firebaseUser"
          class="border-b border-accent border-transparent font-bold text-white transition-colors hover:border-accent hover:text-accent"
          to="/inscription">
          Inscription
        </NuxtLink>
        <button
          v-if="firebaseUser"
          @click="logout()"
          class="border-b border-accent border-transparent font-bold text-white transition-colors hover:border-accent hover:text-accent">
          Déconnexion
        </button>
      </ClientOnly>
    </nav>
  </header>
</template>

<script setup>
const firebaseUser = useFirebaseUser();
const logout = async () => await useSignOut();
</script>
