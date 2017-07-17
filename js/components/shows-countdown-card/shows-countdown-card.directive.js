/**
 * @desc Shows Countdown Card directive
 * @example <shows-countdown-card heading="" subheading="" imgsrc="" seasoninfo=""></shows-countdown-card>
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
         seasoninfo: '='
      }
   };

   function link(scope) {
      scope.open = false;
      scope.toggleOpen = toggleOpen;

      function toggleOpen() {
         scope.open = !scope.open;
      }
   }
   return directive;
}
