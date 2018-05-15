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
      wordId: 0,
      word: 'policy',
      kkPhoneticSymbols: '`pɑləsɪ',
      partOfSpeech: 'n.',
      chinese: '政策, 規定; 保險單',
      derivations: [],
      synonyms: [],
      antonyms: [],
      sentences: [
        {
          sentenceId: 0,
          sentence: 'The employee benefit policy will be expanded next year.',
          sentenceChinese: '員工福利政策明年將會擴大。',
        },
        {
          sentenceId: 1,
          sentence: 'Companies must distribute health insurance policies to all workers.',
          sentenceChinese: '公司應該將健康保險單發給所有員工。',
        },

      ],
    },
    {
      wordId: 1,
      word: 'comply',
      kkPhoneticSymbols: 'kk音標',
      partOfSpeech: 'v.',
      chinese: '遵守, 遵從',
      derivations: [
        {
          derivationId: 0,
          derivation: 'compliance',
          partOfSpeech: 'n.',
          derivationChinese: '遵守',
        },
      ],
      synonyms: [],
      antonyms: [],
      sentences: [
        {
          sentenceId: 2,
          sentence: 'Employees must comply with the regulations governing computer use.',
          sentenceChinese: '員工必須遵守管理電腦使用的規定',
        },

      ],
    },
  ],
};

// getters 整理到這邊直接返回 count 內容
const getters = {
  getWords(state) {
    return state.words;
  },
};

// actions 也是以 Object 形式建構
const actions = {
  createWord({ commit }, newTodo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (newTodo) {
          commit(types.CREATE_WORD, newTodo);
          resolve();
        } else {
          reject();
        }
      }, 1500);
    });
  },
  deleteWord({ commit }, key) {
    commit(types.DELETE_WORD, key);
  },
  updateWord({ commit }, obj) {
    commit(types.UPDATE_WORD, obj);
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
  [types.DELETE_WORD](state, key) {
    for (let i = 0; i < state.words.length; i += 1) {
      const item = state.words[i];
      if (item.key === key) {
        console.log('DELETE_WORD:', item.content, ', index?', i);
        // 刪除，單純將 todo Array 從 splice 出去。
        state.words.splice(i, 1);
        break;
      }
    }
  },
  [types.UPDATE_WORD](state, obj) {
    for (let i = 0; i < state.words.length; i += 1) {
      const item = state.words[i];
      if (item.key === obj.key) {
        console.log('UPDATE_WORD:', item.content, ' to →', obj.update);
        state.words[i].content = obj.update;
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
