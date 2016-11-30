(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, $mdDialog, $firebaseAuth, $firebaseObject, Auth, $rootScope,$state) {
    var vm = this;
    vm.currentUser = $rootScope.currentUser;
    if (vm.currentUser){
      $state.go("app.admin");
    }
    vm.user = {};
    vm.login = function() {
      Auth.$signInWithEmailAndPassword(vm.user.email, vm.user.password)
        .then(function(firebaseUser) {
          $rootScope.currentUser = firebaseUser;
          $state.go("app.admin");
        }, function(err) {
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Алдаа!')
            .textContent('Уучлаарай, имэйл хаяг эсвэл нууц үг буруу байна.')
            .ariaLabel('Login Alert')
            .ok('Хаах')
          );
        });
    }
  }


})();