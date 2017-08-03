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

         if( Math.abs((airDate - now))/1000 < 0 || !isOneLessOneMore){
            return;
         }else {
            watchlist.watched = !watchlist.watched;
            countWatched(seasoninfo, watchlistobj, index);
            watchlistobj.$save(index);
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
         var i = 1, size = seasoninfo.length - 1;
         var nextSeason = parseInt(watchlistobj[index].on.season) + 1;
         var nextSeasonNull = watchlistobj[index].on.season['season_'+ nextSeason] == undefined;

         for (i; i <= size; i++) {
            if(!seasoninfo[i].watched){
               break;
            }
         }

         if(i > size){
            if(nextSeasonNull){
               watchlistobj[index].upToDate = true;
            }else {
               watchlistobj[index].on.season = nextSeason;
               watchlistobj[index].on.episode = 1;
            }
         }

         watchlistobj[index].on.episode = i;
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
