import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { fetchLocation } from "./location";
import { searchFetchList } from "./search";

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, 'LOCATE', fetchLocation),
    fork(takeLatest, 'SEARCH', searchFetchList),
  ];
}
