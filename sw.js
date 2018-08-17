var cacheName = 'helloWorld'

self.addEventListener('install', event => { //serviceWorker注册完成后开始install,触发install事件
  event.waitUntil(
    caches.open(cacheName)  // 创建或打开缓存
    .then(cache => cache.addAll([ // 缓存指定资源
      'index.html'
    ]))
  )
})

self.addEventListener('fetch', function (event) { // 监控本地fetch事件
  event.respondWith(  //指定response内容
    caches.match(event.request) //判断是否已缓存
    .then(function (response) {
      if (response) { // 若已缓存，返回缓存的对象
        return response;
      }
      return fetch(event.request); //否则发出请求
    })
  )
})