/**
 * @desc Shows Countdown Card directive
 * @example <shows-countdown-card heading="" subheading="" imgsrc="" seasoninfo="" countdownvisible="true"></shows-countdown-card>
 */

angular
   .module('app')
   .directive('showsCountdownCard', showsCountdownCard);

function showsCountdownCard() {
   var directive = {
      link: link,
      templateUrl: 'js/components/shows-countdown-card/shows-countdown-card.html',
      restrict: 'E',
      transclude: true,
      scope: {
         heading: '=',
         subheading: '=',
         imgsrc: '=',
         seasoninfo: '=',
         visible: '=',
         watchlistobj: '=',
         index: '='
      }
   };

   function link(scope) {
      var now = new Date().getTime();
      scope.open = false;
      scope.toggleOpen = toggleOpen;
      scope.save = save;
      scope.aired = aired;
      scope.countWatched = countWatched;
      scope.countUnwatched = countUnwatched;

      function toggleOpen() {
         scope.open = !scope.open;
      }

      function save(watchlistobj, index, seasoninfo, watchlist) {
         airDate = parseInt(watchlist.airDate);
         console.log(watchlist);
         if( Math.abs((airDate - now))/1000 < 0 ){
            return;
         }else {
            watchlist.watched = !watchlist.watched;
            countWatched(seasoninfo, watchlistobj, index);
            watchlistobj.$save(index);
         }
      }

      function nextEpiside(w) {
         
      }

      function aired(date) {
         if(!date){
            return;
         }
         date = parseInt(date);
         var delta = Math.abs((date - now))/1000;
         var aired = { aired: date - now < 0 };
         if( date - now > 0 ){
            aired.by = 'not aired';
         }
         else {
            aired.by = '-' + Math.floor(delta / 86400) + ' days';
         }
         return aired;
      }

      function countWatched(seasoninfo, watchlistobj, index) {
         var i = 1, size = seasoninfo.length - 1;
         for (i; i < size; i++) {
            if(!seasoninfo[i].watched){
               break;
            }
         }
         if(i == size){
            watchlistobj[index].on.season = parseInt(watchlistobj[index].on.season) + 1;
            watchlistobj[index].on.episode = 1;
         }
         watchlistobj[index].on.episode = i;
      }

      function countUnwatched(seasoninfo, watchlistobj, index) {
         var i = 1, size = seasoninfo.length;

         for (i; i < size; i++) {
            if(!seasoninfo[i].watched && (seasoninfo[i].airDate - now < 0) ){
               return i;
            }
         }
      }
   }
   return directive;
}
