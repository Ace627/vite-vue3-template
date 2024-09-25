# 一、前言

`sleep()` 方法，顾名思义，就是使程序睡眠（暂停）一段时间，在一些其它语言中（如 Python、Java 等）内置有 `sleep()` 方法，但 `JavaScript` 中并没有，所以需要我们来自行实现。

# 二、需求分析

我们需要 `sleep()` 这么一个函数，来帮助我们暂停程序的执行，起到延时的作用，可以传入一个参数来自定义延迟的时间，如下

```typescript
console.log(`执行`)
sleep(1000)
console.log(`1000ms 后执行`)
```

期待的表现是：前面的程序执行完成后，间隔 1s 再执行后面的程序

# 三、实现思路

## 3.1 通过死循环阻塞执行

由于 `JavaScript` 是单线程的，只要在 `sleep()` 的时间内一直有程序执行，处于一个阻塞状态，就能延迟后面的程序执行

```typescript
function sleep(delay: number) {
  const now = Date.now()
  while (Date.now() < now + delay) {}
}

console.log(`执行：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
sleep(1000)
console.log(`1000ms 执行：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
```

输出结果如下

```ty
执行：2024-08-14 09:29:49
1000ms 执行：2024-08-14 09:29:50
```

基于 `Date` 计算当前是否已到达延迟时间，如果未到，则程序会一直处于 `while` 的循环中，阻塞后面的程序执行，从而达到延时的目的。

由于上文提到的 `JavaScript` 是单线程的，所以会导致这种方式存在一个缺点：`sleep()` 中一直执行 `while` 循环，在这期间都无法再处理其它任务，包括其它程序的执行、`DOM` 的渲染等等。

**在使用这种死循环阻塞方式时，务必考虑以上副作用对程序的影响。**

## 3.2 基于定时器的延时

直接使用定时器延迟代码执行

```typescript
function sleep(callback: AnyFunction, delay: number) {
  setTimeout(callback, delay)
}

function action() {
  console.log(`1000ms 执行：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
}

console.log(`执行：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
sleep(action, 1000)
```

输出结果如下

```typescript
执行：2024-08-14 09:37:19
1000ms 执行：2024-08-14 09:37:20
```

这种方式需要将延时执行的代码传入 `setTimeout` （也就是 `sleep()`）方法中，代码的可维护性较差。

## 3.3 基于 Promise 的定时器

通过在指定时间后执行 `Promise` 中的 `resolve` 方法，来实现延时的目的

```typescript
function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

console.log(`执行：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
sleep(1000).then(() => {
  console.log(`1000ms 执行：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
})
```

输出结果如下

```typescript
执行：2024-08-14 09:42:50
1000ms 执行：2024-08-14 09:42:51
```

不过这种方式存在 `then` 的横向嵌套，可以考虑使用 `async/await` 语法糖变为如下写法，提高可读性

```typescript
async function action() {
  console.log(`执行：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
  await sleep(1000)
  console.log(`1000ms 执行：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
}

action()
```

# 四、场景实例：红绿灯循环

假设：红灯 15 秒、绿灯 15 秒、黄灯 2 秒，循环

```typescript
function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

const lightList = ['red', 'green', 'yellow']

async function action(index: number) {
  switch (lightList[index]) {
    case 'red':
      console.log(`当前是红灯：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
      await sleep(15 * 1000)
      break
    case 'green':
      console.log(`当前是绿灯：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
      await sleep(15 * 1000)
      break
    case 'yellow':
      console.log(`当前是黄灯：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
      await sleep(2 * 1000)
      break
  }

  index < 2 ? index++ : (index = 0)
  action(index)
}

action(0)
```

输出结果如下

```typescript
当前是红灯：2024-08-14 09:52:13
当前是绿灯：2024-08-14 09:52:28
当前是黄灯：2024-08-14 09:52:43
当前是红灯：2024-08-14 09:52:45
......
```

当然，还有很多 `sleep` 方法的使用场景，如对数据量大的接口的请求设置间隔、控制程序的执行速度等......
