declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PUBLIC_URL: string
    REACT_APP_: string
    // 여기에 사용하는 다른 환경 변수들을 추가할 수 있습니다.
    REACT_APP_NAVER_CLIENT_ID: string
    // 예: REACT_APP_API_URL: string
  }
}