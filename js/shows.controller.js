angular
   .module('app')
   .controller('ShowsController', ShowsController);

ShowsController.$inject = ['firebaseArray'];

function ShowsController(firebaseArray){
   var vm = this;

   vm.shows = firebaseArray.getAll();
   vm.add = add

   function add() {
      var show = {
         "series": vm.series,
         "imgSrc": vm.imgSrc,
         "season": vm.season,
         "episode": {
            "number": vm.episodeNumber,
            "seen": false,
            "airDate": vm.airDate
         }
      };

      firebaseArray.save('shows', show);
   }


}
