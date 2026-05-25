<template>
  <el-dialog title="二维码预览" :visible.sync="show" width="30%">
    <ul class="flex row-around pt20">
      <li>
        <div class="flex-column row-center mb20">
          <img class="w200 h200 mb20" :src="getQr()" />
          <span class="lb-1 f-h5-grey">扫码预览 H5 商城</span>
        </div>
      </li>
      <li>
        <div class="flex-column row-center">
          <img class="w200 h200 mb20" :src="WXCode" />
          <span class="lb-1 f-h5-grey">扫码预览小程序商城</span>
        </div>
      </li>
    </ul>
    <div class="mt40">
      <el-input placeholder="请输入链接" v-model="url">
        <template slot="append">
          <el-button
            type="primary"
            icon="el-icon-link"
            @click="link"
          ></el-button>
        </template>
      </el-input>
      <h3 class="mt5 mb10 f12 f-h5-grey">H5 链接可直接在浏览器中打开预览</h3>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { createWXcode } from "@/api/project";
import global from "@/config/global";
import { debugLog } from "@/utils/debug";

export default {
  data() {
    return {
      show: false,
      WXCode: "",
      url: "",
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    open() {
      this.show = true;
      this.getWXQr();
    },

    getQr() {
      if (!this.project?.id) return "";
      this.url = `${global.viewUrl}pages/index/tabbar/home?id=${this.project.id}`;

      let options = {
        padding: 10,
        width: 160,
        height: 160,
        reverse: false,
        background: "#ffffff",
        foreground: "#000000",
      };
      debugLog("preview url:", this.url);
      return jrQrcode.getQrBase64(this.url, options);
    },

    async getWXQr() {
      let { data } = await createWXcode({ id: this.project.id });
      this.WXCode = data;
    },

    link() {
      window.open(this.url);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  display: none !important;
}
</style>
