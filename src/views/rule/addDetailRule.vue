<template>
  <section class="user-edit" >
    <n3-form
      ref="form"
      validate
    >
    <n3-form-item
        label="浮动下限"
        need
        :label-col="3"
      >
        <n3-input
          :rules="[{type:'required'}]"
          v-model="model.minFloatingRatio"
          width="320px"
        >
        </n3-input>
      </n3-form-item>

      <n3-form-item
        label="浮动上限"
        need
        :label-col="3"
      >
        <n3-input
          :rules="[{type:'required'}]"
          v-model="model.maxFloatingRatio"
          width="320px"
        >
        </n3-input>
      </n3-form-item>

      <n3-form-item
        label= "金额下限"
        need
        :label-col="3"
      >
        <n3-input
          v-model="model.minAmount"
          width="320px"
          :rules="[{type:'required'}]"
          class="fl"
        >
        </n3-input>
      </n3-form-item>
      <n3-form-item
        label= "金额上限"
        need
        :label-col="3"
      >
      <n3-input
          v-model="model.maxAmount"
          width="320px"
          :rules="[{type:'required'}]"
          class="fl"
        >
        </n3-input>
      </n3-form-item>
      
      <n3-form-item
        label= "保留小数位数"
        need
        :label-col="3"
      >
      <n3-input
          v-model="model.decimalNumber"
          width="320px"
          :rules="[{type:'required'}]"
          class="fl"
        >
        </n3-input>
      </n3-form-item>
        <n3-form-item
        label= "占用比例"
        need
        :label-col="3"
      >
      <n3-input
          v-model="model.floatingRatio"
          width="320px"
          :rules="[{type:'required'}]"
          class="fl"
        >
        </n3-input>
      </n3-form-item>
      <n3-form-item
        :label-col="3"
      >
        <n3-button
          @click.native="submit"
          type="primary"
          :loading="loading"
          class="submit-btn"
        >
          {{ loading ? '操作中' : '保存' }}
        </n3-button>
      </n3-form-item>
    </n3-form>
  </section>
</template>

<script>
import API from ".././../api/api.js";
import qs from "qs";
import PAYTYPE from '@/views/payType/queryPayType'
// import { mapState } from "vuex";
// import { randomPassword, dateFormat } from "../../utils";

export default {
  // computed: {
  //   ...mapState(["user"])
  // },
  data() {
    
    return {
      model: {
        id: "",
        ruleId:this.$route.query.ruleId,
        minAmount: "",
        maxAmount: "",
        floatingRatio:"",
        minFloatingRatio:"",
        maxFloatingRatio:"",
        decimalNumber:"",
        type:""
      },
    list: [{
      header: 'first',
      badge: 12,
      content: 'first的内容'
      }, 
      {
        header: 'seacond',
        badge: 12,
        content: '<input type="text"/>'
    }],
    loading: false,
    src: "",
    showStatus: false,     
    };
  },
  props: {
    mccId: ""
  },
  methods: {
    reload() {
      // 重置表单
      this.model = {
        id: "",
        name: "",
        code: ""
      };
      this.loading = false;
    },

    addRuleDetail() {
      let cond = Object.assign({}, this.model);
      this.loading = true;
      this.$http
        .post(API.ADD_RULE_DETAIL, qs.stringify(cond))
        .then(data => {
          this.loading = false;
          this.n3Alert({
            content: "保存成功~",
            type: "success",
            placement: "top-right",
            duration: 2000,
            width: "240px" // 内容不确定，建议设置width
          });
          this.$router.push("/ruleQuery");
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
          this.n3Alert({
            content: "保存失败，请刷新重试~",
            type: "danger",
            placement: "top-right",
            duration: 2000,
            width: "240px" // 内容不确定，建议设置width
          });
        });
    },
    submit() {
      this.$refs.form.validateFields(result => {
        if (!result.isvalid) {
          return;
        }
        return this.addRuleDetail();
      });
    },
    findPayTypeBYId() {
      this.$http
        .post(
          API.FIND_RULE_DETAIL_BY_ID,
          qs.stringify({
            ruleId: this.mccId
          })
        )
        .then(data => {
          // 成功处理
          if (data.code === "0000" && data.object != null) {
            this.showStatus = true;
            this.model.type = data.object.type;
            this.model.id = data.object.id;
            this.model.minAmount = data.object.minAmount;
            this.model.maxAmount = data.object.maxAmount;
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
          this.n3Alert({
            content: "查询失败",
            type: "danger",
            placement: "top-right",
            duration: 2000,
            width: "240px" // 内容不确定，建议设置width
          });
        });
    }
  },

  created: function() {
    this.findPayTypeBYId();
  }
};
</script>

<style lang="less">
.user-edit {
  background: #fff;
  .submit-btn {
    width: 320px;
  }
  .refresh {
    cursor: pointer;
  }
  .i-tips {
    float: left;
    padding-left: 10px;
    color: #999;
  }
  .img {
    max-width: 200px;
    max-height: 100px;
  }
}
</style>