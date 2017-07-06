angular
   .module('app')
   .controller('CountdownCardController', CountdownCardController);

CountdownCardController.$inject = ['firebaseAuth'];

function CountdownCardController(firebaseAuth){
   var vm = this;

   vm.shows = [
      {
         "heading": "Game of Thrones",
         "subHeading": "Season 7 Episode 1",
         "imgSrc": "http://www.gstatic.com/tv/thumb/tvbanners/12502846/p12502846_b_v8_aa.jpg",
         "airDate": "July 16, 2017 20:00:00"
      },
      {
         "heading": "Lucifer",
         "subHeading": "Season 4 Episode 1",
         "imgSrc": "https://images-na.ssl-images-amazon.com/images/I/91cm4C%2BALoL._SY679_.jpg",
         "airDate": "July 1, 2017 17:00:00"
      },
      {
         "heading": "Silicon Valley",
         "subHeading": "Season 4 Episode 7",
         "imgSrc": "http://toptvshows.me/images/poster/Silicon%20Valley%20season%204%20poster.jpg",
         "airDate": "July 1, 2017 17:00:00"
      },
      {
         "heading": "The Leftovers",
         "subHeading": "Season 4 Episode 1",
         "imgSrc": "http://thenerdrecites.com/wp-content/uploads/2017/03/tlft.png",
         "airDate": "July 1, 2017 17:00:00"
      },
      {
         "heading": "Daredevil",
         "subHeading": "Season 3 Episode 1",
         "imgSrc": "http://www.btchflcks.com/wp-content/uploads/2015/04/daredevilposter.png",
         "airDate": "July 1, 2017 17:00:00"
      },
      {
         "heading": "Suits",
         "subHeading": "Season 6 Episode 17",
         "imgSrc": "https://s-media-cache-ak0.pinimg.com/736x/93/cf/e4/93cfe45ee1fdd7b2d330bb30d48b27f4.jpg",
         "airDate": "July 1, 2017 17:00:00"
      },
      {
         "heading": "Bitten",
         "subHeading": "Season 3 Episode 7",
         "imgSrc": "https://s-media-cache-ak0.pinimg.com/736x/80/9d/75/809d759f29d558e4b73447a9a4463a77--watch-full-episodes-all-episodes.jpg",
         "airDate": "July 1, 2017 17:00:00"
      },
      {
         "heading": "Westworld",
         "subHeading": "Season 1 Episode 10",
         "imgSrc": "http://biiinge.konbini.com/files/2016/11/westworld-music-feat.jpg",
         "airDate": "July 1, 2017 17:00:00"
      },
      {
         "heading": "Iron Fist",
         "subHeading": "Season 2 Episode 1",
         "imgSrc": "http://cdn1-www.superherohype.com/assets/uploads/gallery/iron-fist/16508182_1863674427225326_8251850749542215766_n.png",
         "airDate": "July 1, 2017 17:00:00"
      },
      {
         "heading": "The Strain",
         "subHeading": "Season 3 Episode 9",
         "imgSrc": "http://www.impawards.com/tv/posters/strain_ver2.jpg",
         "airDate": "July 1, 2017 17:00:00"
      }
   ];

   vm.loggedIn = loggedIn;

   function loggedIn(){
      return firebaseAuth.$getAuth();
   }

}
