$(function(){

  console.log("=========================");
  console.log("========== APP ==========");
  console.log("=========================");
  console.log("==== FRONTEND  LOGIC ====");
  console.log("=========================");

  Tako.onReady(function(){
      firstTime = true;
      window.puller = Tako.Pull_Refresh("main", {onRefresh:function(){
        setTimeout(function(){
          if(firstTime){
            $("div#posts").prepend('\
              <div class="post">\
              <img src="/assets/img/jake.gif" class="content">\
              <div class="line">\
                <img src="/assets/img/profile.jpg" class="rounded small two_column">\
                <div class="seven_column post-info">\
                  <span class="nickname">Josebaseba</span>\
                  <span class="text description">\
                    Comentario de debajo del gif, descripción de la imagen que se ve. Límite de 160 carácteres más o menos...\
                  </span>\
                  <hr>\
                  <span class="text">A <span class="likes">67</span> le gusta y <span class="rt">322</span> RT\'s</span>\
                  <hr>\
                  <span class="button rounded small icon smile"></span>\
                  <span class="button rounded small icon comment-empty"></span>\
                  <span class="button rounded small icon up-big"></span>\
                </div>\
              </div>\
            </div>\
            ');
            firstTime = false;
          }
          puller.hide();
        }, 2000);
      }});
  });

  Tako.init({"articles": ["article2.html"]});
  $("#show_success").bind("tap", function(){
      Tako.Notification.success("ok", "Success!!","Everything worked fine", 5, function(){console.log("SUCCESS CB");})
  });
  $("#show_error").bind("tap", function(){
      Tako.Notification.error("deny", "Error!!","Something went wrong", 5, function(){console.log("ERROR CB");})
  });
  $("#show_confirm").bind("tap", function(){
      Tako.Notification.confirm("help-circled", "Question", "Do you like TaKos", "Of course", "Not much", function(result){
          if(result){
              alert("I know you like them!!");
              console.log("I know you like them!!");
          }else{
              alert("Well, I hope at least you like our TaKo");
              console.log("Well, I hope at least you like our TaKo");
          }
      })
  });
  $("#show_custom").bind("tap", function(){
      Tako.Notification.custom("Custom", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus auctor convallis. Aliquam eget ipsum a velit pulvinar elementum vitae non dolor. Nullam dui metus, tincidunt non dolor eu, laoreet auctor tellus. Suspendisse vestibulum scelerisque nibh non scelerisque. Cras eget lobortis orci. Vestibulum ultrices enim mattis fermentum tristique. Nunc ultricies feugiat tellus, ut facilisis est dignissim nec. Vivamus molestie sem vel euismod vestibulum.", true, "", null, function(){console.log("Fin de custom")});
  });
  $("#show_loading").bind("tap", function(){
      Tako.Notification.loading("Loading", 3, function(){console.log("LOADING CB");})
  });
  $("#show_progress").bind("tap", function(){
      var progress = Tako.Notification.progress("spin1 animated", "Downloading", "Please wait until your download is completed");
      setTimeout(function(){progress.percent(20)},1000);
      setTimeout(function(){progress.percent(60)},2500);
      setTimeout(function(){progress.percent(100)},4500);
  });

  $("#main").hide();
  Tako.Notification.loading("Loading")
  setTimeout(function(){
    $("#main").show();
    Tako.Notification.hide();
  }, 1200);

});
