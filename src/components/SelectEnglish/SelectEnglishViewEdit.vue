<template>
  <div class="row mb-4 position-relative" :class="[deleteWordCheck ? 'text-decoration-line-through' : '']">
    <!-- 檢視模式 -->
    <span v-if="deleteWordCheck"
      class="position-absolute h2 text-danger oi oi-circle-x animated fadeInRightBig"
      style="top: 0.5rem; left: 8rem;"></span>
    <div v-if="!editMode" class="col-md-3">
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
      <input v-model="word.word" class="form-control form-control-sm" v-validate="'required'" name="updateWord" data-vv-as="英文單字">
      <small class="form-text text-danger mt-0">{{ errors.first('updateWord') }}</small>
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
          <div class="col-2 col-sm-2 col-md-1">
            <input v-model="word.partOfSpeech" class="form-control form-control-sm">
          </div>
          <div class="col-10 col-sm-10 col-md-11">
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
      <button @click="editModeChange" type="button" class="btn btn-sm btn-outline-primary" :disabled="deleteWordCheck">
        <span :class="[!editMode ? 'oi-pencil' : 'oi-circle-check']" class="oi" aria-hidden="true"></span> {{ !editMode ? '編輯' : '保存' }}
      </button>
      <button @click="deleteWord" type="button" class="btn btn-sm btn-outline-danger" :disabled="deleteWordCheck">
        <span class="oi oi-circle-x" aria-hidden="true"></span> 刪除
      </button>
      <button v-if="!originalWordCheck && !deleteWordCheck" @click="previousWord" type="button" class="btn btn-sm btn-outline-primary" :disabled="deleteWordCheck">
        <span class="oi oi-action-redo" aria-hidden="true"></span> 回復
      </button>
      <button v-if="deleteWordCheck" @click="previousWord('delete')" type="button" class="btn btn-sm btn-outline-primary">
        <span class="oi oi-action-redo" aria-hidden="true"></span> 回復
      </button>
    </div>
  </div>
</template>

