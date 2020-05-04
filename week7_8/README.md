# Snapshot Testing
snapshot 用以確認畫面 UI 有無變更。確認方式為比較前後版本的 snapshop，如果有不同，
1. 確實有問題，需重新檢查邏輯
2. 須依照情況更新你舊的 snapshop

## toMatchSnapshot**
toMatchSnapshot(propertyMatchers?, hint?)
- propertyMatchers
- hint

## Updating Snapshots

已經 run 過一次 facebook 版本，產生了 snapshots，接著改成 ig run run 看。

```javascript
// 把 facebook 改成 ig
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.instagram.com">Instagram</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

如果 ig 才是真正想要的 UI layout，那就更新它

`jest --updateSnapshot`

## Interactive Snapshot Mode

updated interactively in watch mode，僅需將 test 指令改為

`yarn test --watch` 

- 接著就可以使用互動模式來進行測試

## Inline Snapshots

- 需先安裝 prettier
`yarn add prettier --dev --exact`
- 接著執行測試，就可以直接在測試檔案中看見 snapshots

```javascript
it("renders correctly", () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <a
      className="normal"
      href="http://www.facebook.com"
      onMouseEnter={[Function]}
      onMouseLeave={[Function]}
    >
      Facebook
    </a>
  `);
});
```