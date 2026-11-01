<template>
  <SubPageMenu :company-name="company.company_name" :company-id="company.id" />

  <div class="mx-auto max-w-6xl px-6 lg:flex lg:items-center lg:px-8">
    <!-- w-full: as a flex item this used to be as wide as its text, which clipped the dots below -->
    <div class="relative w-full overflow-hidden bg-white">
      <!-- Hidden container for large screens -->
      <div class="relative mx-auto h-full max-w-prose text-lg" aria-hidden="true">
        <svg
          class="absolute top-12 left-full translate-x-32 transform"
          width="304"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-300"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="304"
            height="584"
            fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
          />
        </svg>
      </div>
      <!-- Container for company details -->
      <div class="md:flex justify-between bg-white rounded md:w-3/4">
        <!-- Company logo -->
        <img
          class="h-1/2 w-auto object-cover rounded-full lg:flex p-2 m-4"
          :src="company.logo ? company.logo : ''"
          alt="Logo N/A"
        />
        <hr class="h-2 bg-teal-300 w-full md:hidden" />
        <!-- Company information -->
        <div class="text-left pt-6 px-4 md:px-6">
          <!-- Company name -->
          <h1 class="text-2xl lg:text-4xl font-medium text-gray-700">
            {{ company.company_name }}
          </h1>

          <!-- Short summary (the full description follows below) -->
          <p class="text-gray-700 py-2 text-md md:text-md">{{ intro }}</p>
          <!-- Container for tags -->
          <div class="flex justify-start space-x-1 mt-2 mb-4">
            <div class="flex items-center space-x-2">
              <!-- Display the tags -->
              <div v-for="tag in companyTags" class="flex items-center space-x-2">
                <span
                  class="inline-flex items-center justify-center px-2 py-1 font-medium leading-4 text-gray-600 bg-gray-200 rounded-md text-xs md:text-sm"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Company details container -->
      <div class="bg-gray-50 lg:w-4/6 w-full mt-2 rounded-lg">
        <!-- Company details card -->
        <div class="md:flex justify-around px-8 py-4">
          <!-- Company founded information -->
          <figcaption class="font-medium">
            <div class="text-gray-800">Founded</div>
            <div class="text-gray-800">{{ company.founded }}</div>
          </figcaption>
          <figcaption class="font-medium">
            <div class="text-gray-800">Location</div>
            <div class="text-gray-800">{{ company.location }}</div>
          </figcaption>
          <figcaption class="font-medium">
            <div class="text-gray-800">Team Size</div>
            <div class="text-gray-800">{{ company.team_size }}</div>
          </figcaption>
          <div v-if="socials.length" class="font-medium">
            <div class="text-gray-100">
              <div class="text-green-800">
                Socials
                <div class="flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    v-for="social in socials"
                    :key="social.href"
                    :href="social.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 text-gray-600 hover:text-gray-800"
                  >
                    <component
                      :is="social.icon"
                      v-if="social.icon"
                      class="h-5 w-5"
                      aria-hidden="true"
                    />
                    <span class="text-sm underline">{{ social.name }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative lg:pr-4 py-8 m-2">
        <div class="prose prose-lg prose-indigo lg:px-4 text-gray-700">
          <div
            class="text-gray-700 py-2 text-md md:text-md"
            v-html="company.description"
          ></div>
          <a
            v-if="company.link"
            :href="company.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-white hover:bg-teal-700 border border-teal-900 text-center font-bold py-1 px-8 my-4 rounded-lg no-underline text-teal-800 hover:text-gray-100 focus:outline-teal-800"
            >Website</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineComponent, h } from "vue";
import SubPageMenu from "@/components/SubPageMenu.vue";
import { excerpt, stripHtml } from "../../utils/text.js";

const route = useRoute();
const api = useApi();
const id = encodeURIComponent(route.params.id);

const [{ data: company, error }, { data: tags }, { data: socialRows }] = await Promise.all([
  useAsyncData(`company-${id}`, () => api.get(`/companies/${id}/`)),
  useAsyncData("tags", () => api.get("/tags/")),
  useAsyncData("socials", () => api.get("/socials/")),
]);

if (error.value || !company.value) {
  throw createError({ statusCode: 404, statusMessage: "Company not found", fatal: true });
}

const intro = computed(() => company.value.short_description || excerpt(company.value.description, 300));

const companyTags = computed(() =>
  (tags.value ?? []).filter((tag) => tag.company === company.value.id)
);

useSeoMeta({
  title: () => company.value.company_name,
  description: () => stripHtml(company.value.short_description || company.value.description).slice(0, 160),
});

const FacebookIcon = defineComponent({
      render: () =>
        h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", {
            "fill-rule": "evenodd",
            d:
              "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
            "clip-rule": "evenodd",
          }),
        ]),
    });
const TwitterIcon = defineComponent({
      render: () =>
        h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", {
            d:
              "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
          }),
        ]),
    });
const ICONS = { facebook: FacebookIcon, twitter: TwitterIcon, x: TwitterIcon };

// real links stored for this company; only the ones we have an icon for get an icon
const socials = computed(() =>
  (socialRows.value ?? [])
    .filter((row) => row.company === company.value.company_name && row.link)
    .map((row) => ({
      name: row.social_media,
      href: row.link,
      icon: ICONS[(row.social_media || "").toLowerCase()],
    }))
);
</script>
