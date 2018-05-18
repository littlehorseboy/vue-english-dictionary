import _ from 'lodash';

/*
  這邊可以改為用 types 物件取代 matutions_type.js (繼續用也可以)
  然後在前面加上模組名稱作為前綴，用來避免與其他模組重複。
  因為 action、mutation、和 getter 依然是註冊在全域的命名空間
*/
const types = {
  CREATE_WORD: 'word/CREATE_WORD',
  DELETE_WORD: 'word/DELETE_WORD',
  UPDATE_WORD: 'word/UPDATE_WORD',
};

// state 必須是 Object
const state = {
  words: [
    {
      wordId: 1,
      word: 'policy',
      kkPhoneticSymbols: '[`pɑləsɪ]',
      partOfSpeech: 'n.',
      chinese: '政策, 規定; 保險單',
      derivations: [],
      synonyms: [],
      antonyms: [],
      sentences: [
        {
          sentenceId: 1,
          sentence: 'The employee benefit policy will be expanded next year.',
          sentenceChinese: '員工福利政策明年將會擴大。',
        },
        {
          sentenceId: 2,
          sentence: 'Companies must distribute health insurance policies to all workers.',
          sentenceChinese: '公司應該將健康保險單發給所有員工。',
        },
      ],
    },
    {
      wordId: 2,
      word: 'comply',
      kkPhoneticSymbols: '',
      partOfSpeech: 'v.',
      chinese: '遵守, 遵從',
      derivations: [
        {
          derivationId: 1,
          derivation: 'compliance',
          partOfSpeech: 'n.',
          derivationChinese: '遵守',
        },
      ],
      synonyms: [],
      antonyms: [],
      sentences: [
        {
          sentenceId: 3,
          sentence: 'Employees must comply with the regulations governing computer use.',
          sentenceChinese: '員工必須遵守管理電腦使用的規定',
        },
      ],
    },
    {
      wordId: 3,
      word: 'associate',
      kkPhoneticSymbols: '',
      partOfSpeech: 'v.',
      chinese: '關聯',
      derivations: [],
      synonyms: [],
      antonyms: [],
      sentences: [],
    },
  ],
  deleteWords: [],
  updateWords: [],
};

state.originalWords = _.cloneDeep(state.words);

// getters 整理到這邊直接返回 count 內容
const getters = {
  getWords(state) {
    return state.words;
  },
  getDeleteWords(state) {
    return state.deleteWords;
  },
  getUpdateWords(state) {
    return state.updateWords;
  },
};

// actions 也是以 Object 形式建構
const actions = {
  createWord({ commit }, newTodo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (newTodo) {
          const findRepeat = state.words.find(word => (word.word === newTodo.word));

          if (findRepeat) {
            reject('Repeat');
          } else {
            newTodo.sentences.forEach((sentence, index, object) => {
              if (!sentence.sentence) {
                object.splice(index, 1);
              }
            });
            newTodo.derivations.forEach((derivation, index, object) => {
              if (!derivation.derivation) {
                object.splice(index, 1);
              }
            });
            newTodo.synonyms.forEach((synonym, index, object) => {
              if (!synonym.synonym) {
                object.splice(index, 1);
              }
            });
            newTodo.antonyms.forEach((antonym, index, object) => {
              if (!antonym.antonym) {
                object.splice(index, 1);
              }
            });
            commit(types.CREATE_WORD, newTodo);
            resolve();
          }
        } else {
          reject();
        }
      }, 1500);
    });
  },
  deleteWord({ commit }, wordId) {
    return new Promise((resolve, reject) => {
      if (wordId) {
        commit(types.DELETE_WORD, wordId);
        resolve();
      } else {
        reject();
      }
    });
  },
  updateWord({ commit }, obj) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (obj) {
          commit(types.UPDATE_WORD, obj);
          resolve();
        } else {
          reject();
        }
      }, 1500);
    });
  },
};

// mutations 變動
const mutations = {
  // 新增
  [types.CREATE_WORD](state, newWord) {
    // 自動編號 Id
    // let wordId = state.words.length;
    state.words.push(newWord);
    // wordId += 1;
  },

  // 刪除
  [types.DELETE_WORD](state, wordId) {
    const findRepeatIndex = state.deleteWords.findIndex(deleteWord => (deleteWord === wordId));
    if (findRepeatIndex !== -1) {
      state.deleteWords.splice(findRepeatIndex, 1);
    } else {
      state.deleteWords.push(wordId);
    }
  },

  // 修改
  [types.UPDATE_WORD](state, obj) {
    for (let i = 0; i < state.words.length; i += 1) {
      const item = state.words[i];
      if (item.wordId === obj.wordId) {
        const findRepeat = state.updateWords.find(updateWord => (updateWord.wordId === obj.wordId));
        if (!findRepeat) { // horseTODO: 修改過的單字新增至此予以後續送出, 但是回復到最初狀態的情況要予以刪除
          state.updateWords.push(_.cloneDeep(obj));
        } else {
          Object.keys(findRepeat).forEach((key) => {
            if (!_.isArray(findRepeat[key])) {
              findRepeat[key] = obj[key];
            } else {
              findRepeat[key] = _.cloneDeep(obj[key]);
            }
          });
        }

        Object.keys(state.words[i]).forEach((key) => {
          if (!_.isArray(state.words[i][key])) {
            state.words[i][key] = obj[key];
          } else {
            state.words[i][key] = _.cloneDeep(obj[key]);
          }
        });
        break;
      }
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
