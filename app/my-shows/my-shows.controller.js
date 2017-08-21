angular
   .module('app')
   .controller('MyShowsController', MyShowsController);

MyShowsController.$inject = ['currentAuth', 'firebaseArray', 'episodateApi', 'helperFunctions', '$timeout'];

function MyShowsController(currentAuth, firebaseArray, episodateApi, helperFunctions, $timeout){
   var vm = this;
   var ref = 'shows/' + currentAuth.uid;

   vm.uid = currentAuth.uid;
   vm.foundShows = [];
   vm.sendStatus = {
      disableButton: false,
      loader: false,
      validation: ''
   };

   vm.shows = firebaseArray.getByRef(ref);
   vm.add = add;
   vm.find = find;

   function add(series) {
      vm.foundShows = [];
      vm.sendStatus.loader = true;
      episodateApi.getShow(series).then(function(showData) {
         if (showData.seasons) {
            showData.requestData = series;

            $timeout(function() {
               firebaseArray.save(ref, showData);
               vm.series = '';
            }, 2000);
         }
         vm.sendStatus.disableButton = false;
         vm.sendStatus.loader = false;
      });
   }

   function find() {
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
            episodateApi.search(series).then(function(data) {
               if (helperFunctions.objSize(data) < 1) {
                  add(series);
               }else {
                  vm.foundShows = data;
               }
            });
            vm.sendStatus.disableButton = false;
            vm.sendStatus.loader = false;
         }
      }
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
