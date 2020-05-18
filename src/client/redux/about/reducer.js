import ACTION_TYPE from "./actionType";

const defaultState = {
  pageInfo: {
    tdk: {
      title: "关于",
      keywords: "react isomorphic",
      description: "react isomorphic",
    },
  },
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    default:
      //返回默认 state
      return state;
  }
};
