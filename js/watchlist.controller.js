angular
   .module('app')
   .controller('WatchlistController', WatchlistController);

WatchlistController.$inject = ['currentAuth', 'firebaseArray'];

function WatchlistController(currentAuth, firebaseArray){
   var vm = this;
   var ref = 'watchlist/' + currentAuth.uid;

   vm.watchlist = firebaseArray.getByRef(ref);
   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;

   function add() {
      var list = {
         seriesId: vm.series,
         watched: false
      };

      firebaseArray.save(ref, list);
   }

}
