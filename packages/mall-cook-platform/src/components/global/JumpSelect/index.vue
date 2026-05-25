<template>
  <div class="flex col-center h25">
    <template>
      <div
        v-if="!mValue.id"
        class="f12 f-theme pointer"
        @click="open"
      >
        选择跳转页面
      </div>

      <template v-else>
        <el-tag size="small">{{ pageName }}</el-tag>
        <span class="ml5 f12 f-theme pointer" @click="open">修改</span>
      </template>
    </template>

    <JumpDialog ref="jump"></JumpDialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { debugLog } from "@/utils/debug";

export default {
  name: "JumpSelect",
  provide() {
    return {
      value: this.value,
    };
  },
  props: {
    value: {
      default: () => ({}),
    },
  },
  data() {
    return {
      mValue: null,
    };
  },
  computed: {
    ...mapGetters(["project", "fixedPages"]),
    pageName() {
      let page = null;
      switch (this.mValue.type) {
        case "fixed":
          page = this.fixedPages.find((page) => page.id == this.mValue.id);
          break;
        case "custom":
          page = this.project.pages.find((page) => page.id == this.mValue.id);
          break;
        case "link":
          page = { name: "外链 H5" };
          break;
        default:
          break;
      }
      return page?.name || "";
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.mValue = newValue;
        debugLog("jump value", this.mValue);
      },
    },
    mValue: {
      immediate: true,
      handler(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    open() {
      this.$refs.jump.open();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
