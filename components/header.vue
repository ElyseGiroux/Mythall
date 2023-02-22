<template>
  <header class="px-main flex justify-between bg-primary py-8">
    <nuxt-link to="/">
      <nuxt-img
        class="h-auto w-28"
        src="/img/logo-white.png"
        alt="Mythall"
        width="1462"
        height="502"
        format="webp" />
    </nuxt-link>
    <nav class="flex items-center justify-center gap-4">
      <NuxtLink
        class="font-bold text-white transition-colors hover:text-accent"
        to="https://www.dropbox.com/s/xiq6apwh94ctojh/6-Bible%20de%20Mythall%20V3.5.pdf?dl=0"
        target="_blank">
        Bible
      </NuxtLink>
      <NuxtLink
        class="font-bold text-white transition-colors hover:text-accent"
        to="connexion">
        Connexion
      </NuxtLink>
      <NuxtLink
        class="font-bold text-white transition-colors hover:text-accent"
        to="inscription">
        Inscription
      </NuxtLink>
      <NuxtLink
        class="font-bold text-white transition-colors hover:text-accent"
        to="generateur">
        Générateur
      </NuxtLink>
    </nav>
  </header>
</template>
