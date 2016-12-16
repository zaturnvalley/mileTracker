$(document).one('pageinit', function(){
  // Add Handler, tap is mobile for click
  $('#submitAdd').on('tap', addRun);

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
      miles: parseFloat(miles);
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
  
});