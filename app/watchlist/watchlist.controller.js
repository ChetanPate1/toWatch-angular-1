angular
   .module('app')
   .controller('WatchlistController', WatchlistController);

WatchlistController.$inject = ['currentAuth', 'firebaseArray', '$timeout', 'helperFunctions', 'episodateApi'];

function WatchlistController(currentAuth, firebaseArray, $timeout, helperFunctions, episodateApi){
   var vm = this;
   var ref = 'watchlist/' + currentAuth.uid;
   var today = new Date().getTime();

   vm.watchlist = firebaseArray.getByRef(ref);
   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;
   vm.search = search;

   vm.nextAired = nextAired;
   vm.checkAired = checkAired;

//suits,got on season 7 Episode 3
   function add() {
      var list = {
         upToDate: false,
         showId: vm.seriesRef,
         on: {
            season: vm.season,
            episode: vm.episode
         },
         unwatched: {}
      };
      list['unwatched'] = nextAired(list).unwatched;
console.log(list);
      // firebaseArray.save(ref, list);
   }

   function search() {
      var show = {
         name: helperFunctions.spacesToDashes(vm.shows[vm.series].series),
         on: {
            season: vm.season,
            episode: vm.episode
         }
      };
   }

   function nextAired(watchlist) {
      var nextAired, i = 1, j = 1, unwatched = {};
      var show = vm.shows.$getRecord(watchlist.showId);
      var seasons = helperFunctions.objSize(show.seasons);
      var latestSeason = show.seasons['season_'+ seasons];
      var episodes = helperFunctions.objSize(latestSeason);
      var onEp = parseInt(watchlist.on.episode);

      for (j; j <= episodes; j++) {
         unwatched[j] = {
            watched: false,
            airDate: latestSeason[j].airDate
         };

         if(j < onEp){
            unwatched[j].watched = true;
         }
      }

      for (i; i <= episodes; i++) {
         unwatched[i].aired = true;

         if (latestSeason[i].airDate - today > 0){
            unwatched[i].aired = false;
            nextAired = latestSeason[i].airDate;
            break;
         }
      }

      return { nextAired: nextAired, unwatched: unwatched };
   }

   function checkAired(date) {
      return date - today < 0;
   }
}
