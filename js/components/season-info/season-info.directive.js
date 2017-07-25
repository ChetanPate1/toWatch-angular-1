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
      scope.hasAired = hasAired;
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

      function save(rewatchobj, index, rewatch, episodeNumber) {
         var airDate = parseInt(rewatch.airDate);
         var on = parseInt(rewatchobj[index].on.episode);
         var isOneLessOneMore = episodeNumber == on || episodeNumber == on - 1;

         if( Math.abs(airDate - now)/1000 < 0 || !isOneLessOneMore){
            return;
         }else {
            rewatch.watched = !rewatch.watched;
            currentSeason(rewatchobj[index].show, rewatchobj, index);
            rewatchobj.$save(index);
         }
      }

      function hasAired(airDate) {
         airDate = parseInt(airDate);
         return airDate - now < 0;
      }

      function currentSeason(show, rewatchobj, index) {
         var seasons = objSize(show);
         var seasonSize = 0;
         var episode = 1, season = 1;

         for (var i = 1; i <= seasons; i++){
            seasonsSize = objSize(show['season_' + i]);

            for (var j = 1; j <= seasonsSize; j++) {

               if(show['season_' + i][j].watched == true){
                  episode++;
               }

               if (episode == seasonsSize) {
                  season++;
                  episode = 1;
               }
            }
         }

         rewatchobj[index].on.episode = (episode - 1).toString();
         rewatchobj[index].on.season = season.toString();
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
