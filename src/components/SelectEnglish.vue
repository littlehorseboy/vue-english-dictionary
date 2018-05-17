<template>
  <div>
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

    <div class="onoffswitch" style="float: right;">
      <input v-model="editBtnShow" type="checkbox" class="onoffswitch-checkbox" id="myonoffswitch">
      <label class="onoffswitch-label" for="myonoffswitch">
        <span class="onoffswitch-inner"></span>
        <span class="onoffswitch-switch"></span>
      </label>
    </div>

    <h4 class="clear">自建字庫</h4>
    <div v-for="word in words" :key="word.wordId">
      <SelectEnglishViewEdit :word="word" :editBtnShow="editBtnShow"></SelectEnglishViewEdit>
      <!-- <div class="row">
        <div class="col-md-3">
          <div class="h5 text-success">{{ word.word }}</div>
          <div>[{{ word.kkPhoneticSymbols }}]</div>
          <div v-for="(derivation, index) in word.derivations" :key="`derivation_${index}`">
            <small class="border border-success">衍</small>
            <small>{{ derivation.derivation }}</small>
            <small>{{ derivation.partOfSpeech }}</small>
            <small>{{ derivation.derivationChinese }}</small>
          </div>
          <div v-for="(synonym, index) in word.synonyms" :key="`synonym_${index}`">
            <small class="border border-success">同</small>
            <small>{{ synonym.synonym }}</small>
            <small>{{ synonym.partOfSpeech }}</small>
            <small>{{ synonym.synonymChinese }}</small>
          </div>
          <div v-for="(antonym, index) in word.antonyms" :key="`antonym_${index}`">
            <small class="border border-success">反</small>
            <small>{{ antonym.antonym }}</small>
            <small>{{ antonym.partOfSpeech }}</small>
            <small>{{ antonym.antonymChinese }}</small>
          </div>
        </div>
        <div :class="[editBtnShow ? 'col-md-9' : 'col-md-8']">
          <div>
            <span class="font-weight-bold">{{ word.partOfSpeech }}</span>
            <span class="font-weight-bold">{{ word.chinese }}</span>
            <div v-for="(sentence, index) in word.sentences" :key="index">
              <div>{{ sentence.sentence }}</div>
              <div>{{ sentence.sentenceChinese }}</div>
            </div>
          </div>
        </div>
        <div v-if="!editBtnShow" class="col-md-1">
          <button @click="editMode = !editMode" type="button" class="btn btn-sm btn-outline-primary">
            <span class="oi oi-circle-check" aria-hidden="true"></span> 編輯
          </button>
          <button type="button" class="btn btn-sm btn-outline-danger">
            <span class="oi oi-circle-check" aria-hidden="true"></span> 刪除
          </button>
        </div>
      </div> -->
    </div>
    <pre>{{ words }}</pre>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
    }),
  },
  methods: {
    createWord() {
      this.$store.dispatch('createWord', this.word);
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
      height: 30px;
      padding: 0;
      line-height: 30px;
      font-size: 14px;
      color: white;
      font-family: Trebuchet, Arial, sans-serif;
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
      width: 22px;
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
