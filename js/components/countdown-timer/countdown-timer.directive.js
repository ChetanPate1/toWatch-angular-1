/**
 * @desc Countdown Timer directive
 * @example <countdown-timer to="'July 7, 2017 17:00:00'" ></countdown-timer>
 */

angular
   .module('app')
   .directive('countdownTimer', countdownTimer);

countdownTimer.$inject = ['$interval'];

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
         now: function () {
            return new Date().getTime() / 1000;
         },
         future: parseInt(scope.to) / 1000,
         day: 86400,
         hour: 3600,
         minute: 60
      };

      function delta(futureDate, nowDate) {
         //in seconds
         var delta = Math.abs(futureDate - nowDate);

         if(futureDate - nowDate < 0 || !futureDate){
            return [0, 0, 0, 0];
         }

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
         var prettifiedTime = {};
         var names = ['day', 'hour', 'min', 'sec'],  i = 0;

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
         scope.counter = prettifyTime( delta(inSeconds.future, inSeconds.now()) );
      }, 1000);
   }

   return directive;
}
