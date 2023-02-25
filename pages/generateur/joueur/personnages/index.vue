<template>
  <section class="">
    <div class="main-section">
      <div class="my-8">
        <h2 class="mb-4 text-2xl font-bold">Mes personnages</h2>
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
                  <!-- <nuxt-link :to="`/generateur/joueur/personnages/${personnage.id}`">
                      <IconPencilSquare :class="`h-6 w-6 fill-primary transition-colors hover:fill-accent`" />
                    </nuxt-link>
                    <button @click="openModal(personnage)">
                      <IconTrash :class="`h-6 w-6 fill-primary transition-colors hover:fill-accent`" />
                    </button> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ["joueur"],
});
const user = useFirebaseUser();
const personnages = ref([]);
const { data } = await useFetch(`/api/personnages?userId=${user.value.uid}`);
personnages.value = data.value;
</script>
