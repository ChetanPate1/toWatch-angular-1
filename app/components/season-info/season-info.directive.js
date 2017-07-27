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
      templateUrl: 'components/season-info/season-info.html',
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
      scope.limitLength = limitLength;

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
         var onEp = parseInt(rewatchobj[index].on.episode);
         var valid = episodeNumber === onEp || episodeNumber === (onEp - 1) && (scope.tabActive).toString() == rewatchobj[index].on.season;


         if( Math.abs(airDate - now)/1000 < 0 || !valid){
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
         var episode = parseInt(rewatchobj[index].on.episode);
         var season = parseInt(rewatchobj[index].on.season);
         var seasonKey = 'season_' + season;
         var seasonsSize = objSize(show[seasonKey]);
         var watched = 0;

         for (var j = 1; j <= seasonsSize; j++) {
            if(show[seasonKey][j].watched == true){
               watched++;
            }

            if (watched == seasonsSize) {
               season++;
               watched = 0;
            }
         }

         rewatchobj[index].on.episode = (watched + 1).toString();
         rewatchobj[index].on.season = season.toString();
      }

      function limitLength(string, limit) {
         if (string.length > limit) {
            return string.substring(0 ,limit) + '...';
         }else {
            return string;
         }
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
