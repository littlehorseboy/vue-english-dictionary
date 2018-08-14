import _ from 'lodash';
import Axios from 'axios';
import qs from 'qs';

/*
  這邊可以改為用 types 物件取代 matutions_type.js (繼續用也可以)
  然後在前面加上模組名稱作為前綴，用來避免與其他模組重複。
  因為 action、mutation、和 getter 依然是註冊在全域的命名空間
*/
const types = {
  GET_WORDS: 'word/GET_WORDS',
  CREATE_WORD: 'word/CREATE_WORD',
  DELETE_WORD: 'word/DELETE_WORD',
  UPDATE_WORD: 'word/UPDATE_WORD',
  SUBMIT_WORDS: 'word/SUBMIT_WORDS',
  DELETE_SPLICE_WORD: 'word/DELETE_SPLICE_WORD',
  CLEAR_DELETEWORDS: 'word/CLEAR_DELETEWORDS',
  CLEAR_CREATEWORDS: 'word/CLEAR_CREATEWORDS',
  CLEAR_UPDATEWORDS: 'word/CLEAR_UPDATEWORDS',
};

// state 必須是 Object
const state = {
  words: [
    // {
    //   wordId: 1,
    //   word: 'policy',
    //   kkPhoneticSymbols: '[`pɑləsɪ]',
    //   partOfSpeech: 'n.',
    //   chinese: '政策, 規定; 保險單',
    //   derivations: [],
    //   synonyms: [],
    //   antonyms: [],
    //   sentences: [
    //     {
    //       sentenceId: 1,
    //       sentence: 'The employee benefit policy will be expanded next year.',
    //       sentenceChinese: '員工福利政策明年將會擴大。',
    //     },
    //     {
    //       sentenceId: 2,
    //       sentence: 'Companies must distribute health insurance policies to all workers.',
    //       sentenceChinese: '公司應該將健康保險單發給所有員工。',
    //     },
    //   ],
    // },
    // {
    //   wordId: 2,
    //   word: 'comply',
    //   kkPhoneticSymbols: '',
    //   partOfSpeech: 'v.',
    //   chinese: '遵守, 遵從',
    //   derivations: [
    //     {
    //       derivationId: 1,
    //       derivation: 'compliance',
    //       partOfSpeech: 'n.',
    //       derivationChinese: '遵守',
    //     },
    //   ],
    //   synonyms: [],
    //   antonyms: [],
    //   sentences: [
    //     {
    //       sentenceId: 3,
    //       sentence: 'Employees must comply with the regulations governing computer use.',
    //       sentenceChinese: '員工必須遵守管理電腦使用的規定',
    //     },
    //   ],
    // },
    // {
    //   wordId: 3,
    //   word: 'associate',
    //   kkPhoneticSymbols: '',
    //   partOfSpeech: 'v.',
    //   chinese: '關聯',
    //   derivations: [],
    //   synonyms: [],
    //   antonyms: [],
    //   sentences: [],
    // },
  ],
  createWords: [],
  deleteWords: [],
  updateWords: [],
};

state.originalWords = _.cloneDeep(state.words);

