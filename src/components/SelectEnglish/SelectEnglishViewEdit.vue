<template>
  <div class="row mb-4">
    <!-- 檢視模式 -->
    <div v-if="!editMode" class="col-md-3">
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
    <div v-if="!editMode" :class="[editBtnShow ? 'col-md-9' : 'col-md-8']">
      <div>
        <span class="font-weight-bold">{{ word.partOfSpeech }}</span>
        <span class="font-weight-bold">{{ word.chinese }}</span>
        <div v-for="(sentence, index) in word.sentences" :key="index">
          <div>{{ sentence.sentence }}</div>
          <div>{{ sentence.sentenceChinese }}</div>
        </div>
      </div>
    </div>
    <!-- end 檢視模式 -->

    <!-- 編輯模式 -->
    <div v-if="editMode" class="col-md-3">
      <input v-model="word.word" class="form-control form-control-sm">
      <input v-model="word.kkPhoneticSymbols" class="form-control form-control-sm">
      <div v-for="(derivation, index) in word.derivations" :key="`derivation_${index}`" class="form-row">
        <div class="col-1">
          <small class="border border-success">衍</small>
        </div>
        <div class="col-6">
          <input v-model="derivation.derivation" class="form-control form-control-sm">
        </div>
        <div class="col-2">
          <input v-model="derivation.partOfSpeech" class="form-control form-control-sm">
        </div>
        <div class="col-3">
          <input v-model="derivation.derivationChinese" class="form-control form-control-sm">
        </div>
      </div>
      <div v-for="(synonym, index) in word.synonyms" :key="`synonym_${index}`" class="form-row">
        <div class="col-1">
          <small class="border border-success">同</small>
        </div>
        <div class="col-6">
          <input v-model="synonym.synonym" class="form-control form-control-sm">
        </div>
        <div class="col-2">
          <input v-model="synonym.partOfSpeech" class="form-control form-control-sm">
        </div>
        <div class="col-3">
          <input v-model="synonym.synonymChinese" class="form-control form-control-sm">
        </div>
      </div>
      <div v-for="(antonym, index) in word.antonyms" :key="`antonym_${index}`" class="form-row">
        <div class="col-1">
          <small class="border border-success">反</small>
        </div>
        <div class="col-6">
          <input v-model="antonym.antonym" class="form-control form-control-sm">
        </div>
        <div class="col-2">
          <input v-model="antonym.partOfSpeech" class="form-control form-control-sm">
        </div>
        <div class="col-3">
          <input v-model="antonym.antonymChinese" class="form-control form-control-sm">
        </div>
      </div>
    </div>
    <div v-if="editMode" :class="[editBtnShow ? 'col-md-9' : 'col-md-8']">
      <div>
        <div class="form-row">
          <div class="col-1">
            <input v-model="word.partOfSpeech" class="form-control form-control-sm">
          </div>
          <div class="col-11">
            <input v-model="word.chinese" class="form-control form-control-sm">
          </div>
        </div>
        <div v-for="(sentence, index) in word.sentences" :key="index">
          <input v-model="sentence.sentence" class="form-control form-control-sm">
          <input v-model="sentence.sentenceChinese" class="form-control form-control-sm">
        </div>
      </div>
    </div>
    <!-- end 編輯模式 -->

    <div v-if="!editBtnShow" class="col-md-1">
      <button @click="editMode = !editMode" type="button" class="btn btn-sm btn-outline-primary">
        <span :class="[!editMode ? 'oi-pencil' : 'oi-circle-check']" class="oi" aria-hidden="true"></span> {{ !editMode ? '編輯' : '保存' }}
      </button>
      <button @click="deleteWord($event, word.wordId)" type="button" class="btn btn-sm btn-outline-danger">
        <span class="oi oi-circle-x" aria-hidden="true"></span> 刪除
      </button>
    </div>
  </div>
</template>

<script>
import Noty from 'noty';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SelectEnglishViewEdit',
  data() {
    return {
      editMode: false,
    };
  },
  props: {
    word: Object,
    editBtnShow: Boolean,
  },
  methods: {
    deleteWord(e, Id) {
      e.target.setAttribute('disabled', 'disabled');

      var n = new Noty({
        type: 'warning',
        theme: 'relax',
        layout: 'bottomCenter',
        text: '確定要刪除這筆?',
        buttons: [
          Noty.button('<span class="oi oi-circle-check" aria-hidden="true"></span>',
            'btn btn-sm btn-outline-success mr-2', () => {
              e.target.removeAttribute('disabled');
              n.close();
          }),
          Noty.button('<span class="oi oi-circle-x" aria-hidden="true"></span>',
            'btn btn-sm btn-outline-danger', () => {
              e.target.removeAttribute('disabled');
              n.close();
          }),
        ],
      }).show();
    },
  },
};
</script>

<style scoped>
</style>
