<template>
  <div>
    <div class="my-3">
      <h3>單字</h3>
      <!-- 英文單字 -->
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="insertWord">Word</label>
          <input v-model="word.word" v-validate="'required'" name="insertWord" data-vv-as="英文單字"
            :class="[errors.first('insertWord') ? 'is-invalid' : 'is-valid']" class="form-control" id="insertWord" placeholder="英文單字">
          <div class="invalid-feedback">{{ errors.first('insertWord') }}</div>
        </div>
        <!-- end 英文單字 -->
        <!-- 詞性 -->
        <div class="form-group col-md-6">
          <label for="insertPartOfSpeech">Part of speech</label>
          <select v-model="word.partOfSpeech" class="form-control" id="insertPartOfSpeech">
            <option value="" disabled>詞性</option>
            <option value="v.">v. (verb)</option>
            <option value="n.">n. (noun)</option>
            <option value="adj.">adj. (adjective)</option>
            <option value="adv.">adv. (adverb)</option>
            <option value="prep.">prep. (preposition)</option>
            <option value="phr.">phr. (phrase)</option>
          </select>
          <!-- <small class="form-text text-muted mb-2">
            noun, pronoun, verb, adjective, adverb, preposition,
            conjunction, interjection, phrase
          </small> -->
        </div>
        <!-- end 詞性 -->
        <!-- 中文 -->
        <div class="form-group col-md-6">
          <label for="insertChinese">Chinese</label>
          <input v-model="word.chinese" class="form-control" id="insertChinese" placeholder="中文">
          <small class="form-text text-muted">用 , 分隔 不要空格</small>
        </div>
        <!-- end 中文 -->
        <!-- K.K.音標 -->
        <div class="form-group col-md-6">
          <label for="insertKKPhoneticSymbols">K.K. Phonetic Symbols</label>
          <input v-model="word.kkPhoneticSymbols" class="form-control"
            id="insertKKPhoneticSymbols" placeholder="K.K.音標">
        </div>
        <!-- end K.K.音標 -->
      </div>

      <!-- 例句, 例句中文 -->
      <div class="mb-2">
        <div class="d-inline-block hoverGreen px-2"
         data-toggle="collapse" data-target="#SentencesDiv" aria-expanded="false" aria-controls="SentencesDiv">
          <span class="oi" :class="[sentencesShow ? 'oi-caret-bottom' : 'oi-caret-right']" aria-hidden="true"></span>
          <h3 class="d-inline">
            例句
          </h3>
        </div>
      </div>

      <div id="SentencesDiv" class="mb-2 pt-2 row collapse grayDashed" data-showName="sentencesShow">
        <div v-for="(sentence, index) in word.sentences" :key="index"
          class="col-md-12">
          <div class="form-group">
            <label for="insertSentences">Sentences</label>
            <input v-model="sentence.sentence" class="form-control" id="insertSentences" placeholder="例句">
            <small v-if="index === 0" class="form-text text-muted mb-2">
              ex. Companies must distribute health insurance policies to all workers.
            </small>
          </div>
          <div class="form-group">
            <label for="insertSentencesChinese">Sentences Chinese</label>
            <input v-model="sentence.sentenceChinese" class="form-control" id="insertSentencesChinese" placeholder="例句中文">
            <small v-if="index === 0" class="form-text text-muted mb-2">
              ex. 公司應該將健康保險單發給所有員工。
            </small>
          </div>
          <div class="form-group text-center">
            <button @click="sentencesPlusOne" v-if="index === word.sentences.length - 1"
              class="btn btn-sm btn-outline-success">
              <span class="oi oi-plus" aria-hidden="true"></span>
            </button>
            <button @click="sentencesMinusOne(sentence.sentenceId)" v-if="word.sentences.length > 1"
              class="btn btn-sm btn-outline-success">
              <span class="oi oi-minus" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
      <!-- end 例句, 例句中文 -->

      <!-- 衍生詞 (多筆) -->
      <div class="mb-2">
        <div class="d-inline-block hoverGreen px-2"
         data-toggle="collapse" data-target="#DerivationsDiv" aria-expanded="false" aria-controls="DerivationsDiv">
          <span class="oi" :class="[derivationsShow ? 'oi-caret-bottom' : 'oi-caret-right']" aria-hidden="true"></span>
          <h3 class="d-inline">
            衍生詞
          </h3>
        </div>
      </div>

      <div id="DerivationsDiv" class="mb-2 pt-2 row collapse grayDashed" data-showName="derivationsShow">
        <div v-for="(derivation, index) in word.derivations" :key="`derivation_${index}`"
          class="col-md-12">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="insertDerivation">Derivation</label>
              <input v-model="derivation.derivation" class="form-control" id="insertDerivation" placeholder="衍生詞英文單字">
            </div>
            <div class="form-group col-md-4">
              <label for="insertDerivationPartOfSpeech">Derivation part of speech</label>
              <select v-model="derivation.partOfSpeech" class="form-control" id="insertDerivationPartOfSpeech">
                <option value="" disabled>詞性</option>
                <option value="v.">v. (verb)</option>
                <option value="n.">n. (noun)</option>
                <option value="adj.">adj. (adjective)</option>
                <option value="adv.">adv. (adverb)</option>
                <option value="prep.">prep. (preposition)</option>
                <option value="phr.">phr. (phrase)</option>
              </select>
              <!-- <input v-model="derivation.partOfSpeech" class="form-control" id="insertDerivationPartOfSpeech" placeholder="詞性"> -->
            </div>
            <div class="form-group col-md-4">
              <label for="insertDerivationChinese">Derivation Chinese</label>
              <input v-model="derivation.derivationChinese" class="form-control" id="insertDerivationChinese" placeholder="中文">
            </div>
          </div>

          <div class="form-group text-center">
            <button @click="derivationsPlusOne" v-if="index === word.derivations.length - 1"
              class="btn btn-sm btn-outline-success">
              <span class="oi oi-plus" aria-hidden="true"></span>
            </button>
            <button @click="derivationsMinusOne(derivation.derivationId)" v-if="word.derivations.length > 1"
              class="btn btn-sm btn-outline-success">
              <span class="oi oi-minus" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
      <!-- end 衍生詞 (多筆) -->

      <!-- 同義詞 (多筆) -->
      <div class="mb-2">
        <div class="d-inline-block hoverGreen px-2"
         data-toggle="collapse" data-target="#SynonymsDiv" aria-expanded="false" aria-controls="SynonymsDiv">
          <span class="oi" :class="[synonymsShow ? 'oi-caret-bottom' : 'oi-caret-right']" aria-hidden="true"></span>
          <h3 class="d-inline">
            同義詞
          </h3>
        </div>
      </div>

      <div id="SynonymsDiv" class="mb-2 pt-2 row collapse grayDashed" data-showName="synonymsShow">
        <div v-for="(synonym, index) in word.synonyms" :key="`synonym_${index}`"
          class="col-md-12">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="insertSynonym">Synonym</label>
              <input v-model="synonym.synonym" class="form-control" id="insertSynonym" placeholder="同義詞英文單字">
            </div>
            <div class="form-group col-md-4">
              <label for="insertSynonymPartOfSpeech">Synonym part of speech</label>
              <select v-model="synonym.partOfSpeech" class="form-control" id="insertSynonymPartOfSpeech">
                <option value="" disabled>詞性</option>
                <option value="v.">v. (verb)</option>
                <option value="n.">n. (noun)</option>
                <option value="adj.">adj. (adjective)</option>
                <option value="adv.">adv. (adverb)</option>
                <option value="prep.">prep. (preposition)</option>
                <option value="phr.">phr. (phrase)</option>
              </select>
              <!-- <input v-model="synonym.partOfSpeech" class="form-control" id="insertSynonymPartOfSpeech" placeholder="詞性"> -->
            </div>
            <div class="form-group col-md-4">
              <label for="insertSynonymChinese">Synonym Chinese</label>
              <input v-model="synonym.synonymChinese" class="form-control" id="insertSynonymChinese" placeholder="中文">
            </div>
          </div>
          <div class="form-group text-center">
            <button @click="synonymsPlusOne" v-if="index === word.synonyms.length - 1"
              class="btn btn-sm btn-outline-success">
              <span class="oi oi-plus" aria-hidden="true"></span>
            </button>
            <button @click="synonymsMinusOne(synonym.synonymId)" v-if="word.synonyms.length > 1"
              class="btn btn-sm btn-outline-success">
              <span class="oi oi-minus" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
      <!-- end 同義詞 (多筆) -->

      <!-- 反義詞 (多筆) -->
      <div class="mb-2">
        <div class="d-inline-block hoverGreen px-2"
         data-toggle="collapse" data-target="#AntonymsDiv" aria-expanded="false" aria-controls="AntonymsDiv">
          <span class="oi" :class="[antonymsShow ? 'oi-caret-bottom' : 'oi-caret-right']" aria-hidden="true"></span>
          <h3 class="d-inline">
            反義詞
          </h3>
        </div>
      </div>

      <div id="AntonymsDiv" class="mb-2 pt-2 row collapse grayDashed" data-showName="antonymsShow">
        <div v-for="(antonym, index) in word.antonyms" :key="`antonym_${index}`"
          class="col-md-12">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="insertAntonym">Antonym</label>
              <input v-model="antonym.antonym" class="form-control" id="insertAntonym" placeholder="反義詞英文單字">
            </div>
            <div class="form-group col-md-4">
              <label for="insertAntonymPartOfSpeech">Antonym part of speech</label>
              <select v-model="antonym.partOfSpeech" class="form-control" id="insertAntonymPartOfSpeech">
                <option value="" disabled>詞性</option>
                <option value="v.">v. (verb)</option>
                <option value="n.">n. (noun)</option>
                <option value="adj.">adj. (adjective)</option>
                <option value="adv.">adv. (adverb)</option>
                <option value="prep.">prep. (preposition)</option>
                <option value="phr.">phr. (phrase)</option>
              </select>
              <!-- <input v-model="antonym.partOfSpeech" class="form-control" id="insertAntonymPartOfSpeech" placeholder="詞性"> -->
            </div>
            <div class="form-group col-md-4">
              <label for="insertAntonymChinese">Antonym Chinese</label>
              <input v-model="antonym.antonymChinese" class="form-control" id="insertAntonymChinese" placeholder="中文">
            </div>
          </div>
          <div class="form-group text-center">
            <button @click="antonymsPlusOne" v-if="index === word.antonyms.length - 1"
              class="btn btn-sm btn-outline-success">
              <span class="oi oi-plus" aria-hidden="true"></span>
            </button>
            <button @click="antonymsMinusOne(antonym.antonymId)" v-if="word.antonyms.length > 1"
              class="btn btn-sm btn-outline-success">
              <span class="oi oi-minus" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
      <!-- end 反義詞 (多筆) -->
    </div>
    <button @click="validateBeforeSubmit" ref="submitBtn" type="submit" class="btn btn-primary">新增</button>

    <hr class="mt-3">
    <h4>預覽</h4>
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="h5 text-success">{{ word.word }}</div>
        <div>{{ word.kkPhoneticSymbols }}</div>
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
      <div class="col-md-9">
        <div>
          <span class="font-weight-bold">{{ word.partOfSpeech }}</span>
          <span class="font-weight-bold">{{ word.chinese }}</span>
          <div v-for="(sentence, index) in word.sentences" :key="index">
            <div>{{ sentence.sentence }}</div>
            <div>{{ sentence.sentenceChinese }}</div>
          </div>
        </div>
      </div>
    </div>

    <pre>word:</pre>
    <pre>{{ word }}</pre>
  </div>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import Noty from 'noty';
