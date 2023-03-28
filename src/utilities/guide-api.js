import sendRequest from "./send-request";
const BASE_URL = '/api/guides';


export async function getGuidesForClass(classId) {
    return sendRequest(`${BASE_URL}/${classId}`)
}

export async function getGuide(guideId) {
    return sendRequest(`${BASE_URL}/${guideId}`);
  }

export async function createGuide(guideData, classId) {
    return sendRequest(`${BASE_URL}/${classId}`, 'POST', guideData)
}
