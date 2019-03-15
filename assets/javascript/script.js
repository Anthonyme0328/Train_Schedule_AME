 // Firebase initilization 
 var config = {
    apiKey: "AIzaSyCRauWafbVjEusHR1z1yDkiPwzIOnWrvHc",
    authDomain: "train-hw-ame.firebaseapp.com",
    databaseURL: "https://train-hw-ame.firebaseio.com",
    projectId: "train-hw-ame",
    storageBucket: "train-hw-ame.appspot.com",
    messagingSenderId: "716085648795"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $('#addTrainBtn').on("click", function() {

    // grabs what was typed into the input feilds
    var trainName = $("#trainNameInput").val().trim();

    var destination = $("#destinationInput").val().trim();

    var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");

    var frequency = $("#frequencyInput").val().trim();

    // object to store data temp.
    var newTrain = {

        name: trainName,

        place: destination,

        ftrain: firstTrain,

        freq: frequency
      }
      // puts new data into firebase database
    database.ref().push(newTrain);

    // makes feilds empty after data is push into database
    $("#trainNameInput").val("");

    $("#destinationInput").val("");

    $("#timeInput").val("");

    $("#frequencyInput").val("");

    return false;
  });

  // event listener to add a row into html based on user input
  database.ref().on("child_added", function(childSnapshot) {

    // childsnapshot values are stored
    var trainName = childSnapshot.val().name;

    var destination = childSnapshot.val().place;

    var firstTrain = childSnapshot.val().ftrain;

    var frequency = childSnapshot.val().freq;



    var firstTimeConverted = moment(firstTrain, "HH:mm");

    var currentTime = moment().format("HH:mm");

    // differences are stored
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");

    // stores the remainder into var
    var timeRemainder = timeDiff % frequency;

    var minToTrain = frequency - timeRemainder;

    var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");

    $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain +

    "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
    
  });
  