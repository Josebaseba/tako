/* app v0.1.1 - 21/05/2014
   http://josebaseba.com
   Copyright (c) 2014 Joseba Legarreta | @josebaseba - Under MIT License */
(function(){var a,b,c,d=[].slice,e=function(a,b){return function(){return a.apply(b,arguments)}};window.Tako=b=function(){var a,d,e,f,g,h,i,j,k,l,m,n;if($.os.wp){n="click";h="dblclick"}else{n="tap";h="doubletap"}f=0;a=[];d=function(a){var b,c,d,e,g,h;if(a==null){a={}}try{if(a.articles!=null){f=a.articles.length;g=a.articles;h=[];for(d=0,e=g.length;d<e;d++){b=g[d];h.push($.ajax({url:b,crossDomain:true,dataType:"html",success:k,error:j}))}return h}else{return m()}}catch(i){c=i;return console.error(c)}};e=function(b){return a.push(b)};g=function(){var a,b;b=window.innerWidth>0?window.innerWidth:screen.width;a=window.innerHeight>0?window.innerHeight:screen.height;if(b>768&&b>a){return"TABLET/DESKTOP"}else{return"PHONE"}};m=function(){var a;if($("article.active").length===0){$("article").first().addClass("active")}$("body").hammer();$("body > article > section.indented").each(function(){return $(this).append($(document.createElement("div")).append($(this).children()))});$("article").each(function(){if($(this).children("section.active").length===0){return $(this).children("section").first().addClass("active")}});a=$("article.active section.active")[0].id;$("[data-visible="+a+"]").addClass("show");$("[data-section="+$("article.active section.active").attr("id")+"]").addClass("current");$("[data-article="+$("article.active").attr("id")+"]").addClass("current");l("data-article",b.Article);l("data-section",b.Section);$("[data-action=aside]").each(function(a){return $(this).on(n,function(a){a.preventDefault();a.stopPropagation();return b.Aside.toggle()})});c();return i()};l=function(a,b){return $("["+a+"]").each(function(c){if(this.nodeName==="LI"){$(this).children().each(function(){return $(this).bind(n,function(c){c.preventDefault();c.stopPropagation();return b($(this).parent().attr(a))})})}return $(this).bind(n,function(c){c.preventDefault();c.stopPropagation();return b($(c.target).attr(a))})})};k=function(a){f--;$("body").append(a);if(f===0){return m()}};j=function(){f--;console.error("Article not downloaded");if(f===0){return m()}};i=function(){var b,c,d,e;e=[];for(c=0,d=a.length;c<d;c++){b=a[c];e.push(b.call(b))}return e};return{init:d,onReady:e,viewType:g,tap:n,double_tap:h}}();b.Article=function(a){var b,c,d;c=function(a){var c,d;c=b();if(c[0].id!==a){c.removeClass("active");c.children("article.active").trigger("unload");window.scrollTo(0,0);d=$("article#"+a).addClass("active");d.children("article.active").trigger("load");$(".current[data-article]").removeClass("current");return $("[data-article="+a+"]").addClass("current")}};b=function(){var a;if(typeof a!=="undefined"&&a!==null){return a}else{return a=$("article.active")}};d=null;return function(a){if(a!=null){return c(a)}else{return b()}}}(b);b.Article.title=function(a,c){var d;if(c==null){d=b.Article().children("header").children("h1")}else{d=$("article#"+c).children("header").children("h1")}if(d.length===1){if(a!=null){return d.html(a)}else{return d.html()}}};b.Aside=function(a){var c,d,e,f,g;c=$("aside");if(c.length>0){d=null;d=$('<div data-element="aside_background"></div>');$("body").append(d);if(c.hasClass("full")){d.addClass("full")}f=function(){d.removeClass("hide").addClass("show");return c.addClass("show")};e=function(){c.removeClass("show");d.addClass("hide");return setTimeout(function(){return d.removeClass("show")},150)};g=function(){if(a.viewType()==="PHONE"){if(c.hasClass("show")){return e()}else{return f()}}};$("aside *").each(function(a){return $(this).on(b.tap,function(a){a.preventDefault();a.stopPropagation();return e()})});d.on(b.tap,function(a){a.preventDefault();a.stopPropagation();return e()});return{show:f,hide:e,toggle:g}}}(b);b.Section=function(a){var c,d,e;d=function(a){var d,e,f,g,h;h=c();g=h.parent();e=$("section#"+a);d=e.parent();if(h[0].id!==e[0].id){d.children().removeClass("active");f=e.addClass("active")}if(g[0].id!==d[0].id){b.Article(d[0].id)}else{h.trigger("unload");f=e.trigger("load")}$(".current[data-section]").removeClass("current");$("[data-section="+a+"]").addClass("current");$("[data-visible]").removeClass("show");return $("[data-visible="+a+"]").addClass("show")};c=function(){var a;if(typeof a!=="undefined"&&a!==null){return a}else{return a=$("article.active section.active")}};e=null;return function(a){if(a!=null){return d(a)}else{return c()}}}(b);b.ProgressBar=function(a,b){var c;c=function(){a.prototype.el=null;a.prototype.fill=null;function a(a,b){var c;this.value=b!=null?b:0;c='<span class="progress_bar">\n  <span class="percent" style="width:'+this.value+'%"></span>\n</span>';this.el=$(c);$("#"+a).append(this.el);this.fill=this.el.children(".percent")}a.prototype.percent=function(a){if(a!=null){if(a<0||a>100){throw"Invalid value"}this.value=a;this.fill.css("width",""+this.value+"%")}return this.value};a.prototype.remove=function(){return this.el.remove()};return a}();return new c(a,b)};b.Connection=function(){var a,b,c;b=navigator.onLine;a=[];c=function(c){var d,e,f,g;if(b!==c){b=c;g=[];for(e=0,f=a.length;e<f;e++){d=a[e];g.push(d.call(d,c))}return g}};$(window).on("online",function(){return c(true)});$(window).on("offline",function(){return c(false)});return{isOnline:function(){return navigator.onLine},onChange:function(b){return a.push(b)}}}();b.DB=function(){return{manager:null,create:function(a,b,c,d,e){this.manager=new WebDB(a,b,c,d,e);return this.db=this.manager.db},select:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.select.apply(this.manager,arguments)},insert:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.insert.apply(this.manager,arguments)},update:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.update.apply(this.manager,arguments)},"delete":function(){if(this.manager==null){throw"Database not initializated"}return this.manager["delete"].apply(this.manager,arguments)},drop:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.drop.apply(this.manager,arguments)},execute:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.execute.apply(this.manager,arguments)}}}();c=function(){var b,c,d,e,f,g,h,i,j;b='input[type="text"], input[type="password"], input[type="date"], input[type="datetime"], input[type="email"], input[type="number"], input[type="search"], input[type="tel"], input[type="time"], input[type="url"], textarea';c='section input[type="text"], section input[type="password"], section input[type="date"], section input[type="datetime"], section input[type="email"], section input[type="number"], section input[type="search"], section input[type="tel"], section input[type="time"], section input[type="url"], section textarea';i=function(a,b){var c,d;if(b==null){b=0}d=a.getBoundingClientRect().top;c=$(a).parents(["section.active"]);return c.scrollTop(d-c[0].getBoundingClientRect().top-b)};d=function(){var b,d;$("body").attr("data-os","android");d=new RegExp("^4[.]");b=new RegExp("^2[.]3[.]");if(d.test($.os.version)){$(c).on("focus",function(){return setTimeout(function(a){return function(){return i(a,20)}}(this),400)});$("select").on("focus",function(b){b.preventDefault();b.stopPropagation();return a($(b.target))})}if(b.test($.os.version)){$("body").attr("data-version","2.3");$("body").append($("<article data-selectbox><div></div></article>"));return $("select").on("focus",function(b){b.preventDefault();b.stopPropagation();return a($(b.target))})}};h=function(){return $("body").attr("data-os","ios")};j=function(){return $("body").attr("data-os","wp")};e=function(){return $("body").attr("data-os","blackberry")};g=function(){return $("body").attr("data-os","firefoxos")};f=function(){if($.browser.firefox){return $("body").attr("data-browser","firefox")}if($.browser.ie){return $("body").attr("data-browser","ie")}if($.browser.chrome){return $("body").attr("data-browser","chrome")}if($.browser.safari){return $("body").attr("data-browser","safari")}};if($.os.android){return d()}if($.os.ios){return h()}if($.os.wp){return j()}if($.os.blackberry||$.os.bb10||$.os.playbook){return e()}if($.browser.firefox&&($.os.phone||$.os.tablet)){return g()}if($.browser!=null){return f()}};b.Notification=function(a){var c,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;c=false;k=$('<div data-element="notification"><div></div></div>');l=$('<article class="window"></article>');k.find("div").append(l);$("body").append(k);o=null;e=null;n=function(a,b,c,d,e){var f;if(a==null){a="ok"}f=r(a,b,c);return t(f,"success center upwards",d,e)};h=function(a,b,c,d,e){var f;if(a==null){a="deny"}f=r(a,b,c);return t(f,"error center downwards",d,e)};j=function(){var a,b,c,e,f,g;g=arguments[0],f=arguments[1],a=3<=arguments.length?d.call(arguments,2):[];if(a[0]!=null&&typeof a[0]==="string"){e=a[0];b=a[1]}else{e="spin4";b=a[0]}c="";c+='<div id="loading-block" style="position: absolute; top: 0;" class="loading center not_clickable">\n  <span class="icon '+e+' animated show-loading"></span>\n</div>';return u(c,null,f,b)};m=function(b,c,d,e,f){var g;g='<header class="'+(b!=null?"align-left":"center")+'">';if(b!=null){g+='<span class="icon '+b+'"></span>'}g+="<span>"+c+'</span>\n</header>\n<section>\n  <span class="content">'+d+'</span>\n  <div id="notification_progress"></div><div style="clear:both"></div>\n</section>';t(g,"center progress not_clickable",e,f);m=a.ProgressBar("notification_progress",0);return{percent:function(a){var b;b=m.percent(a);if(b===100){setTimeout(function(){return i()},150)}return b}}};f=function(a,c,d,e,f,g){var h,j;if(a==null){a="help-circled"}if(e==null){e="Accept"}if(f==null){f="Cancel"}j='<section>\n  <span class="icon '+a+'"></span>\n  <div>\n    <span class="title">'+c+'</span><br>\n    <span class="content padding bottom clear">'+d+'</span>\n  </div>\n</section>\n<footer>\n  <button class="button accept">'+e+'</button>\n  <button class="button cancel">'+f+"</button>\n</footer>";t(j,"center confirm not_clickable",null,null);h=l.find("button");return h.bind(b.tap,function(a){h.unbind(b.tap);i();if($(this).hasClass("accept")){return g.call(g,true)}else{return g.call(g,false)}})};g=function(a,c,d,e,f,g){var h,i;if(d==null){d=true}if(e==null){e=""}h="";if(a!=null&&d){h='<header>\n  <span class="close icon deny"></span>\n  <h1>\n    <span>'+a+"</span>\n  </h1>\n</header>"}else if(a!=null){h="<header><h1>\n  <span>"+a+"</span>\n</h1></header>"}i=""+h+"\n<section>";if(d&&a==null){i+='<span class="close black icon deny"></span>'}i+=""+c+"\n</section>";t(i,"center custom not_clickable "+e,f,g);return k.find(".close").on(b.tap,p)};i=function(){c=false;clearTimeout(o);o=null;l.removeClass("show");return setTimeout(q,500)};r=function(a,b,c){return'<header>\n  <span class="icon '+a+'"></span>\n</header>\n<section>\n  <span class="title">'+b+'</span>\n  <span class="content">'+c+"</span>\n</section>"};t=function(a,b,d,f){var g;if(!c){c=true;l.removeClass();k.find("#loading-block").remove();l.addClass("window "+b);l.html(a);k.addClass("show");setTimeout(function(){return l.addClass("show")},100);if(f!=null){e=f}if(d!=null){return o=setTimeout(i,d*1e3)}}else{g=e;e=function(){if(g!=null){g()}return t(a,o,f)};return i()}};u=function(a,b,d,f){var g;if(!c){c=true;k.append(a);k.addClass("show");if(f!=null){e=f}if(d!=null){return o=setTimeout(i,d*1e3)}}else{g=e;e=function(){if(g!=null){g()}return t(a,o,f)};return i()}};s=function(a){a.preventDefault();a.stopPropagation();if($(a.currentTarget).find("#loading-block").length){return null}if(!l.hasClass("not_clickable")){c=false;clearTimeout(o);o=null;l.removeClass("show");return setTimeout(q,500)}};p=function(a){a.preventDefault();a.stopPropagation();c=false;clearTimeout(o);o=null;l.removeClass("show");return setTimeout(q,500)};q=function(){var a;k.removeClass("show");a=e;e=null;if(a!=null){return a.call(a)}};k.on(b.tap,s);return{success:n,error:h,confirm:f,loading:j,progress:m,custom:g,hide:i}}(b);(function(){var a,b,c;a=0;b=["ms","moz","webkit","o"];c=0;while(c<b.length&&!window.requestAnimationFrame){window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];++c}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(b,c){var d,e,f;d=(new Date).getTime();f=Math.max(0,16-(d-a));e=window.setTimeout(function(){return b(d+f)},f);a=d+f;return e}}if(!window.cancelAnimationFrame){return window.cancelAnimationFrame=function(a){return clearTimeout(a)}}})();b.Pull_Refresh=function(a,b){var c;if(b==null){b={}}b.onRefresh=b.onRefresh||void 0;a=document.getElementById(a);c=function(){function a(a,b){var c;this.options=b;this.updateHeight=e(this.updateHeight,this);this.hide=e(this.hide,this);this.animatePullrefreshTransform=e(this.animatePullrefreshTransform,this);this.setHeight=e(this.setHeight,this);this.onPull=e(this.onPull,this);c='<div class="pulltorefresh">\n<span class="icon down-big"></span>\n</div>';this.breakpoint=50;this.pullHeight=490;this.container=a;this.pullrefresh=$(c)[0];$(this.container).prepend(this.pullrefresh);this.icon=$(this.pullrefresh).find(".icon");this.text=$(this.pullrefresh).find(".text");this._slidedown_height=0;this._anim=null;this._dragged_down=false;this.showRelease=false;Hammer(this.container).on("touch",function(a){return function(){$(a.container).addClass("pulling");if(!a.refreshing){return a.hide(false)}}}(this));Hammer(this.container).on("dragdown",this.onPull);Hammer(this.container).on("release",function(a){return function(){if(!a._dragged_down){return}cancelAnimationFrame(a._anim);if(a._slidedown_height>=a.breakpoint&&a.options.onRefresh){return a.onRefresh()}else{return a.hide()}}}(this))}a.prototype.onPull=function(a){this._dragged_down=true;if(this.container.scrollTop>5){return}if(!this._anim){this.updateHeight()}a.gesture.preventDefault();a.gesture.stopPropagation();if(this._slidedown_height>=this.breakpoint){this.onArrived()}else{if(this.showRelease){this.onUp()}}return this._slidedown_height=a.gesture.deltaY*.4};a.prototype.setHeight=function(a){a-=this.pullHeight;return this._trasformPullrefresh(a)};a.prototype.animatePullrefreshTransform=function(){this.height=parseInt(this.height);this._trasformPullrefresh(this.height);if(this.height>-(this.pullHeight-this.breakpoint)){return setTimeout(function(a){return function(){a.height-=3;return a.animatePullrefreshTransform()}}(this))}else{return this.finishOnRefresh()}};a.prototype.onRefresh=function(){this.icon[0].className="icon spin4 animated";this.text.html(this.options.refreshLabel);return this.animatePullrefreshTransform()};a.prototype.finishOnRefresh=function(){this.refreshing=true;this.icon.removeClass("rotated");return this.options.onRefresh.call(this.options.onRefresh)};a.prototype.onArrived=function(){this.showRelease=true;this.icon.addClass("rotated");return this.text.html(this.options.releaseLabel)};a.prototype.onUp=function(){this.showRelease=false;this.icon.removeClass("rotated");return this.text.html(this.options.pullLabel)};a.prototype.hide=function(a){if(a==null){a=true}if(a){$(this.container).removeClass("pulling")}this.icon[0].className="icon down-big";this.text.html(this.options.pullLabel);this._slidedown_height=0;this.setHeight(0);this.icon.removeClass("rotated");cancelAnimationFrame(this._anim);this._anim=null;this._dragged_down=false;return this.refreshing=false};a.prototype.updateHeight=function(){this.height=this._slidedown_height-this.pullHeight;this._trasformPullrefresh(this.height);return this._anim=requestAnimationFrame(this.updateHeight)};a.prototype._trasformPullrefresh=function(a){this.pullrefresh.style.transform="translate(0, "+a+"px)";this.pullrefresh.style.webkitTransform="translate(0, "+a+"px)";this.pullrefresh.style.mozTransform="translate(0, "+a+"px)";this.pullrefresh.style.msTransform="translate(0, "+a+"px)";this.pullrefresh.style.marginBottom=""+a+"px";return this.pullrefresh.style.oTransform="translate(0, "+a+"px)"};return a}();return new c(a,b)};a=function(a){var b,c,d,e,f,g,h,i,j;f=function(a){var b;b=$('<li data-value="'+a.value+'">'+a.text+"</li>");if(a.value===e[0].value){b.addClass("theme")}b.on("tap",function(a){return j(a.target)});return b};j=function(a){e[0].value=a.getAttribute("data-value");e.hide();setTimeout(function(){return e.show()},1);return $("article[data-selectbox]").removeClass("show").html("<div></div>")};e=a;c=$('<section data-selectbox="'+e.attr("id")+'"></section>');d=$("<ul></ul>");i=a.children();for(g=0,h=i.length;g<h;g++){b=i[g];d.append(f(b))}c.append(d);return $("article[data-selectbox]>div").append(c).parent().addClass("show")};(function(){var a,c,d,e;c=function(a,b){return JSON.parse(window[a].getItem(b))};e=function(a,b,c){return window[a].setItem(b,JSON.stringify(c))};d=function(a,b){return window[a].removeItem(b)};a=function(a){return window[a].clear()};b.Session=function(){var b;b="sessionStorage";return{get:function(a){return c(b,a)},set:function(a,c){return e(b,a,c)},remove:function(a){return d(b,a)},clear:function(){return a(b)}}}();return b.Storage=function(){var b;b="localStorage";return{get:function(a){return c(b,a)},set:function(a,c){return e(b,a,c)},remove:function(a){return d(b,a)},clear:function(){return a(b)}}}()})()}).call(this);