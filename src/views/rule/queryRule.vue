<template>
  <section class="history-list">
    <div class="search-bar">
      <div class="search-item">
        
        <div class="form-item">
          <label for="">类型：</label>
          <n3-select v-model="searchKey.type"  width="320px"  :rules="[{type:'required'}]" >
            <n3-option value="FREQUENCY">次数</n3-option>
            <n3-option value="FREQUENCY_AMOUNT">次数金额</n3-option>
            <n3-option value="TOTAL">总额</n3-option>
            <n3-option value="FREQUENCY_TOTAL">次数总额</n3-option>
          </n3-select>
        </div>
      </div>
      <div class="search-submit">
        <div class="form-item">
          <n3-button type="primary" block @click.native="searchRecord">搜索</n3-button>
        </div>
        <div class="form-item">
          <n3-button type="primary" block @click.native="toAdd">新增</n3-button>
        </div>
      </div>
    </div>
    <n3-data-table
      :selection="selection"
      :source="source"
      :columns="columns"
      :filter="false"
      :search="false"
      :page="false"
      :select-col="false"
      :loading="loading"
      responsive
    >
    <div>
      


    </div>
    </n3-data-table>
    <n3-page
      :total="pagination.total"
      :pagesize="pagination.pagesize"
      :show-total="true"
      v-model="pagination.current"
      @change="pageChange"
    >
    </n3-page>
  </section>
</template>
<script>
import API from ".././../api/api.js";
import qs from "qs";
import bankForm from "./addRule";

export default {
  data() {
    return {
      loading: false,
      searchChanged: false,
      searchKey: {
        type: ""
      },
      selection: {
        checkRows: [],
        onSelect(record, checked, checkRows) {},
        onSelectAll(checked, checkRows, changeRows) {},
        getCheckboxProps(record) {
          return {
            checked: false,
            disabled: true
          };
        }
      },
      pagination: {
        current: 1,
        total: 0,
        pagesize: 20
      },
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          width: "100px",
          render: (text, record, index) => {
            return text;
          }
        },
        {
          title: "金额下限",
          dataIndex: "minAmount",
          width: "160px",
          render: (text, record, index) => {
            return text;
          }
        },
        {
          title: "金额上限",
          dataIndex: "maxAmount",
          width: "120px",
          render: (text, record, index) => {
            return text;
            return `<router-link to="/user/${text}" target="_blank">
                        ${text}
                      </router-link>`;
          }
        },
        {
          title: "类型",
          dataIndex: "type",
          width: "120px",
          render: text => {
            if (text =="FREQUENCY") {
              text = "次数";
              return text;
            } else if (text =="FREQUENCY_AMOUNT") {
              text = "次数金额";
              return text;
            } else if (text =="TOTAL") {
              text = "总额";
              return text;
            }  else if (text =="FREQUENCY_TOTAL") {
              text = "次数总额";
              return text;
            }
          }
        },
        {
          title: "操作",
          dataIndex: "id",
          width: "120px",
          render: text => {
            return `<n3-button type="primary" block  @click.native="toUpdate(${text})" >修改</n3-button><n3-button type="primary" block  @click.native="toDetailAdd(${text})" >新增明细</n3-button>`;
          }
        }
      ],
      source: []
    };
  },
  methods: {
    pageChange(num) {
      this.pagination.current = num;
      this.searchRecord();
    },
    searchChange() {
      this.searchChanged = true;
    },
    searchRecord() {
      if (this.searchChanged) {
        this.pagination.current = 1;
        this.searchChanged = false;
      }
      let params = Object.assign({}, this.searchKey, {
        num: this.pagination.current
      });
      if (params.queryResult === 1) {
        params.queryResult = true;
      }
      if (params.queryResult === 0) {
        params.queryResult = false;
      }
      // 遍历 取value 判断是否有值 没有值从params中删除
      Object.keys(params).forEach(key => {
        let item = params[key];
        if (item === "" || typeof item === "undefined") {
          delete params[key];
        }
      });
      let url = API.FIND_RULE;
      this.loading = true;
      this.$http
        .post(url, qs.stringify(params))
        .then(data => {
          
          if (data.code === "0000" || data.code === "0") {
            this.source = data.data.records || [];
            this.pagination.total = data.data.total || 0;
            this.pagination.pagesize = data.data.size;
            this.pagination.current = data.data.current;
            this.loading = false;
          } else {
            this.n3Alert({
              content: "加载失败，请刷新试试~",
              type: "danger",
              placement: "top-right",
              duration: 2000,
              width: "240px" // 内容不确定，建议设置width
            });
          }
        })
        .catch(error => {
          this.loading = false;
          this.n3Alert({
            content: error || "加载失败，请刷新试试~",
            type: "danger",
            placement: "top-right",
            duration: 2000,
            width: "240px" // 内容不确定，建议设置width
          });
        });
    },
    reload() {
      this.pagination.current = 1;
      this.searchRecord();
    },
    toAdd() {
      this.$router.push({ path: '/ruleAdd'})
    },
    toDetailAdd(ruleId) {
      // alert(ruleId)
      this.$router.push({ path: '/ruleDetailAdd',query:{ruleId:ruleId}})
    },
    toUpdate(mccId) {
      
    }
  },
  watch: {
    $route() {
      if (this.$route.name == "normalTable") {
        this.reload();
      }
    }
  },
  created() {
    this.reload();
  }
};
</script>

<style lang="less">
@import "../../style/define.less";

.history-list {
 padding: 50px 50px;
}
.img {
  max-width: 100px;
  max-height: 50px;
}
</style>

