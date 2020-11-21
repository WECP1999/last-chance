const baseUrl = './movies.json';
const module = angular.module('marvel', ['ngMaterial']);

module.controller('app', ($scope, $http) => {
  let currentMovieId = null;

  $scope.movies = [];
  $scope.currentMovie = null;

  $scope.onMouseEnter = (movieId) => {
    currentMovieId = movieId;
    setTimeout(() => {
      if (!!currentMovieId && currentMovieId === movieId) {
        $http.get(baseUrl).then(
          (moviesResponse) => ($scope.currentMovie = moviesResponse.data.movies.find((movie) => (movie.id === movieId)))
        );
      }
    }, 1000);
  }

  $scope.onMouseLeave = () => {
    currentMovieId = null;
    $scope.currentMovie = null;
  }

  $http.get(baseUrl).then((moviesResponse) => ($scope.movies = moviesResponse.data.movies.slice(0, 50) || []));
});

const onErrorImage = (event) => {
  event.target.src = './src/404.png';
}