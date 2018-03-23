<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/2/8
  Time: 11:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>上传word</title>
</head>
<body>
    <form action="/survey/projectAudit/save" method="post" enctype="multipart/form-data">
        <input type="file" name="uploadFile"> <br/>
        <input type="submit" value="上传"/>
    </form>
</body>
</html>
