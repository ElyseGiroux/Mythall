<template>
  <Modal
    :isOpen="isOpen"
    :message="message"
    @cancel="cancel()"
    @confirm="confirm()" />
  <section class="main-section">
    <h1>Liste des sorts</h1>
    <div class="my-8">
      <nuxt-link
        class="btn-secondary"
        to="/generateur/organisateur/sorts/creation">
        Création de sort
      </nuxt-link>
    </div>
    <div class="card my-8 overflow-x-auto bg-white">
      <table class="w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
              Nom
            </th>
            <th
              scope="col"
              class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
              Action(s)
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="sort in sorts"
            :key="sort.id">
            <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ sort.nom }}</td>
            <td class="flex gap-4 whitespace-nowrap py-4 px-3 text-sm text-gray-500">
              <nuxt-link :to="`/generateur/joueur/sorts/${sort.id}`">
                <IconEye :class="`h-6 w-6 fill-primary transition-colors hover:fill-accent`" />
              </nuxt-link>
              <nuxt-link :to="`/generateur/organisateur/sorts/${sort.id}`">
                <IconPencilSquare :class="`h-6 w-6 fill-primary transition-colors hover:fill-accent`" />
              </nuxt-link>
              <button @click="openModal(sort)">
                <IconTrash :class="`h-6 w-6 fill-primary transition-colors hover:fill-accent`" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["organisateur"],
});

// Data
const { data: sorts } = await useFetch<Sort[]>("/api/sorts");

// Refs
const isOpen = ref(false);
const isLoading = useIsLoading();
const message = ref("");
const selectedSort = ref<Sort | null>(null);

// Events
const openModal = (sort: Sort) => {
  isOpen.value = true;
  selectedSort.value = sort;
  message.value = `Êtes-vous certain(e) de vouloir <strong>supprimer</strong> de façon <strong>définitive</strong> le sort <strong>${selectedSort.value.nom}</strong> ?`;
};

const cancel = () => {
  isOpen.value = false;
  selectedSort.value = null;
};

const confirm = async () => {
  // Update States
  isOpen.value = false;
  isLoading.value = true;

  // Send Delete Request
  if (selectedSort.value?.id) {
    const { data: res } = await useFetch(`/api/sorts/${selectedSort.value.id}`, {
      method: "DELETE",
    });

    if (res.value === true) {
      sorts.value = sorts.value?.filter((s) => s.id != selectedSort.value?.id) as Sort[];
      addNotification(
        `Le sort <strong>${selectedSort.value.nom}</strong> à été <strong>supprimé</strong> avec <strong class='text-green-500'>succès</strong>!`
      );
    } else {
      addNotification("<strong class='text-red-500'>Une erreure est survenue.</strong>");
    }
  } else {
    addNotification("<strong class='text-red-500'>Une erreure est survenue.</strong>");
  }

  // Update States
  isLoading.value = false;
};
</script>
