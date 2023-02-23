<template>
  <section class="main-section">
    <h1 class="my-8">{{ title }}</h1>
    <p class="mb-8">
      <NuxtLink
        class="btn-secondary"
        to="/generateur/organisateur/sorts">
        Retour à la liste des sorts
      </NuxtLink>
    </p>
    <form
      v-if="sort"
      @submit.prevent="submit()"
      class="card flex w-auto min-w-[320px] flex-col gap-4 bg-white">
      <div class="form-group">
        <label for="nom">
          Nom
          <span class="text-red-500">*</span>
        </label>
        <input
          v-model="sort.nom"
          class="form-input"
          id="nom"
          type="text"
          required />
      </div>
      <div class="form-group">
        <label for="niveau">
          Niveau
          <span class="text-red-500">*</span>
        </label>
        <input
          v-model="sort.niveau"
          class="form-input"
          id="niveau"
          type="text"
          required />
      </div>
      <div class="form-group">
        <label for="incantation">
          Incantation
          <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="sort.incantation"
          class="form-input"
          id="incantation"
          type="text"
          required></textarea>
      </div>
      <div class="form-group">
        <label for="sommaire">
          Sommaire
          <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="sort.sommaire"
          class="form-input"
          id="sommaire"
          type="text"
          required></textarea>
      </div>
      <div class="form-group">
        <label for="description">
          Description
          <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="sort.description"
          class="form-input"
          id="description"
          type="text"
          required></textarea>
      </div>
      <div class="form-group">
        <label for="ecoles">
          École
          <span class="text-red-500">*</span>
        </label>
        <select
          v-model="sort.ecoleRef"
          class="form-input"
          id="ecoles"
          required>
          <option
            disabled
            selected></option>
          <option
            v-for="ecole in ecoles"
            :value="ecole.id">
            {{ ecole.nom }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="porte">
          Porté
          <span class="text-red-500">*</span>
        </label>
        <input
          v-model="sort.porte"
          class="form-input"
          id="porte"
          type="text"
          required />
      </div>
      <div class="form-group">
        <label for="duree">
          Durée
          <span class="text-red-500">*</span>
        </label>
        <input
          v-model="sort.duree"
          class="form-input"
          id="duree"
          type="text"
          required />
      </div>
      <div class="form-group">
        <label for="zone">
          Zone d'effet
          <span class="text-red-500">*</span>
        </label>
        <input
          v-model="sort.zone"
          class="form-input"
          id="zone"
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
const sort = ref<Sort | null>({} as Sort);
const isLoading = useIsLoading();

// Set Creation or Modification based of params id "creation"
const creation = route.params.id == "creation" ? true : false;
const title = ref(creation ? "Création de sort" : "Modification de sort");

// Fetch Data
if (!creation) {
  const { data } = await useFetch(`/api/sorts/${route.params.id}`);
  sort.value = data.value;
}
const { data: ecoles } = await useFetch(`/api/ecoles`); // Fill Ecoles options

// Events
const submit = async () => {
  // Set loading state
  isLoading.value = true;

  // Post data
  const { data: res } = await useFetch(`/api/sorts/${route.params.id}`, {
    method: "POST",
    body: {
      sort: sort.value,
    },
  });

  // Set loading state
  isLoading.value = false;

  // Result
  if (res.value === true) {
    navigateTo("/generateur/organisateur/sorts");
    addNotification(
      `Le sort <strong>${sort.value?.nom}</strong> à <strong>${
        creation ? "été créé" : "été mis jour"
      }</strong> avec <strong class='text-green-500'>succès</strong>!`
    );
  } else {
    addNotification("<strong class='text-red-500'>Une erreure est survenue, veuillez réssayer ou contacter un administrateur.</strong>");
  }
};
</script>
