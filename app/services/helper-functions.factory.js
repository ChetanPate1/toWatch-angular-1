angular
   .module('app')
   .factory('helperFunctions', helperFunctions);

// helperFunctions.$inject = [''];

function helperFunctions(){
   var vm = this;
   var service = {
      objSize: objSize
   };

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


   return service;
}
