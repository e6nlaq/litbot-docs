
# `usetime`

## 概要

グループの使用可能時間を設定します。

## 使用法

```
!usetime a b c d
```

これは、a時b分からc時d分を使用可能時間をして設定することを意味します。

## 使用例

```
!usetime 0 0 23 59

!usetime 5 0 22 30
```

## 制約

- $0 \leq a,c \leq 23$
- $0 \leq b,d \leq 59$
