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
         countdownvisible: '=',
         watchlistObj: '=',
         index: '='
      }
   };

   function link(scope) {
      var now = new Date().getTime();

      scope.open = false;
      scope.toggleOpen = toggleOpen;
      scope.aired = aired;

      function toggleOpen() {
         scope.open = !scope.open;
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
