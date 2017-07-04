/**
 * @desc Countdown Card directive
 * @example <countdown-card ></countdown-card>
 */

angular
   .module('app')
   .directive('countdownCard', countdownCard);

function countdownCard() {
   var directive = {
      templateUrl: 'js/components/countdown-card/countdown-card.html',
      restrict: 'E',
      controller: 'CountdownCardController',
      controllerAs: 'CountdownCtrl',
      scope: {
         heading: '=',
         subheading: '=',
         imgSrc: '='
      }
   };
   return directive;
}
