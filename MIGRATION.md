# GitHub Pages migration — staged, Cloudflare retained

The lesson and MP3 can be served at https://ij-teacher.github.io/the-2026-workplace/ . Student entry, submissions, teacher records and Excel exports continue to use the existing Cloudflare Worker and D1. No database is copied or deleted.

## Deployment order
1. Deploy the API CORS changes to the existing Cloudflare Worker using its existing deployment procedure. This permits browser requests from https://ij-teacher.github.io only; it does not replace teacher authorization.
2. Build with pnpm install --frozen-lockfile then pnpm build:pages.
3. Publish the contents of pages-dist using GitHub Pages. The teacher route has its own index.html. Enable Pages after backend CORS is deployed.
4. Verify MP3 playback, all five exercises, student entry and submission, teacher record refresh, Excel download and the generated QR code from the GitHub URL. Google Drive upload still requires its existing backend configuration.
5. Keep Cloudflare active. Fully leaving Cloudflare later requires a replacement API and database, migration of student records, and separate validation.

## Known existing security issue
The original teacher code is embedded in the public source and browser bundle. This migration does not rotate that credential. Rotate it to a server-side secret and remove client-side comparisons before treating teacher records as protected. Existing source history remains public. Do not put student records or secrets into Pages artifacts.

## Rollback
Continue sharing the existing Cloudflare URL. No destructive changes or database migrations are part of this patch.
