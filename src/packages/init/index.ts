// import { _TouchEvent } from "@/types";
// import storeDecoration from "@/config/pinia/store-decoration";
// import VConsole from "vconsole";
// import env from "@/utils/tools/env";

// /** 监听浏览器后退事件 */
// const handleListenBack = (): void => {
//     window.addEventListener(
//         "popstate",
//         () => {
//             storeDecoration().SET_TRANSITION("slide-left");
//             storeDecoration().SET_ISBACK(true);
//         },
//         false
//     );
// };
// /** 禁止页面级的touchmove事件 */
// const disableTouchMove = (): void => {
//     document.body.addEventListener(
//         "touchmove",
//         function (e: _TouchEvent) {
//             if (e._isScroller) return;
//             // 阻止默认事件
//             e.preventDefault();
//         },
//         {
//             passive: false
//         }
//     );
// };

// handleListenBack();
// disableTouchMove();

// if (!env.prod()) {
//     new VConsole();
// }
