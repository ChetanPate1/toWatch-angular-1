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

   $timeout(function () {
      var test = vm.rewatch[1].show;
      console.log(test);
      currentSeason(test);
   }, 1000);

   function currentSeason(show) {
      var seasons = objSize(show);
      var seasonSize = 0;
      var k = 0, onSeason = 1;

      for (var i = 1; i <= seasons; i++){
         seasonsSize = objSize(show['season_' + i]);

         for (var j = 1; j <= seasonsSize; j++) {
            if(show['season_' + i][j].watched === true){
               k++;
               if (k == seasonsSize) {
                  console.log('seasonsSize '+seasonsSize);
                  onSeason++;
               }
            }
            console.log(show['season_' + i][j].watched,'watched '+ k);

         }


      }

      console.log('onSeason '+ onSeason);
      // return onSeason;
   }

   //progress next season function

}
