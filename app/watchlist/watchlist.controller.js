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
   vm.nextAired = nextAired;
   vm.checkAired = checkAired;

   //generated test data
   vm.gened = {"upToDate":false,"showId":"-KqOp94MY8Uv8uky7I8N","on":{"season":"3","episode":"9"},"unwatched":{"season_3":[null,{"airDate":1472418000000,"name":"New York Strong","number":1,"watched":true},{"airDate":1473022800000,"name":"Bad White","number":2,"watched":true},{"airDate":1473627600000,"name":"First Born","number":3,"watched":true},{"airDate":1474232400000,"name":"Gone But Not Forgotten","number":4,"watched":true},{"airDate":1474837200000,"name":"Madness","number":5,"watched":true},{"airDate":1475442000000,"name":"The Battle of Central Park","number":6,"watched":true},{"airDate":1476046800000,"name":"Collaborators","number":7,"watched":true},{"airDate":1476651600000,"name":"White Light","number":8,"watched":true},{"airDate":1477256400000,"name":"Do or Die","number":9,"watched":false},{"airDate":1477864800000,"name":"The Fall","number":10,"watched":false}],"season_4":[null,{"airDate":1500238800000,"name":"The Worm Turns","number":1,"watched":true},{"airDate":1500843600000,"name":"The Blood Tax","number":2,"watched":true},{"airDate":1501448400000,"name":"One Shot","number":3,"watched":true},{"airDate":1502053200000,"name":"New Horizons","number":4,"watched":true},{"airDate":1502658000000,"name":"Belly of the Beast","number":5,"watched":true},{"airDate":1503262800000,"name":"Tainted Love","number":6,"watched":true},{"airDate":1503867600000,"name":"Ouroboros","number":7,"watched":true},{"airDate":1504472400000,"name":"Extraction","number":8,"watched":true},{"airDate":1505077200000,"name":"The Traitor","number":9,"watched":false}]}};

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
      list['unwatched'] = initSeries(list);

      // firebaseArray.save(ref, list);
   }

   function initSeries(watchlist) {
      var init = {};
      var show = vm.shows.$getRecord(watchlist.showId);
      var total_seasons = helperFunctions.objSize(show.seasons);

      var onE = parseInt(watchlist.on.episode);
      var onS = parseInt(watchlist.on.season);
      var total_episodes_onS = helperFunctions.objSize(show.seasons['season_'+ onS]);

      var seasonSize = 0;

      for(onS; onS <= total_seasons; onS++){
         seasonsSize = helperFunctions.objSize(show.seasons['season_'+ onS]);
         init['season_' + onS] = show.seasons['season_'+ onS];

         for (var j = 1; j <= seasonsSize; j++) {
            init['season_' + onS][j].watched = false;

            if(j < onE){
               init['season_' + onS][j].watched = true;
            }
         }
      }

      return init;
   }

   function nextAired(watchlist) {
      var nextAired, i = 1, j = 1, unwatched = {};
      var show = vm.shows.$getRecord(watchlist.showId);
      var seasons = helperFunctions.objSize(show.seasons);
      var latestSeason = show.seasons['season_'+ seasons];
      var episodes = helperFunctions.objSize(latestSeason);
      var onEp = parseInt(watchlist.on.episode);
      var onS = parseInt(watchlist.on.season);

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

      return {  unwatched: unwatched, nextAired: nextAired };
   }

   function checkAired(date) {
      date = parseInt(date);
      return date - today < 0;
   }
}
