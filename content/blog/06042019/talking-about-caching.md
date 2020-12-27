---
title: Talking about Web Caching for PWAs
description: Kinh nghiệm của mình khi triển khai ServiceWorker tại Cốc Cốc Search Engine
id: 7500
---

Bạn nên đã sử dụng [ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/) hoặc [ApplicationCache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) để nắm được bài viết dưới đây:
- [ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/)
- [ApplicationCache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) __(No longer recommended on modern browsers version)__
Từ giữa tháng tư cho đến đầu tháng 6 mình được giao nhiệm vụ triển khai Caching cho phiên bản New Tab Mobile trên iOS và Android tại Cốc Cốc. Nhìn chung, khối lượng công việc không phải là quá lớn nhưng phiên bản New Tab Mobile cần một sự consistency trên hệ hai hệ điều hành trên, kết quả cuối cùng là tích hợp thành công, ứng dụng load rất nhanh và cho người dùng trải nghiệm offline khi bị ngắt kết nối khỏi Internet.

Gần đây có rất nhiều developers sử dụng [GatsbyJS](https://www.gatsbyjs.org/) (a static site generators), kĩ thuật khiến Gatsby có thể  load trang nhanh đến mức như vậy là nhờ [ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/). Đương nhiên ServiceWorker sẽ installed và activated trên production trong khi người mới học/ mới sử dụng Gatsby sẽ không để ý trên development server.

Để triển khai Caching mình đã tích hợp [ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/) trên Android và [ApplicationCache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache)](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) trên iOS, dưới đây là một số tips và strategies mình đã thực hiện thành công Caching tại Cốc Cốc New Tab for Mobile:

__1.__ Ưu điểm của [ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/) và [ApplicationCache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) đều đem đến tốc độ cho người dùng, có thể load trang khi offline do tất cả các assets được cache trong bộ nhớ của trình duyệt. Điều này được thực hiện programmatically, chủ động từ phía developer.

__2.__ Để xây dựng hai phương án Caching trên đòi hỏi mình phải cấu hình SSL - phải tự generate certificates hoặc phải mua certificates đòi hỏi trả phí. Tuy nhiên mình quyết định sử dụng proxy thông qua package [node-mitm-http-proxy](https://github.com/joeferner/node-http-mitm-proxy), có hỗ trợ generate SSL để tiện trong quá trình phát triển. Hơn nữa, toàn bộ ứng dụng web phải được serve thông qua HTTPS, cả 2 phương án caching [ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/) và [ApplicationCache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) đều sẽ không hoạt động nếu bạn dev trên HTTP.

__3.__ Điều kiện nào để serviceWorker quyết định cập nhật cache mới, giả sử như bạn đã build ra một bundle mới và đưa lên production chẳng hạn - tạo một key `version` trong application cache. Cơ chế của ServiceWorker sẽ cập nhật khi `a single byte changed in fetched request`, đừng để [ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/) làm browser tốn resource và bandwidth chỉ để fetch liên tục các request mới.
Recommend của mình là hãy tạo `tempCache` và `activeCache`, đừng đặt tên cache theo một format như ngày tháng hay commit hash. It will make you mad later when keeping consistency.

Một đoạn snippet mình dã sử dụng trong dự án để chuyển các fetch request vào trong `activeCache` mà Service Worker sẽ sử dụng để trả về các responses từ requests trong Application Cache:

`embed:copyCache.js`

__3.__ Vì New Tab for Mobile có thể được coi là một PWA, được cập nhật update liên tục thông qua version number trong file `manifest.json` của ServiceWorker hay `maniest.appcache` của [ApplicationCache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache). Mỗi khi refresh page trên Android thì `manifest.json` sẽ được check liên tục trong đó có chứa key `version`, [ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/) sẽ thay thế toàn bộ cache cũ bằng cache mới. Nếu không refresh thì sau trong 24h, ServiceWorker sẽ tự fetch `manifest.json` để quyết định có cần phải thay thế toàn bộ cache cũ hay không. Trên iOS sử dụng Application Cache buộc người dùng phải refresh thủ công thì cache mới được update và ứng dụng cập nhật lên phiên bản mới.
![sw-not-working-ios](https://i.imgur.com/Ln0pkyz.png)

__4.__ Apple chỉ cho phép Webkit sử dụng Service Worker, mọi trình duyệt khác không phải Safari ví dụ như Chrome đều không được hỗ  trợ [ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/). Đây chính là lí do phiên bản New Tab Mobile của Cốc Cốc Browser trên iOS phải sử dụng [ApplicationCache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) như một phương án thay thế.

__5.__ Bạn nên mở `chrome:inspect` và chọn ServiceWorker để  nhìn vào network và debug file [ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers/) của mình.

![chrome-inspect](https://i.imgur.com/iX7y9tU.png)

__6.__ [ApplicationCache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) phaỉ buộc bạn phải define các assets từ đầu trong các fields ASSSET, NETWORK và FALLBACK trong file `manifest.appcache` từ đầu trong `index.html`- khá là static. Đối với ServiceWorker, bạn có toàn quyền quyết định cache bất kì một assets nào một cách programmatically.

Nếu các bạn có câu hỏi liên quan thì hãy chủ động contact với mình ngay dưới comment hoặc contact qua `thienphan@coccoc.com` nhé!.

