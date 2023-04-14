<template>
  <SubPageMenu :companyName="company.company_name" />

  <div class="mx-auto max-w-6xl px-6 lg:flex lg:items-center lg:px-8">
    <div class="relative overflow-hidden bg-white">
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

          <!-- Company description -->
          <div
            class="text-gray-700 py-2 text-md md:text-md"
            v-html="companyDescription(company.description)"
          ></div>
          <!-- Container for tags -->
          <div class="flex justify-start space-x-1 mt-2 mb-4">
            <div class="flex items-center space-x-2">
              <!-- Display the tags -->
              <div v-for="tag in company.tags" class="flex items-center space-x-2">
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
          <div class="font-medium">
            <div class="text-gray-100">
              <div class="text-green-800">
                Socials
                <div class="flex space-x-2">
                  <a
                    v-for="social in socials"
                    :key="social.name"
                    :href="social.href"
                    class="text-gray-400 hover:text-gray-500"
                  >
                    <span class="sr-only">{{ social.name }}</span>
                    <component :is="social.icon" class="h-6 w-6" aria-hidden="true" />
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
            v-html="companyDescription(company.description)"
          ></div>
          <br />
          <button
            class="bg-white hover:bg-teal-700 hover:text-gray-100 border border-teal-900 text-center font-bold py-1 px-8 my-4 items-center rounded-lg focus:outline-teal-800 focus:shadow-outline"
          >
            <a
              :href="company.link"
              class="no-underline text-teal-800 hover:text-gray-100"
              target="_blank"
              >Wesbite</a
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import SubPageMenu from "@/components/SubPageMenu.vue";
import { defineComponent, h } from "vue";

const route = useRoute();

const companyDescription = (description) => {
  if (description && description.length > 200) {
    return description;
  } else {
    return description;
  }
};
const socials = [
  {
    name: "Facebook",
    href: "#",
    icon: defineComponent({
      render: () =>
        h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", {
            "fill-rule": "evenodd",
            d:
              "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
            "clip-rule": "evenodd",
          }),
        ]),
    }),
  },

  {
    name: "Twitter",
    href: "#",
    icon: defineComponent({
      render: () =>
        h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", {
            d:
              "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
          }),
        ]),
    }),
  },
];
const [company, tags] = await Promise.all([
  fetch(`http://35.153.67.2/api/companies/${route.params.id}/`).then((response) =>
    response.json()
  ),
  fetch("http://35.153.67.2/api/tags/").then((response) => response.json()),
]);

company.tags = tags.filter((tag) => tag.company === company.id);
</script>
