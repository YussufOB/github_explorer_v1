import { useState } from 'react';
import { githubAPI } from './services';
import { APP_CONFIG, ENV } from './config';

function App() {
  const [testResults, setTestResults] = useState([]);
  const [running, setRunning] = useState(false);

  const addResult = (label, status, data) => {
    setTestResults(prev => [...prev, { label, status, data }]);
  };

  const runTests = async () => {
    setRunning(true);
    setTestResults([]);

    // Test 1: Trending Repos
    try {
      const repos = await githubAPI.fetchTrendingRepos(3);
      addResult('fetchTrendingRepos', '✅', `Got ${repos.length} repos. First: ${repos[0]?.full_name}`);
    } catch (err) {
      addResult('fetchTrendingRepos', '❌', err.message);
    }

    // Test 2: Search Users
    try {
      const users = await githubAPI.searchUsers('torvalds');
      addResult('searchUsers', '✅', `Got ${users.length} users. First: ${users[0]?.login}`);
    } catch (err) {
      addResult('searchUsers', '❌', err.message);
    }

    // Test 3: Fetch User
    try {
      const user = await githubAPI.fetchUser('torvalds');
      addResult('fetchUser', '✅', `Name: ${user.name}, Followers: ${user.followers}`);
    } catch (err) {
      addResult('fetchUser', '❌', err.message);
    }

    // Test 4: Fetch User Repos
    try {
      const repos = await githubAPI.fetchUserRepos('torvalds', 'stars', 3);
      addResult('fetchUserRepos', '✅', `Got ${repos.length} repos. First: ${repos[0]?.name}`);
    } catch (err) {
      addResult('fetchUserRepos', '❌', err.message);
    }

    // Test 5: Search Repos
    try {
      const repos = await githubAPI.searchRepos('react', 3);
      addResult('searchRepos', '✅', `Got ${repos.length} repos. First: ${repos[0]?.full_name}`);
    } catch (err) {
      addResult('searchRepos', '❌', err.message);
    }

    // Test 6: Fetch Single Repo
    try {
      const repo = await githubAPI.fetchRepo('facebook', 'react');
      addResult('fetchRepo', '✅', `Stars: ${repo.stargazers_count.toLocaleString()}`);
    } catch (err) {
      addResult('fetchRepo', '❌', err.message);
    }

    setRunning(false);
  };

  return (
    <div style={{
      background: '#0f1419',
      minHeight: '100vh',
      color: 'white',
      padding: '2rem',
      fontFamily: 'monospace'
    }}>
      <h1 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>
        {APP_CONFIG.NAME} v1.1.0 — Setup and API Tests
      </h1>

      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>
        Token: {ENV.GITHUB_TOKEN ? '✅ Configured (5000 req/hr)' : '⚠️ Not set (60 req/hr)'}
      </p>

      <button
        onClick={runTests}
        disabled={running}
        style={{
          background: running ? '#444' : 'linear-gradient(135deg, #00ffff, #00cccc)',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '25px',
          color: running ? '#aaa' : '#000',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: running ? 'not-allowed' : 'pointer',
          marginBottom: '2rem'
        }}
      >
        {running ? '⏳ Running Tests...' : '▶ Run All API Tests'}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {testResults.map((r, i) => (
          <div key={i} style={{
            background: r.status === '✅'
              ? 'rgba(0, 255, 100, 0.08)'
              : 'rgba(255, 80, 80, 0.08)',
            border: `1px solid ${r.status === '✅' ? 'rgba(0,255,100,0.3)' : 'rgba(255,80,80,0.3)'}`,
            borderRadius: '10px',
            padding: '1rem 1.5rem'
          }}>
            <span style={{ fontWeight: 'bold' }}>{r.status} {r.label}</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', marginLeft: '1rem' }}>
              {r.data}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;