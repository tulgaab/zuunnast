(function() {
  'use strict';

  angular
    .module('app')
    .controller('IndexController', IndexController);

  /** @ngInject */
  function IndexController($scope, $mdDialog, $filter, $firebaseAuth, $firebaseObject, Auth, $rootScope, $firebaseArray) {
    var vm = this;
    vm.currentUser = $rootScope.currentUser;

    var messagesRef = firebase.database().ref().child("posts");
    vm.posts = $firebaseArray(messagesRef);


    $scope.$on('$viewContentLoaded', function() {
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: '1',
        paginationClickable: true,
        spaceBetween: 0,
        autoHeight: true
      });
    });
  }


})();