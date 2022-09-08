import axios from 'axios';

// PRIMEIRA OPÇÃO

// Base da URL: https://api.themoviedb.org/3/
//URL da API: /movie/now_playing?api_key=76f4dfe48630c1bae43f3cd2bb61b283&language=pt-BR

// SEGUNDA OPÇÃO

// Base da URL: https://api.themoviedb.org/3/
// URL da API: movie/popular?api_key=76f4dfe48630c1bae43f3cd2bb61b283&language=pt-BR

// TERCEIRA OPÇÃO
// Base da URL: https://api.themoviedb.org/3
// URL da API: /movie/upcoming?api_key=76f4dfe48630c1bae43f3cd2bb61b283&language=pt-BR


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
