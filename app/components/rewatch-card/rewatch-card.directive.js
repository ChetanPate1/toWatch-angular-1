/**
 * @desc Rewatch Card directive
 * @example <rewatch-card heading="" subheading="" details="" imgsrc="" visible="" ></rewatch-card>
 */

angular
   .module('app')
   .directive('rewatchCard', rewatchCard);

function rewatchCard() {
   var directive = {
      templateUrl: 'components/rewatch-card/rewatch-card.html',
      restrict: 'E',
      transclude: true,
      scope: {
         heading: '=',
         subheading: '=',
         details: '=',
         imgsrc: '=',
         visible: '='
      }
   };
   return directive;
}
