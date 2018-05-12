<template>
  <div>
    <div class="form-group">
      <label for="insertWord">英文單字</label>
      <input type="email" class="form-control" id="insertWord" placeholder="英文單字">
    </div>
    <div class="form-group">
      <label for="insertKKPhoneticSymbols">K.K.音標</label>
      <input type="password" class="form-control" id="insertKKPhoneticSymbols" placeholder="K.K.音標">
    </div>
    <div class="form-group">
      <label for="insertPartOfSpeech">詞性</label>
      <input type="password" class="form-control" id="insertPartOfSpeech" placeholder="詞性">
      <small class="form-text text-muted">
        noun, pronoun(代名詞???), verb, adjective, adverb, preposition
        , conjunction, interjection, phrase
      </small>
    </div>
    <div class="form-group">
      <label for="insertChinese">中文</label>
      <input type="password" class="form-control" id="insertChinese" placeholder="中文">
      <small class="form-text text-muted">用 , 分隔 不要空格</small>
    </div>
    <div class="form-group">
      <label for="insertDerivation">衍生詞</label>
      <input type="password" class="form-control" id="insertDerivation" placeholder="衍生詞">
      <small class="form-text text-muted">感覺有點麻煩</small>
    </div>
    <div class="form-group">
      <label for="insertSynonym">同義詞</label>
      <input type="password" class="form-control" id="insertSynonym" placeholder="同義詞">
      <small class="form-text text-muted">感覺有點麻煩</small>
    </div>
    <div class="form-group">
      <label for="insertAntonym">反義詞</label>
      <input type="password" class="form-control" id="insertAntonym" placeholder="反義詞">
      <small class="form-text text-muted">感覺有點麻煩</small>
    </div>
    <div class="form-group">
      <label for="insertSentences">例句</label>
      <input type="password" class="form-control" id="insertSentences" placeholder="例句">
      <small class="form-text text-muted">感覺有點麻煩</small>
    </div>
    <div class="form-group">
      <label for="insertSentencesChinese">例句中文</label>
      <input type="password" class="form-control" id="insertSentencesChinese" placeholder="例句中文">
      <small class="form-text text-muted">感覺有點麻煩</small>
    </div>
    <button @click="createWord" class="btn btn-primary">Submit</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'InsertEnglish',
  data() {
    return {
      word: {
        wordId: new Date().getTime(),
        word: 'policy',
        kkPhoneticSymbols: '[`]',
        partOfSpeech: 'n.',
        chinese: '政策, 規定; 保險單',
        derivation: [
          { derivation: '', derivationChinese: '' },
        ],
        synonym: [
          { synonym: '', synonymChinese: '' },
        ],
        antonym: [
          { antonym: '', antonymChinese: '' },
        ],
        sentences: [
          { sentences: '', sentencesChinese: '' },
        ],
      },
    };
  },
  methods: {
    createWord() {
      this.$store.dispatch('createWord', this.word);
    },
  },
};
</script>

<style scoped>
</style>
