"use strict";(self.webpackChunkeqnaa3=self.webpackChunkeqnaa3||[]).push([[745],{4745:(y,u,n)=>{n.r(u),n.d(u,{UsersModule:()=>_});var d=n(9745),h=n(6638),c=n(5415),g=n(5905),U=n(7579),m=n(2340),e=n(5e3),p=n(6405),b=n(2290),Z=n(9808),C=n(8984),f=n(2382);const M=["deleteUserModal"];function v(i,l){if(1&i){const t=e.EpF();e.TgZ(0,"tr",23)(1,"th",24),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td")(10,"ui-switch",25),e.NdJ("change",function(){const o=e.CHM(t).$implicit;return e.oxw().changeUserStatus(o)})("ngModelChange",function(r){return e.CHM(t).$implicit.status=r}),e.qZA()(),e.TgZ(11,"td",7)(12,"div",26)(13,"button",27),e.NdJ("click",function(){const o=e.CHM(t).$implicit;return e.oxw().showUserDeleteModal(o)}),e._UZ(14,"i",28),e.qZA()()()()}if(2&i){const t=l.$implicit,s=l.index;e.xp6(2),e.Oqu(s+1),e.xp6(2),e.Oqu(t.firstName+""+t.lastName),e.xp6(2),e.Oqu(t.email),e.xp6(2),e.Oqu("admin"==t.role?"Admin":"User"),e.xp6(2),e.Q6J("ngModel",t.status)}}const x=function(){return{backdrop:"static",keyboard:!1,animated:!0}},A=[{path:"",component:(()=>{class i{constructor(t,s,r,o,a){this.globalService=t,this.usersService=s,this.spinner=r,this.toastr=o,this.alertService=a,this.title="Manage Users | Estimation Calculator",this.userInfo=new d.ar,this.userRoles=m.N.role,this.usersList=[],this.datatableElement=c.G,this.dtOptions={},this.dtTrigger=new U.x,this.newUserAlready=!1,this.deleteUserModal=g.oB,this.inValidateCheck={email:!1,emailExits:!0},this.getUsersList()}ngOnInit(){this.dtOptions={responsive:!0,scrollX:!0,scrollY:"350px",scrollCollapse:!0,columnDefs:[{targets:4,orderable:!1,searchable:!1},{targets:5,orderable:!1,searchable:!1}]},this.userRoles=Object.keys(this.userRoles),this.globalService.getPageTitle(this.title)}ngAfterViewInit(){this.dtTrigger.next("")}getUsersList(){this.usersService.getUsersList().subscribe(t=>{this.spinner.show(),200==t.status&&(this.spinner.hide(),this.datatableElement.dtInstance.then(s=>{s.destroy(),this.dtTrigger.next(""),this.usersList=t.data,this.spinner.hide()}))},t=>{this.spinner.hide(),this.toastr.error(t.message,"Error!")})}checkvalidation(t){return Object.assign({},this.userInfo)[t]?"text-primary":"text-danger"}patternMatchCheck(t,s){if(t){const r=this.globalService.patternMatchRegex(t,s);this.inValidateCheck[s]=r,this.inValidateCheck[s]&&"email"===s?(s="emailExits",this.usersService.emailAlreadyExists({email:t+=m.N.emaildomain}).subscribe(o=>{this.inValidateCheck[s]=200!==o.status},o=>{this.inValidateCheck[s]=!1})):(this.inValidateCheck[s]=r,this.inValidateCheck.emailExits=!0)}else this.inValidateCheck[s]=!0}closeModel(){this.deleteUserModal.hide()}showUserDeleteModal(t){this.userInfo=t,this.deleteUserModal.show()}deleteUser(){this.spinner.show(),this.usersService.deleteUser(this.userInfo).subscribe(t=>{200===t.status&&(this.closeModel(),this.spinner.hide(),this.getUsersList(),this.toastr.success("User deleted successfully.","Success"))},t=>{this.closeModel(),this.spinner.hide(),this.toastr.error("There are some server error. Please check connection.","Error")})}changeUserStatus(t){this.usersService.saveUserInfo({_id:t._id,status:t.status?0:1}).subscribe(r=>{if(200===r.status){r=r.data,this.spinner.hide(),this.toastr.success("User status has been changed successfully.","Success!");let o=this.usersList.findIndex(a=>a._id===r._id);o&&(this.usersList[o].status=r.status)}},r=>{this.spinner.hide(),this.toastr.error(r.message,"Error!")})}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(d.Uh),e.Y36(d.fz),e.Y36(p.t2),e.Y36(b._W),e.Y36(d.c9))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-users"]],viewQuery:function(t,s){if(1&t&&(e.Gf(c.G,5),e.Gf(M,5)),2&t){let r;e.iGM(r=e.CRH())&&(s.datatableElement=r.first),e.iGM(r=e.CRH())&&(s.deleteUserModal=r.first)}},decls:48,vars:6,consts:[[1,"d-flex","flex-row"],[1,"col-12"],[1,"opacity-50"],[1,"container-fluid","app-user","bg-white","py-3"],[1,"table-responsive-lg"],["datatable","",1,"table","table-bordered","table-hover","table-striped",3,"dtOptions","dtTrigger"],[1,"text-nowrap"],[1,"text-center"],[1,"text-wrap"],["class"," border",4,"ngFor","ngForOf"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","myModalLabel","aria-hidden","true",1,"modal","fade",3,"config"],["deleteUserModal","bs-modal"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],[1,"fa","fa-trash"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"modal-footer","border-top-0","d-flex","justify-content-start"],["type","button",1,"btn","btn-default","me-1",3,"click"],["type","button",1,"btn","btn-danger",3,"click"],[1,"border"],["scope","row"],["color","#4285F4","defaultBgColor","#d9d9d9","labelOn","Active","labelOff","Inactive",3,"ngModel","change","ngModelChange"],[1,"d-flex","justify-content-center"],["type","button",1,"btn","btn-sm","delete",3,"click"],[1,"far","fa-trash-alt"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h4",2),e._uU(3,"Angular Datatables just UI side with all data"),e.qZA(),e._UZ(4,"hr"),e.qZA()(),e.TgZ(5,"div",3)(6,"div",4)(7,"table",5)(8,"thead")(9,"tr",6)(10,"th"),e._uU(11,"S.No"),e.qZA(),e.TgZ(12,"th"),e._uU(13,"Username"),e.qZA(),e.TgZ(14,"th"),e._uU(15,"Email I'd"),e.qZA(),e.TgZ(16,"th"),e._uU(17,"Account Type"),e.qZA(),e.TgZ(18,"th"),e._uU(19,"Status"),e.qZA(),e.TgZ(20,"th",7),e._uU(21,"Actions"),e.qZA()()(),e.TgZ(22,"tbody",8),e.YNc(23,v,15,5,"tr",9),e.qZA()()()(),e.TgZ(24,"div",10,11)(26,"div",12)(27,"div",13)(28,"div",14)(29,"h4",15),e._UZ(30,"i",16),e._uU(31," Delete User"),e.qZA(),e.TgZ(32,"button",17),e.NdJ("click",function(){return s.closeModel()}),e.TgZ(33,"span",18),e._uU(34,"\xd7"),e.qZA()()(),e.TgZ(35,"div",19)(36,"h4"),e._uU(37,"Are you sure want to delete this User?"),e.qZA(),e.TgZ(38,"p")(39,"b"),e._uU(40,"User Name :"),e.qZA(),e._uU(41),e._UZ(42,"br"),e.qZA()(),e.TgZ(43,"div",20)(44,"button",21),e.NdJ("click",function(){return s.closeModel()}),e._uU(45,"Close"),e.qZA(),e.TgZ(46,"button",22),e.NdJ("click",function(){return s.deleteUser()}),e._uU(47,"Delete"),e.qZA()()()()()),2&t&&(e.xp6(7),e.Q6J("dtOptions",s.dtOptions)("dtTrigger",s.dtTrigger),e.xp6(16),e.Q6J("ngForOf",s.usersList),e.xp6(1),e.Q6J("config",e.DdM(5,x)),e.xp6(17),e.hij(" ",s.userInfo.firstName+" "+s.userInfo.lastName," "))},directives:[c.G,Z.sg,C.o,f.JJ,f.On,g.oB],styles:[""]}),i})(),pathMatch:"full"}];let T=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[h.Bz.forChild(A)],h.Bz]}),i})(),_=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[d.eY,T]]}),i})()}}]);