<template>
  <Modal
    :isOpen="isOpen"
    :message="message"
    @cancel="cancel()"
    @confirm="confirm()" />
  <section class="main-section">
    <div class="my-8">
      <h2 class="mb-4 text-2xl font-bold">Liste des personnages</h2>
      <div class="mt-6 mb-10">
        <NuxtLink
          class="btn-primary"
          to="/generateur/animateur/personnages/creation">
          Ajout de personnage (DM)
        </NuxtLink>
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
              v-for="personnage in personnages"
              :key="personnage.id">
              <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ personnage.nom }}</td>
              <td class="flex gap-4 whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                <nuxt-link :to="`/generateur/joueur/personnages/${personnage.id}`">
                  <IconEye :class="`h-6 w-6 fill-primary transition-colors hover:fill-accent`" />
                </nuxt-link>
                <nuxt-link :to="`/generateur/animateur/personnages/${personnage.id}`">
                  <IconPencilSquare :class="`h-6 w-6 fill-primary transition-colors hover:fill-accent`" />
                </nuxt-link>
                <button @click="openModal(personnage)">
                  <IconTrash :class="`h-6 w-6 fill-primary transition-colors hover:fill-accent`" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["joueur"],
});

// Refs
const isOpen = ref(false);
const message = ref("");
const selectedPersonnage = ref<Personnage | null>(null);

// Data
updateLoading(true, "Téléchargement des personnages...");
const { data: personnages } = await useFetch(`/api/personnages`);
updateLoading(false);

// Events
const openModal = (personnage: Personnage) => {
  isOpen.value = true;
  selectedPersonnage.value = personnage;
  message.value = `Êtes-vous certain(e) de vouloir <strong>supprimer</strong> de façon <strong>définitive</strong> le personnage <strong>${selectedPersonnage.value.nom}</strong> ?`;
};

const cancel = () => {
  isOpen.value = false;
  selectedPersonnage.value = null;
};

const confirm = async () => {
  // Update States
  isOpen.value = false;
  updateLoading(true, "Supression du personnages...");

  // Send Delete Request
  if (selectedPersonnage.value?.id) {
    const { data: res } = await useFetch(`/api/personnages/${selectedPersonnage.value.id}`, {
      method: "DELETE",
    });

    if (res.value === true) {
      personnages.value = personnages.value?.filter((s) => s.id != selectedPersonnage.value?.id) as Personnage[];
      addNotification(
        `Le personnage <strong>${selectedPersonnage.value.nom}</strong> à été <strong>supprimé</strong> avec <strong class='text-green-500'>succès</strong>!`
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
