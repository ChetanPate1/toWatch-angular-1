
angular
   .module('app')
   .directive('watchlistCard', watchlistCard);

watchlistCard.$inject = ['helperFunctions', 'seriesInitService'];

function watchlistCard(helperFunctions, seriesInitService) {
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

      update(scope.watchlistobj, scope.index);

      function toggleOpen(value) {
         scope[value] = !scope[value];
      }

      function save(watchlistobj, index, seasoninfo, watchlist, episodeNumber) {
         var airDate = parseInt(watchlist.airDate);
         var on = parseInt(watchlistobj[index].on.episode);
         var isCurrentTab = (scope.tabActive).toString() == watchlistobj[index].on.season;
         var isOneLessOneMore = episodeNumber == on || episodeNumber == on - 1 && isCurrentTab;

         if(airDate - now > 0 || !isOneLessOneMore){
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
         var currentSeasonNum = parseInt(watchlistobj[index].on.season);
         var nextSeason = currentSeasonNum + 1;
         var isLastSeason = watchlistobj[index].unwatched['season_'+ nextSeason] == undefined;
         var seasonsLimit = helperFunctions.objSize(seasoninfo) + currentSeasonNum;
         var count = 0, j = 1, totalEpisodes = 0, season, on = 1, currentSeason = seasoninfo['season_' + currentSeasonNum];

         for (currentSeasonNum; currentSeasonNum < seasonsLimit; currentSeasonNum++) {
            season = seasoninfo['season_' + currentSeasonNum];
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

         if(on == currentSeason.length){
            watchlistobj[index].on.season = nextSeason;
            watchlistobj[index].on.episode = 1;
         }else {
            watchlistobj[index].on.episode = on;
         }

         if(isLastSeason){
            if(on == currentSeason.length){
               watchlistobj[index].upToDate = true;
            }
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

      function update(watchlists, index) {
         var watchlist = watchlists[index];

         if (helperFunctions.hasDaysPast(watchlist.lastUpdated, 7)) {
            console.log('update');
            watchlist.unwatched = seriesInitService.initWatchlist(watchlist);
            watchlist.lastUpdated = new Date().getTime();

            watchlists.$save(index);
         }
      }
   }
   return directive;
}
