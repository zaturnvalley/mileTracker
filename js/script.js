$(document).one('pageinit', function(){
  //Display Runs
  showRuns();
  // Add Handler, tap is mobile for click
  $('#submitAdd').on('tap', addRun);
  // Edit Handler, tap is mobile for click
  $('#submitEdit').on('tap', editRun);
  // Set Current Handler, tap is mobile for click
  $('#stats').on('tap', '#editLink', setCurrent);
  /* 
  * Show all runs on homepage
  */
  function showRuns(){
    // get runs object
    var runs = getRunsObject();

    // check if empty
    if (runs != '' && runs != null){
      for (var i = 0; i < runs.length; i++) {
        $('#stats').append(`<li class="ui-body-inherit ui-li-static">
                            <strong>Date:</strong>` + runs[i]["date"] + 
                            `<br><strong>Distance: </strong>` + runs[i]["miles"] + 
                            `m<div class="controls"><a href="#edit" id="editLink" data-miles="` + 
                            runs[i]['miles'] + `"data-date="` + runs[i]['date'] + `">Edit</a> | 
                            <a href="#">Delete</a></div></li>`);
      }
      $('#home').bind('pageinit', function(){
        $('#stats').listview('refresh');
      });
    }
  }
  /* 
  * Add a run
  */
  function addRun(){
    // Get form values
    var miles = $('#addMiles').val();
    var date = $('#addDate').val();

    // Create 'run' object
    var run = {
      date: date,
      miles: parseFloat(miles)
    };

    var runs = getRunsObject();

    // Add run to runs array
    runs.push(run);

    alert('Run added');

    // Set stringified object to local storage
    localStorage.setItem('runs', JSON.stringify(runs));

    // Redirect to index page
    window.location.href="index.html";

    return false;
  }
  /* 
  *  Edit Run
  */
  function editRun(){
    // Get current data
    currentMiles = localStorage.getItem('currentMiles');
    currentDate = localStorage.getItem('currentDate');

    var runs = getRunsObject();

    // Loop through current runs
    for(var i = 0; i < runs.length; i++){
      if(runs[i].miles == currentMiles && runs[i].date == currentDate){
        runs.splice(i, 1);
      }
      localStorage.setItem('runs', JSON.stringify(runs));
    }

    // Get form values
    var miles = $('#editMiles').val();
    var date = $('#editDate').val();

    // Create 'run' object
    var updateRun = {
      date: date,
      miles: parseFloat(miles)
    };

    // Edit run from runs array
    runs.push(updateRun);

    alert('Run updated');

    // Set stringified object to local storage
    localStorage.setItem('runs', JSON.stringify(runs));

    // Redirect to index page
    window.location.href="index.html";

    return false;
  }
  /* 
  * Get runs object
  */

  function getRunsObject() {
    // Set runs array
    var runs = new Array();
    // Get current runs from localStorage, comes back as string
    var currentRuns = localStorage.getItem('runs');

    // Check local storage
    if(currentRuns != null){
      // Set to runs
      var runs = JSON.parse(currentRuns);
    }
    // Return runs object
    return runs.sort(function(a,b){return new Date(b.date) - new Date(a.date)});
  }
  /* 
  * Set current clicked miles & date
  */
  function setCurrent(){
    // Set ls items
    localStorage.setItem('currentMiles', $(this).data('miles'));
    localStorage.setItem('currentDate', $(this).data('date'));

    // Insert form fields
    $('#editMiles').val(localStorage.getItem('currentMiles'));
    $('#editDate').val(localStorage.getItem('currentDate'));

  }
});