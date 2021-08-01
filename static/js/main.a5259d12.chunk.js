(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{66:function(e,t,n){e.exports=n(79)},71:function(e,t,n){},72:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(8),c=n.n(r);n(71),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(72);var o=n(32),l=n(123),s=n(112),u=n(113),d=function(e){var t=Object(a.useState)(""),n=Object(o.a)(t,2),r=n[0],c=n[1],d=Object(a.useState)(!1),m=Object(o.a)(d,2),f=m[0],O=m[1],b=function(){var t=r.trim();t?(e.callBack(t),c("")):O(!0)},T=function(){O(!1)};return i.a.createElement("div",null,i.a.createElement(l.a,{size:"small",onBlur:T,variant:"outlined",value:r,onChange:function(e){O(!1),c(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&(O(!1),b())},label:"Title",error:f,helperText:f&&"Title is reqired"}),i.a.createElement(s.a,{onBlur:T,color:"primary",onClick:b},i.a.createElement(u.a,null)))},m=function(e){var t=Object(a.useState)(!1),n=Object(o.a)(t,2),r=n[0],c=n[1],s=Object(a.useState)(e.title),u=Object(o.a)(s,2),d=u[0],m=u[1];return r?i.a.createElement(l.a,{autoFocus:!0,onBlur:function(){e.ChangeTitle(d),c(!1)},value:d,onChange:function(e){m(e.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&(e.ChangeTitle(d),c(!1))}}):i.a.createElement("span",{onDoubleClick:function(){return c(!0)}},e.title)},f=n(111),O=n(115),b=n(124),T=n(116),E=n(114);function v(e){return i.a.createElement("div",{className:"todoListContainer"},i.a.createElement("h3",null,i.a.createElement(m,{ChangeTitle:function(t){e.ChangeTodolistTitle(t,e.id)},title:e.title}),i.a.createElement(s.a,{onClick:function(){e.removeTodoList(e.id)}},i.a.createElement(E.a,{style:{fontSize:25,margin:10}}))),i.a.createElement(d,{callBack:function(t){return e.addTask(t,e.id)}}),i.a.createElement(f.a,null,e.tasks.map((function(t){return i.a.createElement(O.a,{key:t.id},i.a.createElement("span",{className:t.isDone?"isActive":""},i.a.createElement(b.a,{size:"small",color:"primary",onChange:function(n){e.ChangeStatusTask(t.id,n.currentTarget.checked,e.id)},checked:t.isDone}),i.a.createElement(m,{ChangeTitle:function(n){e.ChangeTaskTitle(t.id,n,e.id)},title:t.title})),i.a.createElement(s.a,{color:"secondary",onClick:function(){e.removeTasks(t.id,e.id)}},i.a.createElement(E.a,{style:{fontSize:20,margin:10}})))}))),i.a.createElement("div",null,i.a.createElement(T.a,{variant:"ALL"===e.filter?"contained":"outlined",size:"small",color:"primary",onClick:function(){e.changeFilter(e.id,"ALL")}},"ALL"),i.a.createElement(T.a,{size:"small",color:"primary",variant:"Active"===e.filter?"contained":"outlined",onClick:function(){e.changeFilter(e.id,"Active")}},"Active"),i.a.createElement(T.a,{size:"small",color:"primary",variant:"Completed"===e.filter?"contained":"outlined",onClick:function(){e.changeFilter(e.id,"Completed")}},"Completed")))}var j,D=n(117),h=n(80),k=n(118),p=n(119),g=n(121),C=n(122),A=n(120),S=n(11),I=n(25),L=n(13),y=Object(L.v1)(),w=Object(L.v1)(),B=[{id:y,title:"What to learn?",filter:"ALL"},{id:w,title:"What to buy?",filter:"ALL"}],N=n(17),K=(j={},Object(N.a)(j,y,[{id:Object(L.v1)(),title:"HTML&CSS",isDone:!0},{id:Object(L.v1)(),title:"JS",isDone:!0},{id:Object(L.v1)(),title:"ReactJS",isDone:!1},{id:Object(L.v1)(),title:"CSS",isDone:!0},{id:Object(L.v1)(),title:"Redux",isDone:!1}]),Object(N.a)(j,w,[{id:Object(L.v1)(),title:"Water",isDone:!0},{id:Object(L.v1)(),title:"Bread",isDone:!0},{id:Object(L.v1)(),title:"Beer",isDone:!1},{id:Object(L.v1)(),title:"Milk",isDone:!0},{id:Object(L.v1)(),title:"Book",isDone:!1}]),j),x=n(31);function H(){var e=Object(x.b)(),t=Object(x.c)((function(e){return e.todoLists})),n=Object(x.c)((function(e){return e.tasks})),a=function(t){e({type:"REMOVE-TODOLIST",id:t})},r=function(t,n){e(function(e,t){return{type:"ADD-TASK",taskTitle:e,todolistID:t}}(t,n))},c=function(t,n){e({type:"REMOVE-TASK",taskID:t,todolistID:n})},o=function(t,n){e(function(e,t){return{type:"CHANGE-FILTER",id:e,filterValue:t}}(t,n))},l=function(t,n,a){e(function(e,t,n){return{type:"CHANGE-TASK-STATUS",taskID:e,isDone:t,todolistID:n}}(t,n,a))},u=function(t,n,a){e(function(e,t,n){return{type:"CHANGE-TASK-TITLE",taskID:e,title:t,todolistID:n}}(t,n,a))},m=function(t,n){e({type:"CHANGE-TODOLIST-TITLE",id:t,title:n})},f=t.map((function(e){var t=n[e.id];return"Active"===e.filter&&(t=t.filter((function(e){return!e.isDone}))),"Completed"===e.filter&&(t=t.filter((function(e){return e.isDone}))),i.a.createElement(D.a,{item:!0,key:e.id},i.a.createElement(h.a,{elevation:3,style:{margin:"15px",padding:"10px",boxSizing:"border-box"}},i.a.createElement(v,{id:e.id,title:e.title,tasks:t,addTask:r,removeTasks:c,changeFilter:o,ChangeStatusTask:l,filter:e.filter,removeTodoList:a,ChangeTaskTitle:u,ChangeTodolistTitle:m})))}));return i.a.createElement("div",{className:"App"},i.a.createElement(k.a,{style:{marginBottom:"10px"},position:"static"},i.a.createElement(p.a,{style:{justifyContent:"space-between"}},i.a.createElement(s.a,{"aria-label":"menu",color:"inherit",edge:"start"},i.a.createElement(A.a,null)),i.a.createElement(g.a,{variant:"h6"},"Todolists"),i.a.createElement(T.a,{color:"inherit"},"Login"))),i.a.createElement(C.a,{fixed:!0},i.a.createElement(D.a,{container:!0},i.a.createElement(d,{callBack:function(t){var n=function(e){return{type:"ADD-TODOLIST",id:Object(L.v1)(),title:e}}(t);e(n)}})),i.a.createElement(D.a,{container:!0,spacing:5},f)))}var R=n(45),z=Object(R.a)({todoLists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"CHANGE-FILTER":var n=e.find((function(e){return e.id===t.id}));return n?(n.filter=t.filterValue,Object(I.a)(e)):e;case"ADD-TODOLIST":var a={id:t.id,title:t.title,filter:"ALL"};return[].concat(Object(I.a)(e),[a]);case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.id?Object(S.a)(Object(S.a)({},e),{},{title:t.title}):e}));default:return e}},tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":var n=Object(S.a)({},e);return n[t.todolistID]=n[t.todolistID].filter((function(e){return e.id!==t.taskID})),n;case"ADD-TASK":var a={id:Object(L.v1)(),title:t.taskTitle,isDone:!1};return Object(S.a)(Object(S.a)({},e),{},Object(N.a)({},t.todolistID,[a].concat(Object(I.a)(e[t.todolistID]))));case"CHANGE-TASK-STATUS":return Object(S.a)(Object(S.a)({},e),{},Object(N.a)({},t.todolistID,Object(I.a)(e[t.todolistID].map((function(e){return e.id===t.taskID?Object(S.a)(Object(S.a)({},e),{},{isDone:t.isDone}):e})))));case"CHANGE-TASK-TITLE":return Object(S.a)(Object(S.a)({},e),{},Object(N.a)({},t.todolistID,Object(I.a)(e[t.todolistID].map((function(e){return e.id===t.taskID?Object(S.a)(Object(S.a)({},e),{},{title:t.title}):e})))));case"ADD-TODOLIST":return Object(S.a)(Object(S.a)({},e),{},Object(N.a)({},t.id,[]));case"REMOVE-TODOLIST":var i=Object(S.a)({},e);return delete i[t.id],i;default:return e}}}),G=Object(R.b)(z);window.store=G,c.a.render(i.a.createElement(x.a,{store:G},i.a.createElement(H,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[66,1,2]]]);
//# sourceMappingURL=main.a5259d12.chunk.js.map