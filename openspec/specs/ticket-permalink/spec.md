# ticket-permalink Specification

## Purpose

TBD - created by archiving change ticket-management-app. Update Purpose after archive.

## Requirements

### Requirement: チケット固有URL

システムは、すべてのチケットに対し、そのチケットIDから導出される一意で直接アクセス可能なURLを提供しなければならない(SHALL)。

#### Scenario: URL経由でのチケットアクセス

- **WHEN** ユーザーがあるチケットのIDに対応するURLに直接アクセスする
- **THEN** システムはそのチケットの詳細ページを表示する

#### Scenario: チケットURL上でのリロード

- **WHEN** ユーザーがチケット詳細URLを開いた状態でブラウザをリロードする
- **THEN** システムはボードにリダイレクトするのではなく、同じチケットの詳細ページを表示する

### Requirement: 存在しないチケットへの対応

システムは、存在しないチケットIDに対応するURLへのアクセスを適切に処理しなければならない(SHALL)。

#### Scenario: 存在しないチケットIDへの遷移

- **WHEN** ユーザーが存在しないチケットID(削除済み、または未作成)のURLに遷移する
- **THEN** システムはチケット詳細の代わりに「見つかりません」というメッセージを表示する
