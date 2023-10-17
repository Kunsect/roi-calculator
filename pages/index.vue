<template>
  <div id="main" class="flex h-full min-h-screen w-full flex-col bg-dark-blue font-rubik">
    <main class="flex-grow">
      <div class="sm:mt24 mt-16 flex flex-col items-center justify-center px-4 text-white">
        <div class="flex w-full max-w-7xl flex-col items-center justify-center">
          <div class="flex flex-col items-center justify-center">
            <div class="flex w-full flex-col items-center justify-center space-y-2">
              <h1
                class="flex flex-row items-center justify-center space-x-2 text-center text-3xl font-bold text-white"
              >
                <span class="text-orange">Keywords&nbsp;</span>ROI Calculator
              </h1>
              <h2
                data-screenshot="false"
                class="pb-10 text-center font-normal text-grey sm:pb-16 sm:text-lg"
              >
                Import Semrush Excel to Generate Keywords ROI Table.
              </h2>
            </div>
          </div>
          <button
            class="mb-5 flex w-full min-w-max flex-row items-center justify-center space-x-2 rounded-lg bg-orange py-3 px-5 text-base font-medium text-white shadow-button-primary transition-all duration-100 hover:bg-orangeHover active:bg-orange sm:w-fit disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="btnDisabled"
            @click="triggerFileInput"
          >
            Import Semrush Excel &nbsp; &nbsp;
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1714 3.983L2.12989 14.0245L0.480225 12.3748L10.5206 2.33333H1.67139V0H14.5047V12.8333H12.1714V3.983Z"
                fill="#FFFBF7"
              ></path>
            </svg>
          </button>
          <p class="font-normal text-grey">
            * The content uploaded is processed solely on your local device.
          </p>
          <input ref="fileInput" type="file" class="hidden" @change="handleFileUpload" />

          <BaseTable ref="baseTable" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  data() {
    return {
      btnDisabled: false
    }
  },

  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    handleFileUpload(event) {
      const file = event.target.files[0]

      if (file) {
        this.btnDisabled = true

        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(sheet)

          this.$refs.baseTable.processData(jsonData)

          this.btnDisabled = false
        }

        reader.readAsBinaryString(file)
      }
    }
  }
}
</script>
