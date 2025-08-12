# PDF Tools (Image→PDF, PDF→Images) — Next.js Demo

This is a small Next.js project that performs:
- Image(s) → single PDF (client-side using `pdf-lib`)
- PDF → Images (client-side using `pdfjs-dist`)

All processing happens in the user's browser — no server required.

## Run locally
1. Install dependencies:
   ```
   npm install
   ```
2. Start the dev server:
   ```
   npm run dev
   ```
3. Open http://localhost:3000

## Notes
- This is a demo. For production, consider adding file size limits and UX polish.
- Built for simplicity (no Tailwind). Styling is basic CSS.
