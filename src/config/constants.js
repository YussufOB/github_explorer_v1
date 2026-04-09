export const API_CONFIG =  {
    BASE_URL: 'https://api.github.com',
    ENDPOINTS: {
        USERS: '/users',
        SEARCH_USERS: '/search/users',
        SEARCH_REPOS: '/search/repositories',
        SEARCH_ISSUES: '/search/issues',
        REPOS: '/repos'
    },
    DEFAULT_PER_PAGE: 20,
    MAX_PER_PAGE: 100
};

export const APP_CONFIG = {
    NAME: 'GitHub Explorer',
    VERSION: '1.0.0',
    DESCRIPTION: 'Explore GitHub Repos, Issues and other insights as guideline tools in learning Software Development'
};

export const UI_CONFIG = {
    DEBOUNCE_DELAY: 500,
    DROPDOWN_MAX_HEIGHT: '500px',
    CARD_MAX_HEIGHT: '70vh',
    SEARCH_SUGGESTIONS_LIMIT: 7,
    TRENDING_REPOS_COUNT: 20
};