angular
   .module('app')
   .controller('ShowsController', ShowsController);

ShowsController.$inject = ['firebaseArray', 'episodateApi', 'helperFunctions', '$timeout'];

function ShowsController(firebaseArray, episodateApi, helperFunctions, $timeout){
   var vm = this;

   vm.popupOpen = false;
   vm.sendStatus = {
      disableButton: false,
      loader: false
   }
   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;
   vm.openPopup = openPopup;

   function add() {
      var series = vm.series;
      if (vm.series) {
         vm.sendStatus.disableButton = true;
         vm.sendStatus.loader = true;

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

   function openPopup() {
      vm.popupOpen = true;
   }
}
