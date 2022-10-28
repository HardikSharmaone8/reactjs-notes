export var initialState = null;

export var reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  return state;
};
