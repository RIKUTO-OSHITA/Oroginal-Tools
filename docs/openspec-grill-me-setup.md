# OpenSpec × grill-me 併用手順書

## 概要

このリポジトリでは、仕様駆動開発ツール **OpenSpec** に、計画を質問攻めで詰める Claude Code スキル **grill-me** を組み合わせて使う。

- **OpenSpec**: 変更ごとに proposal / design / specs / tasks を作り、それを元に実装・アーカイブする
- **grill-me**: Matt Pocock さんが公開しているスキル（GitHub `mattpocock/skills`）。AI がプランについて一問ずつ質問し、設計の曖昧な点をなくしていく

## 前提

- OpenSpec は初期設定済み（`openspec/config.yaml`、`.claude/skills/openspec-*`、`.claude/commands/opsx/*`）
- Claude Code が使える環境であること

## 全体の流れ

grill-me は OpenSpec の **propose の前後**に挟む。

```
/grill-me          … アイデアを詰める
   ↓
/opsx:propose      … proposal / design / specs / tasks を生成
   ↓
/grill-spec        … 生成された成果物の穴を詰めて修正
   ↓
/opsx:apply        … 実装
   ↓
/opsx:archive      … 完了した変更をアーカイブ
```

## Step 1. grill-me スキルを導入する

プロジェクト内に置けば、git でチームにも共有できる。
`.claude/skills/grill-me/SKILL.md` を作成する。

```markdown
---
name: grill-me
description: Interview the user relentlessly about a plan or design until reaching shared understanding. Use when the user says "grill me" or wants their plan stress-tested.
---

このプランについて、あらゆる側面を容赦なく質問し、共通理解に達するまで続けてください。

- 設計の分岐（デシジョンツリー）を一つずつたどり、決定同士の依存関係を順番に解消する
- 質問は一度に1つだけ。各質問には「あなたの推奨回答」を添える
- コードベースを調べれば答えが出る質問は、ユーザーに聞かずに自分で調べる
- 最後に、決まった事項と未決事項を箇条書きで整理する
```

> 公式版を使う場合は、GitHub の `mattpocock/skills` から `grill-me/SKILL.md` をコピーする。上の内容は、その趣旨を日本語に落としたもの。

## Step 2. OpenSpec と組み合わせたコマンドを作る

`.claude/commands/opsx/` 配下の OpenSpec 生成ファイルは `openspec update` で上書きされる可能性がある。そのため**直接編集せず、別ファイルとして作る**。

`.claude/commands/grill-spec.md` を作成する。

```markdown
---
description: OpenSpec の change を grill-me 方式で詰めて成果物を更新する
---

対象の change: $ARGUMENTS（未指定なら `openspec list` で確認して聞く）

1. `openspec/changes/<name>/` の proposal.md / design.md / specs/ / tasks.md を読む
2. grill-me スキルの方式で、曖昧な点・抜け漏れ・矛盾・エッジケースを一問ずつ質問する（推奨回答付き）
3. 回答が出るたびに、該当する成果物（proposal / design / specs / tasks）へ反映する
4. 最後に `openspec validate <name>` を実行し、問題がないことを確認する
```

## Step 3. config.yaml にプロジェクトの前提を書く（任意・効果大）

grill-me の質問の質は前提情報に左右される。`openspec/config.yaml` の `context` を埋めておくと、質問が的を射たものになる。

```yaml
context: |
  家計簿アプリ（household-budget）
  Tech stack: （例: TypeScript, React, ...）
rules:
  design:
    - 未決事項は "Open Questions" セクションに残す
```

## Step 4. 使い方

| # | コマンド | 内容 |
|---|---|---|
| 1 | `/grill-me 〇〇機能を作りたい` | アイデアを詰める |
| 2 | `/opsx:propose` | 固まった内容から成果物を生成する |
| 3 | `/grill-spec <change名>` | 成果物を詰めて修正する |
| 4 | `/opsx:apply` | 実装する |
| 5 | `/opsx:archive` | 完了した変更をアーカイブする |

## 注意点

- 新しく追加したスキル・コマンドは、**Claude Code の再起動（または新しいセッションの開始）後**に `/` 補完に表示される
- `openspec update` を実行しても、`grill-me` と `grill-spec` は OpenSpec の管理外なので上書きされない
