angular
   .module('app')
   .controller('ShowsController', ShowsController);

ShowsController.$inject = ['firebaseArray', 'episodateApi', 'helperFunctions', '$timeout'];

function ShowsController(firebaseArray, episodateApi, helperFunctions, $timeout){
   var vm = this;

   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;

   function add() {
      var series = vm.series;
      if (vm.series) {
         series = helperFunctions.spacesToDashes(series);

         episodateApi.getShow(series)
            .then(function(showData) {

               if (showData.seasons) {
                  vm.h = showData;
                  firebaseArray.save('shows', showData);
               }else {

               }
            }
         );
      }
   }
}
