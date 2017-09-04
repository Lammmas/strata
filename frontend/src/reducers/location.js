// location reducer
export default function locate(state = {}, action) {
  switch (action.type) {
    case 'GET_LOCATION':
        return action.payload;
        break;

    // initial state
    default:
      return state;
  }
}