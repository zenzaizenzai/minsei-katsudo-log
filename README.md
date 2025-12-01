<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1jMTA_JsH0Cc_LE-HtYnPz3ZHH8tLU8JQ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This repository is set up to deploy automatically to GitHub Pages when you push to `main` via a GitHub Actions workflow.

1. Confirm the `base` build path is set by checking `vite.config.ts` or set `VITE_BASE` to `"/minsei-katsudo-log/"` in your build environment.
2. Push to `main` — GitHub Actions will build and deploy to Pages for the repository `zenzaizenzai/minsei-katsudo-log`.
3. After the workflow runs successfully, your site will be available at `https://zenzaizenzai.github.io/minsei-katsudo-log/` (or your configured Github Pages domain).

If you prefer manual deployment, you can also use `gh-pages` or similar packages; the Actions workflow is recommended and safer because it uses GitHub Pages infrastructure.

### 404 が出る場合の対処
- GitHub Pages で SPA をホストしている場合、クライアント側ルーティングでページに直接アクセスすると 404 になりがちです。これを防ぐため、`dist/index.html` を `dist/404.html` にコピーすることで未知のパスでも `index.html` を返せるようにしています。
- このリポジトリには `postbuild` スクリプト（`node ./scripts/copy404.js`）を追加しました。ローカルで `npm run build` を実行すると、`dist/404.html` が自動作成されます。GitHub Actions でも `npm run build` を実行しているため、この変更はデプロイ時に自動で適用されます。
- それでも 404 が発生する場合は、GitHub → Actions にあるワークフローの実行ログを確認して、`Build`、`Upload artifact`、`Deploy to GitHub Pages` の各ステップが成功しているか確認してください。


