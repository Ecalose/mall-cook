<template>
  <config-wrap :title="label">
    <div class="mb10 f-grey f12">{{ mOptions.note }}</div>
    <div class="nav">
      <draggable v-model="mValue">
        <slot v-if="edit"></slot>

        <template v-else>
          <div v-for="item in mValue" :key="item.id" class="nav-item">
            <component
              v-for="(val, key, index) in schema.child"
              :key="index"
              :is="typeToComponent[val.type]"
              v-model="item[key]"
              v-bind="val"
            >
            </component>
            <div class="nav-delete" @click="delItem(item.id)">x</div>
          </div>
        </template>
      </draggable>

      <div class="nav-add" @click="addItem">新增数据</div>
    </div>
  </config-wrap>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
import typeToComponent from "@/config/schema-template";
import { debugLog } from "@/utils/debug";

export default {
  name: "SchemaArray",

  mixins: [schemaMixin],

  props: {
    label: {
      type: String,
      default: "",
    },
    edit: {
      type: Boolean,
      default: false,
    },
    schema: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      typeToComponent,
    };
  },

  methods: {
    addItem() {
      debugLog("schema array value", this.mValue);
      if (this.mValue.length >= this.mOptions?.limit) {
        this.$notify({
          title: "无法新增",
          message: `最多只能添加${this.mOptions?.limit}条数据`,
          type: "warning",
        });
        return;
      }

      this.mValue.push({
        id: this.$getRandomCode(6),
      });
    },

    delItem(id) {
      let i = this.mValue.findIndex((item) => item.id == id);
      if (i < 0) return;
      this.mValue.splice(i, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .config-item {
  margin-bottom: 10px !important;
}
</style>
