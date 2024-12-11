declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: number;
    MONGODB_URI: string; // Add other custom environment variables here
  }
}
