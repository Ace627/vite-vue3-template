# 一、思路分析

- 利用 `parseInt()` 函数
  - 语法 `parseInt(值, 要解析的值的基数)`
- 利用 `toString()` 函数
  - 语法 `十进制数.toString(需要转换的进制)`

# 二、案例参考

## 2.1 十进制转其它进制

```typescript
const count = 987
// 二进制 1111011011
count.toString(2)
// 八进制 1733
count.toString(8)
// 十六进制 3DB
count.toString(16).toUpperCase()
```

## 2.2 其它进制转十进制

```typescript
// 二进制转十进制 987
parseInt('1111011011', 2)
// 八进制转十进制 987
parseInt('1733', 8)
// 十六进制转十进制 987 
parseInt('3DB', 16)
```

## 2.3 其它进制转其它进制

先用 `parseInt()` 转为十进制，再用 `toString()` 转到目标进制

```typescript
const count_str = '1111011011'
// 3db
parseInt(count_str, 2).toString(16)
```

