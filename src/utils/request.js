export default function (obj) {
  let url = obj.url || ''
  let method = obj.method || 'get'
  let data = obj.data || {}

  return new Promise((resolve, reject) => {
    mpvue.request({
      url,
      method,
      data,
      success:function (info) {

        resolve(info.data)

                console.log(info.data)
      }
    })
  })
}
