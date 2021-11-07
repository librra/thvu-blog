import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: "https://4d5c1157f3fb4bca98f3b5b043d52300@o1062193.ingest.sentry.io/6052592",
  tracesSampleRate: 0.2,
});
