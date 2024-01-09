// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(document).ready(function () {


  // Global variables
  // Startup the date engine
  const myDay = dayjs().date();
  const pretty = makeDatePretty(myDay)
  const myDatePretty = dayjs().format(`MMMM D[${pretty}], YYYY`);



// Event Listener for click events on the save button with the time-block id
// saves the value of the input field within a time block to the local storage when the corresponding save button is clicked, this corresponds to the specific hour of the time block

$('.time-block').click (function (a) {
  if ($(a.target).is("button")) {
    let id = $(this).attr("id");
    let match = id.match(/\d+$/);
  if (match && id.startsWith('hour')) {
    const blockInput = $(this).children()[1].value;
    localStorage.setItem("hour" + match[0], JSON.stringify(blockInput));
  }
  }
})

//Using the Past, Present and Future classes to account for which class of code should be used on the index page based on the if/then
// using something new "(/\d+$/)" to match and extract the numeric part at the end of the id that represents the hour of the time block
// checking if the id starts with "hour" and if the extracted hour matches the current hour according to the Day.js library if it matches, the "present" class is added and the "future" and "past" classes are removed, etc etc
// then retrieve 2nd child element of time block and store it as globalBlockInput
//then the stored value is retrieved and is assigned to the input unless it is null, replace is used to remove quotes
// finally, the text is updated to "currentDay" using myDatePretty as set in the global variables
$(".time-block").each(function () {
  let id = $(this).attr("id");
  let match = id.match(/\d+$/);
  console.log(id);
  console.log(match);
  console.log(match[0]);
  if (id && id.startsWith("hour")) {
    if (match[0] == dayjs().hour()) { 
      $(this).attr("class", "row time-block present")
    } else if (match[0] < dayjs().hour()) {
      $(this).attr("class", "row time-block past")
    } else if (match[0] > dayjs().hour()) {
      $(this).attr("class", "row time-block future")
    }
    let globalBlockInput = $(this).children()[1];
  globalBlockInput.value = localStorage.getItem("hour" + match[0]);
  if (globalBlockInput != null) {
      globalBlockInput.value = globalBlockInput.value.replace(/\"/g, "");
  }
    $("#currentDay").text(myDatePretty);
  }
});

// Function to make dates have the right ending using "makeDatePretty"
// the switch statement evaluates the remainder of the date divided by 10 using the %  if the date isn't between 3 and 21
// the "cases" are what to do when there are different remainders, aka 1,2,or 3,  if none of the above then its "th" again
function makeDatePretty(date) {
  if (date > 3 && date < 21) return 'th';
  switch (date % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
};
});
