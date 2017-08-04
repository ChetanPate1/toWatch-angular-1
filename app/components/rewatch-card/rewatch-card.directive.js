/**
 * @desc Rewatch Card directive
 * @example <rewatch-card heading="" subheading="" details="" ></rewatch-card>
 */

angular
   .module('app')
   .directive('rewatchCard', rewatchCard);

function rewatchCard() {
   var directive = {
      templateUrl: 'components/rewatch-card/rewatch-card.html',
      restrict: 'E',
      transclude: {
         seasonInfo: 'seasonInfo',
         frostGlass: 'frostGlass'
      },
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
