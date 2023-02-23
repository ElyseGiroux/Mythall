<template>
  <section class="main-section">
    <h1 class="my-8">{{ title }}</h1>
    <p class="mb-8">
      <NuxtLink
        class="btn-secondary"
        to="/generateur/organisateur/ecoles">
        Retour à la liste des écoles
      </NuxtLink>
    </p>
    <form
      v-if="ecole"
      @submit.prevent="submit()"
      class="card flex w-auto min-w-[320px] flex-col gap-4 bg-white">
      <div class="form-group">
        <label for="nom">
          Nom
          <span class="text-red-500">*</span>
        </label>
        <input
          v-model="ecole.nom"
          class="form-input"
          id="nom"
          type="text"
          required />
      </div>
      <button
        :disabled="isLoading"
        class="btn-primary"
        type="submit">
        Envoyer
      </button>
    </form>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["organisateur"],
});

// Set Refs
const route = useRoute();
const ecole = ref<Ecole | null>({} as Ecole);
const isLoading = useIsLoading();

// Set Creation or Modification based of params id "creation"
const creation = route.params.id == "creation" ? true : false;
const title = ref(creation ? "Création d'une école" : "Modification d'une école");

// Fetch Data
if (!creation) {
  const { data } = await useFetch(`/api/ecoles/${route.params.id}`);
  ecole.value = data.value;
}

// Events
const submit = async () => {
  // Set loading state
  isLoading.value = true;

  // Post data
  const { data: res } = await useFetch(`/api/ecoles/${route.params.id}`, {
    method: "POST",
    body: {
      ecole: ecole.value,
    },
  });

  // Set loading state
  isLoading.value = false;

  // Result
  if (res.value === true) {
    navigateTo("/generateur/organisateur/ecoles");
    addNotification(
      `L'école <strong>${ecole.value?.nom}</strong> à été <strong>${
        creation ? "créé" : "mise jour"
      }</strong> avec <strong class='text-green-500'>succès</strong>!`
    );
  } else {
    addNotification("<strong class='text-red-500'>Une erreure est survenue, veuillez réssayer ou contacter un administrateur.</strong>");
  }
};
</script>
