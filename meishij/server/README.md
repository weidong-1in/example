# meishijie-project



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org

### install MongoDB

1、 安装MongoDB，启动服务

2、 创建数据库 ①cmd  ②mongod.exe –dbpath e:\dir
3、 连接数据库 mongorestore -h 127.0.0.1:27017 -d meishijie --dir

指令：
1查看MongoDB：cmd +mongo  
2查看数据库：先执行1 +show dbs 
3.删除数据库：执行2 + use 数据库名 + db.dropDatabase() +再通过 show dbs 命令查看数据库是否删除成功：