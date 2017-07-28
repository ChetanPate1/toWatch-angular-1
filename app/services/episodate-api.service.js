angular
   .module('app')
   .service('episodateApi', episodateApi);

episodateApi.$inject = ['$http'];

function episodateApi($http){
   var vm = this;
   var service = {
      getShow: getShow
   };

   function getShow(show) {
      return $http({
         method: 'GET',
         url: 'https://www.episodate.com/api/show-details?q=' + show
      });
   }

   return service;
}
