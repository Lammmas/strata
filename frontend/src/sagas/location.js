import { call, put } from "redux-saga/effects";

// fetch the user's list
export function* fetchLocation(action) {
    const geolocation = navigator.geolocation;

    const location = yield new Promise((res) => {
        // Could do some error handling, too, but for the purposes of the test let's skip it
        if (geolocation) {
            geolocation.getCurrentPosition(
                (position) => { res(position); },
                () => { console.log('get loc permission denied'); }
            );
        }
    });

    // save the results in state
    yield put({
        type: 'GET_LOCATION',
        payload: location
    });
}