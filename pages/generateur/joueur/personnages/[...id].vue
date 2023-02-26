<template>
  <section class="main-section my-8">
    <p class="mb-8">
      <NuxtLink to="/generateur/joueur/personnages">Retour à la liste des personnages</NuxtLink>
    </p>

    <div
      v-if="personnage"
      class="card bg-white">
      <!--Informations-->
      <div>
        <h2>
          <strong>Informations</strong>
        </h2>
        <div class="grid md:grid-cols-2 md:gap-4">
          <div class="flex flex-col">
            <!--Joueur-->
            <div>
              <strong class="mr-1">Joueur:</strong>
              <span>{{ personnage?.user?.displayname }}</span>
            </div>

            <!--Nom-->
            <div>
              <strong class="mr-1">Nom du Personnage:</strong>
              <span>{{ personnage.nom }}</span>
            </div>

            <!--Race-->
            <div>
              <strong class="mr-1">Race:</strong>
              <span>{{ personnage?.race?.nom }}</span>
            </div>

            <!--Alignement-->
            <div>
              <strong class="mr-1">Alignement:</strong>
              <span>{{ personnage?.alignement?.nom }}</span>
            </div>

            <!--Niveaux-->
            <div v-if="personnage.classes">
              <strong class="mr-1">Niveau:</strong>
              <span>{{ personnage.classes.map((ci) => `${ci?.classe?.nom} (${ci?.niveau})`).join(", ") }}</span>
            </div>

            <!--Niveau Effectif-->
            <div>
              <strong class="mr-1">Niveau Effectif:</strong>
              <span>{{ personnage.niveauEffectif }}</span>
              <span
                class="ml-1"
                v-if="personnage.niveauDivin">
                Divin ({{ personnage.niveauDivin }})
              </span>
              <span
                class="ml-1"
                v-if="personnage.niveauProfane">
                Profane ({{ personnage.niveauProfane }})
              </span>
            </div>
          </div>

          <div class="flex flex-col">
            <!--Vie(s)-->
            <div>
              <strong class="mr-1">Vie(s):</strong>
              <span>{{ personnage.vie }}</span>
            </div>

            <!--Divinité-->
            <div>
              <strong class="mr-1">Divinité:</strong>
              <span>{{ personnage?.divinite?.nom }}</span>
            </div>

            <!--Ecole-->
            <div class="hidden">
              <strong class="mr-1">École:</strong>
              <span>{{ personnage?.ecole?.nom }}</span>
            </div>

            <!--Domaines-->
            <div class="hidden">
              <strong class="mr-1">Domaines:</strong>
              <span id="domaine"></span>
            </div>

            <!--Ordres-->
            <div v-if="personnage.ordres && personnage.ordres.length > 0">
              <strong class="mr-1">Ordre(s):</strong>
              <span>{{ personnage.ordres.map((o) => `${o.nom}`).join(", ") }}</span>
            </div>

            <!--Esprit-->
            <div v-if="personnage.esprit">
              <strong class="mr-1">Esprit Patron:</strong>
              <span>{{ personnage?.esprit?.nom }}</span>
            </div>

            <!--Niveau Disponible-->
            <div v-if="personnage.niveauDisponible && personnage.niveauDisponible > 0">
              <strong class="mr-1">Niveau Disponible:</strong>
              <span>{{ personnage?.niveauDisponible }}</span>
            </div>
          </div>
        </div>
      </div>

      <!--Statistique-->
      <div>
        <h2>
          <strong>Statistiques</strong>
        </h2>

        <div class="grid gap-4 md:grid-cols-2">
          <div
            id="statistiquesBase"
            class="flex flex-col"></div>
          <div
            id="statistiqueSpecialise"
            class="flex flex-col"></div>
        </div>
      </div>

      <!--Résistances & Immunités-->
      <div class="grid gap-4 md:grid-cols-2">
        <div
          id="resistancesSection"
          class="hidden">
          <h2>
            <strong>Résistance(s)</strong>
          </h2>
          <div
            id="resistances"
            class="flex flex-col"></div>
        </div>
        <div
          id="immunitesSection"
          class="hidden">
          <h2>
            <strong>Immunité(s)</strong>
          </h2>
          <div
            id="immunites"
            class="flex flex-col"></div>
        </div>
      </div>

      <!--Capacité(s) Spéciale(s)-->
      <div
        id="capacitesSpecialesSection"
        class="hidden">
        <h2>
          <strong>Capacité(s) Spéciale(s)</strong>
        </h2>
        <div
          id="capacitesSpeciales"
          class="flex flex-col"></div>
      </div>

      <!--Dons(s)-->
      <div>
        <template id="templateDon">
          <div class="flex flex-col">
            <p>
              <strong id="donNom"></strong>
              <span id="donNiveau"></span>
            </p>
            <span id="donDescription"></span>
          </div>
        </template>

        <h2><strong>Dons</strong></h2>
        <div
          id="dons"
          class="personnge__dons"></div>
      </div>

      <!--Aptitudes(s)-->
      <div
        id="aptitudesSection"
        class="hidden">
        <template id="templateAptitude">
          <div class="flex flex-col">
            <p><strong id="aptitudeNom"></strong></p>
            <span id="aptitudeDescription"></span>
          </div>
        </template>

        <h2>
          <strong>Aptitude(s) Spéciale(s)</strong>
        </h2>
        <div
          id="aptitudes"
          class="personnge__aptitudes"></div>
      </div>

      <!--Fourberies(s)-->
      <div v-if="personnage.fourberies">
        <h2>
          <strong>Fourberies</strong>
        </h2>
        <div v-for="fourberieItem in personnage.fourberies">
          <p>
            <strong>{{ fourberieItem.fourberie?.nom }}</strong>
          </p>
          <span>{{ fourberieItem.fourberie?.description }}</span>
        </div>
      </div>

      <!--Sort(s) Racial-->
      <div v-if="personnage.fourberies">
        <h2>
          <strong>Sort(s) Racial(aux)</strong>
        </h2>
        <div v-for="sort in personnage.race?.sortsRacial">
          <Sort :sort="sort" />
        </div>
      </div>

      <!--Sort(s)-->
      <div
        id="sortsSection"
        class="hidden">
        <h2>
          <strong>Sort(s)</strong>
        </h2>
        <div
          id="sorts"
          class="personnage__sorts"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["joueur"],
});
const route = useRoute();
const isLoading = useIsLoading();
const user = useFirebaseUser();

const { data: personnage } = await useFetch(`/api/personnages/fiche/${route.params.id}`);
</script>
