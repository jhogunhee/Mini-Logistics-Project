import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // 백엔드 주소
    timeout: 5000,
});

// [요청 인터셉터] 서버로 보내기 전 공통 작업
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// [응답 인터셉터] 서버 데이터를 받기 전 공통 작업 (에러 처리 등)
instance.interceptors.response.use(
    (response) => response.data, // .data를 미리 꺼내서 전달
    (error) => {
        if (error.response?.status === 401) {
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;