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
   vm.watchlist = firebaseArray.getByRef(watchlistRef);
   vm.shows = firebaseArray.getByRef(showsRef);
   vm.add = add;
   vm.nextAired = nextAired;
   vm.checkAired = checkAired;
   vm.openPopup = openPopup;
   vm.seriesAlreadyAdded = seriesAlreadyAdded;

   function add() {
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
      list['unwatched'] = seriesInitService.initWatchlist(list);

      firebaseArray.save(watchlistRef, list);
      vm.seriesRef = '';
      vm.season = '';
      vm.episode = '';
      vm.popupOpen = false;
   }

   function nextAired(watchlist) {
      var nextAired, i = 1, airDate = 0;
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
}
