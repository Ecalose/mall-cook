/*
 * @Description: 骞冲彴閫氱敤璺宠浆 锛堝寘鎷」鐩唴锛孒5锛屽皬绋嬪簭锛?
 * @Autor: WangYuan
 * @Date: 2021-07-07 11:02:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-08-31 20:41:23
 */

import Vue from 'vue'
import { debugLog } from '@/utils/debug'

export default function jump(data) {
    if (!data) {
        console.warn('璺宠浆鏁版嵁涓嶅瓨鍦?')
        return
    }

    debugLog('jump payload:', data)

    let { type, id } = data
    if (!type) {
        console.warn('璺宠浆绫诲瀷涓嶅瓨鍦?')
        return
    }

    // 璺宠浆鑷畾涔夐〉闈?
    if (type === 'custom') {
        if (!id) {
            console.warn('鑷畾涔夐〉闈㈣烦杞湭浼犻€抜d');
            return
        }

        this.$router.push({ name: 'custom', query: { pageId: id } })
    }

    // 璺宠浆寰〉闈?
    if (type === 'fixed') {
        if (!id) {
            console.warn('寰〉闈㈣烦杞湭浼犻€抜d');
            return
        }
        this.$router.push({ name: data.id })
    }

    // 璺宠浆鍟嗗搧璇︽儏
    if (type === 'goods') {
        this.$router.push({ name: 'goods-detail', query: { id } })
    }
}
