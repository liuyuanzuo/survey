<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/2/7
  Time: 15:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>接口</title>
</head>
<body>
<h4>入口</h4>
http://20.14.3.47:8082/survey/projectAudit/show?username=admin&password=a5dec63ec01cefc0418f49aa3073c6b8 <br/>
参数：username、password(满意度调查系统中当前登录用户的session的username和password)<br/>
<hr/>

<h4>大区</h4>
http://20.14.3.47:8082/survey/region/queryAll <br/>
查询所有大区 <br/>
<hr/>

<h4>校区</h4>
http://20.14.3.47:8082/survey/school/queryByRegion?regionId=0 <br/>
查询大区内所有校区<br/>
参数：regionId(大区Id) <br/>
<hr/>

<h4>专业</h4>
http://20.14.3.47:8082/survey/major/queryBySchool?schoolId=15 <br/>
查询校区开设的专业<br/>
参数：schoolId(校区Id)<br/>
<hr/>

<h4>项目审核</h4>
http://20.14.3.47:8082/survey/projectAudit/save <br/>
添加or更新 项目审核<br/>
参数：uploadFile(上传的附件)、其它参数为字段名(全小写,添加or更新哪个字段传给后台哪个字段)<br/>
<hr/>
http://20.14.3.47:8082/survey/projectAudit/detail?id=20 <br/>
查看项目审核详情<br/>
参数：id(项目审核id)<br/>
<hr/>
http://20.14.3.47:8082/survey/projectAudit/delete?id=1 <br/>
删除项目审核<br/>
参数：id(项目审核id)<br/>
<hr/>
http://20.14.3.47:8082/survey/projectAudit/query <br/>
查询or过滤筛选<br/>
参数：type(0:查询 1:过滤筛选)、regionid(大区id)、schoolid(校区id)、majorid(专业id)、search(过滤筛选"中输入的内容)、
        beginDate(开始日期)、endDate(结束日期)、offset(偏移量)、limit(每页显示条数) <br/>
<hr/>
http://20.14.3.47:8082/survey/projectAudit/export <br/>
导出Excel表<br/>
参数：regionid(大区id)、schoolid(校区id)、majorid(专业id)、beginDate(开始日期)、endDate(结束日期)<br/>
<hr/>

</body>
</html>
