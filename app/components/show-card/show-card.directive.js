/**
 * @desc Show Card directive
 * @example <show-card heading="" imgsrc="" ></show-card>
 */

angular
   .module('app')
   .directive('showCard', showCard);

function showCard() {
   var directive = {
      templateUrl: 'components/show-card/show-card.html',
      restrict: 'E',
      scope: {
         heading: '=',
         imgsrc: '=',
      }
   };
   return directive;
}
