import Vue from 'vue'

const formatNumber = (value) => {
  if (!value) return '0'
  return parseInt(value).toLocaleString('en-US')
}

Vue.filter('formatNumber', formatNumber)
