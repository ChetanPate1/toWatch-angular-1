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

function watchlistCard() {
   var directive = {
      link: link,
      templateUrl: 'components/watchlist-card/watchlist-card.html',
      restrict: 'E',
      controller: 'WatchlistCardController',
      controllerAs: 'WatchlistCardCtrl',
      transclude: {
         button: 'moreButton',
         tabs: 'seasonTabs',
         frostGlass: 'frostGlass'
      },
      scope: {
         heading: '=',
         subheading: '=',
         details: '=',
         imgsrc: '=',
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

      function toggleOpen() {
         scope.open = !scope.open;
      }

      function save(watchlistobj, index, seasoninfo, watchlist, episodeNumber) {
         var airDate = parseInt(watchlist.airDate);
         var on = parseInt(watchlistobj[index].on.episode);
         var isOneLessOneMore = episodeNumber == on || episodeNumber == on - 1;

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


   }
   return directive;
}

angular
   .module('app')
   .controller('WatchlistCardController', WatchlistCardController);

function WatchlistCardController() {
   var vm = this;

   vm.open = false;
   vm.toggleOpen = toggleOpen;

   function toggleOpen() {
      console.log('click');
      scope.open = !scope.open;
   }
}
