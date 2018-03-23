var CommonUtils = {
	baseUrl: "/survey",
	bigAreaUrl: function(){// 查询大区地址
		return this.baseUrl+"/projectAudit/show?username=admin&password=a5dec63ec01cefc0418f49aa3073c6b8";
	},
	schoolUrl:function(){// 查询大区学校地址
		return this.baseUrl+"/school/queryByRegion";
	}, 
	subjectUrl:function(){// 查询学校专业地址
		return this.baseUrl+"/major/queryBySchool";
	},
	saveDataUrl: function(){// 保存数据
		return this.baseUrl+"/projectAudit/save";
	},
	deleteDataUrl: function(){// 删除数据
		return this.baseUrl+"/projectAudit/delete";
	},
	tableDataUrl: function(){// 表格数据地址
		return this.baseUrl+"/projectAudit/query";
	},
	showDetailUrl: function(){ // 通过id查看详情 参数?id=20
		return this.baseUrl+"/projectAudit/detail";
	},
	timetrans: function (date){
	    var date = new Date(date);//如果date为13位不需要乘1000
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
	    //var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	    //var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	    //var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
	    return Y+M+D;
	}
}
