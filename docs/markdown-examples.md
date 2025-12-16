# Markdown 扩展示例

本页面演示了 VitePress 提供的一些内置 Markdown 扩展功能。

## 语法高亮

VitePress 通过 [Shiki](https://github.com/shikijs/shiki) 提供语法高亮，具有行高亮等额外功能：

**输入**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**输出**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 自定义容器

**输入**

```md
::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险警告。
:::

::: details
这是一个详情块。
:::
```

**输出**

::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险警告。
:::

::: details
这是一个详情块。
:::

## 更多内容

查看文档了解 [Markdown 扩展完整列表](https://vitepress.dev/guide/markdown)。