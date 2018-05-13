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

    <h4>自建字庫</h4>
    <div v-for="word in words" :key="word.wordId" class="row mb-4">
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
    <pre>{{ words }}</pre>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'InsertEnglish',
  data() {
    return {

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
};
</script>

<style scoped>
</style>
