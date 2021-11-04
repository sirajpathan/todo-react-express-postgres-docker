import { call, put, takeLatest, all, fork } from 'redux-saga/effects'
import { showTasks, updateSubtask, addTask, addSubTask } from '../actions/todoActions';

function* fetchTasks(action) {
    console.log(action)
    try {
        const data = yield call(showTasks); console.log(data);
        action.payload(data);
        yield put({ type: "SHOW_POSTS", payload: data });
    } catch (e) {
        yield put({ type: "TASK_FETCH_FAILED", message: e.message });
    }
}

function* subtaskUpdateRequest(action) {
    console.log(action)
    try {
        const data = yield call(updateSubtask, action.payload);
        yield put({ type: "UPDATE_SUBTASK", payload: action.payload });
    } catch (e) {
        yield put({ type: "FAILED", message: e.message });
    }
}

function* addTaskRequest(action) {
    try {
        const data = yield call(addTask, action.payload);
        yield put({ type: "ADD_TASK", payload: {title: action.payload, id: data }});
    } catch (e) {
        yield put({ type: "FAILED", message: e.message });
    }
}

function* addSubTaskRequest(action) {
    try {
        const data = yield call(addSubTask, action.payload);
        const {id, title} = action.payload;
        yield put({ type: "ADD_SUBTASK", payload: {id, title, subtaskId: data }});
    } catch (e) {
        yield put({ type: "FAILED", message: e.message });
    }
}

function* mySaga(e) {
    yield takeLatest("TASK_FETCH_REQUESTED", fetchTasks);
}

function* newSaga() {
    yield takeLatest("SUBTASK_UPDATE_REQUESTED", subtaskUpdateRequest);
}

function* taskAddSaga() {
    yield takeLatest("TASK_ADD_REQUESTED", addTaskRequest);
}

function* subTaskAddSaga() {
    yield takeLatest("SUBTASK_ADD_REQUESTED", addSubTaskRequest);
}

export default function* () {
    yield all([
        fork(mySaga),
        fork(newSaga),
        fork(taskAddSaga),
        fork(subTaskAddSaga)
    ]);
}