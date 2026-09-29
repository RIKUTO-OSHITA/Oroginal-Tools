---
description: OpenSpec の change を grill-me 方式で詰めて成果物を更新する
---

対象の change: $ARGUMENTS（未指定なら `openspec list` で確認して聞く）

1. `openspec/changes/<name>/` の proposal.md / design.md / specs/ / tasks.md を読む
2. grill-me スキルの方式で、曖昧な点・抜け漏れ・矛盾・エッジケースを一問ずつ質問する（推奨回答付き）
3. 回答が出るたびに、該当する成果物（proposal / design / specs / tasks）へ反映する
4. 最後に `openspec validate <name>` を実行し、問題がないことを確認する
