/**
 * @desc Show Card directive
 * @example <show-card heading="" subheading="" imgsrc="" ></show-card>
 */

angular
   .module('app')
   .directive('showCard', showCard);

function showCard() {
   var directive = {
      templateUrl: 'components/show-card/show-card.html',
      restrict: 'E',
      transclude: true,
      scope: {
         heading: '=',
         subheading: '=',
         imgsrc: '=',
      }
   };
   return directive;
}
