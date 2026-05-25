/*
 * @Description: 椤圭洰鏁版嵁绠＄悊
 * @Autor: WangYuan
 * @Date: 2021-05-21 17:32:57
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-21 15:02:31
 */
import { fixedPages } from '@/config/project'
import { getProject, settingProject, removeProject } from '@/utils/auth'
import { debugLog } from '@/utils/debug'

export default {
    state: {
        project: getProject(),
        fixedPages,             // 闈欐€侀〉闈㈤泦鍚?
        curPage: null,          // 褰撳墠椤甸潰
        curComponent: null,     // 褰撳墠鐗╂枡
        dragComponent: null,    // 鎷栨嫿鐗╂枡
        dragStatus: false,      // 鎷栨嫿鍏ラ〉闈㈢姸鎬?
    },
    getters: {
        project: state => state.project,
        fixedPages: state => state.fixedPages,
        curPage: state => state.curPage || state.project?.pages?.find(page => page.home) || null,
        curComponent: state => state.curComponent,
        dragComponent: state => state.dragComponent,
        dragStatus: state => state.dragStatus,
    },
    mutations: {

        // 鍒濆鍖栭噸缃」鐩?
        setProject(state, project) {
            state.project = project
            settingProject(state.project)
            state.curPage = state.project?.pages?.find(page => page.home) || state.project?.pages?.[0] || null
        },

        // 鍒犻櫎椤圭洰
        dropProject(state) {
            state.project = {}
            state.curPage = {}
            state.curComponent = null
            state.dragComponent = null
            state.dragStatus = false
            removeProject()
        },

        // 璁剧疆棣栭〉涓哄綋鍓嶉〉
        setHomePage(state, page) {
            state.curPage = state.project?.pages?.find(item => item.home) || page || null
        },

        // 璁剧疆褰撳墠椤甸潰
        setCurPage(state, page) {
            debugLog('璁剧疆褰撳墠椤甸潰', page)
            state.curPage = page
        },

        // 褰撳墠鎿嶄綔鎿嶄綔鐗╂枡
        setcurComponent(state, component) {
            state.curComponent = component
        },

        // 褰撳墠鎷栨嫿鐗╂枡
        setDragComponent(state, component) {
            state.dragComponent = component
        },

        // 娣诲姞鐗╂枡
        addComponentList(state, component) {
            state.curPage.componentList.push(component)
        },

        // 鍒犻櫎鐗╂枡
        delComponent(state, id) {

            // 鏌ユ壘鐗╂枡瀵瑰簲涓嬫爣
            let index = state.curPage.componentList.reduce((pre, cur, i) => {
                if (cur.id == id)
                    pre = i

                return pre
            }, -1)

            if (index < 0) return
            state.curPage.componentList.splice(index, 1)
            state.curComponent = null
        },

        setDragStatus(state, status) {
            state.dragStatus = status
        },
    },
}
