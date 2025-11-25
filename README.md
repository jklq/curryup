This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## LLM FORM Tests (OpenRouter)

This project supports optional LLM-based "FORM" tests in addition to the Haskell `runghc` tests. LLM tests let you assert that a submitted solution follows a particular implementation form — for example, "use `foldr`" (reject explicit recursion).

- Add an `# LLM Tests` section in the problem markdown whose body is JSON describing an array of tests. Example (see `problems/sample.md`):

```json
[
  {
    "name": "MustUseFoldr",
    "description": "Use foldr",
    "form": "use foldr",
    "model": "openai/gpt-oss-120b:exacto"
  }
]
```

- The runner will call OpenRouter's chat completions endpoint (`https://api.openrouter.ai/v1/chat/completions`) and expects the model to return a JSON object like `{ "pass": true, "reason": "...", "evidence": "..." }`.

- To use this feature set the environment variable `OPENROUTER_API_KEY` to a valid OpenRouter API key. The server will include `llmResults` in the response from the `/api/run` endpoint when LLM tests are present.

Notes:

- The default model used in the example is `openai/gpt-oss-120b:exacto` as requested. You can override the model per-LMM-test by specifying a `model` field in the test JSON.
- The LLM check is intended as an additional validation layer and should not be used as the only security mechanism.
