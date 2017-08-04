angular
   .module('app')
   .controller('HomeController', HomeController);

HomeController.$inject = ['episodateApi'];

function HomeController(episodateApi){
   var vm = this;

   vm.mostPopular = {};

   episodateApi.getMostPopular()
      .then(function(response) {
         vm.mostPopular = response;
   });
}
