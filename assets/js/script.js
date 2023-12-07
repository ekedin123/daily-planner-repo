$(function () {
  var today = dayjs();
  var listCont = $(".container-fluid");
  var hours = today.format("H");
  var locTime = parseInt(hours);
  var events = $(".container-fluid").children().length;
  //timer function
  CurrentTime();
  function CurrentTime() {
    var time = dayjs();
    $("#currentDay").text(time.format("MMM DD YYYY hh:mm a"));
    setInterval(CurrentTime, 1000);
  }
  //for loop to iterate over each div element which adds dynamic effects for each hour
  for (var i = 0; i < events; i++) {
    if (i + 9 < locTime) {
      $(listCont.children("div")[i]).addClass("past");
    }
    if (i + 9 == locTime) {
      $(listCont.children("div")[i]).addClass("present");
    }
    if (i + 9 > locTime) {
      $(listCont.children("div")[i]).addClass("future");
    }
  }

  //event listener for saving user input into local storage on click
  $(".btn").on("click", function (event) {
    event.preventDefault();
    var createDate = $(this).parent().attr("id");
    var saveData = JSON.parse(localStorage.getItem("createDate")) || [];
    var userInput = $("#" + createDate)
      .children("textarea")
      .val();
    saveData.push({ createDate, userInput });
    localStorage.setItem("createDate", JSON.stringify(saveData));
  });
  //function that saves user input
  function displayNotes() {
    var saveData = JSON.parse(localStorage.getItem("createDate"));
    for (var i = 0; i < saveData.length; i++) {
      var checkTime = saveData[i].createDate;
      $("#" + checkTime)
        .children("textarea")
        .val(saveData[i].userInput);
    }
  }
  //function call
  displayNotes();
});
