<template>
  <div class="body">
    <div class="content">
      <el-button size="small f-white bg-theme" @click="addPage">
        新建页面
      </el-button>

      <div class="content-head">
        <img
          class="w45 h45 mr10 radius"
          src="https://img.yzcdn.cn/public_files/2016/05/13/8f9c442de8666f82abaf7dd71574e997.png!small.webp"
          alt=""
        />
        <div class="flex-column">
          <div class="flex col-center mb10">
            <span class="mr8 f15 f-bold">{{ homePage.name }}</span>
            <div class="p4 r3 bg-theme f13 f-white">首页</div>
          </div>
          <span class="f14 f-theme pointer" @click="editPage(homePage.id)">
            编辑
          </span>
        </div>
      </div>

      <div class="mt30">
        <el-table
          :data="project.pages"
          style="width: 100%"
          :header-cell-style="{
            background: '#f7f8fa',
            color: '#323233',
            fontWeight: 500,
          }"
        >
          <el-table-column prop="name" label="标题">
            <template slot-scope="scope">
              <img
                v-show="scope.row.home"
                class="h16 w16 mr5"
                src="https://b.yzcdn.cn/channel-icon/h5-mobile.png"
                alt=""
              />
              <input v-model="scope.row.name" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="状态">
            <template slot-scope="scope"> 已创建 </template>
          </el-table-column>
          <el-table-column prop="remote" label="备注">
            <template slot-scope="scope">
              <input v-model="scope.row.remote" />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="mr5 f-theme pointer" @click="editPage(scope.row.id)">
                编辑
              </span>
              <span
                class="ml5 mr5 f-theme pointer"
                @click="setHomePage(scope.row)"
              >
                设为首页
              </span>
              <span class="ml5 mr5 f-theme pointer" @click="copyPage(scope.row)">
                复制
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { debugLog } from "@/utils/debug";

export default {
  name: "mall-pages",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["project"]),
    homePage() {
      return this.project.pages.find((page) => page.home);
    },
  },
  methods: {
    ...mapMutations(["setCurPage"]),

    addPage() {
      let page = {
        id: this.$getRandomCode(4),
        name: "新建页面",
        componentList: [],
        home: false,
      };
      this.project.pages.push(page);
    },

    copyPage(data) {
      let page = this.$cloneDeep(data);

      page.id = this.$getRandomCode(4);
      page.home = false;

      this.project.pages.push(page);
    },

    editPage(id) {
      debugLog("edit page", {
        id,
        pages: this.project.pages,
      });

      let page = this.project.pages.find((page) => page.id == id);
      if (!page) return;

      this.setCurPage(page);
      this.$router.push({ name: "page-build" });
    },

    setHomePage(data) {
      this.project.pages.forEach((page) => (page.home = false));
      data.home = true;
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  border: 0;
  font-size: 13px; /*no*/
}

.body {
  padding: 15px; /*no*/

  .content {
    width: 100%; /*no*/
    height: 700px; /*no*/
    padding: 40px 20px; /*no*/
    background: #fff;

    .content-head {
      display: flex;
      align-items: flex-start;
      padding: 20px 30px; /*no*/
      margin-top: 15px;
      background: #f7f8fa;
    }
  }
}
</style>
