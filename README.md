# ai-emotion-app

GitHub Pages で公開できる React + Vite アプリです。

## 使い方

### 1. 画像を入れる
`public` フォルダに次の3つを入れてください。

- `techo-cover.png`
- `ai-course-banner.jpg`
- `hug.png`

### 2. ローカルで確認
```bash
npm install
npm run dev
```

### 3. 本番用ビルド
```bash
npm run build
```

### 4. GitHub にアップ
このフォルダ一式を GitHub リポジトリに入れてください。

### 5. GitHub Pages で公開
GitHub の Settings → Pages → Build and deployment で
- Source: GitHub Actions ではなく、まず簡単なのは「Deploy from a branch」
- Branch: `main`
- Folder: `/docs` または `/root`

※ Vite の build 出力は `dist` なので、GitHub Pages でそのまま出すなら GitHub Actions か `docs` 配置が必要です。

一番簡単なのは GitHub Actions を使う方法です。
