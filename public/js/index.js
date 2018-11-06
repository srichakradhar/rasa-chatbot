$(function() {
    
    // $(document).delegate(".chat-btn", "click", function() {
      // var value = $(this).attr("chat-value");
      // var name = $(this).html();
      // $("#chat-input").attr("disabled", false);
      // // generate_message(name, 'self');
    // })
    
//    
//    $('.button').click(function(){
//        $('.menu .items span').toggleClass('active');
//         $('.menu .button').toggleClass('active');
//      });
     $(".wc-header span").empty();
     var heading = "HIRO ";
     //var heading = "HIRO | HR Assistant";
     
       //var heading = "New Bot";
    //  if(localStorage['username'] == 'srichakradhar') heading = "ARIBA | Live Agent"; 
     $(".wc-header").append("<div class='headingChat'>" + heading + "</div>");
     
      // setTimeout(function(){ 
        //    $(".wc-message-wrapper .wc-message-from-bot span").empty();
        //    $(".wc-message-wrapper .wc-message-from-bot span").text('Kevin');  
        //    }, 3000);
    
    
    $("#buttonClick").click(function() {   
        
      $("#buttonClick").toggle('scale');
        
     
//      $('.avenue-messenger').height('75%');
    //  $(".chat-box").toggle('scale');
    })
    $(".wc-header").append("<div class='btn minimizeOpt'><img src='./img/close_36x36.png'></div>");
    $('#buttonClick').click(function(){
           $("#BotChatGoesHere").toggleClass('showDiv');  
    })
   
     $('.minimizeOpt').click(function(){
//         $("#BotChatGoesHere").css("display", "none");
          $("#BotChatGoesHere").toggleClass('showDiv');
          $("#buttonClick").toggle('scale');
    })
     
          
//    $("#end-chat, .chat-box-toggle").click(function() {
//      $("#buttonClick").toggle('scale');
//      $(".chat-box").toggle('scale');
//      $('.menu .items span').toggleClass('active');
//      $('.menu .button').toggleClass('active');
//    });

//    $("#minimize").click(function() {
//      $('.avenue-messenger').height('10%');
//      $('.menu .items span').toggleClass('active');
//      $('.menu .button').toggleClass('active');
//    });

//    $(".chat").click(function() {
//      $('.avenue-messenger').height('75%');
//    });
    
});