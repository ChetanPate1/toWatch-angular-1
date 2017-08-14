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
}
