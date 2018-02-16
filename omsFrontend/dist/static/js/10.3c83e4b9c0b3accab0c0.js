webpackJsonp([10,59,60],{"3oPl":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("vMJZ"),s=a("EMlb"),l={props:["ruleForm"],data:function(){return{rules:{name:[{required:!0,message:"请输入一个正确的内容",trigger:"blur"}]},projects:[],nices:[{label:"低",value:"0"},{label:"中",value:"1"},{label:"高",value:"2"}],tests:[],users:[]}},created:function(){this.getUsers(),this.getProjects(),this.getTests()},methods:{submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;e.$emit("formdata",e.ruleForm)})},resetForm:function(t){this.$refs[t].resetFields()},getUsers:function(){var t=this,e={groups__name:"ITDept"};Object(r.f)(e).then(function(e){t.users=e.data})},getProjects:function(){var t=this;Object(s.f)().then(function(e){t.projects=e.data})},getTests:function(){var t=this;Object(s.i)().then(function(e){t.tests=e.data})}}},o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"关联任务",prop:"project"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择关联任务"},model:{value:t.ruleForm.project,callback:function(e){t.$set(t.ruleForm,"project",e)},expression:"ruleForm.project"}},t._l(t.projects,function(t){return a("el-option",{key:t.id,attrs:{value:t.pid}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"关联test",prop:"test"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择关联test"},model:{value:t.ruleForm.test,callback:function(e){t.$set(t.ruleForm,"test",e)},expression:"ruleForm.test"}},t._l(t.tests,function(t){return a("el-option",{key:t.id,attrs:{value:t.id}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{model:{value:t.ruleForm.name,callback:function(e){t.$set(t.ruleForm,"name",e)},expression:"ruleForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"严重程度",prop:"degree"}},[a("el-rate",{attrs:{colors:["#99A9BF","#F7BA2A","#ff1425"],"show-text":"",texts:["E","D","C","B","A"]},model:{value:t.ruleForm.degree,callback:function(e){t.$set(t.ruleForm,"degree",e)},expression:"ruleForm.degree"}}),t._v(" "),a("a",{staticClass:"tips"},[t._v("Tip：星星代表问题严重程度，星星越多，越严重")])],1),t._v(" "),a("el-form-item",{attrs:{label:"优先级",prop:"nice"}},[a("el-select",{attrs:{placeholder:"请选择优先级"},model:{value:t.ruleForm.nice,callback:function(e){t.$set(t.ruleForm,"nice",e)},expression:"ruleForm.nice"}},t._l(t.nices,function(t){return a("el-option",{key:t.id,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"测试人员",prop:"test_user"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择用户"},model:{value:t.ruleForm.test_user,callback:function(e){t.$set(t.ruleForm,"test_user",e)},expression:"ruleForm.test_user"}},t._l(t.users,function(t){return a("el-option",{key:t.id,attrs:{value:t.username}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"分配给",prop:"action_user"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择用户"},model:{value:t.ruleForm.action_user,callback:function(e){t.$set(t.ruleForm,"action_user",e)},expression:"ruleForm.action_user"}},t._l(t.users,function(t){return a("el-option",{key:t.id,attrs:{value:t.username}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"测试时间",prop:"test_time"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期时间"},model:{value:t.ruleForm.test_time,callback:function(e){t.$set(t.ruleForm,"test_time",e)},expression:"ruleForm.test_time"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"关闭时间",prop:"end_time"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期时间"},model:{value:t.ruleForm.end_time,callback:function(e){t.$set(t.ruleForm,"end_time",e)},expression:"ruleForm.end_time"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"描述",prop:"desc"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:5,maxRows:10}},model:{value:t.ruleForm.desc,callback:function(e){t.$set(t.ruleForm,"desc",e)},expression:"ruleForm.desc"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("立即更新")])],1)],1)},n=[],i={render:o,staticRenderFns:n},u=i,c=a("VU/8"),d=c(l,u,!1,null,null,null);e.default=d.exports},Yktn:function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,"",""])},aFkl:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={components:{},props:["Status","statusdata"],data:function(){return{}},created:function(){},methods:{submitForm:function(t){this.$emit("formdata",this.statusdata)}}},s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",[a("el-form-item",{attrs:{model:t.statusdata,label:"当前状态"}},[a("span",[t._v(t._s(t.Status[t.statusdata.status]))])]),t._v(" "),a("el-form-item",{attrs:{model:t.statusdata,label:"状态修改"}},[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:t.statusdata.status,callback:function(e){t.$set(t.statusdata,"status",e)},expression:"statusdata.status"}},t._l(t.Status,function(t,e){return a("el-option",{key:t.id,attrs:{label:t,value:e}})}))],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-check"},on:{click:t.submitForm}},[t._v("提交")])],1)],1)},l=[],o={render:s,staticRenderFns:l},n=o,i=a("VU/8"),u=i(r,n,!1,null,null,null);e.default=u.exports},hcoO:function(t,e,a){var r=a("Yktn");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("2e70b98e",r,!0)},uR2v:function(t,e,a){"use strict";function r(t){a("hcoO")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("EMlb"),l=a("QmSG"),o=a("TDrc"),n=a("3oPl"),i=a("28C8"),u=a("aFkl"),c={components:{addGroup:o.default,editGroup:n.default,getProject:s.f,showProject:i.default,chStatus:u.default},data:function(){return{tableData:[],tabletotal:0,searchdata:"",currentPage:1,limit:l.LIMIT,offset:"",pagesize:l.pagesize,pageformat:l.pageformat,addForm:!1,editForm:!1,rowdata:{},Bug_Nice:{0:"低",1:"中",2:"高"},Bug_Status:{0:"新建",1:"打开",2:"关闭",3:"已修复",4:"暂不处理",5:"重新打开"},showprojectForm:!1,changestatusForm:!1,project:"",bugdata:{id:"",status:""}}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this,e={limit:this.limit,offset:this.offset,name__contains:this.searchdata};Object(s.e)(e).then(function(e){t.tableData=e.data.results,t.tabletotal=e.data.count})},getDialogStatus:function(t){this.addForm=t,setTimeout(this.fetchData,1e3)},editGroupSubmit:function(t){var e=this;Object(s.q)(this.rowdata.id,t).then(function(t){e.$message({message:"恭喜你，更新成功",type:"success"}),e.fetchData(),e.editForm=!1}).catch(function(t){e.$message.error("更新失败"),console.log(t)})},deleteGroup:function(t){var e=this;Object(s.a)(t).then(function(t){e.$message({message:"恭喜你，删除成功",type:"success"}),e.fetchData()}).catch(function(t){e.$message.error("删除失败"),console.log(t)})},closeEditForm:function(){this.fetchData()},handleEdit:function(t){this.editForm=!0,this.rowdata=t},searchClick:function(){this.fetchData()},handleSizeChange:function(t){this.limit=t,this.fetchData()},handleCurrentChange:function(t){this.offset=(t-1)*l.LIMIT,this.fetchData()},showProject:function(t){var e=this;this.showprojectForm=!0;var a={pid:t};Object(s.f)(a).then(function(t){e.project=t.data[0]})},changeStatus:function(t){this.bugdata.id=t.id,this.bugdata.status=t.status,this.changestatusForm=!0},UpdateStatus:function(t){var e=this;Object(s.j)(this.bugdata.id,t).then(function(){e.changestatusForm=!1,e.fetchData()})}}},d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"components-container",staticStyle:{height:"100vh"}},[a("el-card",[a("div",{staticClass:"head-lavel"},[a("div",{staticClass:"table-button"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(e){t.addForm=!0}}},[t._v("新建")])],1),t._v(" "),a("div",{staticClass:"table-search"},[a("el-input",{attrs:{placeholder:"搜索 ..."},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.searchClick(e)}},model:{value:t.searchdata,callback:function(e){t.searchdata=e},expression:"searchdata"}},[a("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},on:{click:t.searchClick},slot:"suffix"})])],1)]),t._v(" "),a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"测试人员",prop:"test_user"}},[a("span",[t._v(t._s(e.row.test_user))])]),t._v(" "),a("el-form-item",{attrs:{label:"分配给",prop:"action_user"}},[a("span",[t._v(t._s(e.row.action_user))])]),t._v(" "),a("el-form-item",{attrs:{label:"测试时间",prop:"test_time"}},[a("span",[t._v(t._s(e.row.test_time))])]),t._v(" "),a("el-form-item",{attrs:{label:"关闭时间",prop:"end_time"}},[a("span",[t._v(t._s(e.row.end_time))])]),t._v(" "),a("el-form-item",{attrs:{label:"描述",prop:"desc"}},[a("span",[t._v(t._s(e.row.desc))])])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"id",label:"编号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"degree",label:"严重程度"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"name-wrapper",staticStyle:{"text-align":"center",color:"rgb(0,0,0)"},attrs:{slot:"reference"},slot:"reference"},[a("el-rate",{attrs:{colors:["#99A9BF","#F7BA2A","#ff1425"],disabled:""},model:{value:e.row.degree,callback:function(a){t.$set(e.row,"degree",a)},expression:"scope.row.degree"}})],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"nice",label:"优先级"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"mini"}},[t._v(t._s(t.Bug_Nice[e.row.nice]))])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{attrs:{slot:"reference"},slot:"reference"},[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.changeStatus(e.row)}}},[t._v(t._s(t.Bug_Status[e.row.status]))])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"project",label:"关联任务"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{attrs:{slot:"reference"},slot:"reference"},[a("el-button",{attrs:{type:"text"},on:{click:function(a){t.showProject(e.row.project)}}},[t._v(t._s(e.row.project))])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"test",label:"关联test"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",size:"small"},on:{click:function(a){t.handleEdit(e.row)}}},[t._v("修改")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){t.deleteGroup(e.row.id)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),a("div",{staticClass:"table-pagination"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":t.pagesize,"page-size":t.limit,layout:t.pageformat,total:t.tabletotal},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}})],1)]),t._v(" "),a("el-dialog",{attrs:{visible:t.addForm},on:{"update:visible":function(e){t.addForm=e}}},[a("add-group",{on:{DialogStatus:t.getDialogStatus}})],1),t._v(" "),a("el-dialog",{attrs:{visible:t.editForm},on:{"update:visible":function(e){t.editForm=e},close:t.closeEditForm}},[a("edit-group",{attrs:{ruleForm:t.rowdata},on:{formdata:t.editGroupSubmit}})],1),t._v(" "),a("el-dialog",{attrs:{visible:t.showprojectForm},on:{"update:visible":function(e){t.showprojectForm=e}}},[a("show-project",{attrs:{ruleForm:t.project}})],1),t._v(" "),a("el-dialog",{attrs:{visible:t.changestatusForm},on:{"update:visible":function(e){t.changestatusForm=e}}},[a("ch-status",{attrs:{Status:t.Bug_Status,statusdata:t.bugdata},on:{formdata:t.UpdateStatus}})],1)],1)},m=[],f={render:d,staticRenderFns:m},p=f,h=a("VU/8"),b=r,v=h(c,p,!1,b,null,null);e.default=v.exports}});