(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{71:function(e,t,a){e.exports=a(84)},76:function(e,t,a){},77:function(e,t,a){},84:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(8),l=a.n(c);a(76),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(77);var r=a(34),o=a(125),s=a(114),u=a(115),d=i.a.memo((function(e){console.log("add form");var t=Object(n.useState)(""),a=Object(r.a)(t,2),c=a[0],l=a[1],d=Object(n.useState)(!1),m=Object(r.a)(d,2),b=m[0],T=m[1],f=function(){var t=c.trim();t?(e.callBack(t),l("")):T(!0)},k=function(){T(!1)};return i.a.createElement("div",null,i.a.createElement(o.a,{size:"small",onBlur:k,variant:"outlined",value:c,onChange:function(e){T(!1),l(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&(T(!1),f())},label:"Title",error:b,helperText:b&&"Title is reqired"}),i.a.createElement(s.a,{style:{margin:"1"},size:"medium",onBlur:k,color:"primary",onClick:f},i.a.createElement(u.a,{fontSize:"medium"})))})),m=i.a.memo((function(e){console.log("Editaple span");var t=Object(n.useState)(!1),a=Object(r.a)(t,2),c=a[0],l=a[1],s=Object(n.useState)(e.title),u=Object(r.a)(s,2),d=u[0],m=u[1];return c?i.a.createElement(o.a,{autoFocus:!0,onBlur:function(){e.ChangeTitle(d),l(!1)},value:d,onChange:function(e){m(e.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&(e.ChangeTitle(d),l(!1))}}):i.a.createElement("span",{onDoubleClick:function(){return l(!0)}},e.title)})),b=a(113),T=a(127),f=a(117),k=a(118),O=a(128),E=a(116),j=i.a.memo((function(e){console.log("todolist");var t=Object(n.useCallback)((function(t){e.ChangeTodolistTitle(e.id,t)}),[e.ChangeTodolistTitle,e.id]),a=Object(n.useCallback)((function(){e.changeFilter(e.id,"ALL")}),[e.changeFilter,e.id]),c=Object(n.useCallback)((function(){e.changeFilter(e.id,"Active")}),[e.changeFilter,e.id]),l=Object(n.useCallback)((function(){e.changeFilter(e.id,"Completed")}),[e.changeFilter,e.id]),r=Object(n.useCallback)((function(){e.removeTodoList(e.id)}),[e.removeTodoList,e.id]),o=Object(n.useCallback)((function(t){e.addTask(t,e.id)}),[e.addTask,e.id]),u=e.tasks[e.id];return"Active"===e.filter&&(u=u.filter((function(e){return!e.isDone}))),"Completed"===e.filter&&(u=u.filter((function(e){return e.isDone}))),i.a.createElement("div",{className:"todoListContainer"},i.a.createElement("h3",{style:{display:"flex",alignItems:"center",justifyContent:"center"}},i.a.createElement(m,{ChangeTitle:t,title:e.title}),i.a.createElement(s.a,{size:"small",onClick:r},i.a.createElement(E.a,{style:{fontSize:25,margin:10}}))),i.a.createElement(d,{callBack:o}),i.a.createElement(b.a,{dense:!0},u.map((function(t){return i.a.createElement(C,{key:t.id,ChangeTaskTitle:e.ChangeTaskTitle,ChangeStatusTask:e.ChangeStatusTask,removeTasks:e.removeTasks,id:e.id,task:t,addTask:e.addTask})}))),i.a.createElement(T.a,{style:{display:"flex",justifyContent:"space-between"}},i.a.createElement(f.a,{variant:"ALL"===e.filter?"contained":"outlined",size:"small",color:"primary",onClick:a},"ALL"),i.a.createElement(f.a,{size:"small",color:"primary",variant:"Active"===e.filter?"contained":"outlined",onClick:c},"Active"),i.a.createElement(f.a,{size:"small",color:"primary",variant:"Completed"===e.filter?"contained":"outlined",onClick:l},"Completed")))})),C=i.a.memo((function(e){var t=Object(n.useCallback)((function(){e.removeTasks(e.task.id,e.id)}),[e.removeTasks]),a=Object(n.useCallback)((function(t){e.ChangeStatusTask(e.task.id,t.currentTarget.checked,e.id)}),[e.ChangeStatusTask]),c=Object(n.useCallback)((function(t){e.ChangeTaskTitle(e.task.id,t,e.id)}),[e.ChangeTaskTitle]);return i.a.createElement(k.a,{divider:!0,style:{justifyContent:"space-between"},alignItems:"center",key:e.task.id},i.a.createElement("span",{className:e.task.isDone?"isActive":""},i.a.createElement(O.a,{size:"small",color:"primary",onChange:a,checked:e.task.isDone}),i.a.createElement(m,{ChangeTitle:c,title:e.task.title})),i.a.createElement(s.a,{color:"secondary",onClick:t},i.a.createElement(E.a,{style:{fontSize:20,margin:10}})))})),g=a(119),v=a(86),p=a(120),h=a(121),D=a(123),y=a(124),I=a(122),A=a(12),S=a(26),L=a(44),w=[],z=a(25),N={},x=a(33);function F(){console.log("app");var e=Object(x.b)(),t=Object(x.c)((function(e){return e.todoLists})),a=Object(x.c)((function(e){return e.tasks})),c=Object(n.useCallback)((function(t){e({type:"REMOVE-TODOLIST",id:t})}),[e]),l=Object(n.useCallback)((function(t,a){e({type:"REMOVE-TASK",taskID:t,todolistID:a})}),[e]),r=Object(n.useCallback)((function(t,a){e(function(e,t){return{type:"CHANGE-FILTER",id:e,filterValue:t}}(t,a))}),[e]),o=Object(n.useCallback)((function(t,a,n){e(function(e,t,a){return{type:"CHANGE-TASK-STATUS",taskID:e,isDone:t,todolistID:a}}(t,a,n))}),[e]),u=Object(n.useCallback)((function(t,a,n){e(function(e,t,a){return{type:"CHANGE-TASK-TITLE",taskID:e,title:t,todolistID:a}}(t,a,n))}),[e]),m=Object(n.useCallback)((function(t,a){e({type:"CHANGE-TODOLIST-TITLE",id:t,title:a})}),[e]),b=Object(n.useCallback)((function(t,a){e(function(e,t){return{type:"ADD-TASK",taskTitle:e,todolistID:t}}(t,a))}),[e]),T=Object(n.useCallback)((function(t){var a=function(e){return{type:"ADD-TODOLIST",id:Object(L.v1)(),title:e}}(t);e(a)}),[e]),k=t.map((function(e){return i.a.createElement(g.a,{item:!0,key:e.id},i.a.createElement(v.a,{elevation:3,style:{paddingTop:"0",margin:"15px",padding:"10px",boxSizing:"border-box"}},i.a.createElement(j,{id:e.id,title:e.title,tasks:a,addTask:b,removeTasks:l,changeFilter:r,ChangeStatusTask:o,filter:e.filter,removeTodoList:c,ChangeTaskTitle:u,ChangeTodolistTitle:m})))}));return i.a.createElement("div",{className:"App"},i.a.createElement(p.a,{style:{marginBottom:"10px"},position:"static"},i.a.createElement(h.a,{style:{justifyContent:"space-between"}},i.a.createElement(s.a,{"aria-label":"menu",color:"inherit",edge:"start"},i.a.createElement(I.a,null)),i.a.createElement(D.a,{variant:"h6"},"Todolists"),i.a.createElement(f.a,{color:"inherit"},"Login"))),i.a.createElement(y.a,{maxWidth:"lg"},i.a.createElement(g.a,{container:!0},i.a.createElement(d,{callBack:T})),i.a.createElement(g.a,{container:!0,spacing:5},k)))}var K=a(47),B=Object(K.a)({todoLists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"CHANGE-FILTER":var a=e.find((function(e){return e.id===t.id}));return a?(a.filter=t.filterValue,Object(S.a)(e)):e;case"ADD-TODOLIST":var n={id:t.id,title:t.title,filter:"ALL"};return[].concat(Object(S.a)(e),[n]);case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.id?Object(A.a)(Object(A.a)({},e),{},{title:t.title}):e}));default:return e}},tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":var a=Object(A.a)({},e);return a[t.todolistID]=a[t.todolistID].filter((function(e){return e.id!==t.taskID})),a;case"ADD-TASK":var n={id:Object(L.v1)(),title:t.taskTitle,isDone:!1};return Object(A.a)(Object(A.a)({},e),{},Object(z.a)({},t.todolistID,[n].concat(Object(S.a)(e[t.todolistID]))));case"CHANGE-TASK-STATUS":return Object(A.a)(Object(A.a)({},e),{},Object(z.a)({},t.todolistID,Object(S.a)(e[t.todolistID].map((function(e){return e.id===t.taskID?Object(A.a)(Object(A.a)({},e),{},{isDone:t.isDone}):e})))));case"CHANGE-TASK-TITLE":return Object(A.a)(Object(A.a)({},e),{},Object(z.a)({},t.todolistID,Object(S.a)(e[t.todolistID].map((function(e){return e.id===t.taskID?Object(A.a)(Object(A.a)({},e),{},{title:t.title}):e})))));case"ADD-TODOLIST":return Object(A.a)(Object(A.a)({},e),{},Object(z.a)({},t.id,[]));case"REMOVE-TODOLIST":var i=Object(A.a)({},e);return delete i[t.id],i;default:return e}}}),G=Object(K.b)(B);window.store=G,l.a.render(i.a.createElement(x.a,{store:G},i.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[71,1,2]]]);
//# sourceMappingURL=main.8d0fe90e.chunk.js.map