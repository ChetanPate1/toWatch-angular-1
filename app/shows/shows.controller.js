angular
   .module('app')
   .controller('ShowsController', ShowsController);

ShowsController.$inject = ['firebaseArray', 'episodateApi', 'helperFunctions', '$timeout'];

function ShowsController(firebaseArray, episodateApi, helperFunctions, $timeout){
   var vm = this;

   vm.popupOpen = false;
   vm.sendStatus = {
      disableButton: false,
      loader: false,
      validation: ''
   };

   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;
   vm.openPopup = openPopup;

   function add() {
      var series = vm.series;

      if (vm.series) {
         vm.sendStatus.disableButton = true;
         vm.sendStatus.loader = true;
         if (seriesExists(series)) {
            vm.series = '';
            vm.sendStatus.disableButton = false;
            vm.sendStatus.loader = false;
         }else {
            series = helperFunctions.spacesToDashes(series);
            episodateApi.getShow(series).then(function(showData) {
               $timeout(function() {
                  if (showData.seasons) {
                     firebaseArray.save('shows', showData);
                     vm.series = '';
                  }
                  vm.sendStatus.disableButton = false;
                  vm.sendStatus.loader = false;
               }, 2000);
            });
         }
      }
   }

   function openPopup() {
      vm.popupOpen = true;
   }

   function seriesExists(series) {
      var shows = vm.shows, i = 0, exists = false;

      for (i = 0; i < shows.length; i++) {
         if (shows[i].series.toLowerCase() == series.toLowerCase()) {
            exists = true;
         }
      }
      return exists;
   }

   function updateAll() {
      var shows = vm.shows;
      var numberOfShows = shows.length;
      var seriesName;

      for (var i = 0; i < 2; i++) {
         if (shows[i].status === 'Running') {
            seriesName = helperFunctions.spacesToDashes(shows[i].series);
         }

         episodateApi.getShow(seriesName).then(function(showData) {
            // shows[i].seasons = showData.seasons;
            console.log('showData', showData);
         });
      }
   }

   $timeout(function() {
      updateAll();
   }, 2000);
   $timeout(function() {
      // console.log(vm.shows);
   }, 4000);
}
