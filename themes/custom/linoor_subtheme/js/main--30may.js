

// Vidyo connect startu


    var vidyoConnector;

 // Callback method when VidyoIO is done loading (pointer to this method is passed in the onload parameter while including the
 // VidyoClient.js file)
    function onVidyoClientLoaded(status) {
      console.log("VidyoClient load state - " + status.state);
      if (status.state == "READY") {
        VC.CreateVidyoConnector({
        viewId:"renderer", // Div ID where the composited video will be rendered, see VidyoConnector.html;
        viewStyle:"VIDYO_CONNECTORVIEWSTYLE_Default", // Visual style of the composited renderer
        remoteParticipants:10, // Maximum number of participants to render
        logFileFilter:"error",
        logFileName:"",
        userData:""
      }).then(function (vc) {
        console.log("Create success check");
        // document('div.video-wrapper').css("background", "none"); TODO
        // document.getElementById("myDiv").style.backgroundColor = "lightblue";
        vidyoConnector = vc;
      }).catch(function(error){

      });
    }
  };


  function joinCall(){

    var token = document.getElementById('joinLeaveButton').value;
    var displayName = document.getElementById('displayNameButton').value;
    var resourceId = document.getElementById('resourceIdButton').value;

    // alert(displayName);
    // To join a video conference call Connect method
    vidyoConnector.Connect({
      host:"prod.vidyo.io",  // Server name, for most production apps it will be prod.vidyo.io
      token:token,          // Add generated token (https://developer.vidyo.io/documentation/4-1-16-8/getting-started#Tokens)
      displayName:displayName,  // Display name
      resourceId:"room1", // Room name
      onSuccess: function(){
      console.log("Connected!! YAY!");
      document.getElementById("chat-message").innerHTML += "Connected!! YAY! ";
        // document.getElementById("vertical-center").className.fadeOut(1000) = "optionsHide";
      },
      onFailure: function(reason){
        console.error("Connection failed");
        const p = document.getElementById('controls');
        p.classList.remove('optionsHide');
        document.getElementById("chat-message").innerHTML += "Connections failed " + reason;
        // document.getElementById("join-container").className = "optionsHide";
        // document.getElementById("controls").classList.remove("optionsHide");
      },
      onDisconnected: function(reason) {
        console.log("Disconnected - " + reason);
        document.getElementById("chat-message").innerHTML += "disconnected - " + reason;
      }
    })
  }




