import ACTION_TYPE from "./actionType";

const defaultState = {
  pageData: null,
  pageInfo: {
    tdk: {
      title: "demo",
      keywords: "demo",
      description: "demo",
    },
  },
};

const demoReucer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPE.PAGEDATA:
      return { ...state, ...{ pageData: action.data } };
    default:
      return state;
  }
};
export default demoReucer;
