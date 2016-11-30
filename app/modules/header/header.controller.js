(function() {
  'use strict';

  angular
    .module('app')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController($scope,$mdDialog,$firebaseAuth,$firebaseObject,Auth,$rootScope,$state) {
    var vm = this;
    vm.currentUser = $rootScope.currentUser;
    $scope.auth = Auth;
    
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      vm.currentUser = firebaseUser;
    });
  }


})();