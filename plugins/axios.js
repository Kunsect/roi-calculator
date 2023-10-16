export default function ({ $axios }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })
}