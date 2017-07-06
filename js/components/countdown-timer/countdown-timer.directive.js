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
         now: new Date().getTime() / 1000,
         future: new Date(scope.to).getTime() / 1000,
         day: 86400,
         hour: 3600,
         minute: 60
      };

      function delta(futureDateMs, nowDateMs) {
         //in seconds
         var delta = Math.abs(futureDateMs - nowDateMs);

         var days = Math.floor(delta / inSeconds.day);
         delta -= days * inSeconds.day;

         var hours = Math.floor(delta / inSeconds.hour) % inSeconds.hour;
         delta -= hours * inSeconds.hour;

         var minutes = Math.floor(delta / inSeconds.minute) % inSeconds.hour;
         delta -= minutes * inSeconds.minute;

         var seconds = Math.floor(delta);

         return [days, hours, minutes, seconds];
      }

      function prettifyTime(time) {
         var prettifiedTime = {}, i = 0;
         var names = ['day', 'hour', 'min', 'sec'];

         for (i; i < 4; i++){
            prettifiedTime[names[i].charAt(0)] = { name: names[i], val: '0'+time[i] };
            if (time[i] > 1 && time[i] < 10){
               prettifiedTime[names[i].charAt(0)] = { name: names[i]+'s', val: '0'+time[i] };
            }
            if (time[i] > 9){
               prettifiedTime[names[i].charAt(0)] = { name: names[i]+'s', val: ''+time[i] };
            }
         }

         return prettifiedTime;
      }

      $interval(function() {
         scope.counter = prettifyTime(delta(inSeconds.future, inSeconds.now));
      }, 1000);
   }



   return directive;
}
