export default function (obj) {
  let url = obj.url || ''
  let method = obj.method || 'get'
  let data = obj.data || {}

  // 配置url
  url = 'https://www.zhengzhicheng.cn/' + url;

  // 加载状态设置
  mpvue.showLoading({
    title: '正在加载'
  })
  return new Promise((resolve, reject) => {
    // 发送请求
    mpvue.request({
      url,
      method,
      data,
      success(info) {

        resolve(info.data)
        // 关闭加载
        mpvue.hideLoading()
      }
    })
  })
}
