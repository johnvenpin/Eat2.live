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
        console.log("Create success");
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
        document.getElementById("status").innerHTML = "Connected!! YAY!";
        document.getElementById("vertical-center").className.fadeOut(1000) = "optionsHide";
      },
      onFailure: function(reason){
        console.error("Connection failed");
        const p = document.getElementById('controls');
        p.classList.remove('optionsHide');
        document.getElementById("status").innerHTML = "Connections1 failed " + reason;
        // document.getElementById("join-container").className = "optionsHide";
        // document.getElementById("controls").classList.remove("optionsHide");



      },
      onDisconnected: function(reason) {
        console.log(" disconnected - " + reason);
        document.getElementById("status").innerHTML = "disconnected - " + reason;
      }
    })
  }
