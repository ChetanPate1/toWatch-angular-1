angular
   .module('app')
   .controller('RewatchlistController', RewatchlistController);

RewatchlistController.$inject = ['currentAuth', 'firebaseArray', '$timeout', 'helperFunctions', 'seriesInitService'];

function RewatchlistController(currentAuth, firebaseArray, $timeout, helperFunctions, seriesInitService){
   var vm = this;
   var ref = 'rewatch/' + currentAuth.uid;

   vm.popupOpen = false;
   vm.rewatch = firebaseArray.getByRef(ref);
   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;
   vm.openPopup = openPopup;

   function add() {
      var list = {
         showId: vm.seriesRef,
         on: {
            season: '1',
            episode: '1'
         },
         show: seriesInitService.initRewatchlist(vm.seriesRef)
      };

      firebaseArray.save(ref, list);
      vm.popupOpen = false;
   }

   function openPopup() {
      vm.popupOpen = true;
   }
}
