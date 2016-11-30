(function() {
  'use strict';

  angular
    .module('app')
    .controller('PostListController', PostListController)
    .controller('PostDetailController', PostDetailController);

  /** @ngInject */
  function PostListController($scope,$mdDialog,$filter,$firebaseAuth,$firebaseObject,Auth,$rootScope,$firebaseArray, $stateParams) {
    var vm = this;
    vm.currentUser = $rootScope.currentUser;

    var messagesRef = firebase.database().ref().child("posts");
    vm.posts = $firebaseArray(messagesRef);
    
  }
  
  function PostDetailController($scope,$mdDialog,$filter,$firebaseAuth,$firebaseObject,Auth,$rootScope,$firebaseArray,$stateParams) {
    var vm = this;
    vm.currentUser = $rootScope.currentUser;

    var messagesRef = firebase.database().ref().child("posts").child($stateParams.id);
    vm.post = $firebaseObject(messagesRef);

  }


})();