import sendRequest from "./send-request";
const BASE_URL = '/api/games';

export async function create(newGame) {
    return sendRequest(BASE_URL, 'POST', newGame);
}

export async function index() {
    return sendRequest(BASE_URL);
}

