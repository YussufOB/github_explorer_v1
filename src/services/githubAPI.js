import { API_CONFIG } from '../config';
import { apiFetch } from './apiHelpers';

const BASE = API_CONFIG.BASE_URL;

class GitHubAPI {

  // ─── USER METHODS ──────────────────────────────────────────

  async fetchUser(username) {
    console.log('👤 Fetching user:', username);
    return apiFetch(`${BASE}/users/${username}`);
  }

  async fetchUserRepos(username, sort = 'stars', perPage = 10) {
    console.log('📦 Fetching repos for:', username);
    return apiFetch(
      `${BASE}/users/${username}/repos?sort=${sort}&per_page=${perPage}`
    );
  }

  async fetchUserFollowers(username, perPage = 12) {
    console.log('👥 Fetching followers for:', username);
    return apiFetch(
      `${BASE}/users/${username}/followers?per_page=${perPage}`
    );
  }

  // ─── SEARCH METHODS ────────────────────────────────────────

  async searchUsers(query, perPage = 8) {
    console.log('🔍 Searching users:', query);
    const data = await apiFetch(
      `${BASE}/search/users?q=${encodeURIComponent(query)}&per_page=${perPage}`
    );
    return data.items || [];
  }

  async searchRepos(query, perPage = 8) {
    console.log('🔍 Searching repos:', query);
    const data = await apiFetch(
      `${BASE}/search/repositories?q=${encodeURIComponent(query)}&per_page=${perPage}`
    );
    return data.items || [];
  }

  async fetchTrendingRepos(perPage = 20) {
    console.log('📈 Fetching trending repos...');
    const data = await apiFetch(
      `${BASE}/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=${perPage}`
    );
    return data.items || [];
  }

  // ─── REPOSITORY METHODS ────────────────────────────────────

  async fetchRepo(owner, repoName) {
    console.log(`📁 Fetching repo: ${owner}/${repoName}`);
    return apiFetch(`${BASE}/repos/${owner}/${repoName}`);
  }

  async fetchRepoLanguages(owner, repoName) {
    console.log(`🌐 Fetching languages for: ${owner}/${repoName}`);
    return apiFetch(`${BASE}/repos/${owner}/${repoName}/languages`);
  }
}

const apiInstance = new GitHubAPI();
export default apiInstance;