import { mapGetters, mapActions } from 'vuex';
import 'animate.css';
import 'noty/src/noty.scss';
import 'noty/src/themes/relax.scss';

const uuidv4 = require('uuid/v4');

export default {
  name: 'InsertEnglish',
  data() {
    return {
      word: {
        wordId: uuidv4().replace(/-/g, ''),
        word: 'policy',
        kkPhoneticSymbols: '[pɑləsɪ]',
        partOfSpeech: 'n.',
        chinese: '政策, 規定; 保險單',
        // 衍生詞
        derivations: [
          { derivationId: uuidv4().replace(/-/g, ''), derivation: '', partOfSpeech: '', derivationChinese: '' },
        ],
        // 同義詞
        synonyms: [
          { synonymId: uuidv4().replace(/-/g, ''), synonym: '', partOfSpeech: '', synonymChinese: '' },
        ],
        // 反義詞
        antonyms: [
          { antonymId: uuidv4().replace(/-/g, ''), antonym: '', partOfSpeech: '', antonymChinese: '' },
        ],
        sentences: [
          { sentenceId: uuidv4().replace(/-/g, ''), sentence: '', sentenceChinese: '' },
        ],
      },
      sentencesShow: false,
      derivationsShow: false,
      synonymsShow: false,
      antonymsShow: false,
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.createWord();
          return;
        }

        new Noty({
          type: 'error',
          theme: 'relax',
          layout: 'bottomCenter',
          text: '<span class="oi oi-circle-x" aria-hidden="true"></span> 無法新增, 資料填寫不完整!',
          timeout: 1000,
        }).show();
      });
    },
    // 新增單字
    createWord() {
      const self = this;

      this.$refs.submitBtn.setAttribute('disabled', 'disabled');

      const noty = new Noty({
        type: 'warning',
        theme: 'relax',
        layout: 'bottomCenter',
        // animation: {
        //   open: 'animated bounceInUp',
        //   close: 'animated bounceOutDown',
        // },
        text: '<span class="oi oi-aperture loadingIcon" aria-hidden="true"></span> 儲存中...',
      }).show();

      this.$store.dispatch('createWord', _.cloneDeep(this.word))
        .then(() => {
          // 新增成功
          noty.close();

          self.$refs.submitBtn.removeAttribute('disabled');

          new Noty({
            type: 'success',
            theme: 'relax',
            layout: 'bottomCenter',
            text: '<span class="oi oi-circle-check" aria-hidden="true"></span> 新增了一筆資料!',
            timeout: 1000,
          }).show();

          // 重置表單內容 一個一個的 不知有沒有更好的方式
          // 還有取消 $validator 重置後跳出驗證
          self.word.wordId = uuidv4().replace(/-/g, '');
          self.word.word = '';
          self.word.kkPhoneticSymbols = '';
          self.word.partOfSpeech = '';
          self.word.chinese = '';
          self.word.derivations = [];
          self.word.derivations.push({ derivationId: uuidv4().replace(/-/g, ''), derivation: '', partOfSpeech: '', derivationChinese: '' });
          self.word.synonyms = [];
          self.word.synonyms.push({ synonymId: uuidv4().replace(/-/g, ''), synonym: '', partOfSpeech: '', synonymChinese: '' });
          self.word.antonyms = [];
          self.word.antonyms.push({ antonymId: uuidv4().replace(/-/g, ''), antonym: '', partOfSpeech: '', antonymChinese: '' });
          self.word.sentences = [];
          self.word.sentences.push({ sentenceId: uuidv4().replace(/-/g, ''), sentence: '', sentenceChinese: '' });
          self.$validator.reset();
        })
        .catch((e) => {
          // 新增失敗
          noty.close();

          self.$refs.submitBtn.removeAttribute('disabled');

          if (e === 'Repeat') {
            new Noty({
              type: 'error',
              theme: 'relax',
              layout: 'bottomCenter',
              text: '<span class="oi oi-circle-x" aria-hidden="true"></span> 新增失敗, 此單字已存在於字庫中!',
              timeout: 1000,
            }).show();
          }
        });
    },
    // 例句列新增一行
    sentencesPlusOne() {
      this.word.sentences.push({ sentenceId: uuidv4().replace(/-/g, ''), sentence: '', sentenceChinese: '' });
    },
    // 例句列減少一行
    sentencesMinusOne(Id) {
      const sentences = this.word.sentences;
      const findIndex = sentences.findIndex(sentence => (Id === sentence.sentenceId));
      sentences.splice(findIndex, 1);
      // sentences.splice(sentences.length - 1, sentences.length);
    },
    // 衍生詞新增一行
    derivationsPlusOne() {
      this.word.derivations.push({ derivationId: uuidv4().replace(/-/g, ''), derivation: '', partOfSpeech: '', derivationChinese: '' });
    },
    // 衍生詞減少一行
    derivationsMinusOne(Id) {
      const derivations = this.word.derivations;
      const findIndex = derivations.findIndex(derivation => (Id === derivation.derivationId));
      derivations.splice(findIndex, 1);
      // derivations.splice(derivations.length - 1, derivations.length);
    },
    // 同義詞新增一行
    synonymsPlusOne() {
      this.word.synonyms.push({ synonymId: uuidv4().replace(/-/g, ''), synonym: '', partOfSpeech: '', synonymChinese: '' });
    },
    // 同義詞減少一行
    synonymsMinusOne(Id) {
      const synonyms = this.word.synonyms;
      const findIndex = synonyms.findIndex(synonym => (Id === synonym.synonymId));
      synonyms.splice(findIndex, 1);
      // synonyms.splice(synonyms.length - 1, synonyms.length);
    },
    // 反義詞新增一行
    antonymsPlusOne() {
      this.word.antonyms.push({ antonymId: uuidv4().replace(/-/g, ''), antonym: '', partOfSpeech: '', antonymChinese: '' });
    },
    // 反義詞減少一行
    antonymsMinusOne(Id) {
      const antonyms = this.word.antonyms;
      const findIndex = antonyms.findIndex(antonym => (Id === antonym.antonymId));
      antonyms.splice(findIndex, 1);
      // antonyms.splice(antonyms.length - 1, antonyms.length);
    },
  },
  mounted() {
    const self = this;
    $('[data-showName]').on('shown.bs.collapse', (e) => {
      let name = e.target.getAttribute('data-showName');
      if (!name) {
        name = e.target.parentElement.getAttribute('data-showName');
      }
      self[name] = true;
    });

    $('[data-showName]').on('hidden.bs.collapse', (e) => {
      let name = e.target.getAttribute('data-showName');
      if (!name) {
        name = e.target.parentElement.getAttribute('data-showName');
      }
      self[name] = false;
    });
  },
};
</script>

<style scoped>
  .d-inline-block.hoverGreen {
    border: 1px solid transparent;
  }

  .d-inline-block.hoverGreen:hover {
    border-color: #28a745;
    transition: border-color 1s ease-out;
  }

  .grayDashed {
    border: 2px rgb(131, 152, 148) dashed;
  }
</style>
