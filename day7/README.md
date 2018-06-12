# MongoDB
MongoDB将文档存储在集合中，每个文档都有不同的shcema，不用预先定义。

## 安装 MongoDB
首先在机器上用homebrew安装MongoDB数据库
### 更新homebrew
```s
brew update
```
### 安装MongoDB
* 安装二进制文件
```s
brew install mongodb
```
* 安装最新版的release
```s
brew install mongodb --devel
```
## 启动 MongoDB
### 创建目录
MongoDB要求创建一个文件夹y从来写入数据，默认会使用/data/db文件夹，在启动之前要先创建该文件夹,如果不想使用默认的文件夹，在启动MongoDB的时候可以指定一个文件夹。
```s
mkdir -p /data/db
```
### 设置文件夹的权限
需要保证数据库文件夹有用户读写权限

### 启动MongoDB
```s
mongod
```
这个命令可以启动mongodb，以/data/db为默认文件夹。

如果想要指定数据存储文件夹，执行以下命令：
```s
mongod --dbpath <path to data directory>
```

当看到如下提示时，说明启动成功，会默认监听127.0.0.1的27017端口。
```s
[initandlisten] waiting for connections on port 27017
```

或者也可以指定要想要监听的地址和端口。
```s
mongo --host <address>:<port>
```


