import ACTION_TYPE from "./actionType";

const defaultState = {
  listData: null,
  pageInfo: {
    tdk: {
      title: "首页",
      keywords: "前端",
      description: "前端",
    },
  },
};

const homeReucer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPE.LISTDATA:
      return { ...state, ...{ listData: action.data } };
    default:
      return state;
  }
};
export default homeReucer;
