# Node.jsからSequelizeでSQLite3を扱う

Node.jsからRDB(MySQL, PostgreSQL, MariaDBやSQLiteなど)を扱う場合、各々に対応したパッケージを利用してもいいのだが、何かしらのORM(Object Relational Mapping)を利用しておけば、どのDBシステムを利用するにしても同じようにプログラム実装できて、DBシステムのスイッチもしやすい。

Node.jsで良く使われているORMであるSequelizeを利用して、SQLite3のDBにデータを書き込む手順のサンプルである。

https://sequelize.org/ - Sequelize ORM

## 実行手順

```txt
$ npm run start

> node-sequelize@1.0.0 start
> node ./sequelize.mjs

******** Sequelizeテストスタート ********
******** データ作成 ********
currentDB status:
[
  { username: 'taro', password: 'taro123', address: 'Tokyo' },
  { username: 'jiro', password: 'jiro456', address: 'Osaka' },
  { username: 'sabro', password: 'jiro789', address: 'Hokkaido' }
]
******** jiroのデータアップート ********
currentDB status:
[
  { username: 'taro', password: 'taro123', address: 'Tokyo' },
  { username: 'jiro', password: '456jiro', address: 'Kanagawa' },
  { username: 'sabro', password: 'jiro789', address: 'Hokkaido' }
]
******** taroのデータ削除 ********
currentDB status:
[
  { username: 'jiro', password: '456jiro', address: 'Kanagawa' },
  { username: 'sabro', password: 'jiro789', address: 'Hokkaido' }
]
******** Sequelizeテスト終了 ********
```


