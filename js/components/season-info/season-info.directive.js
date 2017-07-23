/**
 * @desc Season Info directive
 * @example <season-info season="" currentseason="" rewatchobj="" index="" ></season-info>
 */

angular
   .module('app')
   .directive('seasonInfo', seasonInfo);

function seasonInfo() {
   var directive = {
      link: link,
      templateUrl: 'js/components/season-info/season-info.html',
      restrict: 'E',
      scope: {
         seasons: '=',
         currentseason: '=',
         rewatchobj: '=',
         index: '='
      }
   };

   function link(scope) {
      var now = new Date().getTime();
      scope.open = false;
      scope.toggleOpen = toggleOpen;
      scope.tabActive = scope.currentseason;
      scope.tabSelect = tabSelect;
      scope.isTabSelected = isTabSelected;
      scope.save = save;
      scope.currentSeason = currentSeason;

      function toggleOpen() {
         scope.open = !scope.open;
      }

      function tabSelect(number) {
         scope.tabActive = number;
      }

      function isTabSelected(number) {
         return scope.tabActive == number;
      }

      function save(watchlistobj, index, rewatch) {
         var airDate = parseInt(rewatch.airDate);
         if(Math.abs(airDate - now)/1000 < 0){
            return;
         }else {
            rewatch.watched = !rewatch.watched;
            currentSeason(watchlistobj[index].show, watchlistobj, index);
            watchlistobj.$save(index);
         }
      }

      function currentSeason(show, watchlistobj, index) {
         var seasons = objSize(show);
         var seasonSize = 0;
         var watched = 0, onSeason = 1;

         for (var i = 1; i <= seasons; i++){
            seasonsSize = objSize(show['season_' + i]);

            for (var j = 1; j <= seasonsSize; j++) {
               if(show['season_' + i][j].watched === false && show['season_' + i][j].airDate - now < 0){
                  break;
               }
               if (show['season_' + i][j].watched && show['season_' + i][j].airDate - now < 0) {
                  watched++;
               }
               if (watched == seasonsSize) {
                  onSeason++;
               }
            }
         }
         watchlistobj[index].on.episode = watched.toString();
         watchlistobj[index].on.season = onSeason.toString();
      }

      function objSize(obj) {
         var count = 0;
         for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
               ++count;
            }
         }
         return count;
      }
   }

   return directive;
}
