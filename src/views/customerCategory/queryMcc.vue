<template>
  <section class="history-list">
    <div class="search-bar">
      <div class="search-item">
        <div class="form-item">
          <label for="">商户类别：</label>
          <n3-input v-model="searchKey.name" @change="searchChange"></n3-input>
        </div>
        <div class="form-item">
          <label for="">MCC：</label>
          <n3-input v-model="searchKey.mcc" @change="searchChange"></n3-input>
        </div>
        <div class="form-item">
          <label for="">MCC状态：</label>
          <n3-select v-model="searchKey.status" @change="searchChange">
            <n3-option value="">全部</n3-option>
            <n3-option value="1">可用</n3-option>
            <n3-option value="0">禁用</n3-option>
          </n3-select>
        </div>
      </div>
      <!-- <div class="search-item">
        <div class="form-item">
          <label for="">上限金额：</label>
          <n3-input v-model="searchKey.hightAmount" @change="searchChange"></n3-input>
        </div>
        <div class="form-item">
          <label for="">下限金额：</label>
          <n3-input v-model="searchKey.lowAmount" @change="searchChange"></n3-input>
        </div>
      </div> -->

      <!-- <div class="search-item">
        <div class="form-item">
          <label for="">开始时间： </label>
          <n3-datepicker
            :rules="[{type:'required'}]"
            v-model="searchKey.startDate"
            format="yyyy-MM-dd"
            @change="searchChange"
          >
          </n3-datepicker>
        </div>
        <div class="form-item">
          <label for="">结束时间：</label>
          <n3-datepicker
            :rules="[{type:'required'}]"
            v-model="searchKey.endDate"
            format="yyyy-MM-dd"
            @change="searchChange"
          >
          </n3-datepicker>
        </div> 
      </div> -->
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
import bankForm from "./addMcc";

export default {
  data() {
    return {
      loading: false,
      searchChanged: false,
      searchKey: {
        name: "",
        mcc: "",
        hightAmount: "",
        lowAmount: "",
        status: ""
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
          title: "商户类别",
          dataIndex: "name",
          width: "160px",
          render: (text, record, index) => {
            return text;
          }
        },
        {
          title: "MCC",
          dataIndex: "mcc",
          width: "120px",
          render: (text, record, index) => {
            return text;
            return `<router-link to="/user/${text}" target="_blank">
                        ${text}
                      </router-link>`;
          }
        },
        {
          title: "状态",
          dataIndex: "status",
          width: "120px",
          render: text => {
            if (text === 0) {
              text = "禁用";
              return text;
            } else {
              text = "可用";
              return text;
            }
            // return '<img class="img" src="' + text + '"  />'; //
          }
        },
        {
          title: "操作",
          dataIndex: "id",
          width: "120px",
          render: text => {
            return `<n3-button type="primary" block  @click.native="toUpdate(${text})" >修改</n3-button>`;
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
      console.log("开始查询MCC");
      if (this.searchChanged) {
        this.pagination.current = 1;
        this.searchChanged = false;
      }
      let params = Object.assign({}, this.searchKey, {
        num: this.pagination.current
      });
      // console.log(params);
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
      let url = API.FIND_MCC;
      this.loading = true;
      this.$http
        .post(url, qs.stringify(params))
        .then(data => {
          this.source = data.data.records || [];
          this.pagination.total = data.data.total || 0;
          this.pagination.pagesize = data.data.size;
          this.pagination.current = data.data.current;
          this.loading = false;
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
      let ids = this.$layer.iframe({
        content: {
          content: bankForm,
          parent: this,
          data: {}
        },
        area: ["900px", "600px"],
        title: "新增MCC",
        shade: false
      });
    },
    toUpdate(mccId) {
      let ids = this.$layer.iframe({
        content: {
          content: bankForm,
          parent: this,
          data: {
            mccId: mccId
          }
        },
        area: ["900px", "600px"],
        title: "修改MCC",
        shade: false
      });
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
    this.searchRecord();
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

