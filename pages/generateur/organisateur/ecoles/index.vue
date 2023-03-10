<template>
  <Modal
    :isOpen="isOpen"
    :message="message"
    @cancel="cancel()"
    @confirm="confirm()" />
  <section class="main-section">
    <h1 class="my-8">Liste des écoles</h1>
    <div class="my-8">
      <nuxt-link
        class="btn-secondary"
        to="/generateur/organisateur/ecoles/creation">
        Création d'une école
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
            v-for="ecole in ecoles"
            :key="ecole.id">
            <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ ecole.nom }}</td>
            <td class="flex gap-4 whitespace-nowrap py-4 px-3 text-sm text-gray-500">
              <nuxt-link :to="`/generateur/organisateur/ecoles/${ecole.id}`">
                <IconPencilSquare :class="`h-6 w-6 fill-primary transition-colors hover:fill-accent`" />
              </nuxt-link>
              <button @click="openModal(ecole)">
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
const { data: ecoles } = await useFetch<Ecole[]>("/api/ecoles");

// Refs
const isOpen = ref(false);
const message = ref("");
const selectedEcole = ref<Ecole | null>(null);

// Events
const openModal = (ecole: Ecole) => {
  isOpen.value = true;
  selectedEcole.value = ecole;
  message.value = `Êtes-vous certain(e) de vouloir <strong>supprimer</strong> de façon <strong>définitive</strong> l'école <strong>${selectedEcole.value.nom}</strong> ?`;
};

const cancel = () => {
  isOpen.value = false;
  selectedEcole.value = null;
};

const confirm = async () => {
  // Update States
  isOpen.value = false;
  updateLoading(true);

  // Send Delete Request
  if (selectedEcole.value?.id) {
    const { data: res } = await useFetch(`/api/ecoles/${selectedEcole.value.id}`, {
      method: "DELETE",
    });

    if (res.value === true) {
      ecoles.value = ecoles.value?.filter((s) => s.id != selectedEcole.value?.id) as Ecole[];
      addNotification(
        `Le ecole <strong>${selectedEcole.value.nom}</strong> à été <strong>supprimé</strong> avec <strong class='text-green-500'>succès</strong>!`
      );
    } else {
      addNotification("<strong class='text-red-500'>Une erreure est survenue.</strong>");
    }
  } else {
    addNotification("<strong class='text-red-500'>Une erreure est survenue.</strong>");
  }

  // Update States
  updateLoading(false);
};
</script>
