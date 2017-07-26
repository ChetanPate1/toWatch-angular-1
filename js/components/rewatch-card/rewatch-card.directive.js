/**
 * @desc Rewatch Card directive
 * @example <rewatch-card heading="" subheading="" details="" imgsrc="" seasoninfo=""></rewatch-card>
 */

angular
   .module('app')
   .directive('rewatchCard', rewatchCard);

function rewatchCard() {
   var directive = {
      templateUrl: 'js/components/rewatch-card/rewatch-card.html',
      restrict: 'E',
      transclude: true,
      scope: {
         heading: '=',
         subheading: '=',
         details: '=',
         imgsrc: '='
      }
   };
   return directive;
}
