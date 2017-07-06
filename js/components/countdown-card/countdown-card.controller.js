angular
   .module('app')
   .controller('CountdownCardController', CountdownCardController);

CountdownCardController.$inject = ['firebaseAuth'];

function CountdownCardController(firebaseAuth){
   var vm = this;

   vm.shows = [
      {
         "series": "Game of Thrones",
         "imgSrc": "http://www.gstatic.com/tv/thumb/tvbanners/12502846/p12502846_b_v8_aa.jpg",
         "airDate": "July 16, 2017 20:00:00",
         "season": "7",
         "episode": {
            "number": "1",
            "name": "",
            "seen": false,
            "airDate": "July 16, 2017 20:00:00"
         }
      },
      {
         "series": "Lucifer",
         "imgSrc": "https://images-na.ssl-images-amazon.com/images/I/91cm4C%2BALoL._SY679_.jpg",
         "season": "4",
         "episode": {
            "number": "1",
            "name": "",
            "seen": false,
            "airDate": "October 2, 2017 17:00:00"
         }
      },
      {
         "series": "Silicon Valley",
         "imgSrc": "http://toptvshows.me/images/poster/Silicon%20Valley%20season%204%20poster.jpg",
         "season": "4",
         "episode": {
            "number": "7",
            "name": "",
            "seen": false,
            "airDate": "July 1, 2017 17:00:00"
         }
      },
      {
         "series": "The Leftovers",
         "imgSrc": "http://thenerdrecites.com/wp-content/uploads/2017/03/tlft.png",
         "season": "4",
         "episode": {
            "number": "1",
            "name": "",
            "seen": false,
            "airDate": "January 1, 2017 17:00:00"
         }
      },
      {
         "series": "Daredevil",
         "imgSrc": "http://www.btchflcks.com/wp-content/uploads/2015/04/daredevilposter.png",
         "season": "3",
         "episode": {
            "number": "1",
            "name": "",
            "seen": false,
            "airDate": "January 1, 2018 17:00:00"
         }
      },
      {
         "series": "Suits",
         "imgSrc": "https://s-media-cache-ak0.pinimg.com/736x/93/cf/e4/93cfe45ee1fdd7b2d330bb30d48b27f4.jpg",
         "season": "6",
         "episode": {
            "number": "17",
            "name": "",
            "seen": false,
            "airDate": "July 1, 2017 17:00:00"
         }
      },
      {
         "series": "Bitten",
         "imgSrc": "https://s-media-cache-ak0.pinimg.com/736x/80/9d/75/809d759f29d558e4b73447a9a4463a77--watch-full-episodes-all-episodes.jpg",
         "season": "3",
         "episode": {
            "number": "7",
            "name": "",
            "seen": false,
            "airDate": "July 1, 2017 17:00:00"
         }
      },
      {
         "series": "Westworld",
         "imgSrc": "http://biiinge.konbini.com/files/2016/11/westworld-music-feat.jpg",
         "season": "2",
         "episode": {
            "number": "1",
            "name": "",
            "seen": false,
            "airDate": "March 1, 2018 12:00:00"
         }
      },
      {
         "series": "Iron Fist",
         "imgSrc": "http://cdn1-www.superherohype.com/assets/uploads/gallery/iron-fist/16508182_1863674427225326_8251850749542215766_n.png",
         "season": "2",
         "episode": {
            "number": "1",
            "name": "",
            "seen": false,
            "airDate": "July 1, 2017 17:00:00"
         }
      },
      {
         "series": "The Strain",
         "imgSrc": "http://www.impawards.com/tv/posters/strain_ver2.jpg",
         "season": "3",
         "episode": {
            "number": "9",
            "name": "",
            "seen": false,
            "airDate": "October 23, 2016 17:00:00"
         }
      }
   ];

   vm.loggedIn = loggedIn;

   function loggedIn(){
      return firebaseAuth.$getAuth();
   }

}
