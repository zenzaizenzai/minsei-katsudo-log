# GitHub Pages deployment (Vite + React)

This project is configured to deploy to GitHub Pages using the GitHub Actions workflow in `.github/workflows/deploy.yml`.

Automatic deployment (recommended)
1. Make sure you push your code to the `main` branch (the workflow runs on pushes to `main`).
2. The workflow sets `VITE_BASE` to `/minsei-katsudo-log/` before building — this ensures asset paths match `https://{user}.github.io/minsei-katsudo-log/`.
3. Wait for the GitHub Actions run to finish. After a successful run, your site should be live at:

   `https://zenzaizenzai.github.io/minsei-katsudo-log/`

Local build testing
1. On Windows PowerShell, to test the build with a base path in your current terminal:

```
$env:VITE_BASE = "/minsei-katsudo-log/";
npm run build
```

2. Preview with the Vite preview server (dist will use the base path):

```
npm run preview
```

Manual / alternative deployment (gh-pages branch)
1. Install `gh-pages` as a dev dependency: `npm install --save-dev gh-pages`.
2. Add the following scripts to `package.json`:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Run `npm run deploy` to push production assets to `gh-pages` branch.

Notes
- If you use a custom domain, configure it in repository settings and add a `CNAME` file appropriately.
- If your repository name is different or you want to host under a subpath, update `VITE_BASE` accordingly (e.g., `/your-repo/`).

 404 が出る場合
 - SPA の直接アクセスで 404 が出る場合は `dist/index.html` が `dist/404.html` へコピーされているか確認してください。
 - このリポジトリでは `postbuild` スクリプト（`node ./scripts/copy404.js`）を使って `dist/404.html` を自動作成します。ローカルでは `npm run build`、CI（Actions）でも同様に作成されるはずです。
 - Debug: Actions 実行ログで `Listing dist/ files`（ワークフローに追加された追加ステップ）が表示されるので、`index.html` や `404.html` が生成されているか確認してください。

