(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode(false);
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('app', {
                abstract: true,
                resolve: {

                }
            })
            .state('app.index', {
                url: '/',
                views: {
                    'main@': {
                        templateUrl: 'app/modules/index/index.html',
                        controller: 'IndexController as vm'
                    },
                    'header@': {
                        templateUrl: 'app/modules/header/header.html',
                        controller: 'HeaderController as vm'
                    }
                },
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                        return Auth.$waitForSignIn();
                    }],
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "app/modules/header/header.controller.js"
                        ]);
                    }],
                }
            })
            .state('app.postdetail', {
                url: '/news/:id',
                views: {
                    'main@': {
                        templateUrl: 'app/modules/post/detail.html',
                        controller: 'PostDetailController as vm'
                    },
                    'header@': {
                        templateUrl: 'app/modules/header/header.html',
                        controller: 'HeaderController as vm'
                    }
                },
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                        return Auth.$waitForSignIn();
                    }],
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "app/modules/header/header.controller.js",
                            "app/modules/post/post.controller.js"
                        ]);
                    }],
                }
            })
            .state('app.postlist', {
                url: '/news',
                views: {
                    'main@': {
                        templateUrl: 'app/modules/post/list.html',
                        controller: 'PostListController as vm'
                    },
                    'header@': {
                        templateUrl: 'app/modules/header/header.html',
                        controller: 'HeaderController as vm'
                    }
                },
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                        return Auth.$waitForSignIn();
                    }],
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "app/modules/header/header.controller.js",
                            "app/modules/post/post.controller.js"
                        ]);
                    }],
                }
            })
            .state('app.aboutus', {
                url: '/aboutus',
                views: {
                    'main@': {
                        templateUrl: 'app/modules/pages/aboutus.html'
                    },
                    'header@': {
                        templateUrl: 'app/modules/header/header.html',
                        controller: 'HeaderController as vm'
                    }
                },
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                        return Auth.$waitForSignIn();
                    }],
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "app/modules/header/header.controller.js"
                        ]);
                    }],
                }
            })
            .state('app.products', {
                url: '/products',
                views: {
                    'main@': {
                        templateUrl: 'app/modules/pages/products.html'
                    },
                    'header@': {
                        templateUrl: 'app/modules/header/header.html',
                        controller: 'HeaderController as vm'
                    }
                },
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                        return Auth.$waitForSignIn();
                    }],
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "app/modules/header/header.controller.js"
                        ]);
                    }],
                }
            })
            .state('app.login', {
                url: '/login',
                views: {
                    'main@': {
                        templateUrl: 'app/modules/admin/login/login.html',
                        controller: 'LoginController as vm'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "app/modules/admin/login/login.controller.js"
                        ]);
                    }],
                    "currentAuth": ["Auth", function(Auth) {
                        return Auth.$waitForSignIn();
                    }]

                }
            })
            /*.state('app.admin', {
                url: '/admin',
                views: {
                    'main@': {
                        templateUrl: 'app/modules/admin/index/index.html',
                        controller: 'PostController as vm'
                    },
                    'header@': {
                        templateUrl: 'app/modules/admin/layouts/header.html',
                        controller: 'HeaderController as vm'
                    }
                },
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
                        return Auth.$requireSignIn();
                    }],
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "app/modules/header/header.controller.js"
                        ]);
                    }]
                }
            })*/
            .state('app.admin', {
                url: '/admin',
                views: {
                    'main@': {
                        templateUrl: 'app/modules/admin/post/post.html',
                        controller: 'PostController as vm'
                    },
                    'header@': {
                        templateUrl: 'app/modules/admin/layouts/header.html',
                        controller: 'HeaderController as vm'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "app/modules/admin/post/post.controller.js",
                            "app/modules/header/header.controller.js"
                        ]);
                    }],
                    "currentAuth": ["Auth", function(Auth) {
                        return Auth.$requireSignIn();
                    }],
                }
            });
    }

})();