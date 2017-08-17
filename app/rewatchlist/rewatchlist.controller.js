angular
   .module('app')
   .controller('RewatchlistController', RewatchlistController);

RewatchlistController.$inject = ['currentAuth', 'firebaseArray', '$timeout', 'helperFunctions', 'seriesInitService'];

function RewatchlistController(currentAuth, firebaseArray, $timeout, helperFunctions, seriesInitService){
   var vm = this;
   var rewatchRef = 'rewatch/' + currentAuth.uid;
   var showsRef = 'shows/' + currentAuth.uid;

   vm.popupOpen = false;
   vm.rewatch = firebaseArray.getByRef(rewatchRef);
   vm.shows = firebaseArray.getByRef(showsRef);
   vm.add = add;
   vm.openPopup = openPopup;

   function add() {
      var list = {
         showId: vm.seriesRef,
         on: {
            season: '1',
            episode: '1'
         },
         show: seriesInitService.initRewatchlist(vm.seriesRef, vm.shows)
      };

      firebaseArray.save(rewatchRef, list);
      vm.popupOpen = false;
   }

   function openPopup() {
      vm.popupOpen = true;
   }
}
