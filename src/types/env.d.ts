
interface ImportMetaEnv {
  readonly VITE_APP_NAVER_CLIENT_ID: string
  // 여기에 다른 환경 변수들을 추가할 수 있습니다.
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

