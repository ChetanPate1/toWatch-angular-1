angular
   .module('app')
   .controller('ShowsController', ShowsController);

ShowsController.$inject = ['firebaseArray', 'episodateApi', 'helperFunctions', '$timeout'];

function ShowsController(firebaseArray, episodateApi, helperFunctions, $timeout){
   var vm = this;

   vm.foundShows = [
      {
         "id":26718,
         "name":"House of Cards",
         "permalink":"house-of-cards-2013",
         "country":"US",
         "network":"Netflix",
         "status":"To Be Determined",
         "image_thumbnail_path":"https://static.episodate.com/images/tv-show/thumbnail/26718.jpg"
      },
      {
         "id":17051,
         "name":"House of Cards",
         "permalink":"house-of-cards",
         "country":"UK",
         "network":"BBC One",
         "status":"Ended",
         "image_thumbnail_path":"https://static.episodate.com/images/tv-show/thumbnail/17051.jpg"
      },
      {
         "id":28883,
         "name":"House Of Cards (USA)",
         "permalink":"house-of-cards-usa",
         "country":"US",
         "network":"USA Network",
         "status":"Pilot Rejected",
         "image_thumbnail_path":"https://static.episodate.com/images/no-image.png"
      }
   ];
   vm.sendStatus = {
      disableButton: false,
      loader: false,
      validation: ''
   };

   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;
   vm.find = find;

   function add(series) {
      episodateApi.getShow(series).then(function(showData) {
         if (showData.seasons) {
            showData.requestData = series;

            $timeout(function() {
               firebaseArray.save('shows', showData);
               vm.series = '';
            }, 2000);
         }
         vm.sendStatus.disableButton = false;
         vm.sendStatus.loader = false;
      });
   }

   function find() {
      var series = vm.series;

      if (vm.series) {
         vm.sendStatus.disableButton = true;
         vm.sendStatus.loader = true;

         if (seriesExists(series)) {
            vm.series = '';
            vm.sendStatus.disableButton = false;
            vm.sendStatus.loader = false;
         }else {
            series = helperFunctions.spacesToDashes(series);
            episodateApi.search(series).then(function(data) {
               if (helperFunctions.objSize(data) < 1) {
                  //add
               }else {
                  vm.foundShows = data;
               }
            });
            vm.sendStatus.disableButton = false;
            vm.sendStatus.loader = false;
         }
      }
   }

   function seriesExists(series) {
      var shows = vm.shows, i = 0, exists = false;

      for (i = 0; i < shows.length; i++) {
         if (shows[i].series.toLowerCase() == series.toLowerCase()) {
            exists = true;
         }
      }
      return exists;
   }
}
