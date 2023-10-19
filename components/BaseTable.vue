<template>
  <div class="mt-6 flex w-full flex-col space-y-8 sm:mt-12 px-4 sm:px-6 md:space-x-10 lg:px-8">
    <div class="shadow-md rounded-lg mx-auto w-full">
      <div class="flex justify-end mb-6 space-x-4">
        <div class="relative">
          <button
            type="button"
            class="z-10 px-4 py-2 font-medium text-center text-white bg-medium-blue border-medium-blue rounded-lg space-x-2"
            @click="kd.visible = !kd.visible"
          >
            <div v-if="kd.values.length" class="flex">
              <span class="mr-2">KD: {{ kd.values[0] }}-{{ kd.values[1] }}%</span>
              <img
                v-if="kd.values.length"
                src="~/assets/icons/close.svg"
                width="14"
                @click.stop="updateKd([])"
              />
            </div>
            <div v-else class="flex">
              <span class="text-grey mr-6">KD %</span>
              <img src="~/assets/icons/drogdown.svg" width="12" />
            </div>
          </button>
          <div
            v-if="kd.visible"
            class="absolute top-full left-0 mt-2 bg-medium-blue rounded-lg shadow-lg py-2 z-20 w-full"
          >
            <div
              v-for="(item, index) in kd.selections"
              :key="index"
              class="flex justify-center px-4 py-2"
              @click="updateKd(item)"
            >
              <span class="text-grey cursor-pointer">{{ item[0] }}-{{ item[1] }}%</span>
            </div>

            <div class="border-t border-grey m-2"></div>

            <div class="px-2 py-1.5 space-y-2">
              <span class="text-white">定制范围</span>
              <input
                v-model="kd.min"
                type="number"
                class="w-full rounded-lg bg-dark-medium-blue px-4 py-2 text-sm text-white focus:outline-none"
                placeholder="从"
              />
              <input
                v-model="kd.max"
                type="number"
                class="w-full rounded-lg bg-dark-medium-blue px-4 py-2 text-sm text-white focus:outline-none"
                placeholder="到"
              />
              <button
                class="w-full py-1.5 items-center justify-center rounded-lg bg-orange text-sm font-medium text-white shadow-button-primary transition-all duration-100 hover:bg-orangeHover active:bg-orange"
                @click="updateKd([kd.min, kd.max])"
              >
                应用
              </button>
            </div>
          </div>
        </div>

        <div class="flex relative">
          <button
            type="button"
            class="z-10 px-4 py-2 font-medium text-center text-white bg-medium-blue border-medium-blue rounded-lg space-x-2"
            @click="volume.visible = !volume.visible"
          >
            <div v-if="volume.values.length" class="flex">
              <span v-if="volume.values[1] === 99999999" class="mr-2">
                Volume: {{ volume.values[0] | formatNumber }}+
              </span>
              <span v-else class="mr-2">
                Volume: {{ volume.values[0] | formatNumber }}-{{ volume.values[1] | formatNumber }}
                &nbsp;
              </span>
              <img src="~/assets/icons/close.svg" width="14" @click.stop="updateVolume([])" />
            </div>

            <div v-else class="flex">
              <span class="text-grey mr-14">Volume</span>
              <img src="~/assets/icons/drogdown.svg" width="12" />
            </div>
          </button>
          <div
            v-if="volume.visible"
            class="absolute top-full left-0 mt-2 bg-medium-blue rounded-lg shadow-lg py-2 z-20 w-full"
          >
            <div
              v-for="(item, index) in volume.selections"
              :key="index"
              class="flex px-4 py-2"
              @click="updateVolume(item)"
            >
              <span v-if="item[1] === 99999999" class="text-grey cursor-pointer">
                {{ item[0] | formatNumber }}+
              </span>
              <span v-else class="text-grey cursor-pointer">
                {{ item[0] | formatNumber }}-{{ item[1] | formatNumber }}
              </span>
            </div>

            <div class="border-t border-grey m-2"></div>

            <div class="px-2 py-1.5 space-y-2">
              <span class="text-white">定制范围</span>
              <input
                v-model="volume.min"
                type="number"
                class="w-full rounded-lg bg-dark-medium-blue px-4 py-2 text-sm text-white focus:outline-none"
                placeholder="从"
              />
              <input
                v-model="volume.max"
                type="number"
                class="w-full rounded-lg bg-dark-medium-blue px-4 py-2 text-sm text-white focus:outline-none"
                placeholder="到"
              />
              <button
                class="w-full py-1.5 items-center justify-center rounded-lg bg-orange text-sm font-medium text-white shadow-button-primary transition-all duration-100 hover:bg-orangeHover active:bg-orange"
                @click="updateVolume([volume.min, volume.max])"
              >
                应用
              </button>
            </div>
          </div>
        </div>

        <a
          type="button"
          class="flex w-full min-w-max flex-row items-center justify-center space-x-2 rounded-lg bg-medium-blue py-2 px-3 text-sm font-semibold text-white shadow-button-secondary transition-all duration-100 hover:bg-medium-blueHover active:bg-medium-blue sm:w-fit sm:px-5 sm:text-base cursor-pointer"
          @click="exportProcessedData"
        >
          <span>Export Excel</span>
        </a>
      </div>
      <table class="min-w-full bg-medium-blue rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th class="py-4 px-4 text-medium bg-dark-medium-blue text-white text-left">Keyword</th>
            <th class="py-4 px-8 text-medium bg-dark-medium-blue text-white text-center">Volume</th>
            <th class="py-4 px-8 text-medium bg-dark-medium-blue text-white text-center">KD</th>
            <th class="py-4 px-8 text-medium bg-dark-medium-blue text-white text-center">CPC</th>
            <th class="py-4 px-8 text-medium bg-dark-medium-blue text-white text-center">
              优化回报率
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in processedArr"
            :key="index"
            :class="{ 'bg-dark-medium-blue': index % 2 === 1 }"
          >
            <td
              class="py-4 px-4 text-medium text-origin text-left break-words whitespace-normal max-w-xs overflow-auto"
            >
              <a class="underline" :href="item.url" target="_blank">{{ item.keyword }}</a>
            </td>
            <td class="py-4 px-8 text-medium text-white text-center">
              {{ item.volume }}
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
</template>

