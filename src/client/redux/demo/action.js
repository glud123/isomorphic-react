import ACTION_TYPE from "./actionType";

export const updateData = (data) => {
  return {
    type: ACTION_TYPE.PAGEDATA,
    data,
  };
};
