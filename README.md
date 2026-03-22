# おすすめ観光スポット — 観光地レコメンド＆周遊ルートアプリ

目的地（エリア名）を入力すると、そのエリア周辺のおすすめ観光スポットが一覧表示され、地図上でスポットの位置を確認でき、さらに選択したスポットを巡る周遊ルートを可視化できる Web アプリケーションです。外部 API は一切使用せず、Vercel 無料プランで運用できます。

---

## 機能一覧

- **エリア検索**: テキスト入力によるサジェスト表示 + エリアカードからの直接選択
- **スポット一覧表示**: カテゴリ・説明・所要時間付きカード形式
- **Leaflet 地図表示**: OpenStreetMap タイル上にスポットマーカーを配置
- **周遊ルート作成**: スポットを選択順にポリライン描画 + 訪問順の並び替え
- **レスポンシブ対応**: モバイル（375px）〜 デスクトップ（1440px）

## 対応エリア

東京 / 京都 / 大阪 / 沖縄 / 北海道（各エリア 7 スポット前後）

---

## 技術スタック

| カテゴリ | 技術・バージョン |
|---------|----------------|
| フレームワーク | Next.js 14.2.35 (App Router) |
| 言語 | TypeScript 5.x (strict mode) |
| スタイリング | Tailwind CSS 3.4.x |
| 地図 | Leaflet 1.9.4 + react-leaflet 4.2.1 |
| タイルサーバー | OpenStreetMap (tile.openstreetmap.org) |
| データソース | 静的 JSON モック（src/data/） |
| テスト | Jest 29.7.0 + React Testing Library 16.3.2 |
| ホスティング | Vercel（静的エクスポート）|
| Node.js | v20.x 推奨 |

---

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <YOUR_REPOSITORY_URL>
cd <repository-directory>
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 4. ビルド

```bash
npm run build
```

`out/` ディレクトリに静的ファイルが生成されます。

### 5. ビルド結果のローカル確認

```bash
npx serve out
```

---

## 環境変数

本アプリは外部 API を使用しないため、**環境変数の設定は不要**です。

地図タイルは OpenStreetMap の公開タイルサーバーを使用しており、API キーは必要ありません。

---

## npm scripts

| コマンド | 内容 |
|---------|------|
| `npm run dev` | 開発サーバー起動（localhost:3000）|
| `npm run build` | 本番ビルド（静的エクスポート）|
| `npm start` | 本番サーバー起動（`next start`）|
| `npm run lint` | ESLint 実行 |
| `npm test` | Jest テスト実行 |
| `npm run test:coverage` | カバレッジレポート付きテスト実行 |

---

## ディレクトリ構成

```
.
├── public/
│   └── images/areas/         # エリア代表画像（tokyo.jpg 等）
├── src/
│   ├── app/
│   │   ├── layout.tsx        # ルートレイアウト（メタデータ・フォント）
│   │   ├── page.tsx          # トップページ：エリア検索 + カード一覧 [Server Component]
│   │   └── area/[areaId]/
│   │       └── page.tsx      # スポット一覧 + 地図ページ [Server Component]
│   ├── components/
│   │   ├── area/             # AreaCard, BackButton
│   │   ├── layout/           # Header, Footer
│   │   ├── map/              # MapView, SpotMarker, NumberedMarker, RoutePolyline
│   │   ├── route/            # RoutePanel（訪問順管理）
│   │   ├── search/           # SearchBar, AreaCardList
│   │   └── spot/             # SpotCard, SpotList, SpotExplorer, MobileTabSwitcher
│   ├── data/
│   │   ├── areas.json        # 全エリア定義（Area[]）
│   │   └── spots/
│   │       ├── tokyo.json    # 東京スポット
│   │       ├── kyoto.json    # 京都スポット
│   │       ├── osaka.json    # 大阪スポット
│   │       ├── okinawa.json  # 沖縄スポット
│   │       └── hokkaido.json # 北海道スポット
│   ├── hooks/
│   │   ├── useAreaSearch.ts  # エリア検索・サジェスト管理
│   │   └── useRouteManager.ts # 周遊ルート選択・並び替え管理
│   ├── lib/
│   │   ├── constants.ts      # カテゴリラベル・地図設定定数
│   │   └── data.ts           # JSON データ取得ユーティリティ
│   └── types/
│       └── index.ts          # Area, Spot, SpotCategory 型定義
├── __tests__/                # テストコード（19 スイート / 155 ケース）
├── __mocks__/                # Leaflet モック
├── jest.config.js
├── jest.setup.ts
├── next.config.js            # output: 'export' 設定
├── tailwind.config.ts
└── tsconfig.json
```

---

## デプロイ手順（Vercel）

### 初回デプロイ

```bash
npx vercel
```

### GitHub 連携による自動デプロイ

1. [Vercel ダッシュボード](https://vercel.com/dashboard) にログイン
2. 「New Project」→ GitHub リポジトリをインポート
3. Framework Preset: **Next.js** を選択
4. Build Command: `npm run build`（自動検出されます）
5. Output Directory: `out`（`next.config.js` で `output: 'export'` 設定済み）
6. 「Deploy」をクリック

以降は `main` ブランチに push するだけで自動デプロイされます。

### vercel.json（オプション）

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": "nextjs"
}
```

---

## テスト実行方法

```bash
# 全テスト実行
npm test

# カバレッジレポート付き
npm run test:coverage

# ウォッチモード（開発中）
npm test -- --watch
```

### テスト結果（v1.0.0 時点）

| 指標 | 結果 |
|------|------|
| テストスイート | 19 / 19 Pass |
| テストケース | 155 / 155 Pass |
| ステートメントカバレッジ | 96.58% |
| ブランチカバレッジ | 93.65% |
| 関数カバレッジ | 90.54% |
| 行カバレッジ | 96.77% |

---

## データの追加・変更

### 新しいエリアを追加する

1. `src/data/areas.json` にエリア情報を追記する

```json
{
  "id": "nara",
  "name": "奈良",
  "description": "世界遺産を持つ古都",
  "center": { "lat": 34.6851, "lng": 135.8048 },
  "zoom": 13,
  "image": "/images/areas/nara.jpg"
}
```

2. `src/data/spots/nara.json` を作成してスポットデータを追加する
3. `public/images/areas/nara.jpg` にエリア代表画像を配置する
4. `npm run build` でビルドを確認する

### スポットデータの構造

```typescript
{
  "id": "nara-001",
  "areaId": "nara",
  "name": "東大寺",
  "category": "shrine_temple",
  "description": "奈良を代表する世界遺産の大仏殿",
  "duration": "約90分",
  "position": { "lat": 34.6887, "lng": 135.8399 }
}
```

利用可能なカテゴリ: `shrine_temple` / `nature` / `gourmet` / `experience` / `shopping` / `history` / `scenery`

---

## ライセンス

MIT License — 詳細は [LICENSE](./LICENSE) を参照してください。

---

*開発: AI Company / 2026-03-22*
