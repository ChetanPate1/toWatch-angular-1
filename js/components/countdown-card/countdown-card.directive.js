/**
 * @desc Countdown Card directive
 * @example <countdown-card heading="" subheading="" imgsrc="" countdownvisible="" ></countdown-card>
 */

angular
   .module('app')
   .directive('countdownCard', countdownCard);

function countdownCard() {
   var directive = {
      templateUrl: 'js/components/countdown-card/countdown-card.html',
      restrict: 'E',
      transclude: true,
      scope: {
         heading: '=',
         subheading: '=',
         imgsrc: '=',
         countdownvisible: '='
      }
   };
   return directive;
}
