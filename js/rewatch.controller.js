angular
   .module('app')
   .controller('RewatchController', RewatchController);

RewatchController.$inject = ['currentAuth', 'firebaseArray', '$timeout'];

function RewatchController(currentAuth, firebaseArray, $timeout){
   var vm = this;
   var ref = 'rewatch/' + currentAuth.uid;

   vm.rewatch = firebaseArray.getByRef(ref);
   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;
   vm.currentSeason = currentSeason;

   function add() {
      var initRewatch = {
         init: false,
         showId: vm.seriesIndex,
         on: {s: '1', ep: '1'},
         show: initSeries(vm.shows[vm.seriesIndex].seasons)
      };

      firebaseArray.save(ref, initRewatch);
   }


   function initSeries(show) {
      var seasons = objSize(show);
      var seasonSize = 0;

      for(var i = 1; i <= seasons; i++){
         seasonsSize = objSize(show['season_' + i]);

         for (var j = 1; j <= seasonsSize; j++) {
            show['season_' + i][j].watched = false;
         }
      }
      return show;
   }

   function objSize(obj) {
      var count = 0;
      for (var prop in obj) {
         if (obj.hasOwnProperty(prop)) {
            ++count;
         }
      }
      return count;
   }

   function currentSeason(show, index) {
      var seasons = objSize(show);
      var seasonSize = 0;
      var watched = 0, onSeason = 1;

      for (var i = 1; i <= seasons; i++){
         seasonsSize = objSize(show['season_' + i]);

         for (var j = 1; j <= seasonsSize; j++) {
            if(show['season_' + i][j].watched === false){
               break;
            }
            watched++;
            if (watched == seasonsSize) {
               onSeason++;
            }
         }
      }

      vm.rewatch[index].currentSeason = onSeason;
      vm.rewatch.$save(index);
      return onSeason;
   }

}
