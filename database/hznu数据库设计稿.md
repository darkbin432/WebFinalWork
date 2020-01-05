WebFinalWork数据库拓扑

## 说明

数据库固定字段

| 字段名       | 类型       | 备注           |
| ------------ | ---------- | -------------- |
| id           | int        | 主键           |
| created_time | datetime   | 创建时间       |
| updated_time | datetime   | 更新时间       |
| status       | tinyint(1) | 1存在、0被删除 |



* git目录

```
--- WebFinalWork项目
	----springmvc
		
branch
	--- master
```

* .gitignore

```
.idea
.eclipse
.log
.config
```

* 图片文件等资源

```
--- tomcat 
	--- webapp
		--- WebFinalWorkResource
			--- images
			--- videos
			--- pdfs
		--- WebFinalWork.war
```




## 用户表user

| 字段名       | 类型         | 备注         |
| ------------ | ------------ | ------------ |
| id           | int          | 主键         |
| username     | varchar(40)  | 用户名       |
| password     | varchar(255) | 密码（哈希） |
| type         | int(11)      | 权限         |
| phone        | varchar(100) | 联系电话     |
| name         | varchar(100) | 姓名         |
| created_time | datetime     | 创建时间     |
| updated_time | datetime     | 更新时间     |
| status       | tinyint(1)   | 是否删除     |



## 新闻表news

| 字段名         | 类型         | 备注         |
| -------------- | ------------ | ------------ |
| id             | int          | 主键         |
| title          | varchar(255) | 标题         |
| source         | varchar(255) | 来源         |
| pic            | text         | 封面图文件名 |
| author         | varchar(255) | 作者         |
| content        | text         | 内容         |
| type           | int(11)      | 新闻类型     |
| publish_status | tinyint(1)   | 发布状态     |
| publish_time   | datetime     | 发布时间     |
| read_count     | int(11)      | 阅读量       |
| created_time   | datetime     | 创建时间     |
| updated_time   | datetime     | 更新时间     |
| status         | tinyint(1)   | 是否删除     |



