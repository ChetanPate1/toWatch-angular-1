
angular
   .module('app')
   .directive('seasonTabs', seasonTabs);

function seasonTabs(helperFunctions) {
   var directive = {
      link: link,
      templateUrl: 'components/season-tabs/season-tabs.html',
      restrict: 'E',
      scope: {
         open: '=',
         seasons: '=',
         currentseason: '=',
         // rewatchobj: '=',
         // index: '='
      }
   };

   function link(scope) {
      var now = new Date().getTime();
      scope.open = false;
      scope.deleteOpen = false;
      scope.toggleOpen = toggleOpen;
      scope.tabActive = scope.currentseason;
      scope.tabSelect = tabSelect;
      scope.isTabSelected = isTabSelected;
      scope.save = save;
      scope.hasAired = hasAired;
      scope.currentSeason = currentSeason;
      scope.limitLength = limitLength;
      scope.aired = aired;
      
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

      function hasAired(airDate) {
         airDate = parseInt(airDate);
         return airDate - now < 0;
      }

      function currentSeason(show, rewatchobj, index) {
         var episode = parseInt(rewatchobj[index].on.episode);
         var season = parseInt(rewatchobj[index].on.season);
         var seasonKey = 'season_' + season;
         var seasonsSize = helperFunctions.objSize(show[seasonKey]);
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
   }

   return directive;
}
