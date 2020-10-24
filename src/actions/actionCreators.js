import {
    CHANGE_SERVICE_FIELD,
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_SUCCESS,
    FETCH_SERVICES_FAILURE,
    SAVE_SERVICE_REQUEST,
    SAVE_SERVICE_SUCCESS,
    SAVE_SERVICE_FAILURE,
    FETCH_SERVICE_REQUEST,
    FETCH_SERVICE_SUCCESS,
    FETCH_SERVICE_FAILURE,
    REMOVE_SERVICE_REQUEST,
    REMOVE_SERVICE_SUCCESS,
    REMOVE_SERVICE_FAILURE
    } from './actionTypes';




export function changeServiceField(name, value) {
    return { type: CHANGE_SERVICE_FIELD, payload: { name, value } };
}

export function fetchServicesRequest() {
    return { type: FETCH_SERVICES_REQUEST };
}
export function fetchServicesSuccess(items) {
    return { type: FETCH_SERVICES_SUCCESS, payload: { items } };
}
export function fetchServicesFailure(error) {
    return { type: FETCH_SERVICES_FAILURE, payload: { error } };
}
export function saveServiceRequest() {
    return { type: SAVE_SERVICE_REQUEST };
}
export function saveServiceSuccess() {
    return { type: SAVE_SERVICE_SUCCESS };
}
export function saveServiceFailure(error) {
    return { type: SAVE_SERVICE_FAILURE, payload: { error } };
}
export function fetchServiceRequest() {
    return { type: FETCH_SERVICE_REQUEST };
}
export function fetchServiceSuccess(item) {
    return { type: FETCH_SERVICE_SUCCESS, payload: { item } };
}
export function fetchServiceFailure(err) {
    return { type: FETCH_SERVICE_FAILURE, payload: { err } };
}
export function removeServiceRequest() {
    return { type: REMOVE_SERVICE_REQUEST };
}
export function removeServiceSuccess() {
    return { type: REMOVE_SERVICE_SUCCESS };
}
export function removeServiceFailure(Err) {
    return { type: REMOVE_SERVICE_FAILURE, payload: { Err } };
}
