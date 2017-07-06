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
         to: '='
      }
   };

   function link(scope, element) {
      var inSeconds = {
         future: new Date(scope.to).getTime(),
         day: 86400,
         hour: 3600,
         minute: 60
      };

      var time = {
         day: '00',
         hour: '00',
         minutes: '00',
         seconds: '00'
      };

      function delta(futureDateMs, nowDateMs) {
         //in seconds
         var delta = Math.abs(futureDateMs - nowDateMs) / 1000;

         var days = Math.floor(delta / inSeconds.day);
         delta -= days * inSeconds.day;

         var hours = Math.floor(delta / inSeconds.hour) % inSeconds.hour;
         delta -= hours * inSeconds.hour;

         var minutes = Math.floor(delta / inSeconds.minute) % inSeconds.hour;
         delta -= minutes * inSeconds.minute;

         var seconds = Math.floor(delta);

         return [days, hours, minutes, seconds];
      }



      $interval(function() {
         console.log(delta(inSeconds.future, new Date().getTime()));
      }, 1000);
   }



   return directive;
}
