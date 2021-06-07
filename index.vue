<template>
  <div>
    <el-autocomplete clearable :props="props" autocomplete="off" :placeholder="searchParams.placeholder" :ref="autocompleteRef" @focus="focusInput" @clear="clearClick" class="vvautocomplete" v-model="imputModel" :fetch-suggestions="querySearch" @select="handleSelect">
      <i slot="suffix" @click="handleIconClick">
        <svg-icon v-show="suffixFlag" icon-class="search_input"></svg-icon>
      </i>
      <template slot-scope="{ item }">
        <div class="autocompleteTemp">
          <div>
            <span> {{ item.value }}</span>
            <span>{{ item.name }}</span>
          </div>
          <div v-if="searchParams.isIcon ">
            <span class="fllow" v-if="item.optional" @click.stop="((imputModel)=>collectChang(item))">
              <svg-icon icon-class="fllow"></svg-icon>
            </span>
            <span v-else @click.stop="((imputModel)=>collectChang(item))">
              <svg-icon icon-class="no-fllow"></svg-icon>
            </span>

          </div>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
import { searchStock } from "@/api/public";
export default {
  name: "BaseSearch",
  props: {
    searchParams: {
      type: Object,
      default() {
        return {
          isIcon: false,
          isDefaultValue: false,
          serveType: 0,
        }
      }
    }

  },
  data() {
    return {
      suffixFlag: true,
      collectClickFlag: false,
      searchList: [],
      imputModel: "",
    };
  },
  methods: {
    querySearch(queryString, cb) {
      const resultList = []
      searchStock({ key: queryString }).then(res => {
        res.data.filter(item => {
          resultList.push({ // el-autocomplete 必须要一个value 字段，否则就有问题
            value: item.code,
            ...item
          })
        })
        cb(resultList)
      })
    },
    // 选中事件
    handleSelect(item) {
      this.$emit('selectEvent', item);
    },
    // 初始化图标input 获取光标
    handleIconClick(ev) {
      if (this.$refs.autocompleteRef) {
        this.$refs.autocompleteRef.focus()
      }
    },
    // 清除事件
    clearClick() {
      this.suffixFlag = true
    },
    focusInput(item, row) {
      this.suffixFlag = false
    },
    // 收藏事件
    collectChang(item) {
      this.$emit('collecttEvent', item);
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
};
</script>

<style lang="scss" scoped>
.vvautocomplete {
  ::v-deep.el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 280px;
    padding-left: 5px;
  }

  .svg-icon {
    vertical-align: baseline;
  }
  ::v-deep .el-icon-circle-close {
    margin-top: -5px;
  }
}
.autocompleteTemp {
  display: flex;
  justify-content: space-between;
  .fllow svg {
    @include fc_m_v;
  }
}
</style>
