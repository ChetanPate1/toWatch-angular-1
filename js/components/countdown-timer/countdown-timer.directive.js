/**
 * @desc Countdown Timer directive
 * @example <element start="" end="" ></element>
 */

angular
   .module('app')
   .directive('countdownTimer', countdownTimer);

function countdownTimer($interval) {
   var directive = {
      link: link,
      templateUrl: 'js/components/countdown-timer/countdown-timer.html',
      restrict: 'E',
      scope: {
         end: '='
      }
   };

   function link(scope, element) {
      var future = new Date(scope.end);
      var inMs = {
         day: 86400000,
         hour: 3600000,
         minutes: 60000,
         secs: 1000
      };

      var time = {
         day: '00',
         hour: '00',
         minutes: '00',
         seconds: '00'
      }

      $interval(function() {

      }, 1000);
   }

   return directive;
}
