<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-3">
        <!-- 英文單字 -->
        <div class="text-success">
          <label for="insertWord" class="h5">word</label>
          <input v-model="word.word" class="form-control" id="insertWord" placeholder="英文單字">
        </div>
        <!-- end 英文單字 -->
        <!-- K.K.音標 -->
        <div class="mt-2">
          <small>
            <label for="insertKKPhoneticSymbols">K.K.phonetic symbols</label>
            <input v-model="word.kkPhoneticSymbols" class="form-control form-control-sm" id="insertKKPhoneticSymbols" placeholder="K.K.音標" value="æp(ə)l">
          </small>
        </div>
        <!-- end K.K.音標 -->
        <!-- 衍生詞 (多筆) -->
        <div v-for="(derivation, index) in word.derivations" :key="`derivation_${index}`" class="mt-2">
          <small class="border border-success">衍</small>
          <small>
            <label for="insertDerivation">Derivation</label>
            <input v-model="derivation.derivation" class="form-control form-control-sm" id="insertDerivation" placeholder="衍生詞英文單字">
          </small>
          <small class="d-block mt-2">
            <label for="insertDerivationPartOfSpeech">Derivation part of speech</label>
            <input v-model="derivation.partOfSpeech" class="form-control form-control-sm" id="insertDerivationPartOfSpeech" placeholder="詞性">
          </small>
          <small class="d-block mt-2">
            <label for="insertDerivationChinese">Derivation Chinese</label>
            <input v-model="derivation.derivationChinese" class="form-control form-control-sm" id="insertDerivationChinese" placeholder="中文">
          </small>
        </div>
        <button @click="derivationsPlusOne">+</button>
        <button @click="derivationsMinusOne" v-if="word.derivations.length > 1">-</button>
        <!-- end 衍生詞 (多筆) -->
        <!-- 同義詞 (多筆) -->
        <div v-for="(synonym, index) in word.synonyms" :key="`synonym_${index}`" class="mt-2">
          <small class="border border-success">同</small>
          <small>
            <label for="insertSynonym">Synonym</label>
            <input v-model="synonym.synonym" class="form-control form-control-sm" id="insertSynonym" placeholder="同義詞英文單字">
          </small>
          <small class="d-block mt-2">
            <label for="insertSynonymPartOfSpeech">Synonym part of speech</label>
            <input v-model="synonym.partOfSpeech" class="form-control form-control-sm" id="insertSynonymPartOfSpeech" placeholder="詞性">
          </small>
          <small class="d-block mt-2">
            <label for="insertSynonymChinese">Synonym Chinese</label>
            <input v-model="synonym.synonymChinese" class="form-control form-control-sm" id="insertSynonymChinese" placeholder="中文">
          </small>
        </div>
        <button @click="synonymsPlusOne">+</button>
        <button @click="synonymsMinusOne" v-if="word.synonyms.length > 1">-</button>
        <!-- end 同義詞 (多筆) -->
        <!-- 反義詞 (多筆) -->
        <div v-for="(antonym, index) in word.antonyms" :key="`antonym_${index}`" class="mt-2">
          <small class="border border-success">反</small>
          <small>
            <label for="insertAntonym">Antonym</label>
            <input v-model="antonym.antonym" class="form-control form-control-sm" id="insertAntonym" placeholder="反義詞英文單字">
          </small>
          <small class="d-block mt-2">
            <label for="insertAntonymPartOfSpeech">Antonym part of speech</label>
            <input v-model="antonym.partOfSpeech" class="form-control form-control-sm" id="insertAntonymPartOfSpeech" placeholder="詞性">
          </small>
          <small class="d-block mt-2">
            <label for="insertAntonymChinese">Antonym Chinese</label>
            <input v-model="antonym.antonymChinese" class="form-control form-control-sm" id="insertAntonymChinese" placeholder="中文">
          </small>
        </div>
        <button @click="antonymsPlusOne">+</button>
        <button @click="antonymsMinusOne" v-if="word.antonyms.length > 1">-</button>
        <!-- end 反義詞 (多筆) -->
      </div>
      <div class="col-md-9">
        <div>
          <!-- 詞性 -->
          <div>
            <label for="insertPartOfSpeech">Part of speech</label>
            <input v-model="word.partOfSpeech" class="form-control" id="insertPartOfSpeech" placeholder="詞性">
            <small class="form-text text-muted mb-2">
              noun, pronoun(代名詞???), verb, adjective, adverb, preposition
              , conjunction, interjection, phrase
            </small>
          </div>
          <!-- end 詞性 -->
          <!-- 中文 -->
          <div>
            <label for="insertChinese">Chinese</label>
            <input v-model="word.chinese" class="form-control" id="insertChinese" placeholder="中文">
            <small class="form-text text-muted mb-2">用 , 分隔 不要空格</small>
          </div>
          <!-- end 中文 -->
          <!-- 例句, 例句中文 -->
          <div v-for="(sentence, index) in word.sentences" :key="index">
            <div>
              <label for="insertSentences">Sentences</label>
              <input v-model="sentence.sentence" class="form-control" id="insertSentences" placeholder="例句">
              <small class="form-text text-muted mb-2">
                ex. Companies must distribute health insurance policies to all workers.
              </small>
            </div>
            <div>
              <label for="insertSentencesChinese">Sentences Chinese</label>
              <input v-model="sentence.sentenceChinese" class="form-control" id="insertSentencesChinese" placeholder="例句中文">
              <small class="form-text text-muted mb-2">
                ex. 公司應該將健康保險單發給所有員工。
              </small>
            </div>
          </div>
          <button @click="sentencesPlusOne">+</button>
          <button @click="sentencesMinusOne" v-if="word.sentences.length > 1">-</button>
          <!-- end 例句, 例句中文 -->
        </div>
      </div>
    </div>
    <button @click="createWord" class="btn btn-primary">新增</button>
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
        kkPhoneticSymbols: 'pɑləsɪ',
        partOfSpeech: 'n.',
        chinese: '政策, 規定; 保險單',
        // 衍生詞
        derivations: [
          { derivation: '', partOfSpeech: '', derivationChinese: '' },
        ],
        // 同義詞
        synonyms: [
          { synonym: '', partOfSpeech: '', synonymChinese: '' },
        ],
        // 反義詞
        antonyms: [
          { antonym: '', partOfSpeech: '', antonymChinese: '' },
        ],
        sentences: [
          { sentence: 't', sentenceChinese: 'T' },
        ],
      },
    };
  },
  methods: {
    // 新增單字
    createWord() {
      this.$store.dispatch('createWord', this.word);
    },
    // 例句列新增一行
    sentencesPlusOne() {
      this.word.sentences.push({ sentence: '', sentenceChinese: '' });
    },
    // 例句列減少一行
    sentencesMinusOne() {
      const sentences = this.word.sentences;
      sentences.splice(sentences.length - 1, sentences.length)
    },
    // 衍生詞新增一行
    derivationsPlusOne() {
      this.word.derivations.push({ derivation: '', partOfSpeech: '', derivationChinese: '' });
    },
    // 衍生詞減少一行
    derivationsMinusOne() {
      const derivations = this.word.derivations;
      derivations.splice(derivations.length - 1, derivations.length)
    },
    // 同義詞新增一行
    synonymsPlusOne() {
      this.word.synonyms.push({ synonym: '', partOfSpeech: '', synonymChinese: '' });
    },
    // 同義詞減少一行
    synonymsMinusOne() {
      const synonyms = this.word.synonyms;
      synonyms.splice(synonyms.length - 1, synonyms.length)
    },
    // 反義詞新增一行
    antonymsPlusOne() {
      this.word.antonyms.push({ antonym: '', partOfSpeech: '', antonymChinese: '' });
    },
    // 反義詞減少一行
    antonymsMinusOne() {
      const antonyms = this.word.antonyms;
      antonyms.splice(antonyms.length - 1, antonyms.length)
    },
  },
};
</script>

<style scoped>
</style>
