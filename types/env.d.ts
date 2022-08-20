/// <reference types="vite/client" />

interface ImportMetaEnv {
  /* 新增的env需在此声明 */
  readonly VITE_APP_TITLE: string
  readonly VITE_HTTP_BASE_URL: string
  readonly VITE_BUILD_BASE: string
  readonly VITE_HTTP_OPENAPI_TS_FETCH_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}