

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
      document.getElementById("msg").innerHTML = "Connected!! YAY! bear";
        // document.getElementById("vertical-center").className.fadeOut(1000) = "optionsHide";
      },
      onFailure: function(reason){
        console.error("Connection failed");
        const p = document.getElementById('controls');
        p.classList.remove('optionsHide');
        document.getElementById("msg").innerHTML = "Connections failed bear" + reason;
        // document.getElementById("join-container").className = "optionsHide";
        // document.getElementById("controls").classList.remove("optionsHide");
      },
      onDisconnected: function(reason) {
        console.log(" disconnected - " + reason);
        document.getElementById("msg").innerHTML = "disconnected - " + reason;
      }
    })
  }




jQuery(document).ready(function ($) {

      $('.open-popup-link').magnificPopup({
      type:'inline',
      midClick: true,
      removalDelay: 100,
      mainClass: 'mfp-fade' // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
      });


      $('.open-popup-link').magnificPopup('close').delay("2000");


  // document.getElementById("chatsubmit").addEventListener("click", function(event){
  //     event.preventDefault();
  //       });



        // Do message check



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

          console.log(eventEnd);
          console.log(eventStart);

          // Time calculations for days, hours, minutes and seconds


          if (eventEnd < 0 ) {

              // Event has finished

              // document.getElementById("status").classList.add("fadeInUp", "animated", "optionsHide");
              document.getElementById("clockbody").classList.add("fadeInUp", "animated","optionsHide");
              document.getElementById("chat-message").classList.add("fadeInUp", "animated","optionsHide");
              document.getElementById("renderer").classList.add('optionsHide');
              document.getElementById("joinLeaveButton").classList.add('optionsHide');
              document.getElementById("status").innerHTML = "<br> Sorry the Eating has finished <br><br>";

          } else if (eventStart < 0  && eventEnd > 0 )   {

              // Eating is happening

              timerDisplay(eventEnd);

              document.getElementById("renderer").classList.remove('optionsHide');
              document.getElementById("renderer").classList.add("fadeInUp", "animated");
              document.getElementById("clock").classList.add("fadeInDown", "animated","clockbody-on");
              document.getElementById("start-time-readout").innerHTML = "Eating in progress";
              document.getElementById("status").classList.remove('optionsHide');
              receiveMessage(vidyoConnector);

          } else {

            // Eating Countdown // Eating has not started yet

            timerDisplay(eventStart);
            document.getElementById("renderer").classList.add('optionsHide');
            document.getElementById("joinLeaveButton").classList.add('optionsHide');
            document.getElementById("start-time-readout").innerHTML = "";
            document.getElementById("status").classList.add('optionsHide');
            document.getElementById("chat-message").classList.add('optionsHide');
          }
        };


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

  function messagecheck(){
    receiveMessage(vidyoConnector);
  }

        // Get Content of text area and add to chattext live

  var textcontent = document.getElementById('textcontent');

  textcontent.onkeyup = textcontent.onkeypress = function(){document.getElementById('chattext').innerHTML = this.value;
  };


  function sendmessagea(){

    //  this functions as a send messsage to chat on entering into text area

    var chatmessage = document.getElementById('chattext');

    textContent = chatmessage.textContent;
    vidyoConnector.SendChatMessage({message:textContent});
    document.getElementById("chat-message").innerHTML += "<p>" + textContent + "</p>";
    document.getElementById("textcontent").value = "";
  }

function allowDropThis(i) {
    i.preventDefault();
}

function dragThis(i) {
    i.dataTransfer.setData("Dragged", i.target.id);
}

function dropThis(i) {
    i.preventDefault();
    var data = i.dataTransfer.getData("Dragged");
    var parentId = document.getElementById(data).parentNode.id;
    console.log("start");
    console.log(data);

    i.target.appendChild(document.getElementById(data));
    var positionId = document.getElementById(data).parentNode.id;
    var classname = document.getElementById(positionId).className
    console.log(classname);
    console.log(parentId);
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
       var msg = document.getElementById('msg');
       localStorage.setItem("billtotal", msg);
       msg.innerHTML = "";
       // Loop through all the child elements inside the parent DIV.
       for (i = 0; i <= basket.length - 1; i++) {
           msg.innerHTML = msg.innerHTML + '<p>' + basket[i].innerHTML + '</p>' ;
       }
   }

function addBill(id) {
    var billItems = document.getElementById(id).children;
    var billTotal = 0.0;
      for (let item of billItems) {
          var bill = document.getElementById(item.id).dataset.price;
          var billTotal = billTotal + parseFloat(bill);
      };

      document.getElementById("bill-total").innerHTML = "Total: £" + billTotal.toFixed(2);

      // Check browser support
      if (typeof(Storage) !== "undefined") {
        // Store

        // Retrieve
        document.getElementById("bill").innerHTML = localStorage.getItem("billtotal");
      } else {
        document.getElementById("bill").innerHTML = "Sorry, your browser does not support Web Storage...";
      }


    }



function sendFood() {
    findElementID('right-basket');
  }

function confirm() {
      billContent = localStorage.getItem("billtotal");
      vidyoConnector.SendChatMessage({message:billContent});
      console.log(billContent);
    }


// jQuery(document).ready(function ($) {
//
//           $('.open-popup-link').magnificPopup({
//           type:'inline',
//           midClick: true,
//           removalDelay: 100,
//           mainClass: 'mfp-fade' // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
//           });
//
//
//           $('.open-popup-link').magnificPopup('close').delay("2000");
//
//
//   });


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
