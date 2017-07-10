angular
   .module('app')
   .controller('WatchlistController', WatchlistController);

WatchlistController.$inject = ['firebaseArray'];

function WatchlistController(firebaseArray){
   var vm = this;

   vm.watchlist = firebaseArray.getAll();

}
