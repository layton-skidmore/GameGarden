import sendRequest from "./send-request";

const BASE_URL = '/api/games';

export async function create(newGame) {
    return sendRequest(BASE_URL, 'POST', newGame);
}

export async function index() {
    return sendRequest(BASE_URL);
}

export function deleteGame(gameId) {
    return sendRequest(`${BASE_URL}/${gameId}`, 'DELETE',);
  }

export async function getGameById(gameId) {
  return sendRequest(`${BASE_URL}/${gameId}`);
}

export async function updateGame(gameId, updatedGameData) {
    const url = `${BASE_URL}/${gameId}`;
    const method = 'PUT';
    const response = await sendRequest(url, method, updatedGameData);
    return response.data; 
  }


