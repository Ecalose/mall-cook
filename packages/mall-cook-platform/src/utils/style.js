/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:57:10
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 11:30:21
 */

import Vue from 'vue'

/**
 * 鍒涘缓瀹瑰櫒鏍峰紡瀵硅薄
 * @param {*} style 
 */
export function getWrapStyle(style) {
    if (!style) {
        return {}
    }

    // 闇€px鍗曚綅鍩虹鏍峰紡
    const needUnit = [
        'fontSize',
        'width',
        'height',
    ]

    const result = {}
    Object.keys(style).forEach(key => {

        // 闇€px鍗曚綅鍩虹鏍峰紡
        if (needUnit.includes(key)) {
            result[key] = Vue.prototype.$pxTorem(style[key])
        }

        // 椤甸潰闂磋窛
        if (key == 'pagePadding') {
            result['paddingLeft'] = Vue.prototype.$pxTorem(style[key])
            result['paddingRight'] = Vue.prototype.$pxTorem(style[key])
        }

        // 瀹瑰櫒璐熻竟璺?
        if (key == 'negativeMarginBottom') {
            result['marginBottom'] = Vue.prototype.$pxTorem(style[key])
        }

    })

    return result
}

export function getComponentStyle(style) {
    if (!style) {
        return {}
    }

    const result = {}

    Object.keys(style).forEach(key => {

        // 涓婇儴鍐呴棿璺?
        if (key === 'cmpUpperPadding') {
            result['paddingTop'] = Vue.prototype.$pxTorem(style[key])
        }

        // 涓嬮儴鍐呴棿璺?
        if (key === 'cmpLowerPadding') {
            result['paddingBottom'] = Vue.prototype.$pxTorem(style[key])
        }

        // 鎵€鏈夊渾瑙?
        if (key === 'cmpRadius') {
            result['borderRadius'] = Vue.prototype.$pxTorem(style[key])
        }

        // 涓婇儴鍦嗚
        if (key === 'cmpUpperRadius') {
            result['borderTopLeftRadius'] = Vue.prototype.$pxTorem(style[key])
            result['borderTopRightRadius'] = Vue.prototype.$pxTorem(style[key])
        }

        // 涓嬮儴鍦嗚
        if (key === 'cmpLowerRadius') {
            result['borderBottomLeftRadius'] = Vue.prototype.$pxTorem(style[key])
            result['borderBottomRightRadius'] = Vue.prototype.$pxTorem(style[key])
        }

        // 缁勪欢鑳屾櫙鑹?
        if (key === 'cmpBackground') {
            result['background'] = style[key]
        }


    })

    return result
}

// 缁勪欢鑳屾櫙鏍峰紡 锛堟牴鎹€夋嫨澶勭悊娓愬彉鑳屾櫙鎴栬€呭浘鐗囪儗鏅級
export function getMultiBackground(config) {
    if (!config) {
        return {}
    }

    if (config.type === 'color') {
        return {
            backgroundImage: `${gradientChannel(config.colorList)}`
        }
    }
    if (config.type === 'image') {
        return {
            backgroundSize: "cover",
            backgroundImage: `url(${config.url})`
        }
    }

    return {}
}

// 澶勭悊娓愬彉鏍煎紡
export function gradientChannel(config) {
    if (config?.list?.length) {
        let result = `linear-gradient(${config.angle}deg`;

        if (config.list.length === 1) {
            let one = config.list[0]
            result += `,${one.color} ${one.proportion}%, ${one.color} 100%`;
        } else {
            config.list.map((item) => {
                result += `,${item.color} ${item.proportion}%`;
            });
        }
        result += ")";
        return result;
    } else {
        return ''
    }
}
