# 一、Python 效果描述

Python 中的 `range()` 函数是一个非常有用的内置函数，它用于生成一个整数序列。这个函数经常用在循环中，特别是在 `for` 循环中，来迭代一个固定的次数。

`range()` 函数可以接收一到三个参数：

- `start`（可选）: 序列的起始值，默认为 0
- `stop`: 序列的结束值，但不包括这个值
- `step`（可选）: 两个数之间的间隔，默认为 1

```python
# 生成从0到4的整数序列  
for i in range(5):  
    print(i)  
  
# 输出: 0, 1, 2, 3, 4  
  
# 生成从1到5的整数序列  
for i in range(1, 6):  
    print(i)  
  
# 输出: 1, 2, 3, 4, 5  
  
# 生成从0到10的偶数序列  
for i in range(0, 11, 2):  
    print(i)  
  
# 输出: 0, 2, 4, 6, 8, 10
```

# 二、TypeScript 实现代码

在 TypeScript 中，我们可以通过定义一个函数来模仿 Python 的 `range` 函数，这个函数需要能够处理不同数量的参数。具体来说，它可以接收一个、两个或三个参数，分别对应起始值、结束值和步长。

以下是一个仿写的 `range` 函数，它支持传递不同数量的参数：

```typescript
function range(start: number, stop?: number, step?: number): Array<number> {
  // 只有一个参数的情况，将 start 视为结束值，起始值默认为 0
  if (stop === undefined) (stop = start) && (start = 0)
  // 没有提供步长时，默认为 1
  if (step === undefined) step = 1
  // 校验步长取值范围并验证步长是一个有限的非零数字
  const isInvalidStep = typeof step !== 'number' || isNaN(step) || !isFinite(step) || step === 0
  if (isInvalidStep) throw new Error('Range step argument must be a finite non-zero number')
  // 声明一个用来存储生成的整数序列的变量
  const list: number[] = []
  let current = start
  // 根据步长的正负来决定循环的方向
  if (step > 0) {
    while (current < stop) list.push(current) && (current += step)
  } else {
    while (current > stop) list.push(current) && (current += step)
  }
  // 将生成的整数序列的结果返回
  return list
}
```

# 三、测试案例

```typescript
console.log(range(5)) // [0, 1, 2, 3, 4]
console.log(range(1, 6)) // [1, 2, 3, 4, 5]
console.log(range(0, 10, 2)) // [0, 2, 4, 6, 8]
console.log(range(5, 0, -1)) // [5, 4, 3, 2, 1]
console.log(range(3, 3)) // []
console.log(range(3, 2)) // []
console.log(range(3, 4, -1)) // []
console.log(range(1.5, 5.5, 0.5)) // [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
```

在这个例子中，`range` 函数可以接收一个、两个或三个参数。如果只传递了一个参数，那么它将被视为结束值，起始值默认为 `0`。如果没有提供步长，那么步长默认为 `1`。函数还检查了步长是否为 `0`，因为步长为 `0` 将导致无限循环。然后，它使用一个 `while` 循环来生成并返回整数序列。

# 四、注意事项

存在小数的精确度问题