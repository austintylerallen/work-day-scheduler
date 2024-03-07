$(document).ready(function() {
    // Display's the current date in the header
    var currentDate = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = currentDate.toLocaleDateString('en-US', options);
    $('#currentDate').text(formattedDate);
  
    // Gets the current hour using Day.js
    var currentHour = dayjs().hour();
  
    // Loops through each time-block
    $('.time-block').each(function () {
        var blockId = $(this).attr('id');
        var blockHour = parseInt(blockId.split('-')[1]);
  
        // Adds past, present, or future class based on the current hour
        if (blockHour < currentHour) {
            $(this).addClass('past');
        } else if (blockHour === currentHour) {
            $(this).addClass('present');
        } else {
            $(this).addClass('future');
        }
  
        // Retrieves user input from local storage and set textarea values
        var userInput = localStorage.getItem(blockId);
        $(this).find('.description').val(userInput);
    });
  
    // Adds click event listener to save button
    $('.saveBtn').click(function () {
        var timeBlockId = $(this).closest('.time-block').attr('id');
        var userInput = $(this).siblings('.description').val();
        localStorage.setItem(timeBlockId, userInput);
        
        // Provides feedback when saving data
        $('#message').text('Your data has been saved to local storage!');
    });
  });