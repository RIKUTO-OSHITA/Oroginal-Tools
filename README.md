# AgileTickets Tool

アジャイル開発向けのJira風チケット管理アプリ。

## 技術スタック

- React 19 + TypeScript
- Vite（ビルド/開発サーバー）
- React Router（`HashRouter`によるチケット詳細ページのURL発行）
- ブラウザの`localStorage`によるデータ永続化(サーバー不要)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec) + Claude Code によるスペック駆動開発(`openspec/`配下に仕様を管理)

## コマンド履歴(OpenSpec / Claude Code)

このアプリはClaude Code上でOpenSpecワークフローを使って開発された。実行した主なコマンドは以下の通り。

1. `openspec init --tools claude` — このリポジトリにOpenSpec環境を構築
2. `/opsx:propose` — 「チケット管理アプリを作りたい」という要件からproposal・design・specs・tasksの各アーティファクトを作成(change名: `ticket-management-app`)
3. `/opsx:apply` — tasks.mdに基づき実装(Vite+React+TSのscaffold〜各画面の実装〜ブラウザでの動作確認まで)
4. `/opsx:archive` — 実装完了後、specをメイン仕様(`openspec/specs/`)に同期し、変更を`openspec/changes/archive/`にアーカイブ

## 起動方法

```bash
npm install
npm run dev
```

起動後、ターミナルに表示されるURL(例: `http://localhost:5173/`)をブラウザで開く。

その他のコマンド:

```bash
npm run build    # 本番用ビルド(distに出力)
npm run preview  # ビルド済みアプリをローカルでプレビュー
npm run lint     # oxlintによる静的解析
```
