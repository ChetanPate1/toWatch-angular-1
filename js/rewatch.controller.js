angular
   .module('app')
   .controller('RewatchController', RewatchController);

RewatchController.$inject = ['currentAuth', 'firebaseArray'];

function RewatchController(currentAuth, firebaseArray){
   var vm = this;
   var ref = 'rewatch/' + currentAuth.uid;

   vm.open = false;
   vm.rewatch = firebaseArray.getByRef(ref);
   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;
   vm.toggleOpen = toggleOpen;

   function toggleOpen() {
      vm.open = !vm.open;
   }

   function add() {
      var initRewatch = {
         showId: vm.seriesIndex,
         currentSeason: '1',
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

   //watched function

}