<script>
import Noty from 'noty';
import _ from 'lodash';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SelectEnglishViewEdit',
  data() {
    return {
      word: null,
      originalWord: null,
      editMode: false,
    };
  },
  props: {
    addressWord: Object,
    editBtnShow: Boolean,
  },
  created() {
    this.word = _.cloneDeep(this.addressWord); // 修改專用
    this.originalWord = _.cloneDeep(this.addressWord); // 資料最初的狀態 回復用
  },
  methods: {
    editModeChange(e) {
      if (this.editMode) {
        this.validateBeforeSubmit(e);
      } else {
        this.editMode = !this.editMode;
      }
    },
    validateBeforeSubmit(e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.updateWord(e);
          return;
        }

        new Noty({
          type: 'error',
          theme: 'relax',
          layout: 'bottomCenter',
          text: '<span class="oi oi-circle-x" aria-hidden="true"></span> 無法修改, 資料填寫不完整!',
          timeout: 1000,
        }).show();
      });
    },
    updateWord(e) {
      if (!_.isEqual(this.word, this.addressWord)) {
        const eventBtn = e.target;
        eventBtn.setAttribute('disabled', 'disabled');

        const n = new Noty({
          type: 'warning',
          theme: 'relax',
          layout: 'bottomCenter',
          text: '是否確定要修改這筆資料?',
          buttons: [
            Noty.button('<span class="oi oi-circle-check" aria-hidden="true"></span>',
              'btn btn-sm btn-outline-success mr-2', () => {
                n.close();

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

                this.$store.dispatch('updateWord', this.word)
                  .then(() => {
                    // 修改成功
                    new Noty({
                      type: 'success',
                      theme: 'relax',
                      layout: 'bottomCenter',
                      text: '<span class="oi oi-circle-check" aria-hidden="true"></span> 修改成功!',
                      timeout: 1000,
                    }).show();

                    this.editMode = !this.editMode;
                    eventBtn.removeAttribute('disabled');
                    noty.close();
                  })
                  .catch(() => {
                    // 修改失敗
                    eventBtn.removeAttribute('disabled');
                    noty.close();

                    new Noty({
                      type: 'error',
                      theme: 'relax',
                      layout: 'bottomCenter',
                      text: '<span class="oi oi-circle-x" aria-hidden="true"></span> 修改失敗!',
                      timeout: 1000,
                    }).show();
                  });
              },
            ),
            Noty.button('<span class="oi oi-circle-x" aria-hidden="true"></span>',
              'btn btn-sm btn-outline-danger', () => {
                eventBtn.removeAttribute('disabled');
                n.close();
              },
            ),
          ],
          callbacks: {
            afterClose: () => {
              if (eventBtn.hasAttribute('disabled')) {
                eventBtn.removeAttribute('disabled');
              }
            },
          },
        }).show();
      } else {
        this.editMode = !this.editMode;
      }
    },
    deleteWord(e) {
      e.target.setAttribute('disabled', 'disabled');

      const n = new Noty({
        type: 'warning',
        theme: 'relax',
        layout: 'bottomCenter',
        text: '確定要刪除這筆?',
        buttons: [
          Noty.button('<span class="oi oi-circle-check" aria-hidden="true"></span>',
            'btn btn-sm btn-outline-success mr-2', () => {
              e.target.removeAttribute('disabled');

              if (this.editMode) {
                this.editMode = !this.editMode;
              }

              n.close();

              this.$store.dispatch('deleteWord', this.word.wordId)
                .then(() => {
                  // 刪除成功
                  new Noty({
                    type: 'success',
                    theme: 'relax',
                    layout: 'bottomCenter',
                    text: '<span class="oi oi-circle-check" aria-hidden="true"></span> 刪除成功!',
                    timeout: 1000,
                  }).show();
                })
                .catch(() => {
                  // 刪除失敗
                  new Noty({
                    type: 'error',
                    theme: 'relax',
                    layout: 'bottomCenter',
                    text: '<span class="oi oi-circle-x" aria-hidden="true"></span> 刪除失敗!',
                    timeout: 1000,
                  }).show();
                });
            },
          ),
          Noty.button('<span class="oi oi-circle-x" aria-hidden="true"></span>',
            'btn btn-sm btn-outline-danger', () => {
              e.target.removeAttribute('disabled');
              n.close();
            },
          ),
        ],
        callbacks: {
          afterClose: () => {
            if (!this.deleteWordCheck && e.target.hasAttribute('disabled')) {
              e.target.removeAttribute('disabled');
            }
          },
        },
      }).show();
    },
    previousWord(mode) {
      if (mode === 'delete') {
        this.$store.dispatch('deleteWord', this.word.wordId)
          .then(() => {
            // 刪除的資料回復成功
            new Noty({
              type: 'success',
              theme: 'relax',
              layout: 'bottomCenter',
              text: '<span class="oi oi-circle-check" aria-hidden="true"></span> 刪除的資料回復成功!',
              timeout: 1000,
            }).show();
          })
          .catch(() => {
            // 回復失敗
            new Noty({
              type: 'error',
              theme: 'relax',
              layout: 'bottomCenter',
              text: '<span class="oi oi-circle-x" aria-hidden="true"></span> 回復失敗!',
              timeout: 1000,
            }).show();
          });
      } else {
        const n = new Noty({
          type: 'warning',
          theme: 'relax',
          layout: 'bottomCenter',
          text: '是否確定要將這筆資料回復到最初狀態?',
          buttons: [
            Noty.button('<span class="oi oi-circle-check" aria-hidden="true"></span>',
              'btn btn-sm btn-outline-success mr-2', () => {
                n.close();

                this.word = _.clone(this.originalWord);

                new Noty({
                  type: 'success',
                  theme: 'relax',
                  layout: 'bottomCenter',
                  text: '<span class="oi oi-circle-check" aria-hidden="true"></span> 已回復到最初狀態, 請進行保存!',
                  timeout: 1500,
                }).show();

                if (!this.editMode) {
                  this.editMode = true;
                }
              },
            ),
            Noty.button('<span class="oi oi-circle-x" aria-hidden="true"></span>',
              'btn btn-sm btn-outline-danger', () => {
                n.close();
              },
            ),
          ],
        }).show();
      }
    },
  },
  computed: {
    ...mapGetters({
      words: 'getWords',
      updateWords: 'getUpdateWords',
      deleteWords: 'getDeleteWords',
    }),
    originalWordCheck() {
      return _.isEqual(this.originalWord, this.addressWord);
    },
    // updateWordCheck() {
    //   return;
    // },
    deleteWordCheck() {
      return this.deleteWords.find(deleteWord => (deleteWord === this.word.wordId));
    },
  },
};
</script>

<style scoped>
  .text-decoration-line-through {
    text-decoration: line-through;
  }
</style>
