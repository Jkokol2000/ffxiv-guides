import sendRequest from "./send-request";
const BASE_URL = '/api/guides';

export async function getGuidesForClass() {
    return sendRequest(`${BASE_URL}/${classId}`)
}

export async function createGuide(guideData) {
    return sendRequest(BASE_URL, 'POST', guideData)
}