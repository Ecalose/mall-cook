<template>
  <el-dialog
    :visible.sync="show"
    :append-to-body="true"
    :show-close="false"
    :close-on-click-modal="false"
    top="50px"
    width="415px"
    class="flex-center"
  >
    <div v-loading="show" id="cover" class="cover">
      <iframe
        v-if="show"
        ref="iframe"
        class="w-100"
        frameborder="no"
        :style="{ height: '667px' }"
        :src="iframeUrl"
        @load="setWidgetsMessage"
      ></iframe>
    </div>
  </el-dialog>
</template>

<script>
import RealTimeView from "@/components/TopBar/RealTimeView";
import { uploadCover } from "@/api/project";
import global from "@/config/global";
import { mapGetters } from "vuex";
import { debugLog } from "@/utils/debug";

export default {
  name: "HomeCover",

  components: {
    RealTimeView,
  },

  mounted() {
    this.getMessage();
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    ...mapGetters(["project"]),

    iframeUrl() {
      return `${global.viewUrl}pages/build/build?operate=build`;
    },

    home() {
      return this.project?.pages?.find((page) => page.home) || null;
    },
  },

  methods: {
    async init() {
      await this.open();
      this.createCover();
    },

    open() {
      return new Promise((resolve) => {
        this.show = true;
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },

    setWidgetsMessage() {
      if (!this.$refs.iframe?.contentWindow || !this.home) return;
      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "list",
          params: this.home.componentList,
        },
        "*"
      );
    },

    createCover() {
      if (!this.$refs.iframe?.contentWindow) return;
      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "cover",
        },
        "*"
      );
    },

    getMessage() {
      let self = this;
      window.addEventListener("message", function (e) {
        let { type, params } = e.data || {};
        if (type === "getCoverBase64") {
          self.upload(params.base64);
        }
      });
    },

    upload(base64) {
      return new Promise((resolve, reject) => {
        let coverFile = this.getFile(base64);
        let formData = new FormData();
        formData.append("domainId", 3);
        formData.append("dir", "img");
        formData.append("file", coverFile);

        uploadCover(formData)
          .then((res) => {
            if (res.errorCode === "00000") {
              debugLog("cover upload success", res);
              this.$emit("complete", {
                status: 1,
                data: res.data,
              });
            }
          })
          .finally(() => (this.show = false));
      });
    },

    getFile(dataurl, filename = "file") {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cover {
  width: 375px;
  min-height: 667px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
