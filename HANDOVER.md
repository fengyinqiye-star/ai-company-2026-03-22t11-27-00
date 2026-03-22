# 引き渡しガイド — おすすめ観光スポット アプリ

## このドキュメントについて

本ドキュメントは、納品後にお客様ご自身でサイトを管理・運用するためのガイドです。
納品後、開発側のアクセス権はすべて削除されます。

---

## お客様が管理するもの

### 1. GitHub リポジトリ

- URL: https://github.com/fengyinqiye-star/ai-company-2026-03-22t11-27-00
- ソースコードの全権限はお客様にあります
- `main` ブランチへの push で Vercel 自動デプロイが動作します

### 2. Vercel（ホスティング）

- ダッシュボード: https://vercel.com/dashboard
- GitHub と連携済みのため、`main` ブランチに push すると自動デプロイされます
- デプロイ状況の確認: Vercel ダッシュボード → プロジェクト → Deployments タブ

### 3. 外部サービス

本アプリは外部 API を使用していません。管理が必要な外部サービスのアカウントはありません。

| サービス | 用途 | 管理場所 |
|---------|------|---------|
| OpenStreetMap | 地図タイル表示 | 設定不要（無料・公開） |

---

## 環境変数一覧

本アプリは環境変数を使用していません。設定は不要です。

---

## サイトの更新方法

### テキスト・スポットデータの変更

観光スポットの情報はすべて JSON ファイルで管理されています。

**スポット情報の変更手順:**

1. GitHub リポジトリの `src/data/spots/{エリアID}.json` を編集
2. `main` ブランチにコミット・push
3. 30 秒〜1 分でサイトに自動反映

**エリア情報の変更手順:**

1. GitHub リポジトリの `src/data/areas.json` を編集
2. `main` ブランチにコミット・push

### 新しいエリアの追加

1. `src/data/areas.json` に新エリアを追記
2. `src/data/spots/{新エリアID}.json` を作成（既存ファイルを参考）
3. `public/images/areas/{新エリアID}.jpg` に画像を追加
4. `main` ブランチに push → 自動ビルド・デプロイ

### 大きな機能追加・デザイン変更

新しい開発案件としてご依頼ください。

---

## アーキテクチャ概要

```
Vercel（ホスティング）
  └── Next.js 14 App Router
        ├── / (トップ) ─ Server Component (SSG)
        │     └── エリア一覧 + 検索バー
        └── /area/[areaId] ─ Server Component (SSG)
              └── SpotExplorer (Client Component)
                    ├── SpotList（スポットカード一覧）
                    ├── MapView（Leaflet 地図） ← dynamic import (SSR無効)
                    └── RoutePanel（周遊ルート管理）

データ: src/data/*.json（静的ファイル、ビルド時に埋め込み）
地図タイル: tile.openstreetmap.org（外部 HTTPS 通信、唯一の外部依存）
```

**レンダリング戦略:**

- 全ページが SSG（静的サイト生成）で `out/` ディレクトリに HTML ファイルとして出力されます
- Vercel はこの静的ファイルをホスティングするだけです
- サーバーサイドの処理は一切ありません

---

## 拡張ポイント

### スポットデータを実データに差し替える

現在のスポットデータは `src/data/spots/*.json` に格納されています。
`lib/data.ts` の `getSpotsByAreaId` 関数を改修することで、外部 API（例: Google Places API）からデータを取得する構成に移行できます。

### お気に入り機能の追加

`hooks/useRouteManager.ts` を参考に、`localStorage` を使ったお気に入り保存フックを追加できます。

### 対応エリアの拡充

`src/data/` に JSON ファイルを追加するだけで対応エリアを増やせます。

### カテゴリフィルタの追加

`src/lib/constants.ts` の `CATEGORY_LABELS` に新カテゴリを追加し、`SpotList` コンポーネントにフィルタ UI を実装します。

---

## 運用・保守ガイド

### 日常的な確認

| 作業 | 頻度 | 確認場所 |
|------|------|---------|
| サイト動作確認 | 月1回 | ブラウザでアクセス |
| Vercel デプロイ状態確認 | 変更時 | Vercel ダッシュボード |

### Vercel の無料プランの制限

- 帯域幅: 100 GB / 月（超過すると従量課金）
- ビルド時間: 6,000 分 / 月
- 個人・スモールビジネス用途であれば上限に達することはほぼありません

### Node.js バージョン管理

Vercel のビルドは Node.js v20 を使用しています。
ローカル開発も `node -v` で v20.x であることを確認してください。

---

## トラブルシューティング

### サイトが表示されない

1. Vercel ダッシュボードでデプロイ状態を確認
2. 最新のデプロイが「Ready」になっているか確認
3. エラーがある場合はデプロイログ（「View Build Logs」）を確認

### ビルドエラーが出る

1. Vercel のデプロイログでエラーメッセージを確認
2. 直近の JSON ファイルの変更に文法エラーがないか確認（カンマ抜け等）
3. ローカルで `npm run build` を実行してエラーを再現する
4. 問題のある変更を revert して再 push

### 地図が表示されない

- OpenStreetMap のタイルサーバー（`tile.openstreetmap.org`）の稼働状況を確認してください
- ブラウザのコンソールで `net::ERR_` 系のエラーが出ている場合はネットワーク問題です

### スポットが表示されない

- `src/data/spots/{エリアID}.json` の JSON 形式が正しいか確認してください
- JSON の文法エラーは [jsonlint.com](https://jsonlint.com) で検証できます

---

## ローカル開発環境の再構築手順

開発者が変わる場合など、ゼロからの環境構築手順です。

```bash
# 1. Node.js v20 のインストール（nvm 推奨）
nvm install 20
nvm use 20

# 2. リポジトリのクローン
git clone <REPOSITORY_URL>
cd <directory>

# 3. 依存パッケージのインストール
npm install

# 4. 開発サーバーの起動
npm run dev
# → http://localhost:3000 で動作確認

# 5. テストの実行
npm test

# 6. ビルドの確認
npm run build
```

---

## サポート

納品後 30 日間は軽微な不具合対応を無料で承ります。
それ以降の修正・機能追加は別途お見積もりとなります。

---

*AI Company / 納品日: 2026-03-22*
