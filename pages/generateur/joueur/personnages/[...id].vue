<template>
  <section class="main-section">
    <p class="mb-8 flex gap-4">
      <NuxtLink
        class="btn-secondary"
        to="/generateur/joueur/personnages">
        Retour à mes personnages
      </NuxtLink>
      <NuxtLink
        v-if="isAnimateur"
        class="btn-secondary"
        to="/generateur/animateur/personnages">
        Liste des personnages (DM)
      </NuxtLink>
    </p>

    <div
      v-if="personnage"
      class="card bg-white">
      <!--Informations-->
      <div>
        <h2 class="mt-4 mb-2">
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
            <div v-if="personnage.ecole">
              <strong class="mr-1">École:</strong>
              <span>{{ personnage?.ecole?.nom }}</span>
            </div>

            <!--Domaines-->
            <div v-if="personnage.domaines && personnage.domaines.length > 0">
              <strong class="mr-1">Domaines:</strong>
              <span>{{ personnage.domaines.map((d) => `${d.nom}`).join(", ") }}</span>
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
      <div v-if="personnage.statistiques">
        <h2 class="mt-4 mb-2">
          <strong>Statistiques</strong>
        </h2>

        <div class="grid gap-4">
          <div class="grid md:grid-cols-2">
            <div>
              <div v-for="statistique in personnage.statistiques.slice(0, 5)">
                <strong class="mr-1">{{ statistique.statistique?.nom }}:</strong>
                <span>{{ statistique.valeur }}</span>
              </div>
            </div>
            <div>
              <div v-for="statistique in personnage.statistiques.slice(5, 11)">
                <div v-if="statistique.valeur > 0">
                  <strong class="mr-1">{{ statistique.statistique?.nom }}:</strong>
                  <span>{{ statistique.valeur }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            id="statistiqueSpecialise"
            class="flex flex-col"></div>
        </div>
      </div>

      <!--Résistances & Immunités-->
      <div class="grid gap-4 md:grid-cols-2">
        <div v-if="personnage.resistances">
          <h2 class="mt-4 mb-2">
            <strong>Résistance(s)</strong>
          </h2>
          <div class="flex flex-col">
            <div v-for="resistance in personnage.resistances">
              <strong class="mr-1">{{ resistance.resistance?.nom }}:</strong>
              <span>{{ resistance.valeur }}</span>
            </div>
          </div>
        </div>
        <div v-if="personnage.immunites">
          <h2 class="mt-4 mb-2">
            <strong>Immunité(s)</strong>
          </h2>
          <div class="flex flex-col">
            <div v-for="immunite in personnage.immunites">
              <span>{{ immunite.nom }}</span>
            </div>
          </div>
        </div>
      </div>

      <!--Capacité(s) Spéciale(s)-->
      <div v-if="personnage.capaciteSpeciales">
        <h2 class="mt-4 mb-2">
          <strong>Capacité(s) Spéciale(s)</strong>
        </h2>
        <div class="flex flex-col">
          <div>
            <div v-for="statistique in personnage.capaciteSpeciales">
              <strong class="mr-1">{{ statistique.statistique?.nom }}:</strong>
              <span>{{ statistique.valeur }}</span>
            </div>
          </div>
        </div>
      </div>

      <!--Dons(s)-->
      <div v-if="personnage.dons">
        <h2 class="mt-4 mb-2">
          <strong>Don(s)</strong>
        </h2>
        <div
          class="my-4"
          v-for="donItem in personnage.dons">
          <p>
            <strong>{{ donItem.don?.nom }}</strong>
            <span v-if="donItem.niveauObtention > 1">({{ donItem.niveauObtention }})</span>
          </p>
          <span>{{ donItem.don?.description }}</span>
        </div>
      </div>

      <!--Aptitudes(s)-->
      <div v-if="personnage.aptitudes">
        <h2 class="mt-4 mb-2">
          <strong>Aptitude(s) Spéciale(s)</strong>
        </h2>
        <div
          v-for="aptitude in personnage.aptitudes"
          class="my-4">
          <p>
            <strong>{{ aptitude.aptitude?.nom }}</strong>
          </p>
          <p>{{ aptitude.aptitude?.description }}</p>
        </div>
      </div>

      <!--Fourberies(s)-->
      <div v-if="personnage.fourberies">
        <h2 class="mt-4 mb-2">
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
        <h2 class="mt-4 mb-2">
          <strong>Sort(s) Racial(aux)</strong>
        </h2>
        <div v-for="sort in personnage.race?.sortsRacial">
          <Sort :sort="sort" />
        </div>
      </div>

      <!--Sort(s)-->
      <div v-if="personnage.sorts">
        <h2 class="mt-4 mb-2">
          <strong>Sort(s)</strong>
        </h2>
        <div v-for="sort in personnage.sorts">
          <Sort
            v-if="sort.sort"
            :sort="sort.sort" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["joueur"],
});
const route = useRoute();
const isAnimateur = useIsAnimateur();
const isLoading = useIsLoading();
const user = useFirebaseUser();

const { data: personnage } = await useFetch(`/api/personnages/fiche/${route.params.id}`);
</script>