jQuery(document).ready(function ($) {

      // on hitting return add text to chat and send message
      // var textmessage = document.getElementById('chat-text').value;
      // var displayName = document.getElementById('displayNameButton').value;

      var textmessage = "bears"



      $(function() {
      $("#chat-text").keypress(function (e) {
          if(e.which == 13) {
              // var displayName = document.getElementById('displayNameButton').value;
              var textmessage = document.getElementById('chat-text').value;
              vidyoConnector.SendChatMessage({message:textmessage});
              document.getElementById("chat-readout").innerHTML += "<p>" + textmessage + "</p>";
              document.getElementById("chat-readout").classList.remove('optionsHide');
              document.getElementById("chat-text").value = "";
              e.preventDefault();

          }
      });
      });

      $('.open-popup-link').magnificPopup({
      type:'inline',
      midClick: true,
      removalDelay: 100,
      mainClass: 'mfp-fade' // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
      });


      $('.open-popup-link').magnificPopup('close').delay("2000");


  ///   Countdown and Eat2live Engine

  var countDownDate = new Date();

  // get start-time-countdown date
  var countDownDate = document.getElementById("start-time-countdown").dataset.startdate;
  var unixCountDownDate = Date.parse(countDownDate);

  // Get Duration of Event as string and convert to seconds

  var durationString = document.getElementById("duration").dataset.duration;

  durationSeconds = getSeconds(durationString);

  console.log(durationSeconds);

  // main process of Eating Event

  setInterval(eat2liveengine, 1000);

  function eat2liveengine( )
        {
          // Get today's date and time
          var now = new Date().getTime();
          const offset = new Date().getTimezoneOffset();
          var timezoneCorrect = offset * -60 ; // offset time in seconds
          // Find the eventEnd between now and the count down date
          var eventEnd = unixCountDownDate - now + (timezoneCorrect * 1000) + (durationSeconds * 1000);
          var eventStart = unixCountDownDate - now + (timezoneCorrect * 1000);
          // var eventCountdown = durationSeconds;
          // Time calculations for days, hours, minutes and seconds
          if (eventEnd < 0 ) {

              // Process Event has finished

              document.getElementById("clockbody").classList.add("fadeInUp", "animated","optionsHide");
              document.getElementById("chat-message").classList.add("fadeInUp", "animated","optionsHide");
              document.getElementById("renderer").classList.add('optionsHide');
              document.getElementById("joinLeaveButton").classList.add('optionsHide');
              document.getElementById("status").innerHTML = "<br> Sorry the Eating has finished <br><br>";

          }   else if (eventStart < 0  && eventEnd > 0 )   {

              // Eating is happening

              timerDisplay(eventEnd); // send event end to timer
              document.getElementById("renderer").classList.remove('optionsHide');
              document.getElementById("renderer").classList.add("fadeInUp", "animated");
              document.getElementById("clock").classList.add("fadeInDown", "animated","clockbody-on");
              document.getElementById("start-time-readout").innerHTML = "Eating in progress";
              document.getElementById("status").classList.remove('optionsHide');
              document.getElementById("join-container").classList.remove('optionsHide');
              receiveMessage(vidyoConnector);

          } else {

            // Eating Countdown // Eating has not started yet

            timerDisplay(eventStart); // send event end to timer
            document.getElementById("renderer").classList.add('optionsHide');
            document.getElementById("joinLeaveButton").classList.add('optionsHide');
            document.getElementById("start-time-readout").innerHTML = "";
            document.getElementById("status").classList.add('optionsHide');
            document.getElementById("chat-message").classList.add('optionsHide');
          }
        };


        // display timer

  function timerDisplay(eventDisplay){

    var days = Math.floor(eventDisplay / (1000 * 60 * 60 * 24));
    var hours = Math.floor((eventDisplay % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((eventDisplay % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((eventDisplay % (1000 * 60)) / 1000);

    document.getElementById("countdown-days").innerHTML = days;
    document.getElementById("countdown-hours").innerHTML = hours;
    document.getElementById("countdown-minutes").innerHTML = minutes;
    document.getElementById("countdown-seconds").innerHTML = seconds;

  }

        // Get seconds from date string sent as month + day + hour + minute

        function getSeconds(str) {
                var seconds = 0;
                var days = str.match(/(\d+)\s*d/);
                var hours = str.match(/(\d+)\s*h/);
                var minutes = str.match(/(\d+)\s*m/);
                if (days) { seconds += parseInt(days[1])*86400; }
                if (hours) { seconds += parseInt(hours[1])*3600; }
                if (minutes) { seconds += parseInt(minutes[1])*60; }
                return seconds;
                }

  });

  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { //Enter keycode
      alert('enter press');
  }

  function sendmessagea(){

    //  Send messsage to chat from text area - TODO create new function to share with hitting return

    var chatmessage = document.getElementById('chat-text').value;
    document.getElementById("chat-readout").classList.remove('optionsHide');
    vidyoConnector.SendChatMessage({message:chatmessage});
    document.getElementById("chat-readout").innerHTML += "<p>" + chatmessage + "</p>";
    // $("#chat-readout").append("<p>" + $(this).val() + " :" + displayName + "</p>" );
    document.getElementById("chat-text").value = "";

    // var textmessage = document.getElementById('chat-text').value;
    // // textmessage.classList.remove('optionsHide');
    // console.log(textmessage);
    // vidyoConnector.SendChatMessage({message:textmessage});
    // $("#chat-readout").append("<p>" + displayName + " : " + $(this).val() + "</p>" );
    // document.getElementById("chat-text").value = "";
    // e.preventDefault();
    //
  }


  function messagecheck(){
    receiveMessage(vidyoConnector);
  }

        // Get Content of text area and add to chattext live

  var textcontent = document.getElementById('textcontent');
  console.log(textContent);

  textcontent.onkeyup = textcontent.onkeypress = function(){document.getElementById('chat-readout').innerHTML = this.value;
  };





function openChat(){

  var element = document.getElementById("chat-message");
  // element.classList.toggle("optionsHide chat-opened");

  //  toggle chat-message window
  if (element.classList.contains('optionsHide')) {
      element.classList.add('wow', 'zoomIn', 'animated', 'fadeInUp');
      element.classList.remove('optionsHide');
      document.getElementById("video-render-container").style.gridTemplateColumns = "5fr 3fr 1fr";
  } else {
      element.classList.add('wow', 'animated', 'fadeOut');
      element.classList.add('optionsHide');
      document.getElementById("video-render-container").style.gridTemplateColumns = "7fr 1fr";
  }

}

function openMenu(){

  var element = document.getElementById("food-menu");
  // element.classList.toggle("optionsHide chat-opened");

  //  toggle chat-message window
  if (element.classList.contains('optionsHide')) {
      element.classList.add('wow', 'zoomIn', 'animated', 'fadeInUp');
      element.classList.remove('optionsHide');
      document.getElementById("video-render-container").style.gridTemplateColumns = "5fr 3fr 1fr";
  } else {
      element.classList.add('wow', 'animated', 'fadeOut');
      element.classList.add('optionsHide');
      document.getElementById("video-render-container").style.gridTemplateColumns = "7fr 1fr";
  }

}

// Go back button

function goBack() {
  window.history.back();
}

  //

function allowDropThis(i) {
    i.preventDefault();
}

function dragThis(i) {
    i.dataTransfer.setData("Dragged", i.target.id);
}

// Drop Item in right basket and add items automatically
function dropThis(i) {
    i.preventDefault();
    var data = i.dataTransfer.getData("Dragged");
    var parentId = document.getElementById(data).parentNode.id;
    i.target.appendChild(document.getElementById(data));
    var positionId = document.getElementById(data).parentNode.id;
    var classname = document.getElementById(positionId).className
    if (classname === "draggable") {
      document.getElementById('right-basket').appendChild(document.getElementById(data));
    }
    if (parentId == 'right-basket') {
    addBill(parentId);
    }
    else if (parentId == 'left-basket') {
      var parentId = 'right-basket';
      addBill(parentId);
    }

}

function findElementID(id) {
       var basket = document.getElementById(id).children;
       var basketItems = document.getElementById('basket-items');
       // console.log(basketItems);
       // console.log(basket);

       basketItems.innerHTML = "";
       // Loop through all the child elements inside the parent DIV.
       for (i = 0; i <= basket.length - 1; i++) {
           basketItems.innerHTML = basketItems.innerHTML + '<p>' + basket[i].innerHTML + '</p>' ;
       }
       // var basketItems_serialized = JSON.stringify(basket);
       // console.log(basketItems_serialized);
       // localStorage.setItem("billtotal", basketItems_serialized);
   }

   // add bill given id of basket

function addBill(id) {
    var billItems = document.getElementById(id).children;
    var billTotal = 0.0;
      for (let item of billItems) {
          var bill = document.getElementById(item.id).dataset.price;
          var billTotal = billTotal + parseFloat(bill);
      }
      document.getElementById("bill-total").innerHTML = "Total: £" + billTotal.toFixed(2);
    }

function sendFood() {
    findElementID('right-basket');
    document.getElementById("basket-items").classList.remove('optionsHide');
    document.getElementById("basket-items").classList.add("fadeInUp", "animated");
  }

function confirm() {
      var node = document.getElementById('basket-items');
      billContent = node.textContent;
      document.getElementById("bill").innerHTML = billContent;
      console.log(billContent);
      vidyoConnector.SendChatMessage({message:billContent});

    }


const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.food-containers')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
    // i.preventDefault();
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
