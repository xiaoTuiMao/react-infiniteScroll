# react 无限滚动组件

## Installation

```shell
npm i react-infiniteScroll
# or
yarn add react-infiniteScroll
```

## Examples
``` javascript
<InfiniteScroll
  onLoadMore={(endLoading) => {
    this.ajax().then(data => {
      // do something
      endLoading();
    })
  }}
  hasMore={true}
>
      <div>1</div>
</InfiniteScroll>
```