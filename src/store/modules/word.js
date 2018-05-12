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
    {
      wordId: 1,
      word: 'comply',
      kkPhoneticSymbols: '[`]',
      partOfSpeech: 'v.',
      chinese: '遵守, 遵從',
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
    commit(types.CREATE_WORD, newTodo);
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
    let wordId = state.words.length;
    debugger;
    state.words.push(newWord);
    wordId += 1;
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
