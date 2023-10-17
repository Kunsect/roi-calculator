<template>
  <div class="overflow-x-hidden bg-dark-blue">
    <header>
      <div class="relative bottom-0 font-rubik text-base font-normal text-white">
        <div
          class="realtive mx-auto flex max-w-7xl items-center justify-between py-6 px-4 sm:px-6 md:space-x-10 lg:px-8"
        >
          <a href="/" class="flex text-base text-white font-bold">
            <span class="text-orange">Keywords &nbsp;</span>ROI Calculator
          </a>
          <div class="hidden flex-row items-center justify-center space-x-4 sm:flex sm:space-x-10">
            <div class="flex flex-row items-center justify-center space-x-2 sm:space-x-4">
              <a
                href="https://github.com/Kunsect/roi-calculator"
                type="button"
                class="flex w-full min-w-max flex-row items-center justify-center space-x-2 rounded-lg bg-medium-blue py-2 px-3 text-sm font-semibold text-white shadow-button-secondary transition-all duration-100 hover:bg-medium-blueHover active:bg-medium-blue sm:w-fit sm:px-5 sm:text-base"
              >
                <span>Github</span>
              </a>
            </div>
          </div>
          <div
            class="absolute bottom-0 left-0 h-[1px] w-screen bg-medium-blue sm:-translate-x-10"
          ></div>
        </div>
      </div>
    </header>

    <nuxt />

    <footer
      class="mt-24 flex w-full flex-col items-center justify-center space-y-16 bg-gradient-to-br from-[#222839] to-[#12151E] px-4 pt-20 pb-20 font-rubik text-grey sm:mt-32 sm:space-y-20"
    >
      <div class="flex w-full max-w-7xl flex-col items-center justify-center space-y-16">
        <div class="flex flex-col items-center justify-center space-y-4">
          <a
            href="https://github.com/Kunsect/roi-calculator"
            rel="noopener noreferrer"
            target="_blank"
            class="transition-all duration-200 hover:-rotate-12 hover:scale-110 active:scale-90 active:duration-100"
          >
            <svg
              aria-hidden="true"
              class="h-10 w-10 fill-gray-500 group-hover:fill-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
              ></path>
            </svg>
          </a>
          <p class="text-sm">© 2023 Kunsect LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Keywords ROI Calculator',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Import Semrush Excel to Generate ROI Table. | Keywords ROI Calculator'
        }
      ]
    }
  }
}
</script>
