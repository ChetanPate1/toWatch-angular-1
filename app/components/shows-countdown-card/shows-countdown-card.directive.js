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
      templateUrl: 'components/shows-countdown-card/shows-countdown-card.html',
      restrict: 'E',
      transclude: true,
      scope: {
         heading: '=',
         subheading: '=',
         details: '=',
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
      scope.upToDate = false;
      scope.toggleOpen = toggleOpen;
      scope.save = save;
      scope.aired = aired;
      scope.countWatched = countWatched;
      scope.behindCount = behindCount;

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
         var aired = { aired: date - now + 21600 < 0 };

         if( date - now + 21600 > 0 ){
            aired.by = 'not aired';
         }
         else {
            if(Math.ceil(delta / 86400) > 30){
               aired.by = 'aired';
            }else {
               aired.by = '-' + Math.ceil(delta / 86400) + ' days';
            }
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

      function behindCount(seasoninfo) {
         var i = 1, size = seasoninfo.length - 1;
         var count = 0, aired = 0;

         for (i; i <= size; i++) {
            if(!seasoninfo[i].watched && seasoninfo[i].airDate - now < 0){
               count++;
            }
         }

         return (count > 0) ? '-'+ count : count;
      }
   }
   return directive;
}
