# @alitajs/umi-plugin-authority

> @alitajs/umi-plugin-authority.

## 安装

Using npm:

```bash
$ npm install --save-dev @alitajs/umi-plugin-authority
```

or using yarn:

```bash
$ yarn add @alitajs/umi-plugin-authority --dev
```

## 启用方式

有 `src/authority.ts` 时启用。

## 介绍

我们约定了 `src/authority.ts` 为我们的权限定义文件，该文件需要默认导出一个方法，导出的方法会在项目初始化时被执行。该方法需要返回一个对象。如下所示：

```
// src/authority.ts
export default function(initialState) {
  const { currentUser } = initialState || {};

  // actions、policies应该由于 currentUser 推导得出
  return {
    actions: [
      { module: 'module1', action: 'action1' },
      { module: 'module1', action: 'action2' },
      { module: 'module1', action: 'action3' },
      { module: 'module2', action: 'action1' },
      { module: 'module2', action: 'action2' },
    ],
    policies: [
      {
        version: 1,
        statement: [
          {
            effect: 'allow',
            action: 'module1/*'
          }
        ]
      }
    ]
  };
}
```

其中 `initialState` 是通过初始化状态插件 @umijs/plugin-initial-state 提供的数据，你可以使用该数据来初始化你的用户权限。

## API

### useAuthority

我们提供了一个 Hooks 用于在组件中获取权限相关信息，如下所示：

```
import React from 'react';
import { useAuthority } from 'umi';

const PageA = props => {
  const { foo } = props;
  const { combinationVerify } = useAuthority();
 
  if (combinationVerify('module1/action1')) {
    // 存在 module1/action1 权限，则...
  }
 
  return <>TODO</>;
};
export default PageA;
```

### Authority

可以在业务组件中使用插件提供的 React hook useAuthority 以及组件 <Authority /> 对应用进行权限控制了。 组件 Authority 支持的属性如下：

| 参数           | 说明                     | 类型                  | 默认值 |
| -------------- | ------------------------ | --------------------- | ------ |
| access        | 权限字符串                 | `string`              | --     |
| accessible    | 直接指定权限               |   `boolean`            |  --      |
| fallback       | 无权限时的显示             | `React.ReactNode` | --     |
| children       | 需要控制权限的节点          | `React.ReactNode` | --     |

**注意:** `accessible` 优先级最高

完整示例如下：

```
import React from 'react';
import { useAuthority, Authority } from 'umi';

const PageA = props => {
  const { foo } = props;
  const { combinationVerify } = useAuthority();
 
  if (combinationVerify('module1/action1')) {
    // 存在 module1/action1 权限，则...
  }
 
  return (
    <div>
      <Authority
        access="'module1/action1'"
        fallback={<div>Can not read foo content.</div>}
      >
        Foo content.
      </Authority>
      <Authority
        accessible={combinationVerify('module1/action1')}
        fallback={<div>Can not update foo.</div>}
      >
        Update foo.
      </Access>
      <Authority
        accessible={combinationVerify('module3/action1')}
        fallback={<div>Can not delete foo.</div>}
      >
        Delete foo.
      </Authority>
    </div>
  );
};
```
