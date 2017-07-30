angular
   .module('app')
   .controller('RewatchController', RewatchController);

RewatchController.$inject = ['currentAuth', 'firebaseArray', '$timeout', 'helperFunctions'];

function RewatchController(currentAuth, firebaseArray, $timeout, helperFunctions){
   var vm = this;
   var ref = 'rewatch/' + currentAuth.uid;

   vm.rewatch = firebaseArray.getByRef(ref);
   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;

   function add() {
      var initRewatch = {
         showId: vm.seriesRef,
         on: {
            season: '1',
            episode: '1'
         },
         show: initSeries(vm.shows.$getRecord(vm.seriesRef).seasons)
      };

      firebaseArray.save(ref, initRewatch);
   }

//suits,got on season 7 Episode 3

   function initSeries(show) {
      var seasons = helperFunctions.objSize(show);
      var seasonSize = 0;

      for(var i = 1; i <= seasons; i++){
         seasonsSize = helperFunctions.objSize(show['season_' + i]);

         for (var j = 1; j <= seasonsSize; j++) {
            show['season_' + i][j].watched = false;
         }
      }
      return show;
   }
}
