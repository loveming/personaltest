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

self.addEventListener('push', function (event) {
  // 检查服务端是否发来了任何有效载荷数据
   var payload = event.data ? JSON.parse(event.data.text()) : 'no payload';
   var title = 'Progressive Times';
   event.waitUntil(
     // 使用提供的信息来显示 Web 推送通知
     self.registration.showNotification(title, {                           
       body: payload.msg,
       url: payload.url,
       icon: payload.icon
     })
   );
 });