<script>
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default {
  data() {
    return {
      originalArr: [],
      processedArr: [],

      kd: {
        visible: false,
        values: [],
        selections: [
          [85, 100],
          [70, 84],
          [50, 69],
          [30, 49],
          [15, 29],
          [0, 14]
        ],
        min: '',
        max: ''
      },

      volume: {
        visible: false,
        values: [],
        selections: [
          [100001, 99999999],
          [10001, 100000],
          [1001, 10000],
          [101, 1000],
          [11, 100],
          [1, 10]
        ],
        min: '',
        max: ''
      }
    }
  },

  methods: {
    processData(jsonData) {
      this.processedArr = []

      jsonData.forEach((item) => {
        if (item['Keyword Difficulty'] !== 0) {
          item.roi = (item.Volume * item['CPC (USD)']) / item['Keyword Difficulty']
        }

        if (item.roi > 0) {
          this.originalArr.push({
            keyword: item.Keyword,
            volume: item.Volume,
            kd: item['Keyword Difficulty'],
            cpc: item['CPC (USD)'],
            roi: item.roi.toFixed(2),
            url: 'https://www.google.com/search?q=' + item.Keyword
          })
        }
      })

      this.originalArr.sort((a, b) => b.roi - a.roi)

      this.filterOriginalArr()
    },

    updateKd(rangeArr) {
      rangeArr = this.adjustRangeArr(rangeArr, 0, 100)

      this.kd.values = rangeArr
      this.kd.visible = false

      this.filterOriginalArr()
    },

    updateVolume(rangeArr) {
      rangeArr = this.adjustRangeArr(rangeArr, 0, 99999999)

      this.volume.values = rangeArr
      this.volume.visible = false

      this.filterOriginalArr()
    },

    adjustRangeArr(rangeArr, minValue, maxValue) {
      if (rangeArr.length) {
        rangeArr[0] = parseInt(rangeArr[0] || minValue)
        rangeArr[1] = parseInt(rangeArr[1] || maxValue)
        if (rangeArr[0] > rangeArr[1]) rangeArr = [rangeArr[1], rangeArr[0]]
      }

      return rangeArr
    },

    filterOriginalArr() {
      const kdValuesLength = this.kd.values.length
      const volumeValuesLength = this.volume.values.length

      this.processedArr = this.originalArr.filter((item) => {
        let kdCondition = true
        let volumeCondition = true

        if (kdValuesLength) {
          kdCondition = item.kd >= this.kd.values[0] && item.kd <= this.kd.values[1]
        }

        if (volumeValuesLength) {
          volumeCondition =
            item.volume >= this.volume.values[0] && item.volume <= this.volume.values[1]
        }

        return kdCondition && volumeCondition
      })
    },

    exportProcessedData() {
      // 创建一个新的工作簿对象
      const wb = XLSX.utils.book_new()

      // 将处理后的数据转换为一个工作表对象
      const ws = XLSX.utils.json_to_sheet(this.processedArr)

      // 将工作表对象添加到工作簿中
      XLSX.utils.book_append_sheet(wb, ws, 'Processed Data')

      // 将工作簿对象写入一个二进制字符串
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })

      // 使用 file-saver 库保存文件
      saveAs(
        new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }),
        'processed-data.xlsx'
      )
    },

    // 定义一个将二进制字符串转换为数组缓冲区的函数
    s2ab(s) {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
      return buf
    }
  }
}
</script>
