angular
   .module('app')
   .controller('WatchlistController', WatchlistController);

WatchlistController.$inject = ['currentAuth', 'firebaseArray', '$timeout', 'helperFunctions', 'episodateApi', 'seriesInitService'];

function WatchlistController(currentAuth, firebaseArray, $timeout, helperFunctions, episodateApi, seriesInitService){
   var vm = this;
   var showsRef = 'shows/' + currentAuth.uid;
   var watchlistRef = 'watchlist/' + currentAuth.uid;
   var today = new Date().getTime();

   vm.popupOpen = false;
   vm.toast = {
      content: '',
      show: false
   };
   vm.watchlist = firebaseArray.getByRef(watchlistRef);
   vm.shows = firebaseArray.getByRef(showsRef);
   vm.add = add;
   vm.nextAired = nextAired;
   vm.checkAired = checkAired;
   vm.openPopup = openPopup;
   vm.seriesAlreadyAdded = seriesAlreadyAdded;
   vm.checkShowExist = checkShowExist;
   vm.showToast = showToast;

   function add() {
      var show = vm.shows.$getRecord(vm.seriesRef).series;
      var list = {
         lastUpdated: today,
         upToDate: false,
         showId: vm.seriesRef,
         on: {
            season: vm.season,
            episode: vm.episode
         },
         unwatched: {}
      };
      list['unwatched'] = seriesInitService.initWatchlist(list, vm.shows);

      firebaseArray.save(watchlistRef, list);
      showToast(show, 'added to Watch list');
      vm.seriesRef = '';
      vm.season = '';
      vm.episode = '';
      vm.popupOpen = false;
   }

   function nextAired(watchlist) {
      var nextAired, i = 1;
      var show = vm.shows.$getRecord(watchlist.showId);
      var seasons = helperFunctions.objSize(show.seasons);
      var latestSeason = show.seasons['season_' + seasons];
      var latestSeasonSize = helperFunctions.objSize(latestSeason);

      for (i; i <= latestSeasonSize; i++) {
         if (latestSeason[i].airDate - today > 0){
            return latestSeason[i].airDate;
         }
      }
   }

   function checkAired(date) {
      date = parseInt(date);
      return date - today < 0;
   }

   function openPopup() {
      vm.popupOpen = true;
   }

   function seriesAlreadyAdded(seriesId){
      var i = 0, exists = false;

      for (i = 0; i < vm.watchlist.length; i++) {
         if (vm.watchlist[i].showId == seriesId) {
            exists = true;
         }
      }

      return exists;
   }

   function checkShowExist(showId, index) {
      if(vm.shows.$getRecord(showId)){
         return true;
      }else {
         vm.watchlist.$remove(index);
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
