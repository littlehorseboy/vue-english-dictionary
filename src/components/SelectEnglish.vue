<template>
  <div class="pt-3">
    <h4>說明</h4>
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="h5 text-success">英文單字</div>
        <div>[K.K音標]</div>
        <div>
          <small class="border border-success">衍</small>
          <small>衍生詞英文單字</small>
          <small>詞性</small>
          <small>中文</small>
          <sup>N</sup>
        </div>
        <div>
          <small class="border border-success">同</small>
          <small>同義詞英文單字</small>
          <small>詞性</small>
          <small>中文</small>
          <sup>N</sup>
        </div>
        <div>
          <small class="border border-success">反</small>
          <small>反義詞英文單字</small>
          <small>詞性</small>
          <small>中文</small>
          <sup>N</sup>
        </div>
      </div>
      <div class="col-md-9">
        <div>
          <span class="font-weight-bold">單字詞性</span>
          <span class="font-weight-bold">單字中文</span>
          <div>
            <div>
              英文例句
              <sup>N</sup>
            </div>
            <div>
              英文例句中文
              <sup>N</sup>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>

    <div class="onoffswitch" style="float: right; z-index: 1;">
      <input v-model="editBtnShow" type="checkbox" class="onoffswitch-checkbox" id="myonoffswitch">
      <label class="onoffswitch-label" for="myonoffswitch">
        <span class="onoffswitch-inner"></span>
        <span class="onoffswitch-switch"></span>
      </label>
    </div>

    <div class="position-fixed" style="bottom: 2rem; right: 2rem; z-index: 1;">
      <button @click="submitWords" class="btn btn-primary">保存</button>
    </div>

    <h4 class="clear">自建字庫</h4>
    <div v-for="word in words" :key="word.wordId">
      <SelectEnglishViewEdit :addressWord="word" :editBtnShow="editBtnShow"></SelectEnglishViewEdit>
    </div>

    <pre>words</pre>
    <pre>{{ words }}</pre>
    <pre>createWords</pre>
    <pre>{{ createWords }}</pre>
    <pre>updateWords</pre>
    <pre>{{ updateWords }}</pre>
    <pre>deleteWords</pre>
    <pre>{{ deleteWords }}</pre>
  </div>
</template>

<script>
import Noty from 'noty';
import { mapGetters, mapActions } from 'vuex';
import 'noty/src/noty.scss';
import 'noty/src/themes/relax.scss';
import SelectEnglishViewEdit from './SelectEnglish/SelectEnglishViewEdit';

export default {
  name: 'SelectEnglish',
  data() {
    return {
      editBtnShow: true,
    };
  },
  computed: {
    ...mapGetters({
      words: 'getWords',
      createWords: 'getCreateWords',
      updateWords: 'getUpdateWords',
      deleteWords: 'getDeleteWords',
    }),
  },
  methods: {
    submitWords() {
      const noty = new Noty({
        type: 'warning',
        theme: 'relax',
        layout: 'bottomCenter',
        text: '<span class="oi oi-aperture loadingIcon" aria-hidden="true"></span> 儲存中...',
      }).show();

      this.$store.dispatch('submitWords')
        .then(() => {
          // 新增成功
          noty.close();

          // this.$refs.submitBtn.removeAttribute('disabled');

          new Noty({
            type: 'success',
            theme: 'relax',
            layout: 'bottomCenter',
            text: '<span class="oi oi-circle-check" aria-hidden="true"></span> 保存完成!',
            timeout: 1000,
          }).show();
        })
        .catch((e) => {
          // 新增失敗
          noty.close();

          // this.$refs.submitBtn.removeAttribute('disabled');

          new Noty({
            type: 'warning',
            theme: 'relax',
            layout: 'bottomCenter',
            text: `<span class="oi oi-circle-x" aria-hidden="true"></span> ${e}`,
            timeout: 1000,
          }).show();
        });
    },
  },
  components: {
    SelectEnglishViewEdit,
  },
};
</script>

<style scoped>
  .onoffswitch {
    position: sticky;
    top: 10px;
    width: 90px;
    user-select: none;
  }
  .onoffswitch-checkbox {
    display: none;
  }
  .onoffswitch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid #999999;
    border-radius: 20px;
    margin-bottom: 0;
  }
  .onoffswitch-inner {
      display: block;
      width: 200%;
      margin-left: -100%;
      transition: margin 0.3s ease-in 0s;
  }
  .onoffswitch-inner:before, .onoffswitch-inner:after {
      display: block;
      float: left;
      width: 50%;
      height: 25px;
      padding: 0;
      line-height: 25px;
      font-size: 14px;
      color: white;
      font-weight: bold;
      box-sizing: border-box;
  }
  .onoffswitch-inner:before {
      content: "檢視";
      padding-left: 10px;
      background-color: #35943D;
      color: #FFFFFF;
  }
  .onoffswitch-inner:after {
      content: "編輯";
      padding-right: 10px;
      background-color: #F07878;
      color: #FCE8E8;
      text-align: right;
  }
  .onoffswitch-switch {
      display: block;
      width: 18px;
      margin: 6px;
      background: #F5F5F5;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 56px;
      border: 2px solid #999999;
      border-radius: 20px;
      transition: all 0.3s ease-in 0s;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
      margin-left: 0;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
      right: 0px;
  }
</style>
