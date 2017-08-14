angular
   .module('app')
   .factory('helperFunctions', helperFunctions);

// helperFunctions.$inject = [''];

function helperFunctions(){
   var vm = this;
   var service = {
      objSize: objSize,
      spacesToDashes: spacesToDashes,
      dateToMs: dateToMs,
      hasDaysPast: hasDaysPast
   };

   var today = new Date().getTime();

   function objSize(obj) {
      var count = 0;
      for (var prop in obj) {
         if (obj.hasOwnProperty(prop)) {
            ++count;
         }else {
            break;
         }
      }
      return count;
   }

   function spacesToDashes(str) {
      str = str.toLowerCase();
      return str.replace(/\s+/g, '-');
   }

   function dateToMs(date) {
      return new Date(date).getTime();
   }

   function hasDaysPast(time, days) {
      time = parseInt(time);
      var dayInSec = 86400;
      var diff = Math.abs(time - today)/1000;

      return Math.floor(diff / dayInSec) > days;
   }

   return service;
}
