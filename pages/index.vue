<template>
  <div id="main" class="flex h-full min-h-screen w-full flex-col bg-dark-blue font-rubik">
    <main class="flex-grow">
      <div class="sm:mt24 mt-16 flex flex-col items-center justify-center px-4 text-white">
        <div class="flex w-full max-w-5xl flex-col items-center justify-center">
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

          <div v-if="calcData.length" class="mt-6 flex w-full flex-col space-y-8 sm:mt-12">
            <div class="shadow-md rounded-lg p-2 mx-auto w-full">
              <div class="flex justify-end mb-6">
                <a
                  type="button"
                  class="flex w-full min-w-max flex-row items-center justify-center space-x-2 rounded-lg bg-medium-blue py-2 px-3 text-sm font-semibold text-white shadow-button-secondary transition-all duration-100 hover:bg-medium-blueHover active:bg-medium-blue sm:w-fit sm:px-5 sm:text-base"
                  @click="exportProcessedData"
                >
                  <span>Export Excel</span>
                </a>
              </div>
              <table class="min-w-full bg-medium-blue rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th class="py-4 px-4 text-medium bg-dark-medium-blue text-white text-left">
                      Keyword
                    </th>
                    <th class="py-4 px-8 text-medium bg-dark-medium-blue text-white text-center">
                      Volume
                    </th>
                    <th class="py-4 px-8 text-medium bg-dark-medium-blue text-white text-center">
                      KD
                    </th>
                    <th class="py-4 px-8 text-medium bg-dark-medium-blue text-white text-center">
                      CPC
                    </th>
                    <th class="py-4 px-8 text-medium bg-dark-medium-blue text-white text-center">
                      优化回报率
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in calcData"
                    :key="index"
                    :class="{ 'bg-dark-medium-blue': index % 2 === 1 }"
                  >
                    <td class="py-4 px-4 text-medium text-origin text-left">
                      <a class="underline" :href="item.url" target="_blank">{{ item.keyword }}</a>
                    </td>
                    <td class="py-4 px-8 text-medium text-white text-center">
                      {{ item.volumn }}
                    </td>
                    <td class="py-4 px-8 text-medium text-white text-center">
                      {{ item.kd }}
                    </td>
                    <td class="py-4 px-8 text-medium text-white text-center">
                      {{ item.cpc }}
                    </td>
                    <td class="py-4 px-8 text-medium text-orange text-center font-bold">
                      {{ item.roi }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

export default {
  data() {
    return {
      calcData: [],
      btnDisabled: false
    }
  },

  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    handleFileUpload(event) {
      this.btnDisabled = true
      const file = event.target.files[0]

      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(sheet)

          // 格式化并排序 json
          this.calcData = jsonData.map((item) => {
            if (item['Keyword Difficulty'] !== 0) {
              item.roi = (item.Volume * item['CPC (USD)']) / item['Keyword Difficulty']
            }

            if (!item.roi) item.roi = 0
            else item.roi = item.roi.toFixed(2)

            return {
              keyword: item.Keyword,
              volumn: item.Volume,
              kd: item['Keyword Difficulty'],
              cpc: item['CPC (USD)'],
              roi: item.roi,
              url: 'https://www.google.com/search?q=' + item.Keyword
            }
          })

          this.calcData.sort((a, b) => b.roi - a.roi)
          this.btnDisabled = false
        }

        reader.readAsBinaryString(file)
      }
    },

    exportProcessedData() {
      // 创建一个新的工作簿对象
      const wb = XLSX.utils.book_new()

      // 将处理后的数据转换为一个工作表对象
      const ws = XLSX.utils.json_to_sheet(this.calcData)

      // 将工作表对象添加到工作簿中
      XLSX.utils.book_append_sheet(wb, ws, 'Processed Data')

      // 将工作簿对象写入一个二进制字符串
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })

      // 定义一个将二进制字符串转换为数组缓冲区的函数
      function s2ab(s) {
        const buf = new ArrayBuffer(s.length)
        const view = new Uint8Array(buf)
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
        return buf
      }

      // 使用 file-saver 库保存文件
      saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'processed-data.xlsx')
    }
  }
}
</script>
