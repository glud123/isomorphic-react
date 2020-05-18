import ACTION_TYPE from "./actionType";

export const updateListData = (data) => {
  return {
    type: ACTION_TYPE.LISTDATA,
    data,
  };
};
