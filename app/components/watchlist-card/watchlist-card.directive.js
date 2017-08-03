/*
<watchlist-card>
   <more-button></more-button>
   <season-tabs>
      <tab-content-layout></tab-content-layout>
   </season-tabs>
   <frost-glass>
      <countdown-timer></countdown-timer>
   <frost-glass>
</watchlist-card>
*/
angular
   .module('app')
   .directive('watchlistCard', watchlistCard);

function watchlistCard(helperFunctions) {
   var directive = {
      link: link,
      templateUrl: 'components/watchlist-card/watchlist-card.html',
      restrict: 'E',
      transclude: {
         frostGlass: 'frostGlass'
      },
      scope: {
         heading: '=',
         subheading: '=',
         details: '=',
         imgsrc: '=',
         seasons: '=',
         currentseason: '=',
         watchlistobj: '=',
         index: '='
      }
   };

   function link(scope) {
      var now = new Date().getTime();
      scope.deleteOpen = false;
      scope.open = false;
      scope.upToDate = false;

      scope.toggleOpen = toggleOpen;
      scope.save = save;
      scope.aired = aired;
      scope.countWatched = countWatched;

      scope.tabActive = scope.currentseason;
      scope.tabSelect = tabSelect;
      scope.isTabSelected = isTabSelected;
      scope.hasAired = hasAired;
      scope.limitLength = limitLength;

      scope.behindCount = behindCount;

      function toggleOpen() {
         scope.open = !scope.open;
      }

      function save(watchlistobj, index, seasoninfo, watchlist, episodeNumber) {
         var airDate = parseInt(watchlist.airDate);
         var on = parseInt(watchlistobj[index].on.episode);
         var isOneLessOneMore = episodeNumber == on || episodeNumber == on - 1 && (scope.tabActive).toString() == watchlistobj[index].on.season;

         console.log(episodeNumber, 'isOneLessOneMore ', isOneLessOneMore);

         if( Math.abs(airDate - now) < 0 || !isOneLessOneMore){
            return;
         }else {
            watchlist.watched = !watchlist.watched;
            countWatched(seasoninfo, watchlistobj, index);
            // watchlistobj.$save(index);
         }
      }

      function aired(date) {
         if(!date){
            return;
         }
         date = parseInt(date);
         var delta = Math.abs((date - now))/1000;
         var aired = { aired: date - now < 0 };

         if( date - now < 0 ){
            aired.by = '-' + Math.ceil(delta / 86400) + ' days';
            if(Math.ceil(delta / 86400) > 30){
               aired.by = 'aired';
            }
         }
         else {
            aired.by = 'not aired';
         }

         return aired;
      }

      function countWatched(seasoninfo, watchlistobj, index) {
         var isLastSeason = watchlistobj[index].unwatched['season_'+ nextSeason] == undefined;

         var currentSeason = parseInt(watchlistobj[index].on.season);
         var nextSeason = currentSeason + 1;
         var seasonsLimit = helperFunctions.objSize(seasoninfo) + currentSeason;
         var count = 0, j = 1, totalEpisodes = 0, season, on = 1;

         for (currentSeason; currentSeason < seasonsLimit; currentSeason++) {
            season = seasoninfo['season_' + currentSeason];
            totalEpisodes = helperFunctions.objSize(season);

            for (j; j < totalEpisodes; j++) {
               if(season[j].watched){
                  count++;
               }
               if (!season[j].watched) {
                  on = count + 1;
               }
            }

            j = 1;
         }
         console.log(on, totalEpisodes);
         if(on == totalEpisodes){
            if(isLastSeason){
               console.log('last season');
            }
            on = 1;
            watchlistobj[index].on.season = nextSeason;
            watchlistobj[index].on.episode = 1;
         }else {

            watchlistobj[index].on.episode = on;
         }

      }

      function tabSelect(number) {
         scope.tabActive = number;
      }

      function isTabSelected(number) {
         return scope.tabActive == number;
      }

      function hasAired(airDate) {
         airDate = parseInt(airDate);
         return airDate - now < 0;
      }

      function limitLength(string, limit) {
         if (string.length > limit) {
            return string.substring(0 ,limit) + '...';
         }else {
            return string;
         }
      }

      function behindCount(seasons, currentSeason) {
         var currentSeason = parseInt(currentSeason);
         var seasonsLimit = helperFunctions.objSize(seasons) + currentSeason;
         var count = 0, j = 1, totalEpisodes = 0, season;

         for (currentSeason; currentSeason < seasonsLimit; currentSeason++) {
            season = seasons['season_' + currentSeason];
            totalEpisodes = helperFunctions.objSize(season);

            for (j; j < totalEpisodes; j++) {
               if(!season[j].watched && season[j].airDate - now < 0){
                  count++;
               }
            }
            j = 1;
         }

         return (count > 0) ? '-'+ count : count;
      }
   }
   return directive;
}
