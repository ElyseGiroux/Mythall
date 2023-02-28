<template>
  <section class="main-section">
    <h1>{{ title }}</h1>
    <div class="mt-6 mb-10">
      <NuxtLink
        class="btn-primary"
        to="/generateur/animateur/personnages">
        Retour à la liste des personnages
      </NuxtLink>
    </div>
    <form
      ref="form"
      v-if="personnage"
      @submit.prevent="submit()"
      class="card flex w-auto min-w-[320px] flex-col gap-4 bg-white">
      <Tabs
        :tabs="tabs"
        :currentTab="currentTab"
        @updateTab="(tab) => (currentTab = tab)" />

      <!-- Personnage -->
      <div
        v-show="currentTab == 'personnage'"
        class="flex flex-col gap-4">
        <div class="form-group">
          <label for="nom">
            Nom
            <span class="text-red-500">*</span>
          </label>
          <input
            v-model="personnage.nom"
            class="form-input"
            id="nom"
            type="text"
            required />
        </div>
        <div class="form-group">
          <label for="joueur">
            Joueur
            <span class="text-red-500">*</span>
          </label>
          <select
            v-model="personnage.userRef"
            class="form-input"
            id="joueur"
            required>
            <option
              disabled
              selected></option>
            <option
              v-for="user in users"
              :value="user.uid">
              {{ user.displayname }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="race">
            Race
            <span class="text-red-500">*</span>
          </label>
          <select
            v-model="personnage.raceRef"
            class="form-input"
            id="race"
            required>
            <option
              disabled
              selected></option>
            <option
              v-for="race in races"
              :value="race.id">
              {{ race.nom }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="alignement">
            Alignement
            <span class="text-red-500">*</span>
          </label>
          <select
            v-model="personnage.alignementRef"
            class="form-input"
            id="alignement"
            required>
            <option
              disabled
              selected></option>
            <option
              v-for="alignement in alignements"
              :value="alignement.id">
              {{ alignement.nom }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="divinite">
            Divinité
            <span class="text-red-500">*</span>
          </label>
          <select
            v-model="personnage.dieuRef"
            class="form-input"
            id="divinite"
            required>
            <option
              disabled
              selected></option>
            <option
              v-for="divinite in divinites"
              :value="divinite.id">
              {{ divinite.nom }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="ecoles">Domaines</label>
          <select
            v-model="personnage.domainesRef"
            class="form-input"
            id="ecoles"
            multiple>
            <option
              v-for="domaine in domaines"
              :value="domaine.id">
              {{ domaine.nom }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="ecoles">École</label>
          <select
            v-model="personnage.ecoleRef"
            class="form-input"
            id="ecoles">
            <option selected></option>
            <option
              v-for="ecole in ecoles"
              :value="ecole.id">
              {{ ecole.nom }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="esprit">Esprit patron</label>
          <select
            v-model="personnage.espritRef"
            class="form-input"
            id="esprit">
            <option selected></option>
            <option
              v-for="esprit in esprits"
              :value="esprit.id">
              {{ esprit.nom }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="ordre">Ordre(s)</label>
          <select
            v-model="personnage.ordresRef"
            class="form-input"
            id="ordre"
            multiple>
            <option
              v-for="ordre in ordres"
              :value="ordre.id">
              {{ ordre.nom }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="vie">
            Vie
            <span class="text-red-500">*</span>
          </label>
          <input
            v-model="personnage.vie"
            class="form-input"
            id="vie"
            type="number"
            min="0"
            required />
        </div>
        <div class="form-group">
          <label for="gnEffectif">
            GN Effectif(s)
            <span class="text-red-500">*</span>
          </label>
          <input
            v-model="personnage.gnEffectif"
            class="form-input"
            id="gnEffectif"
            type="number"
            min="0"
            required />
        </div>
        <button
          :disabled="!form?.checkValidity() || isLoading"
          class="btn-primary"
          type="submit">
          Envoyer
        </button>
      </div>

      <!--Classes-->
      <div
        v-show="currentTab == 'classes'"
        class="flex flex-col gap-4">
        <div
          v-for="(classeItem, i) of personnage.classes"
          class="flex flex-row gap-4">
          <div class="form-group">
            <label :for="`classeRef-${i}`">
              Classe
              <span class="text-red-500">*</span>
            </label>
            <select
              v-model="classeItem.classeRef"
              class="form-input"
              :id="`classeRef-${i}`"
              required>
              <option
                v-for="classe in classes"
                :value="classe.id"
                selected>
                {{ classe.nom }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label :for="`classe-niveau-${i}`">
              Niveau
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="classeItem.niveau"
              class="form-input"
              :id="`classe-niveau-${i}`"
              type="number"
              min="0"
              max="25"
              required />
          </div>
          <div class="form-group">
            <label>Action(s)</label>
            <button
              @click="personnage?.classes?.splice(i, 1)"
              class="btn-secondary group flex justify-center hover:cursor-pointer">
              <IconTrash class="h-6 w-6 fill-primary transition-colors group-hover:fill-accent group-focus:fill-accent" />
            </button>
          </div>
        </div>
        <button
          @click="personnage?.classes?.push({ niveau: 0 } as ClasseItem)"
          class="btn-secondary group flex justify-center hover:cursor-pointer">
          <iconPlus class="h-6 w-6 fill-primary transition-colors group-hover:fill-accent group-focus:fill-accent" />
        </button>
      </div>

      <!--Dons-->
      <div
        v-show="currentTab == 'dons'"
        class="flex flex-col gap-4">
        <div
          v-for="(donItem, i) of personnage.dons"
          class="flex flex-row gap-4">
          <div class="form-group">
            <label :for="`donRef-${i}`">
              Don
              <span class="text-red-500">*</span>
            </label>
            <select
              v-model="donItem.donRef"
              class="form-input"
              :id="`donRef-${i}`"
              required>
              <option
                v-for="don in dons"
                :value="don.id"
                selected>
                {{ don.nom }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label :for="`don-niveauObtention-${i}`">
              Niveau d'obtention
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="donItem.niveauObtention"
              class="form-input"
              :id="`don-niveauObtention-${i}`"
              type="number"
              min="0"
              max="25"
              required />
          </div>
          <div class="form-group">
            <label>Action(s)</label>
            <button
              @click="personnage?.dons?.splice(i, 1)"
              class="btn-secondary group flex justify-center hover:cursor-pointer">
              <IconTrash class="h-6 w-6 fill-primary transition-colors group-hover:fill-accent" />
            </button>
          </div>
        </div>
        <button
          @click="personnage?.dons?.push({ niveauObtention: 1 } as DonItem)"
          class="btn-secondary group flex justify-center hover:cursor-pointer">
          <iconPlus class="h-6 w-6 fill-primary transition-colors group-hover:fill-accent" />
        </button>
      </div>

      <!--Sorts-->
      <div
        v-show="currentTab == 'sorts'"
        class="flex flex-col gap-4">
        <div
          v-for="(sortItem, i) of personnage.sorts"
          class="flex flex-row gap-4">
          <div class="form-group">
            <label :for="`sort-niveauObtention-${i}`">
              Sort
              <span class="text-red-500">*</span>
            </label>
            <select
              v-model="sortItem.sortRef"
              class="form-input"
              :id="`sort-niveauObtention-${i}`"
              required>
              <option
                v-for="sort in sorts"
                :value="sort.id"
                selected>
                {{ sort.nom }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label :for="`sort-niveauObtention-${i}`">
              Niveau d'obtention
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="sortItem.niveauObtention"
              class="form-input"
              :id="`sort-niveauObtention-${i}`"
              type="number"
              min="0"
              max="25"
              required />
          </div>
          <div class="form-group">
            <label>Action(s)</label>
            <button
              @click="personnage?.sorts?.splice(i, 1)"
              class="btn-secondary group flex justify-center hover:cursor-pointer">
              <IconTrash class="h-6 w-6 fill-primary transition-colors group-hover:fill-accent" />
            </button>
          </div>
        </div>
        <button
          @click="personnage?.sorts?.push({ niveauObtention: 1 } as SortItem)"
          class="btn-secondary group flex justify-center hover:cursor-pointer">
          <iconPlus class="h-6 w-6 fill-primary transition-colors group-hover:fill-accent" />
        </button>
      </div>

      <!--Aptitudes-->
      <div
        v-show="currentTab == 'aptitudes'"
        class="flex flex-col gap-4">
        <div
          v-for="(aptitudeItem, i) of personnage.aptitudes"
          class="flex flex-row gap-4">
          <div class="form-group">
            <label :for="`aptitudeRef-${i}`">
              Aptitude
              <span class="text-red-500">*</span>
            </label>
            <select
              v-model="aptitudeItem.aptitudeRef"
              class="form-input"
              :id="`aptitudeRef-${i}`"
              required>
              <option
                v-for="aptitude in aptitudes"
                :value="aptitude.id"
                selected>
                {{ aptitude.nom }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label :for="`aptitude-niveauObtention-${i}`">
              Niveau d'obtention
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="aptitudeItem.niveauObtention"
              class="form-input"
              :id="`aptitude-niveauObtention-${i}`"
              type="number"
              min="0"
              max="25"
              required />
          </div>
          <div class="form-group">
            <label>Action(s)</label>
            <button
              @click="personnage?.aptitudes?.splice(i, 1)"
              class="btn-secondary group flex justify-center hover:cursor-pointer">
              <IconTrash class="h-6 w-6 fill-primary transition-colors group-hover:fill-accent" />
            </button>
          </div>
        </div>
        <button
          @click="personnage?.aptitudes?.push({ niveauObtention: 1 } as AptitudeItem)"
          class="btn-secondary group flex justify-center hover:cursor-pointer">
          <iconPlus class="h-6 w-6 fill-primary transition-colors group-hover:fill-accent" />
        </button>
      </div>

      <!--Fourberies-->
      <div
        v-show="currentTab == 'fourberies'"
        class="flex flex-col gap-4">
        <div
          v-for="(fourberieItem, i) of personnage.fourberies"
          class="flex flex-row gap-4">
          <div class="form-group">
            <label :for="`fourberieRef-${i}`">
              Fourberie
              <span class="text-red-500">*</span>
            </label>
            <select
              v-model="fourberieItem.fourberieRef"
              class="form-input"
              :id="`fourberieRef-${i}`"
              required>
              <option
                v-for="fourberie in fourberies"
                :value="fourberie.id"
                selected>
                {{ fourberie.nom }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label :for="`fourberie-niveauObtention-${i}`">
              Niveau d'obtention
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="fourberieItem.niveauObtention"
              class="form-input"
              :id="`fourberie-niveauObtention-${i}`"
              type="number"
              min="0"
              max="25"
              required />
          </div>
          <div class="form-group">
            <label>Action(s)</label>
            <button
              @click="personnage?.fourberies?.splice(i, 1)"
              class="btn-secondary group flex justify-center hover:cursor-pointer">
              <IconTrash class="h-6 w-6 fill-primary transition-colors group-hover:fill-accent" />
            </button>
          </div>
        </div>
        <button
          @click="personnage?.fourberies?.push({ niveauObtention: 1 } as FourberieItem)"
          class="btn-secondary group flex justify-center hover:cursor-pointer">
          <iconPlus class="h-6 w-6 fill-primary transition-colors group-hover:fill-accent" />
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["animateur"],
});

// Set Refs
// const form = ref<FormData>();
const form: Ref<HTMLFormElement | undefined> = ref();
const route = useRoute();
const personnage = ref<Personnage | null>({
  domainesRef: [] as string[],
  ordresRef: [] as string[],
} as Personnage);
const isLoading = useIsLoading();
const loadingMessage = useLoadingMessage();
const tabs: Ref<Tab[]> = ref([
  { name: "Personnage", link: "personnage" },
  { name: "Classe(s)", link: "classes" },
  { name: "Don(s)", link: "dons" },
  { name: "sort(s)", link: "sorts" },
  { name: "Aptitude(s)", link: "aptitudes" },
  { name: "Fourberie(s)", link: "fourberies" },
]);
const currentTab = ref("personnage");

// Set Creation or Modification based of params id "creation"
const creation = route.params.id == "creation" ? true : false;
const title = ref(creation ? "Création de personnage" : "Modification de personnage");

// Fetch Data
if (!creation) {
  isLoading.value = true;
  loadingMessage.value = "Téléchargement du personnage...";
  const { data } = await useFetch(`/api/personnages/${route.params.id}`);
  personnage.value = data.value;
}

isLoading.value = true;
loadingMessage.value = "Téléchargement des listes...";

const { data: users } = await useFetch(`/api/users`);
const { data: races } = await useFetch(`/api/races`);
const { data: alignements } = await useFetch(`/api/alignements`);
const { data: divinites } = await useFetch(`/api/divinites`);
const { data: domaines } = await useFetch(`/api/domaines`);
const { data: ecoles } = await useFetch(`/api/ecoles`);
const { data: esprits } = await useFetch(`/api/esprits`);
const { data: ordres } = await useFetch(`/api/ordres`);
const { data: classes } = await useFetch(`/api/classes`);
const { data: dons } = await useFetch(`/api/dons`);
const { data: sorts } = await useFetch(`/api/sorts`);
const { data: aptitudes } = await useFetch(`/api/aptitudes`);
const { data: fourberies } = await useFetch(`/api/fourberies`);

isLoading.value = false;

// Events
const submit = async () => {
  console.log(form.value?.checkValidity());

  // Set loading state
  isLoading.value = true;
  loadingMessage.value = "Sauvegarde du personnage...";

  // Post data
  const { data: res } = await useFetch(`/api/personnages/${route.params.id}`, {
    method: "POST",
    body: {
      personnage: personnage.value,
    },
  });

  // Set loading state
  isLoading.value = false;

  // Result
  if (res.value === true) {
    navigateTo("/generateur/animateur/personnages");
    addNotification(
      `Le personnage <strong>${personnage.value?.nom}</strong> à <strong>${
        creation ? "été créé" : "été mis jour"
      }</strong> avec <strong class='text-green-500'>succès</strong>!`
    );
  } else {
    addNotification("<strong class='text-red-500'>Une erreure est survenue, veuillez réssayer ou contacter un administrateur.</strong>");
  }
};
</script>
