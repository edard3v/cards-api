declare module "bun" {
  interface Env {
    PORT: string;
    ENV: string;
    API_BASE_URL: string;

    SECRET_JWT: string;

    NODEMAILER_GMAIL: string;
    NODEMAILER_GMAIL_APP_PASSWORD: string;

    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;

    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;

    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  }
}
