var AuditItems = {
	curDate: "", 
	selectTips: '<option value="">请选择</option>',
	init: function(){
		this.curDate = new Date();
		this.initElements();
		this.initData();
		this.initEvents();
		this.initTable();
	},
	initElements: function(){
		var self = this;
		laydate.render({
		  elem: '#startInput',
		  theme: '#393D49',
		  value: new Date(self.curDate - 1000 * 3600 * 24 * 30)
		});
		laydate.render({
		  elem: '#endInput',
		  theme: '#393D49',
		  value: self.curDate
		});
		laydate.render({
		  elem: '#projectData',
		  theme: '#393D49'
		});
		laydate.render({
		  elem: '#commitDate_add',
		  theme: '#393D49'
		});
		laydate.render({
		  elem: '#commitDateEdit',
		  theme: '#393D49'
		});
	},
	initData: function(){
		var self = this;
		// 初始化大区数据
		Ajax.getBigArea(CommonUtils.bigAreaUrl(), function(res){
			if(res.status === 0){
				var html = self.selectTips;
				var bigAreaArray = res.rows;
				for (var i = 0; i < bigAreaArray.length; i++) {
					html += '<option text="' + bigAreaArray[i].largeareaname + '"value="' + bigAreaArray[i].id + '">' + bigAreaArray[i].largeareaname + '</option>';
					// 查询条件的大区
					$("#bigArea").html(html);
					// 模态框的大区
					$("#bigRegion_add").html(html);
				}
			}
		})
	},
	initEvents: function(){
		var self = this;
		// 为学校select添加change事件
		$("#bigArea").change(function(){
			var checkValue = $(this).find('option:selected').val();
			// 查询条件上面的学校下拉框清空
			$("#schools").empty();
			// 查询条件上面的学校下拉框清空
			$("#profession").empty();
			$("#profession").html(self.selectTips);
			if(!checkValue) {
				$("#schools").html(self.selectTips);
				return;
			}
			Ajax.getSchool(CommonUtils.schoolUrl(), checkValue, function(res){
				if(res.status === 0){
					var html = self.selectTips;
					var school = res.rows;
					for (var i = 0; i < school.length; i++) {
						html += '<option text="' + school[i].schoolname + '"value="' + school[i].id + '">' + school[i].schoolname + '</option>';
						
					}
					$("#schools").html(html);
				}
			})
		});
		// 为学校select添加点击事件
		$("#schools").change(function(){
			var checkValue = $(this).find('option:selected').val();
			// 查询条件上面的学校下拉框清空
			$("#profession").empty();
			if(!checkValue) {
				$("#profession").html(self.selectTips);
				return;
			}
			Ajax.getSubject(CommonUtils.subjectUrl(), checkValue, function(res){
				if(res.status === 0){
					var html = self.selectTips;
					var subject = res.rows;
					for (var i = 0; i < subject.length; i++) {
						html += '<option text="' + subject[i].majorname + '"value="' + subject[i].id + '">' + subject[i].majorname + '</option>';
						$("#profession").html(html);
					}
				}
			})
		});
		// 点击查询按钮
		$("#searchBtn").click(function(){
			//alert("执行查询逻辑，刷新表格");
			$('#tb_departments').bootstrapTable("refresh");
		});
		
		
		
		
		
	
		// 新增事件
		$("#btnAdd").click(function() {
			$("#mainPage-inner").hide()
			
			///$("#newAddPage-wrapper")
			// 初始化模态框中的值
			/*$("#bigRegion_add").find('option:selected').val();*/
			
			//模态框的显示
			/*$('#myModal').modal('show');*/
		});
		
		
		//导出数据到表格
		$(".daochu").click(function(){
			// 大区id
			var bigAreaId = $("#bigArea").find('option:selected').val();
			// 学校id
			var schoolId = $("#schools").find('option:selected').val();
			// 专业id
			var subjectId = $("#profession").find('option:selected').val();
			// 项目开始日期
			var startInput = $("#startInput").val();
			// 项目结束日期
			var endInput = $("#endInput").val();
			// 字段校验
			if(!bigAreaId){
				alert("大区不能为空");
				return;
			}
			if(!schoolId){
				alert("学校不能为空");
				return;
			}
			if(!subjectId){
				alert("专业不能为空");
				return;
			}
			window.location.href = "http://20.14.3.47:8082/survey/projectAudit/export?regionid="+bigAreaId+"&schoolid="+schoolId+"&majorid="+subjectId+"&beginDate="+startInput+"&endDate="+endInput;
		});
		
		// 新增模态框的大区change
		$("#bigRegion_add").change(function(){
			var checkValue = $(this).find('option:selected').val();
			// 学校下拉框清空
			$("#school_add").empty();
			// 专业下拉框清空
			$("#subject_add").empty();
			$("#subject_add").html(self.selectTips);
			if(!checkValue) {
				$("#school_add").html(self.selectTips);
				return;
			}
			Ajax.getSchool(CommonUtils.schoolUrl(), checkValue, function(res){
				if(res.status === 0){
					var html = self.selectTips;
					var school = res.rows;
					for (var i = 0; i < school.length; i++) {
						html += '<option text="' + school[i].schoolname + '"value="' + school[i].id + '">' + school[i].schoolname + '</option>';
						$("#school_add").html(html);
					}
				}
			})
		});
		// 模态框学校select添加点击事件
		$("#school_add").change(function(){
			var checkValue = $(this).find('option:selected').val();
			// 查询条件上面的学校下拉框清空
			$("#subject_add").empty();
			if(!checkValue) {
				$("#subject_add").html(self.selectTips);
				return;
			}
			Ajax.getSubject(CommonUtils.subjectUrl(), checkValue, function(res){
				if(res.status === 0){
					var html = self.selectTips;
					var subject = res.rows;
					for (var i = 0; i < subject.length; i++) {
						html += '<option text="' + subject[i].majorname + '"value="' + subject[i].id + '">' + subject[i].majorname + '</option>';
						$("#subject_add").html(html);
					}
				}
			})
		});
		// 取消按钮
		$("#cancelBtn,#abolishBtn").click(function(){
			self.resetModalValue();
		});
		
		
		
		// 保存按钮
		$("#saveBtn").click(function(){
			// 获取模态框中的数据
			// 大区id
			var bigAreaId = $("#bigRegion_add").find('option:selected').val();
			// 学校id
			var schoolId = $("#school_add").find('option:selected').val();
			// 专业id
			var subjectId = $("#subject_add").find('option:selected').val();
			// 讲师名称
			var teacherName = $("#teacher_add").val();
			// 班级名称
			var className = $("#class_add").val();
			// 分数
			var score = $("#score_add").val();
			// 等级
			var level = $("#level_add").find('option:selected').val();
			// 人次
			var personCount = $("#personCount_add").val();
			// 审阅状态
			var shenyueStatus = $("#shenyueStatus_add").find('option:selected').val();
			// 双师名称
			var secondTeacher = $("#secondTeacher_add").val();
			// 项目提交日期
			var commitDate = $("#commitDate_add").val();
			// 项目评价
			var evaluate = $("#evaluate_add").val();
			// 原因
			var reason = $("#reason_add").val();
			// 字段校验
			if(!bigAreaId){
				alert("大区不能为空");
				return;
			}
			if(!schoolId){
				alert("学校不能为空");
				return;
			}
			if(!subjectId){
				alert("专业不能为空");
				return;
			}
			if(!teacherName){
				alert("讲师不能为空");
				return;
			}
			if(!className){
				alert("班级不能为空");
				return;
			}
			if(!shenyueStatus){
				alert("请选择审阅状态");
				return;
			}
			if(!commitDate){
				alert("提交日期不能为空");
				return;
			}
			
			var obj = {
				regionid: bigAreaId, // 大区id
				schoolid: schoolId, // 校区id
				majorid: subjectId, // 专业id
				teachername: teacherName, // 讲师名称
				onlineteachername: secondTeacher, // 在线老师
				classname: className, // 班级名称
				score: score, // 分数
				rank: level,
				reason: reason,
				evaluate: evaluate,
				stage: "第一阶段",
				worknum: personCount,
				state: shenyueStatus,
				submittime: commitDate // 提交日期
			};
			
			// ajax提交数据
			// 组装FormData对象
			var form = document.getElementById("bannerform");
			var formData = new FormData(form);
			Object.keys(obj).map(function(key) {
				formData.append(key, obj[key]);
			});
			
			var xhr = new XMLHttpRequest();
			xhr.open("POST", CommonUtils.saveDataUrl(), true);
			
			 //注册相关事件回调处理函数
			xhr.onload = function(e) { 
			    if(this.status == 200||this.status == 304){
			        var res = window.JSON.parse(this.responseText);
			        alert(res.msg);
			        self.resetModalValue();
			    }
			};
			
			//发送数据
			xhr.send(formData);
		});
					
		//编辑提交
		$("#referBtn").click(function(){
			
			// 获取模态框中的数据
			
			//数据id
			var id = $("#none").text();
			// 大区id
			//var bigAreaId = $("#bigRegionEdit").find('option:selected').val();
			// 学校id
			//var schoolId = $("#schoolEdit").find('option:selected').val();
			// 专业id
			//var subjectId = $("#profEdit").find('option:selected').val();
			// 讲师名称
			var teacherName = $("#teacherEdit").val();
			// 班级名称
			var className = $("#classEdit").val();
			// 分数
			var score = $("#scoreEdit").val();
			// 等级
			var level = $("#levelEdit").find('option:selected').val();
			// 人次
			var personCount = $("#personCountEdit").val();
			// 审阅状态
			var shenyueStatus = $("#shenyueStatusEdit").find('option:selected').val();
			// 双师名称
			var secondTeacher = $("#secondTeacherEdit").val();
			// 项目提交日期
			var commitDate = $("#commitDateEdit").val();
			// 项目评价
			var evaluate = $("#evaluateEdit").val();
			// 原因
			var reason = $("#reasonEdit").val();
			// 字段校验
//			if(!bigAreaId){
//				alert("大区不能为空");
//				return;
//			}
//			if(!schoolId){
//				alert("学校不能为空");
//				return;
//			}
//			if(!subjectId){
//				alert("专业不能为空");
//				return;
//			}
			if(!teacherName){
				alert("讲师不能为空");
				return;
			}
			if(!className){
				alert("班级不能为空");
				return;
			}
			if(!shenyueStatus){
				alert("请选择审阅状态");
				return;
			}
			if(!commitDate){
				alert("提交日期不能为空");
				return;
			}
			
			var obj = {
				id : id,
				/*regionid: bigAreaId, // 大区id
				schoolid: schoolId, // 校区id
				majorid: subjectId, // 专业id*/
				teachername: teacherName, // 讲师名称
				onlineteachername: secondTeacher, // 在线老师
				classname: className, // 班级名称
				score: score, // 分数
				rank: level,
				reason: reason,
				evaluate: evaluate,
				stage: "第一阶段",
				worknum: personCount,
				state: shenyueStatus,
				submittime: commitDate // 提交日期
			};
			
						// ajax提交数据
			// 组装FormData对象
			var form = document.getElementById("bannerformEdit");
			var formData = new FormData(form);
			Object.keys(obj).map(function(key) {
				formData.append(key, obj[key]);
			});
			
			var xhr = new XMLHttpRequest();
			xhr.open("POST", CommonUtils.saveDataUrl(), true);
			
			 //注册相关事件回调处理函数
			xhr.onload = function(e) { 
			    if(this.status == 200||this.status == 304){
			        var res = window.JSON.parse(this.responseText);
			        alert(res.msg);
			        self.resetModalValue();
			        $('#tb_departments').bootstrapTable("refresh");
			    }
			};
			
			//发送数据
			xhr.send(formData);
			
		})
	},
	
	resetModalValue: function(){
		//模态框的隐藏
		$('#myModal,#myEditModal').modal('hide');
		// 置空所有字段
		$("#bigRegion_add,#bigRegionEdit").val("");
		$("#school_add,#schoolEdit").val("");
		$("#subject_add,#profEdit").val("");
		$("#teacher_add,#teacherEdit").val("");
		$("#class_add,#classEdit").val("");
		$("#score_add,#scoreEdit").val("");
		$("#personCount_add,#personCountEdit").val("");
		$("#secondTeacher_add,#secondTeacherEdit").val("");
		$("#commitDate_add,#commitDateEdit").val("");
		$("#evaluate_add,#evaluateEdit").val("");
		$("#reason_add,#reasonEdit").val("");
		$("#file_add,#fileEdit").val("");
	},
	initTable: function(){
		// 初始化table
		$('#tb_departments').bootstrapTable({
			dataType : "json",
			url: CommonUtils.tableDataUrl(),
			toolbar : "#btnAdd",
			showRefresh : false, //刷新按钮
			showToggle : false, // 切换视图
			showColumns : false, //列选择按钮
			buttonsAlign : "left", //按钮对齐方式
			cache : false, // 不缓存
			height : 555, // 设置高度，会启用固定表头的特性
			striped : true, // 隔行加亮
			//是否显示分页（*） 
			pagination : true,
			pageList : [ 10, 25, 50, 100, 'All' ],
			//分页方式：client客户端分页，server服务端分页（*）
			sidePagination : "server",
			//是否显示搜索
			search : false,
			searchAlign : "right",
			idField: 'APPNO',//key值栏位
			detailView: true,//详情展示
			onExpandRow: function(index, row, $detail){
				 $.ajax({
                            type: 'GET',
                            cache: false,
                            url: CommonUtils.baseUrl+'/projectAudit/detail?id='+row.id,
                            data: { appNo: row['APPNO']},
                            success: function (data) {
                                $detail.html("<p><span style='margin-right:10px'>等级 : </span>"+data.rows.rank+"</p></br><p><span style='margin-right:10px'>评价 : </span>"+data.rows.evaluate+"</p></br><p><span style='margin-right:10px'>原因 : </span>"+data.rows.reason+"</p>");
                            }
                        });
				
			},
			queryParams: function(params) {
            	console.log(params);
            	// offset: 偏移量 limit: 每页的数目 order: asc desc
            	var regionid = $("#bigArea").find('option:selected').val();
            	regionid = !regionid ? null : regionid;
            	schoolId = $("#schools").find('option:selected').val();
            	var schoolId = !schoolId ? null : schoolId;
            	var professionId = $("#profession").find('option:selected').val();
            	professionId = !professionId ? null : professionId;
            	var beginDate = $("#startInput").val();
            	var endDate = $("#endInput").val();
                return {
                	type: 0,
                	regionid: regionid, // 大区id
                	schoolid: schoolId, // 学校id
                	majorid: professionId, // 专业id
                	beginDate: beginDate, //开始时间
                	endDate: endDate, // 结束时间
                 	offset: params.offset,
                  	limit: params.limit,
                  	order: "desc"
               };
            },
			columns : [ {
				field : 'id',
				width : 100,
				align : 'center',
				valign : 'middle',
				title : "id"
			}, {
				field : 'regionName',
				width : 100,
				align : 'center',
				valign : 'middle',
				title : "大区"
			}, {
				field : 'schoolName',
				width : 100,
				title : '学校',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'majorName',
				width : 100,
				title : '专业',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'teacherName',
				width : 100,
				title : '面授老师',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'onlineTeacherName',
				width : 100,
				title : '在线老师',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'className',
				width : 100,
				align : 'center',
				valign : 'middle',
				title : "班级"
			}, {
				field : 'score',
				width : 100,
				title : '分数',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'rank',
				width : 100,
				title : '等级',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'workNum',
				width : 100,
				title : '人次',
				align : 'center',
				valign : 'middle',
			}/*, {
				field : 'evaluate',
				width : 100,
				title : '评价',
				align : 'center',
				valign : 'middle',
			}, {
				field : 'reason',
				width : 100,
				title : '原因',
				align : 'center',
				valign : 'middle',
			}*/, {
				field : 'submitTime',
				width : 100,
				title : '提交日期',
				align : 'center',
				valign : 'middle',
				formatter: function(value, row, e){
					return CommonUtils.timetrans(value);
				}
			}, {
				field : 'attachment',
				width : 100,
				title : '附件',
				align : 'center',
				valign : 'middle',
				formatter: function(value, row, e){
					if(!value){
						return "无";
					}else{
						var downloadUrl = CommonUtils.baseUrl+"/upload/"+value;
						return "<a href="+downloadUrl+">下载</a>";
					}
				}
			}, {
				field : 'state',
				width : 100,
				title : '状态',
				align : 'center',
				valign : 'middle',
				formatter : function(value, row, index) {
						if(value === "已阅"){
							return "<span class='label label-default'>"+value+"</span>";
						}else{
							return "<span class='label label-danger'>"+value+"</span>";
						}
					}
			}, {
				field : 'operate',
				width : 100,
				title : '操作',
				align : 'center',
				valign : 'middle',
				formatter : function(value, row, e){
					return [
						'<button style="margin-right:10px;" id="edit" class="btn btn-success btn-xs" type="button">编辑</button>',
						'<button id="remove" class="btn btn-danger btn-xs" type="button">删除</button>'
					].join('');
				},
				events : {
					"click #remove": function(e, value, row){
						if(confirm("确定删除这条数据吗?")){
							Ajax.deleteData(CommonUtils.deleteDataUrl(), row.id, function(res){
								alert(res.msg);
								$('#tb_departments').bootstrapTable("refresh");
							});
						}
					},
					//编辑事件
					"click #edit": function(e, value, row){
						
						$("#myEditModal").find('option:selected').val();
						
						//模态框的显示
						$('#myEditModal').modal('show');
						var id = row.id;
						$("#none").html(id);
						var regionName = '<option text="' + row.regionName + '"value="' + row.id + '">' + row.regionName + '</option>';
						var schoolName = '<option text="' + row.schoolName + '"value="' + row.id + '">' + row.schoolName + '</option>';
						var majorName = '<option text="' + row.majorName + '"value="' + row.id + '">' + row.majorName + '</option>';
						
						//大区
						$("#bigRegionEdit").html(regionName);
						//学校
						$("#schoolEdit").html(schoolName);
						//专业
						$("#profEdit").html(majorName);
						//讲师
						$("#teacherEdit").val(row.teacherName);
						//班级
						$("#classEdit").val(row.className);
						//分数
						$("#scoreEdit").val(row.score);
						//人次
						$("#personCountEdit").val(row.workNum);
						//在线老师
						$("#secondTeacherEdit").val(row.onlineTeacherName);
						//审阅状态
						$("#shenyueStatusEdit").val(row.state);
						//评价
						$("#evaluateEdit").val(row.evaluate);
						//原因
						$("#reasonEdit").val(row.reason);
						//提交转化后的时间
						$("#commitDateEdit").val(CommonUtils.timetrans(row.submitTime));
					}
					
				}
			} ]
		});
	}
	
	

}

