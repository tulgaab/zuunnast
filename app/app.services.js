(function ()
		{
	'use strict';

	angular
	.module('app')
	.factory("Auth", ["$firebaseAuth",
	  function($firebaseAuth) {
	    return $firebaseAuth();
	  }
	])
	.service('mainService', function ($http, $q) {
		var master= {};
		var uid=1;
		var dt = [];

		this.update = function (item) {
			dt.push(item);
		}

		this.save = function (item) {
			if (item.id == null) {
				//if this is new contact, add it in contacts array
				item.id = uid++;
				dt.push(item);
			} else {
				//for existing contact, find this contact using id
				//and update it.
				for (i in dt) {
					if (dt[i].id == item.id) {
						dt[i] = itm;
					}
				}
			}

		}



		this.get = function (id) {
			for (i in dt) {
				if (dt[i].id == id) {
					return dt[i];
				}
			}
		}



		this.add=function(item){    	
			master= angular.copy(item);
			return master;
		}
		this.view=function(){    

			return master;
		}

		this.getDetail=function(curl){
			var deferred = $q.defer();

			$http({
				method:'GET',
				url:curl
			})
			.then(function (response) {
				if (response.status == 200) {
					deferred.resolve(response.data);
				}
				else {
					deferred.reject('Error getting');
				}
			});

			return deferred.promise;
		}

		this.withdomain=function(method,url){
			var deferred = $q.defer();
			$http({
				method:method,           
				url:url           
			})
			.then(function (response) {
				deferred.resolve(response.data);
			});

			return deferred.promise;
		}

		this.withdata=function(method,url,data){
			var deferred = $q.defer();

			$http({
				method:method,
				url:url,
				data: data
			})
			.then(function (response) {
				if (response.status == 200) {
					deferred.resolve(response.data);
				}
				else {
					deferred.reject('Error occured doing action withdata');
				}
			});

			return deferred.promise;
		}

		this.http=function(method,url){
			var deferred = $q.defer();

			$http({
				method:method,
				url:url
			})
			.then(function (response) {
				if (response.status == 200) {
					deferred.resolve(response.data);
				}
				else {
					deferred.reject('Error occured doing action withoutdata');
				}
			});

			return deferred.promise;
		}

		this.http=function(method,url,data){
			var deferred = $q.defer();

			$http({
				method:method,
				url:url,
				data: data
			})
			.then(function (response) {
				if (response.status == 200) {
					deferred.resolve(response.data);
				}
				else {
					deferred.reject('Error occured doing action withdata');
				}
			});

			return deferred.promise;
		}
	});
		})();