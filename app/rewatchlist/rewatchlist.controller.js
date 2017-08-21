angular
   .module('app')
   .controller('RewatchlistController', RewatchlistController);

RewatchlistController.$inject = ['currentAuth', 'firebaseArray', '$timeout', 'helperFunctions', 'seriesInitService'];

function RewatchlistController(currentAuth, firebaseArray, $timeout, helperFunctions, seriesInitService){
   var vm = this;
   var rewatchRef = 'rewatch/' + currentAuth.uid;
   var showsRef = 'shows/' + currentAuth.uid;

   vm.popupOpen = false;
   vm.toast = {
      content: '',
      action: '',
      show: false
   };
   vm.rewatch = firebaseArray.getByRef(rewatchRef);
   vm.shows = firebaseArray.getByRef(showsRef);
   vm.add = add;
   vm.openPopup = openPopup;
   vm.checkShowExist = checkShowExist;
   vm.showToast = showToast;

   function add() {
      var show = vm.shows.$getRecord(vm.seriesRef).series;
      var list = {
         showId: vm.seriesRef,
         on: {
            season: '1',
            episode: '1'
         },
         show: seriesInitService.initRewatchlist(vm.seriesRef, vm.shows)
      };

      showToast(show, 'added to Rewatch list');
      firebaseArray.save(rewatchRef, list);
      vm.popupOpen = false;
   }

   function openPopup() {
      vm.popupOpen = true;
   }

   function checkShowExist(showId, index) {
      if(vm.shows.$getRecord(showId)){
         return true;
      }else {
         vm.rewatch.$remove(index);
         return false;
      }
   }

   function showToast(content, action) {
      vm.toast.content = content;
      vm.toast.action = action;
      vm.toast.show = true;
      $timeout(function() {
         vm.toast.show = false;
      }, 3000);
   }
}
