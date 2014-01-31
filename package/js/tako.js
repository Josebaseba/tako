/* TaKo v0.1.0 - 1/31/2014
   http://
   Copyright (c) 2014 Iñigo Gonzalez Vazquez <ingonza85@gmail.com> (@haas85) - Under MIT License */
(function(){var a,b,c=[].slice,d=function(a,b){return function(){return a.apply(b,arguments)}};window.Tako=a=function(){var a,c,d,e,f,g,h,i,j;e=0;a=[];c=function(a){var b,c,d,f,g,k;if(a==null){a={}}try{if(a.sections!=null){e=a.sections.length;g=a.sections;k=[];for(d=0,f=g.length;d<f;d++){c=g[d];k.push($.ajax({url:c,crossDomain:true,success:i,error:h}))}return k}else{return j()}}catch(l){b=l;return console.error(b)}};d=function(b){return a.push(b)};f=function(){var a,b;b=window.innerWidth>0?window.innerWidth:screen.width;a=window.innerHeight>0?window.innerHeight:screen.height;if(b>768&&b>a){return"TABLET/DESKTOP"}else{return"PHONE"}};j=function(){var a;if($("section.active").length===0){$("section").first().addClass("active")}$("body").hammer();$("section>header>nav:not(.left):not(.right)").parent().parent().addClass("extended_header");$("section>footer").parent().addClass("footer");$("article").css("min-height",""+($(window).height()-165)+"px");$("section").each(function(){if($(this).children("article.active").length===0){return $(this).children("article").first().addClass("active")}});a=$("section.active article.active")[0].id;$("[data-visible="+a+"]").addClass("show");b();return g()};i=function(a){e--;$("body").append(a);if(e===0){return j()}};h=function(a){e--;console.error("Section not downloaded");if(e===0){return j()}};g=function(){var b,c,d,e;e=[];for(c=0,d=a.length;c<d;c++){b=a[c];e.push(b.call(b))}return e};return{init:c,onReady:d,viewType:f}}();a.Article=function(b){var c,d,e;d=function(b){var d,e,f,g,h;g=c();h=g.parent();d=$("article#"+b);e=d.parent();if(g[0].id!==d[0].id){e.children().removeClass("active");f=d.addClass("active")}if(h[0].id!==e[0].id){a.Section.goTo(e[0].id)}else{g.trigger("unload");f=d.trigger("load")}$(".current[data-article]").removeClass("current");$("[data-article="+b+"]").addClass("current");$("[data-visible]").removeClass("show");return $("[data-visible="+b+"]").addClass("show")};c=function(){var a;if(typeof a!=="undefined"&&a!==null){return a}else{return a=$("section.active article.active")}};$("[data-article]").each(function(a){var b=this;if(this.nodeName==="LI"){$(this).children().each(function(){var a=this;return $(this).bind("tap",function(b){b.preventDefault();b.stopPropagation();return d($(a).parent().attr("data-article"))})})}return $(this).bind("tap",function(a){a.preventDefault();a.stopPropagation();return d($(b).attr("data-article"))})});e=null;return function(a){if(a!=null){return d(a)}else{return c()}}}(a);a.Aside=function(a){var b,c,d,e,f;b=$("aside");if(b.length>0){c=null;c=$('<div data-element="aside_background"></div>');$("body").append(c);if(b.hasClass("full")){c.addClass("full")}c.append(b);e=function(){c.removeClass("hide").addClass("show");return b.addClass("show")};d=function(){b.removeClass("show");c.addClass("hide");return setTimeout(function(){return c.removeClass("show")},150)};f=function(){if(a.viewType()==="PHONE"){if(b.hasClass("show")){return d()}else{return e()}}};$("[data-action=aside]").each(function(a){return $(this).on("tap",function(a){a.preventDefault();a.stopPropagation();return f()})});$("aside *").each(function(a){return $(this).on("tap",function(a){a.preventDefault();a.stopPropagation();return d()})});c.on("tap",function(a){a.preventDefault();a.stopPropagation();return d()});return{show:e,hide:d,toggle:f}}}(a);a.Section=function(a){var b,c,d;c=function(a){var c,d;c=b();if(c[0].id!==a){c.removeClass("active");c.children("article.active").trigger("unload");d=$("section#"+a).addClass("active");d.children("article.active").trigger("load");$(".current[data-section]").removeClass("current");return $("[data-section="+a+"]").addClass("current")}};b=function(){var a;if(typeof a!=="undefined"&&a!==null){return a}else{return a=$("section.active")}};$("[data-section]").each(function(a){var b=this;if(this.nodeName==="LI"){$(this).children().each(function(){var a=this;return $(this).bind("tap",function(b){b.preventDefault();b.stopPropagation();return c($(a).parent().attr("data-section"))})})}return $(this).bind("tap",function(a){a.preventDefault();a.stopPropagation();return c($(b).attr("data-section"))})});d=null;return function(a){if(a!=null){return c(a)}else{return b()}}}(a);a.Section.title=function(b,c){var d;if(c==null){d=a.Section().children("header").children("h1")}else{d=$("section#"+c).children("header").children("h1")}if(d.length===1){if(b!=null){return d.html(b)}else{return d.html()}}};b=function(){var a,b,c;a=function(){return this};c=function(){return this};b=function(){var a;a="<style>\n  @media screen and (min-width: 768px) and (orientation: landscape){\n    section.active.extended_header > article {\n      margin-top: 0;\n    }\n  }\n</style>";return $("head").append(a)};if(navigator.userAgent.toLowerCase().indexOf("firefox")!==-1){b()}if($.os!=null&&$.os.android){a()}if($.os!=null&&$.os.ios){return c()}};a.Connection=function(){var a,b,c;b=navigator.onLine;a=[];c=function(c){var d,e,f,g;if(b!==c){b=c;g=[];for(e=0,f=a.length;e<f;e++){d=a[e];g.push(d.call(d,c))}return g}};$(window).on("online",function(){return c(true)});$(window).on("offline",function(){return c(false)});return{isOnline:function(){return navigator.onLine},onChange:function(b){return a.push(b)}}}();a.DB=function(){return{manager:null,create:function(a,b,c,d,e){this.manager=new WebDB(a,b,c,d,e);return this.db=this.manager.db},select:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.select.apply(this.manager,arguments)},insert:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.insert.apply(this.manager,arguments)},update:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.update.apply(this.manager,arguments)},"delete":function(){if(this.manager==null){throw"Database not initializated"}return this.manager["delete"].apply(this.manager,arguments)},drop:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.drop.apply(this.manager,arguments)},execute:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.execute.apply(this.manager,arguments)}}}();a.Notification=function(a){var b,d,e,f,g,h,i,j,k,l,m,n,o,p,q;b=false;i=$('<div data-element="notification"><div></div</div>');j=$('<section class="window"></section>');i.find("div").append(j);$("body").append(i);m=null;d=null;l=function(a,b,c,d,e){var f;f=o(a,b,c);return q(f,"success center upwards",true,d,e)};f=function(a,b,c,d,e){var f;f=o(a,b,c);return q(f,"error center downwards",true,d,e)};h=function(){var a,b,d,e,f,g,h;h=arguments[0],g=arguments[1],a=3<=arguments.length?c.call(arguments,2):[];if(a[0]!=null&&typeof a[0]==="string"){f=a[0];b=a[1]}else{f="spin6";b=a[0]}e="";d="loading center not_clickable";if(h!=null){e="<header>\n    <span>"+h+"</span>\n</header>"}else{d+=" squared"}e+='<article>\n  <span class="icon '+f+' animated"></span>\n</article>';return q(e,d,true,g,b)};k=function(b,c,d,e,f){var h;h='<header class="'+(b!=null?"align-left":"center")+'">';if(b!=null){h+='<span class="icon '+b+'"></span>'}h+="<span>"+c+'</span>\n</header>\n<article>\n  <span class="content">'+d+'</span>\n  <div id="notification_progress"></div><div style="clear:both"></div>\n</article>';q(h,"center progress not_clickable",true,e,f);k=a.ProgressBar("notification_progress",0);return{percent:function(a){var b;b=k.percent(a);if(b===100){setTimeout(function(){return g()},150)}return b}}};e=function(a,b,c,d,e,f){var h,i;i='<span class="icon '+a+'"></span>\n<span class="title">'+b+'</span>\n<div class="content padding bottom clear">'+c+'</div>\n<button class="button accept">'+d+'</button>\n<button class="button cancel">'+e+"</button>";q(i,"confirm top_position downwards not_clickable",null,null);h=j.children("button");return h.bind("tap",function(a){h.unbind("tap");g();if($(this).hasClass("accept")){return f.call(f,true)}else{return f.call(f,false)}})};g=function(){b=false;clearTimeout(m);m=null;j.removeClass("show");return setTimeout(n,500)};o=function(a,b,c){return'<header>\n  <span class="icon '+a+'"></span>\n</header>\n<article>\n  <span class="title">'+b+'</span>\n  <span class="content">'+c+"</span>\n</article>"};q=function(a,c,e,f,h){var k;if(!b){b=true;j.removeClass();j.addClass("window "+c);j.html(a);i.addClass("show");if(e){i.addClass("flexed")}else{i.removeClass("flexed")}setTimeout(function(){return j.addClass("show")},100);if(h!=null){d=h}if(f!=null){return m=setTimeout(g,f*1e3)}}else{k=d;d=function(){if(k!=null){k()}return q(a,m,h)};return g()}};p=function(a){a.preventDefault();a.stopPropagation();if(!j.hasClass("not_clickable")){b=false;clearTimeout(m);m=null;j.removeClass("show");return setTimeout(n,500)}};n=function(){var a;i.removeClass("show");a=d;d=null;if(a!=null){return a.call(a)}};i.on("tap",p);return{success:l,error:f,confirm:e,loading:h,progress:k,hide:g}}(a);a.ProgressBar=function(a,b){var c;c=function(){a.prototype.el=null;a.prototype.fill=null;function a(a,b){var c;this.value=b!=null?b:0;c='<span class="progress_bar">\n  <span class="percent" style="width:'+this.value+'%"></span>\n</span>';this.el=$(c);$("#"+a).append(this.el);this.fill=this.el.children(".percent")}a.prototype.percent=function(a){if(a!=null){if(a<0||a>100){throw"Invalid value"}this.value=a;this.fill.css("width",""+this.value+"%")}return this.value};a.prototype.remove=function(){return this.el.remove()};return a}();return new c(a,b)};(function(){var a,b,c;a=0;b=["ms","moz","webkit","o"];c=0;while(c<b.length&&!window.requestAnimationFrame){window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];++c}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(b,c){var d,e,f;d=(new Date).getTime();f=Math.max(0,16-(d-a));e=window.setTimeout(function(){return b(d+f)},f);a=d+f;return e}}if(!window.cancelAnimationFrame){return window.cancelAnimationFrame=function(a){return clearTimeout(a)}}})();a.Pull_Refresh=function(a,b){var c;if(b==null){b={}}b.pullLabel=b.pullLabel||"Pull to refresh";b.releaseLabel=b.releaseLabel||"Release to refresh";b.refreshLabel=b.refreshLabel||"Loading...";b.onRefresh=b.onRefresh||void 0;a=document.getElementById(a);c=function(){function a(a,b){var c;this.options=b;this.updateHeight=d(this.updateHeight,this);this.hide=d(this.hide,this);this.setRotation=d(this.setRotation,this);this.setHeight=d(this.setHeight,this);this.onPull=d(this.onPull,this);c='<div class="pulltorefresh">\n<span class="icon down-big"></span><span class="text">'+this.options.pullLabel+"</span>\n</div>";this.breakpoint=90;this.container=a;this.pullrefresh=$(c)[0];$(this.container).prepend(this.pullrefresh);this.icon=$(this.pullrefresh).find(".icon");this.text=$(this.pullrefresh).find(".text");this._slidedown_height=0;this._anim=null;this._dragged_down=false;this.showRelease=false;this._phone=true;Hammer(this.container).on("touch dragdown release",this.onPull)}a.prototype.onPull=function(a){var b,c,d;switch(a.type){case"touch":d=window.innerWidth>0?window.innerWidth:screen.width;b=window.innerHeight>0?window.innerHeight:screen.height;if(d>768&&d>b||this.container.nodeName!=="ARTICLE"){this.phone=false}else{this.phone=true}if(!this.refreshing){return this.hide()}break;case"release":if(!this._dragged_down){return}cancelAnimationFrame(this._anim);if(this._slidedown_height>=this.breakpoint){if(this.options.onRefresh){return this.onRefresh()}else{return this.hide()}}else{return this.hide()}break;case"dragdown":this._dragged_down=true;c=this.phone?window.scrollY:this.container.scrollTop;if(c>5){return}else{if(c!==0){if(this.phone){window.scrollTo(0,0)}else{this.container.scrollTop=0}}}if(!this._anim){this.updateHeight()}a.gesture.preventDefault();a.gesture.stopPropagation();if(this._slidedown_height>=this.breakpoint){this.onArrived()}else{if(this.showRelease){this.onUp()}}return this._slidedown_height=a.gesture.deltaY*.4}};a.prototype.setHeight=function(a){if(this.phone){this.container.style.transform="translate(0, "+a+"px) ";this.container.style.oTransform="translate(0, "+a+"px)";this.container.style.msTransform="translate(0, "+a+"px)";this.container.style.mozTransform="translate(0, "+a+"px)";return this.container.style.webkitTransform="translate(0, "+a+"px)"}else{a-=511;this.pullrefresh.style.transform="translate(0, "+a+"px) ";this.pullrefresh.style.oTransform="translate(0, "+a+"px)";this.pullrefresh.style.msTransform="translate(0, "+a+"px)";this.pullrefresh.style.mozTransform="translate(0, "+a+"px)";this.pullrefresh.style.webkitTransform="translate(0, "+a+"px)";return this.pullrefresh.style.marginBottom=""+a+"px"}};a.prototype.rotate=function(){var a,b;b=this._slidedown_height>=this.breakpoint?this.breakpoint:this._slidedown_height;a=b*180/this.breakpoint;return this.setRotation(a)};a.prototype.setRotation=function(a){this.icon[0].style.transform="rotate("+a+"deg)";this.icon[0].style.oTransform="rotate("+a+"deg)";this.icon[0].style.msTransform="rotate("+a+"deg)";this.icon[0].style.mozTransform="rotate("+a+"deg)";return this.icon[0].style.webkitTransform="rotate("+a+"deg)"};a.prototype.onRefresh=function(){this.icon[0].className="icon spin6 animated";this.text.html(this.options.refreshLabel);this.setHeight(this.breakpoint-10);this.refreshing=true;return this.options.onRefresh.call(this.options.onRefresh)};a.prototype.onArrived=function(){this.showRelease=true;return this.text.html(this.options.releaseLabel)};a.prototype.onUp=function(){this.showRelease=false;return this.text.html(this.options.pullLabel)};a.prototype.hide=function(){this.icon[0].className="icon down-big";this.text.html(this.options.pullLabel);this._slidedown_height=0;this.setHeight(0);this.setRotation(0);cancelAnimationFrame(this._anim);this._anim=null;this._dragged_down=false;return this.refreshing=false};a.prototype.updateHeight=function(){var a=this;this.setHeight(this._slidedown_height);this.rotate();return this._anim=requestAnimationFrame(function(){return a.updateHeight()})};return a}();return new c(a,b)};(function(){var b,c,d,e;c=function(a,b){return JSON.parse(window[a].getItem(b))};e=function(a,b,c){return window[a].setItem(b,JSON.stringify(c))};d=function(a,b){return window[a].removeItem(b)};b=function(a){return window[a].clear()};a.Session=function(){var a;a="sessionStorage";return{get:function(b){return c(a,b)},set:function(b,c){return e(a,b,c)},remove:function(b){return d(a,b)},clear:function(){return b(a)}}}();return a.Storage=function(){var a;a="localStorage";return{get:function(b){return c(a,b)},set:function(b,c){return e(a,b,c)},remove:function(b){return d(a,b)},clear:function(){return b(a)}}}()})()}).call(this);