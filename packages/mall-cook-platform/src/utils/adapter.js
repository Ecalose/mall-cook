import { debugLog } from '@/utils/debug'

/*
 * @Description: 灞忓箷閫傞厤  (褰撳睆骞曞ぇ浜?40鏃讹紝榛樿璁剧疆灞忓箷涓?75)
 * @Autor: WangYuan
 * @Date: 2021-05-21 15:11:30
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-05-21 15:57:44
 */
(function (baseFontSize) {
    // 鍙栨秷ios楂樻竻灞忛€傞厤
    // const ua = navigator.userAgent;
    // const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    // const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    // let dpr = window.devicePixelRatio || 1;
    // if (!isIos && !(matches && matches[1] > 534)) {
    //     // 濡傛灉闈瀒OS, 闈濧ndroid4.3浠ヤ笂, dpr璁句负1;
    //     dpr = 1;
    // }
    // const scale = 1 / dpr;
    // const metaEl = document.querySelector('meta[name="viewport"]');
    // if (!metaEl) {
    //     metaEl = document.createElement('meta');
    //     metaEl.setAttribute('name', 'viewport');
    //     window.document.head.appendChild(metaEl);
    // }
    // metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);

    let clientWidth = document.documentElement.clientWidth > 540 ? 375 : document.documentElement.clientWidth
    document.documentElement.style.fontSize = clientWidth / 10 + 'px';

    debugLog('灞忓箷瀹藉害:' + clientWidth);
    debugLog('html瀛椾綋澶у皬璁剧疆:' + document.documentElement.style.fontSize);
})();
