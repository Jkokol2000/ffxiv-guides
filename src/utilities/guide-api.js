import sendRequest from "./send-request";
const BASE_URL = '/api/guides';


export async function getGuidesForClass(classId) {
    return sendRequest(`${BASE_URL}/${classId}`)
}

export async function getGuidesForUser(userId) {
    return sendRequest(`${BASE_URL}/account/${userId}`)
}

export async function getGuide(guideId) {
    console.log(guideId)
    return sendRequest(`${BASE_URL}/guide/${guideId}`);
  }

export async function createGuide(guideData, classId) {
    return sendRequest(`${BASE_URL}/${classId}`, 'POST', guideData)
}

export async function createComment(commentData, guideId) {
    return sendRequest(`${BASE_URL}/comment/${guideId}`, 'POST', commentData)
}

export async function deleteGuide(guideId) {
    return sendRequest(`${BASE_URL}/${guideId}`, 'DELETE')
}

export async function updateGuide(guideId, guideData) {
    return sendRequest(`${BASE_URL}/${guideId}`, 'PUT', guideData)
}