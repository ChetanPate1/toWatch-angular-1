angular
   .module('app')
   .controller('WatchlistController', WatchlistController);

WatchlistController.$inject = ['currentAuth', 'firebaseArray', '$timeout', 'helperFunctions', 'episodateApi'];

function WatchlistController(currentAuth, firebaseArray, $timeout, helperFunctions, episodateApi){
   var vm = this;
   var ref = 'watchlist/' + currentAuth.uid;
   var today = new Date().getTime();

   vm.watchlist = firebaseArray.getByRef(ref);
   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;
   vm.nextAired = nextAired;
   vm.checkAired = checkAired;

   function add() {
      var list = {
         upToDate: false,
         showId: vm.seriesRef,
         on: {
            season: vm.season,
            episode: vm.episode
         },
         unwatched: {}
      };
      list['unwatched'] = initSeries(list);
      // firebaseArray.save(ref, list);
   }
   
   function initSeries(watchlist) {
      var init = {};
      var show = vm.shows.$getRecord(watchlist.showId);
      var total_seasons = helperFunctions.objSize(show.seasons);

      var onE = parseInt(watchlist.on.episode);
      var onS = parseInt(watchlist.on.season);
      var total_episodes_onS = helperFunctions.objSize(show.seasons['season_'+ onS]);

      var seasonSize = 0;

      for(onS; onS <= total_seasons; onS++){
         seasonsSize = helperFunctions.objSize(show.seasons['season_'+ onS]);
         init['season_' + onS] = show.seasons['season_'+ onS];

         for (var j = 1; j <= seasonsSize; j++) {
            init['season_' + onS][j].watched = false;

            if(j < onE){
               init['season_' + onS][j].watched = true;
            }
         }
      }

      return init;
   }

   function nextAired(watchlist) {
      var nextAired, i = 1, j = 1, unwatched = {};
      var show = vm.shows.$getRecord(watchlist.showId);
      var seasons = helperFunctions.objSize(show.seasons);
      var latestSeason = show.seasons['season_'+ seasons];
      var episodes = helperFunctions.objSize(latestSeason);
      var onEp = parseInt(watchlist.on.episode);
      var onS = parseInt(watchlist.on.season);

      for (j; j <= episodes; j++) {
         unwatched[j] = {
            watched: false,
            airDate: latestSeason[j].airDate
         };

         if(j < onEp){
            unwatched[j].watched = true;
         }
      }

      for (i; i <= episodes; i++) {
         unwatched[i].aired = true;

         if (latestSeason[i].airDate - today > 0){
            unwatched[i].aired = false;
            nextAired = latestSeason[i].airDate;
            break;
         }
      }

      return {  unwatched: unwatched, nextAired: nextAired };
   }

   function checkAired(date) {
      date = parseInt(date);
      return date - today < 0;
   }
}
