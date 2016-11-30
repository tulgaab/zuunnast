(function() {
  'use strict';

  angular
    .module('app')
    .controller('PostController', PostController)

  /** @ngInject */
  function PostController($scope, $mdDialog, $firebaseAuth, $firebaseObject, Auth, $rootScope, $firebaseArray) {
    var vm = this;
    vm.currentUser = $rootScope.currentUser;
    $scope.auth = Auth;
    
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      vm.currentUser = firebaseUser;
      if(firebaseUser == null || firebaseUser == undefined){
        $state.go("app.login");
      }
    });
    
    var messagesRef = firebase.database().ref().child("posts");
    vm.posts = $firebaseArray(messagesRef);
    vm.singlepost = {};

    vm.updatePost = function() {
      var postData = {
        uid: vm.currentUser.uid,
        description: vm.singlepost.description,
        title: vm.singlepost.title,
        image: (vm.singlepost.image && vm.singlepost.image.length > 0) ? vm.singlepost.image : "",
        createdat: (vm.singlepost.$id && vm.singlepost.$id.length > 0) ? vm.singlepost.createdat : new Date(),
        updatedat: new Date()
      };

      if (vm.singlepost.$id && vm.singlepost.$id.length > 0) {
        var newPostKey = vm.singlepost.$id;
      }
      else {
        var newPostKey = firebase.database().ref().child('posts').push().key;
      }


      var updates = {};
      updates['/posts/' + newPostKey] = postData;
      firebase.database().ref().update(updates).then(function(){
        $mdDialog.hide();
      });
    }

    vm.showPostDeleteDialog = function(index, ev) {
      if (index > -1) {
        vm.singlepost = vm.posts[index];
        var confirm = $mdDialog.confirm()
          .title('Баталгаажуулалт')
          .textContent('Энэ мэдээллийг устгах уу?')
          .ariaLabel('Delete')
          .targetEvent(ev)
          .ok('Устгах')
          .cancel('Цуцлах');

        $mdDialog.show(confirm).then(function() {
          firebase.database().ref().child("posts").child(vm.singlepost.$id).remove();
        }, function() {
          $mdDialog.hide();
        });
      }
    }

    vm.fileSelected = function(file) {
      console.log(file);
      var storageRef = firebase.storage().ref();
      var fileRef = storageRef.child(file.name);
      fileRef.put(file).then(function(snapshot) {
        vm.singlepost.image = snapshot.a.downloadURLs[0];
      });

    }

    vm.showPostDialog = function(index, ev) {
      if (index > -1) {
        vm.singlepost = vm.posts[index];
      }

      $mdDialog.show({
        contentElement: '#postDialog',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          item: vm.posts[index]
        }
      });
    };
  }


})();