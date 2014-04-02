/* TaKo v1.1.1 - 03/04/2014
   http://takojs.com
   Copyright (c) 2014 Iñigo Gonzalez Vazquez <ingonza85@gmail.com> (@haas85) - Under MIT License */
(function(){var a,b,c,d=[].slice,e=function(a,b){return function(){return a.apply(b,arguments)}};window.Tako=b=function(){var a,d,e,f,g,h,i,j,k,l;f=0;a=[];d=function(a){var b,c,d,e,g,h;if(a==null){a={}}try{if(a.articles!=null){f=a.articles.length;g=a.articles;h=[];for(d=0,e=g.length;d<e;d++){b=g[d];h.push($.ajax({url:b,crossDomain:true,dataType:"html",success:j,error:i}))}return h}else{return l()}}catch(k){c=k;return console.error(c)}};e=function(b){return a.push(b)};g=function(){var a,b;b=window.innerWidth>0?window.innerWidth:screen.width;a=window.innerHeight>0?window.innerHeight:screen.height;if(b>768&&b>a){return"TABLET/DESKTOP"}else{return"PHONE"}};l=function(){var a;if($("article.active").length===0){$("article").first().addClass("active")}$("body").hammer();$("body > article > section.indented").each(function(){return $(this).append($(document.createElement("div")).append($(this).children()))});$("article").each(function(){if($(this).children("section.active").length===0){return $(this).children("section").first().addClass("active")}});a=$("article.active section.active")[0].id;$("[data-visible="+a+"]").addClass("show");$("[data-section="+$("article.active section.active").attr("id")+"]").addClass("current");$("[data-article="+$("article.active").attr("id")+"]").addClass("current");k("data-article",b.Article);k("data-section",b.Section);$("[data-action=aside]").each(function(a){return $(this).on("tap",function(a){a.preventDefault();a.stopPropagation();return b.Aside.toggle()})});c();return h()};k=function(a,b){return $("["+a+"]").each(function(c){if(this.nodeName==="LI"){$(this).children().each(function(){return $(this).bind("tap",function(c){c.preventDefault();c.stopPropagation();return b($(this).parent().attr(a))})})}return $(this).bind("tap",function(c){c.preventDefault();c.stopPropagation();return b($(c.target).attr(a))})})};j=function(a){f--;$("body").append(a);if(f===0){return l()}};i=function(){f--;console.error("Article not downloaded");if(f===0){return l()}};h=function(){var b,c,d,e;e=[];for(c=0,d=a.length;c<d;c++){b=a[c];e.push(b.call(b))}return e};return{init:d,onReady:e,viewType:g}}();b.Article=function(a){var b,c,d;c=function(a){var c,d;c=b();if(c[0].id!==a){c.removeClass("active");c.children("article.active").trigger("unload");window.scrollTo(0,0);d=$("article#"+a).addClass("active");d.children("article.active").trigger("load");$(".current[data-article]").removeClass("current");return $("[data-article="+a+"]").addClass("current")}};b=function(){var a;if(typeof a!=="undefined"&&a!==null){return a}else{return a=$("article.active")}};d=null;return function(a){if(a!=null){return c(a)}else{return b()}}}(b);b.Article.title=function(a,c){var d;if(c==null){d=b.Article().children("header").children("h1")}else{d=$("article#"+c).children("header").children("h1")}if(d.length===1){if(a!=null){return d.html(a)}else{return d.html()}}};b.Aside=function(a){var b,c,d,e,f;b=$("aside");if(b.length>0){c=null;c=$('<div data-element="aside_background"></div>');$("body").append(c);if(b.hasClass("full")){c.addClass("full")}e=function(){c.removeClass("hide").addClass("show");return b.addClass("show")};d=function(){b.removeClass("show");c.addClass("hide");return setTimeout(function(){return c.removeClass("show")},150)};f=function(){if(a.viewType()==="PHONE"){if(b.hasClass("show")){return d()}else{return e()}}};$("aside *").each(function(a){return $(this).on("tap",function(a){a.preventDefault();a.stopPropagation();return d()})});c.on("tap",function(a){a.preventDefault();a.stopPropagation();return d()});return{show:e,hide:d,toggle:f}}}(b);b.Section=function(a){var c,d,e;d=function(a){var d,e,f,g,h;h=c();g=h.parent();e=$("section#"+a);d=e.parent();if(h[0].id!==e[0].id){d.children().removeClass("active");f=e.addClass("active")}if(g[0].id!==d[0].id){b.Article(d[0].id)}else{h.trigger("unload");f=e.trigger("load")}$(".current[data-section]").removeClass("current");$("[data-section="+a+"]").addClass("current");$("[data-visible]").removeClass("show");return $("[data-visible="+a+"]").addClass("show")};c=function(){var a;if(typeof a!=="undefined"&&a!==null){return a}else{return a=$("article.active section.active")}};e=null;return function(a){if(a!=null){return d(a)}else{return c()}}}(b);b.ProgressBar=function(a,b){var c;c=function(){a.prototype.el=null;a.prototype.fill=null;function a(a,b){var c;this.value=b!=null?b:0;c='<span class="progress_bar">\n  <span class="percent" style="width:'+this.value+'%"></span>\n</span>';this.el=$(c);$("#"+a).append(this.el);this.fill=this.el.children(".percent")}a.prototype.percent=function(a){if(a!=null){if(a<0||a>100){throw"Invalid value"}this.value=a;this.fill.css("width",""+this.value+"%")}return this.value};a.prototype.remove=function(){return this.el.remove()};return a}();return new c(a,b)};b.Connection=function(){var a,b,c;b=navigator.onLine;a=[];c=function(c){var d,e,f,g;if(b!==c){b=c;g=[];for(e=0,f=a.length;e<f;e++){d=a[e];g.push(d.call(d,c))}return g}};$(window).on("online",function(){return c(true)});$(window).on("offline",function(){return c(false)});return{isOnline:function(){return navigator.onLine},onChange:function(b){return a.push(b)}}}();b.DB=function(){return{manager:null,create:function(a,b,c,d,e){this.manager=new WebDB(a,b,c,d,e);return this.db=this.manager.db},select:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.select.apply(this.manager,arguments)},insert:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.insert.apply(this.manager,arguments)},update:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.update.apply(this.manager,arguments)},"delete":function(){if(this.manager==null){throw"Database not initializated"}return this.manager["delete"].apply(this.manager,arguments)},drop:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.drop.apply(this.manager,arguments)},execute:function(){if(this.manager==null){throw"Database not initializated"}return this.manager.execute.apply(this.manager,arguments)}}}();c=function(){var b,c,d,e,f,g,h,i;b='input[type="text"], input[type="password"], input[type="date"], input[type="datetime"], input[type="email"], input[type="number"], input[type="search"], input[type="tel"], input[type="time"], input[type="url"], textarea';c='section input[type="text"], section input[type="password"], section input[type="date"], section input[type="datetime"], section input[type="email"], section input[type="number"], section input[type="search"], section input[type="tel"], section input[type="time"], section input[type="url"], section textarea';i=function(a,b){var c,d;if(b==null){b=0}d=a.getBoundingClientRect().top;c=$(a).parents(["section.active"]);return c.scrollTop(d-c[0].getBoundingClientRect().top-b)};d=function(){var b,d;$("body").attr("data-os","android");d=new RegExp("^4[.]");b=new RegExp("^2[.]3[.]");if(d.test($.os.version)){$(c).on("focus",function(){return setTimeout(function(a){return function(){return i(a,20)}}(this),400)});$("select").on("focus",function(b){b.preventDefault();b.stopPropagation();return a($(b.target))})}if(b.test($.os.version)){$("body").attr("data-version","2.3");$("body").append($("<article data-selectbox><div></div></article>"));return $("select").on("focus",function(b){b.preventDefault();b.stopPropagation();return a($(b.target))})}};h=function(){return $("body").attr("data-os","ios")};g=function(){return $("body").attr("data-os","firefoxos")};f=function(){return $("body").attr("data-browser","firefox")};e=function(){var a;a=$.browser.webkit&&$.browser.chrome?"chrome":"safari";return $("body").attr("data-browser",a)};if($.os.android){return d()}if($.os.ios){return h()}if($.browser.firefox&&($.os.phone||$.os.tablet)){return g()}if($.browser.firefox){return f()}if($.browser!=null){return e()}};b.Notification=function(a){var b,c,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;b=false;j=$('<div data-element="notification"><div></div</div>');k=$('<article class="window"></article>');j.find("div").append(k);$("body").append(j);n=null;c=null;m=function(a,b,c,d,e){var f;if(a==null){a="ok"}f=q(a,b,c);return s(f,"success center upwards",d,e)};g=function(a,b,c,d,e){var f;if(a==null){a="deny"}f=q(a,b,c);return s(f,"error center downwards",d,e)};i=function(){var a,b,c,e,f,g,h;h=arguments[0],g=arguments[1],a=3<=arguments.length?d.call(arguments,2):[];if(a[0]!=null&&typeof a[0]==="string"){f=a[0];b=a[1]}else{f="spin6";b=a[0]}e="";c="loading center not_clickable";if(h!=null){e="<header>\n    <span>"+h+"</span>\n</header>"}else{c+=" squared"}e+='<section>\n  <span class="icon '+f+' animated"></span>\n</section>';return s(e,c,g,b)};l=function(b,c,d,e,f){var g;g='<header class="'+(b!=null?"align-left":"center")+'">';if(b!=null){g+='<span class="icon '+b+'"></span>'}g+="<span>"+c+'</span>\n</header>\n<section>\n  <span class="content">'+d+'</span>\n  <div id="notification_progress"></div><div style="clear:both"></div>\n</section>';s(g,"center progress not_clickable",e,f);l=a.ProgressBar("notification_progress",0);return{percent:function(a){var b;b=l.percent(a);if(b===100){setTimeout(function(){return h()},150)}return b}}};e=function(a,b,c,d,e,f){var g,i;if(a==null){a="help-circled"}if(d==null){d="Accept"}if(e==null){e="Cancel"}i='<section>\n  <span class="icon '+a+'"></span>\n  <div>\n    <span class="title">'+b+'</span><br>\n    <span class="content padding bottom clear">'+c+'</span>\n  </div>\n</section>\n<footer>\n  <button class="button accept">'+d+'</button>\n  <button class="button cancel">'+e+"</button>\n</footer>";s(i,"center confirm not_clickable",null,null);g=k.find("button");return g.bind("tap",function(a){g.unbind("tap");h();if($(this).hasClass("accept")){return f.call(f,true)}else{return f.call(f,false)}})};f=function(a,b,c,d,e,f){var g,h;if(c==null){c=true}if(d==null){d=""}g="";if(a!=null&&c){g='<header>\n  <span class="close icon deny"></span>\n  <h1>\n    <span>'+a+"</span>\n  </h1>\n</header>"}else if(a!=null){g="<header><h1>\n  <span>"+a+"</span>\n</h1></header>"}h=""+g+"\n<section>";if(c&&a==null){h+='<span class="close black icon deny"></span>'}h+=""+b+"\n</section>";s(h,"center custom not_clickable "+d,e,f);return j.find(".close").on("tap",o)};h=function(){b=false;clearTimeout(n);n=null;k.removeClass("show");return setTimeout(p,500)};q=function(a,b,c){return'<header>\n  <span class="icon '+a+'"></span>\n</header>\n<section>\n  <span class="title">'+b+'</span>\n  <span class="content">'+c+"</span>\n</section>"};s=function(a,d,e,f){var g;if(!b){b=true;k.removeClass();k.addClass("window "+d);k.html(a);j.addClass("show");setTimeout(function(){return k.addClass("show")},100);if(f!=null){c=f}if(e!=null){return n=setTimeout(h,e*1e3)}}else{g=c;c=function(){if(g!=null){g()}return s(a,n,f)};return h()}};r=function(a){a.preventDefault();a.stopPropagation();if(!k.hasClass("not_clickable")){b=false;clearTimeout(n);n=null;k.removeClass("show");return setTimeout(p,500)}};o=function(a){a.preventDefault();a.stopPropagation();b=false;clearTimeout(n);n=null;k.removeClass("show");return setTimeout(p,500)};p=function(){var a;j.removeClass("show");a=c;c=null;if(a!=null){return a.call(a)}};j.on("tap",r);return{success:m,error:g,confirm:e,loading:i,progress:l,custom:f,hide:h}}(b);(function(){var a,b,c;a=0;b=["ms","moz","webkit","o"];c=0;while(c<b.length&&!window.requestAnimationFrame){window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];++c}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(b,c){var d,e,f;d=(new Date).getTime();f=Math.max(0,16-(d-a));e=window.setTimeout(function(){return b(d+f)},f);a=d+f;return e}}if(!window.cancelAnimationFrame){return window.cancelAnimationFrame=function(a){return clearTimeout(a)}}})();b.Pull_Refresh=function(a,b){var c;if(b==null){b={}}b.pullLabel=b.pullLabel||"Pull to refresh";b.releaseLabel=b.releaseLabel||"Release to refresh";b.refreshLabel=b.refreshLabel||"Loading...";b.onRefresh=b.onRefresh||void 0;a=document.getElementById(a);c=function(){function a(a,b){var c;this.options=b;this.updateHeight=e(this.updateHeight,this);this.hide=e(this.hide,this);this.setHeight=e(this.setHeight,this);this.onPull=e(this.onPull,this);c='<div class="pulltorefresh">\n<span class="icon down-big"></span><span class="text">'+this.options.pullLabel+"</span>\n</div>";this.breakpoint=90;this.container=a;this.pullrefresh=$(c)[0];$(this.container).prepend(this.pullrefresh);this.icon=$(this.pullrefresh).find(".icon");this.text=$(this.pullrefresh).find(".text");this._slidedown_height=0;this._anim=null;this._dragged_down=false;this.showRelease=false;Hammer(this.container).on("touch",function(a){return function(){$(a.container).addClass("pulling");if(!a.refreshing){return a.hide(false)}}}(this));Hammer(this.container).on("dragdown",this.onPull);Hammer(this.container).on("release",function(a){return function(){if(!a._dragged_down){return}cancelAnimationFrame(a._anim);if(a._slidedown_height>=a.breakpoint){if(a.options.onRefresh){return a.onRefresh()}else{return a.hide()}}else{return a.hide()}}}(this))}a.prototype.onPull=function(a){this._dragged_down=true;if(this.container.scrollTop>5){return}if(!this._anim){this.updateHeight()}a.gesture.preventDefault();a.gesture.stopPropagation();if(this._slidedown_height>=this.breakpoint){this.onArrived()}else{if(this.showRelease){this.onUp()}}return this._slidedown_height=a.gesture.deltaY*.4};a.prototype.setHeight=function(a){a-=511;this.pullrefresh.style.transform="translate(0, "+a+"px)";this.pullrefresh.style.webkitTransform="translate(0, "+a+"px)";this.pullrefresh.style.mozTransform="translate(0, "+a+"px)";this.pullrefresh.style.msTransform="translate(0, "+a+"px)";this.pullrefresh.style.marginBottom=""+a+"px";return this.pullrefresh.style.oTransform="translate(0, "+a+"px)"};a.prototype.onRefresh=function(){this.icon[0].className="icon spin6 animated";this.text.html(this.options.refreshLabel);this.setHeight(this.breakpoint-10);this.refreshing=true;this.icon.removeClass("rotated");return this.options.onRefresh.call(this.options.onRefresh)};a.prototype.onArrived=function(){this.showRelease=true;this.icon.addClass("rotated");return this.text.html(this.options.releaseLabel)};a.prototype.onUp=function(){this.showRelease=false;this.icon.removeClass("rotated");return this.text.html(this.options.pullLabel)};a.prototype.hide=function(a){if(a==null){a=true}if(a){$(this.container).removeClass("pulling")}this.icon[0].className="icon down-big";this.text.html(this.options.pullLabel);this._slidedown_height=0;this.setHeight(0);this.icon.removeClass("rotated");cancelAnimationFrame(this._anim);this._anim=null;this._dragged_down=false;return this.refreshing=false};a.prototype.updateHeight=function(){var a;a=this._slidedown_height-511;this.pullrefresh.style.transform="translate(0, "+a+"px)";this.pullrefresh.style.webkitTransform="translate(0, "+a+"px)";this.pullrefresh.style.mozTransform="translate(0, "+a+"px)";this.pullrefresh.style.msTransform="translate(0, "+a+"px)";this.pullrefresh.style.marginBottom=""+a+"px";this.pullrefresh.style.oTransform="translate(0, "+a+"px)";return this._anim=requestAnimationFrame(this.updateHeight)};return a}();return new c(a,b)};a=function(a){var b,c,d,e,f,g,h,i,j;f=function(a){var b;b=$('<li data-value="'+a.value+'">'+a.text+"</li>");if(a.value===e[0].value){b.addClass("theme")}b.on("tap",function(a){return j(a.target)});return b};j=function(a){e[0].value=a.getAttribute("data-value");e.hide();setTimeout(function(){return e.show()},1);return $("article[data-selectbox]").removeClass("show").html("<div></div>")};e=a;c=$('<section data-selectbox="'+e.attr("id")+'"></section>');d=$("<ul></ul>");i=a.children();for(g=0,h=i.length;g<h;g++){b=i[g];d.append(f(b))}c.append(d);return $("article[data-selectbox]>div").append(c).parent().addClass("show")};(function(){var a,c,d,e;c=function(a,b){return JSON.parse(window[a].getItem(b))};e=function(a,b,c){return window[a].setItem(b,JSON.stringify(c))};d=function(a,b){return window[a].removeItem(b)};a=function(a){return window[a].clear()};b.Session=function(){var b;b="sessionStorage";return{get:function(a){return c(b,a)},set:function(a,c){return e(b,a,c)},remove:function(a){return d(b,a)},clear:function(){return a(b)}}}();return b.Storage=function(){var b;b="localStorage";return{get:function(a){return c(b,a)},set:function(a,c){return e(b,a,c)},remove:function(a){return d(b,a)},clear:function(){return a(b)}}}()})()}).call(this);