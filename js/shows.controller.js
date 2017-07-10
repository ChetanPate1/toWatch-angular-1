angular
   .module('app')
   .controller('ShowsController', ShowsController);

ShowsController.$inject = ['firebaseArray'];

function ShowsController(firebaseArray){
   var vm = this;

   vm.data = firebaseArray.getAll();
   vm.add = add;

   function add() {
      var show = {
         "series": vm.series,
         "imgSrc": vm.imgSrc,
         "season": vm.season,
         "episode": {
            "number": vm.episodeNumber,
            "name": vm.episodeName,
            "seen": false,
            "airDate": vm.airDate
         }
      };

      firebaseArray.save('shows', show);
   }

   function seed(){
      var data = {};

      firebaseArray.save('shows', data );
   console.log('seed');
   }
   seed();

}
