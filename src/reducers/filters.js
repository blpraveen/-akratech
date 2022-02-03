export const initialFiltersState = {
  text: '',
  orderBy: undefined,
};

export const filters = (state = initialFiltersState, action) => {
  switch (action.type) {
    case 'SET_ORDER_BY':
      return {
        ...state,
        orderBy: action.orderBy,
      };
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};
