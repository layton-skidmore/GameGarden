import sendRequest from './send-request';

const BASE_URL = '/api/reviews/new'; 

export async function submitReviewToServer(newReview) {
    return sendRequest(BASE_URL, 'POST', newReview);
}

