import sendRequest from "./send-request";
const BASE_URL = '/api/classes';

export async function getClasses() {
    return sendRequest(BASE_URL)
}

export async function getClass(classId) {
    return sendRequest(`${BASE_URL}/${classId}`);
  }

export async function addClass(classData) {
    return sendRequest(BASE_URL, 'POST', classData)
}