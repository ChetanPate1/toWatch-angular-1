angular
   .module('app')
   .factory('seriesInitService', seriesInitService);

seriesInitService.$inject = ['firebaseArray', 'helperFunctions'];

function seriesInitService(firebaseArray, helperFunctions){
   var shows = firebaseArray.getByRef('shows');
   var service = {
      initWatchlist: initWatchlist,
      initRewatchlist: initRewatchlist
   };

   function initWatchlist(watchlist) {
      var init = {};
      var show = shows.$getRecord(watchlist.showId);
      var total_seasons = helperFunctions.objSize(show.seasons);
      var onE = parseInt(watchlist.on.episode);
      var onS = parseInt(watchlist.on.season);
      var i = onS;
      var total_episodes_onS = helperFunctions.objSize(show.seasons['season_'+ onS]);
      var seasonSize = 0;

      for(i; i <= total_seasons; i++){
         seasonsSize = helperFunctions.objSize(show.seasons['season_'+ i]);
         init['season_' + i] = show.seasons['season_'+ i];
         init['season_' + i][0] = i;

         for (var j = 1; j <= seasonsSize; j++) {
            init['season_' + i][j].watched = false;

            if(j < onE && i == onS){
               init['season_' + i][j].watched = true;
            }
         }
      }
      return init;
   }

   function initRewatchlist(showId) {
      var show = {};
      var series = shows.$getRecord(showId).seasons;
      var seasons = helperFunctions.objSize(series);
      var seasonSize = 0, i = 1, j = 1;

      for(i; i <= seasons; i++){
         seasonsSize = helperFunctions.objSize(series['season_' + i]);

         for(j; j <= seasonsSize; j++) {
            series['season_' + i][j].watched = false;
         }
      }

      return series;
   }

   return service;
}
