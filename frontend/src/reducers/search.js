// search reducer
export default function search(state = {}, action) {
  switch (action.type) {
    case 'SEARCH_RESULTS':
        let res = action.results;

        return {results: res, loading: false};
        break;

    // initial state
    default:
      return state;
  }
}