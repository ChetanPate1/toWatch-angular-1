/**
 * @desc Shows Countdown Card directive
 * @example <shows-countdown-card heading="" subheading="" imgsrc="" seasoninfo=""></shows-countdown-card>
 */

angular
   .module('app')
   .directive('showsCountdownCard', showsCountdownCard);

function showsCountdownCard() {
   var directive = {
      templateUrl: 'js/components/shows-countdown-card/shows-countdown-card.html',
      restrict: 'E',
      controller: 'ShowsCountdownCardController',
      controllerAs: 'ShowsCountdownCtrl',
      transclude: true,
      scope: {
         heading: '=',
         subheading: '=',
         imgsrc: '=',
         seasoninfo: '='
      }
   };
   return directive;
}
