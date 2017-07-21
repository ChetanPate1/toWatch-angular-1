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

      function toggleOpen() {
         scope.open = !scope.open;
      }

      function save(watchlistobj, index, watchlist) {
         airDate = parseInt(watchlist.airDate);
         if( Math.abs((airDate - now))/1000 < 0 ){
            return;
         }else {
            console.log('watched');
            watchlist.watched = !watchlist.watched;
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
         if( date - now > 0 ){
            aired.by = 'not aired';
         }
         else {
            aired.by = '-' + Math.floor(delta / 86400) + ' days';
         }
         return aired;
      }

   }
   return directive;
}