// getters 整理到這邊直接返回 count 內容
const getters = {
  getWords(state) {
    return state.words;
  },
  getCreateWords(state) {
    return state.createWords;
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
  getWords({ commit }) {
    // Axios({
    //   method: 'get',
    //   url: 'http://localhost:3001/api/items',
    // }).then((response) => {
    //   const data = response.data;
    //   commit(types.GET_WORDS, data);
    // });

    Axios({
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      url: 'http://175.182.98.165:8080/API/englishDictionary.ashx?collection=get',
    }).then((response) => {
      const data = response.data;
      commit(types.GET_WORDS, data);
    }).catch((e) => {
      console.log(e);
    });
  },

  createWord({ commit }, newTodo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (newTodo) {
          const findRepeat = state.words.find(word => (word.word === newTodo.word));

          if (findRepeat) {
            reject('Repeat');
          } else {
            // newTodo.sentences.forEach((sentence, index, object) => {
            //   if (!sentence.sentence) {
            //     object.splice(index, 1);
            //   }
            // });
            newTodo.sentences = newTodo.sentences.filter(obj => obj.sentence !== '');
            newTodo.derivations = newTodo.derivations.filter(obj => obj.derivation !== '');
            newTodo.synonyms = newTodo.synonyms.filter(obj => obj.synonym !== '');
            newTodo.antonyms = newTodo.antonyms.filter(obj => obj.antonym !== '');

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
  submitWords({ commit }) {
    return new Promise((resolve, reject) => {
      if (state.deleteWords.length > 0
        || state.createWords.length > 0
        || state.updateWords.length > 0) {
        commit(types.SUBMIT_WORDS);

        let axiosCount = 0;
        const checkAxiosCount3 = () => {
          axiosCount += 1;

          if (axiosCount === 3) {
            resolve();
          }
        };

        const deleteWords = state.deleteWords;
        const createWords = state.createWords;
        const updateWords = state.updateWords;

        if (deleteWords.length > 0) {
          // Axios({
          //   method: 'delete',
          //   url: 'http://localhost:3001/api/items',
          //   data: deleteWords,
          // }).then((response) => {
          //   commit(types.DELETE_SPLICE_WORD, deleteWords);
          //   commit(types.CLEAR_DELETEWORDS);

          //   checkAxiosCount3();
          // }).catch((e) => {
          //   console.log(e);
          //   checkAxiosCount3();
          // });

          Axios({
            method: 'post',
            headers: {
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            url: 'http://175.182.98.165:8080/API/englishDictionary.ashx?collection=delete',
            data: qs.stringify({ words: JSON.stringify(deleteWords) }),
          }).then(() => {
            commit(types.DELETE_SPLICE_WORD, deleteWords);
            commit(types.CLEAR_DELETEWORDS);

            checkAxiosCount3();
          }).catch((e) => {
            console.log(e);
            checkAxiosCount3();
          });
        } else {
          checkAxiosCount3();
        }

        if (createWords.length > 0) {
          // Axios({
          //   method: 'post',
          //   url: 'http://localhost:3001/api/items',
          //   data: createWords,
          // }).then((response) => {
          //   commit(types.CLEAR_CREATEWORDS);

          //   checkAxiosCount3();
          // }).catch((e) => {
          //   console.log(e);
          //   checkAxiosCount3();
          // });

          Axios({
            method: 'post',
            headers: {
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            url: 'http://175.182.98.165:8080/API/englishDictionary.ashx?collection=post',
            data: qs.stringify({ words: JSON.stringify(createWords) }),
          }).then(() => {
            commit(types.CLEAR_CREATEWORDS);

            checkAxiosCount3();
          }).catch((e) => {
            console.log(e);
            checkAxiosCount3();
          });
        } else {
          checkAxiosCount3();
        }

        if (updateWords.length > 0) {
          // Axios({
          //   method: 'put',
          //   url: 'http://localhost:3001/api/items',
          //   data: updateWords,
          // }).then((response) => {
          //   commit(types.CLEAR_UPDATEWORDS);

          //   checkAxiosCount3();
          // }).catch((e) => {
          //   console.log(e);
          //   checkAxiosCount3();
          // });

          Axios({
            method: 'post',
            headers: {
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            url: 'http://175.182.98.165:8080/API/englishDictionary.ashx?collection=put',
            data: qs.stringify({ words: JSON.stringify(updateWords) }),
          }).then(() => {
            commit(types.CLEAR_UPDATEWORDS);

            checkAxiosCount3();
          }).catch((e) => {
            console.log(e);
            checkAxiosCount3();
          });
        } else {
          checkAxiosCount3();
        }
      } else {
        reject('沒有需要儲存的資料!');
      }
    });
  },
};

// mutations 變動
const mutations = {
  [types.GET_WORDS](state, words) {
    state.words = words;
  },
  // 新增
  [types.CREATE_WORD](state, newWord) {
    // 自動編號 Id
    // let wordId = state.words.length;
    state.words.push(newWord);
    state.createWords.push(newWord);
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
  // 新增 修改 刪除 的陣列 比對後送出 (順序: 刪除 > 新增 > 修改)
  [types.SUBMIT_WORDS](state) {
    const deleteWords = state.deleteWords;
    const createWords = state.createWords;
    const updateWords = state.updateWords;

    deleteWords.forEach((deleteWord) => {
      // 刪除陣列內 如果在 修改陣列 有相同的 Id 修改陣列作廢刪除 以刪除為主
      if (updateWords.findIndex(updateWord => updateWord.wordId === deleteWord) !== -1) {
        updateWords.splice(updateWords.findIndex(updateWord => updateWord.wordId === deleteWord), 1);
      }
    });

    createWords.forEach((createWord) => {
      // 新增陣列內 如果在 刪除陣列 有相同的 Id "刪除 新增 修改"均作廢刪除
      if (deleteWords.findIndex(deleteWord => deleteWord === createWord.wordId) !== -1) {
        deleteWords.splice(deleteWords.findIndex(deleteWord => deleteWord === createWord.wordId), 1);
        createWords.splice(createWords.findIndex(word => word.wordId === createWord.wordId), 1);
        updateWords.splice(updateWords.findIndex(updateWord => updateWord.wordId === createWord.wordId), 1);
        state.words.splice(state.words.findIndex(word => word.wordId === createWord.wordId), 1);
      }

      // 新增陣列內 如果在 修改陣列 有相同的 Id 修改陣列作廢刪除 以新增為主
      if (updateWords.findIndex(updateWord => updateWord.wordId === createWord.wordId) !== -1) {
        updateWords.splice(updateWords.findIndex(updateWord => updateWord.wordId === createWord.wordId), 1);
      }
    });
  },
  // 清除
  [types.DELETE_SPLICE_WORD](state, deleteArray) {
    deleteArray.forEach((deleteWord) => {
      state.words.splice(state.words.findIndex(updateWord => updateWord.wordId === deleteWord), 1);
    });
  },
  // 清除
  [types.CLEAR_DELETEWORDS]() {
    state.deleteWords.splice(0, state.deleteWords.length);
  },
  // 清除
  [types.CLEAR_CREATEWORDS]() {
    state.createWords.splice(0, state.createWords.length);
  },
  // 清除
  [types.CLEAR_UPDATEWORDS]() {
    state.updateWords.splice(0, state.updateWords.length);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
