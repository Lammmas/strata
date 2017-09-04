import { call, put } from "redux-saga/effects";
import ApiSearch from "../api/search";

// fetch the user's list
export function* searchFetchList(action) {
  // call the api to get the search result
  const results = yield call(ApiSearch.search, action.name, action.lat, action.lon);

  // save the results in state
  yield put({
    type: 'SEARCH_RESULTS',
    results: results
  });
}