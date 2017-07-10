angular
   .module('app')
   .controller('WatchlistController', WatchlistController);

WatchlistController.$inject = ['currentAuth', 'firebaseArray'];

function WatchlistController(currentAuth, firebaseArray){
   var vm = this;
   var uid = currentAuth.uid;

   vm.watchlist = firebaseArray.getAll();
   vm.add = add;

   function add() {
      var list = {
         series: vm.series,
         season: vm.season,
         episode: vm.episode,
         airDate: vm.airDate,
         watched: false
      };
      firebaseArray.save('watchlist/'+ uid, list);
   }

}
