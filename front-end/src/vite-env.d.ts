/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_PUBLIC_URL: string;
  // add other environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
