import { getAPIHeaders } from "../config";

export const apiFetch = async (url) => {
    const response = await fetch(url, { headers: getAPIHeaders() });

    const remaining = response.headers.get('X-RateLimit-Remaining');
    if (remaining !== null) {
        console.log(`🔑 API Rate Limit Remaining: ${remaining}`);
    }

    if (remaining.status === 403) {
        throw new Error('API Rate Limit exceeded. Add a GitHub token for more response')
    }
    if (remaining.status === 404) {
        throw new Error('Not found. Check the username or repository name')
    }
    if (!response.ok) {
        throw new Error(`GitHubAPI error: ${response.status}`)
    }

    return response.json()
}