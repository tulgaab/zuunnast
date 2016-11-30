(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(runBlock);

    /** @ngInject */
    function config($mdThemingProvider) {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBVUG6_-oMMiheGh--b2PlDgLsK9g1-Ens",
            authDomain: "zuunnast-1b0b1.firebaseapp.com",
            databaseURL: "https://zuunnast-1b0b1.firebaseio.com",
            storageBucket: "zuunnast-1b0b1.appspot.com",
            messagingSenderId: "60171925495"
        };
        firebase.initializeApp(config);

        $mdThemingProvider.definePalette('mytheme', {
            '50': '#ebf1fa',
            '100': '#c2d4ef',
            '200': '#9ab8e5',
            '300': '#78a0dc',
            '400': '#5688d3',
            '500': '#3470ca',
            '600': '#2e62b1',
            '700': '#275498',
            '800': '#21467e',
            '900': '#1a3865',
            'A100': '#c2d4ef',
            'A200': '#9ab8e5',
            'A400': '#5688d3',
            'A700': '#275498',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 A100',
            'contrastStrongLightColors': '300 400'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('mytheme', {
                'default': '900', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '600', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '500', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            // If you specify less than all of the keys, it will inherit from the
            // default shades
            .accentPalette('teal', {
                'default': '500',
                'hue-1': '400',
                'hue-2': '600',
                'hue-3': 'A100'
            })
            .warnPalette('deep-orange', {})
            .backgroundPalette('grey', {
                'default': 'A100',
                'hue-1': 'A100',
                'hue-2': '100',
                'hue-3': '300'
            });
    }

    function runBlock($cookies, mainService, $rootScope, $http, $state) {

        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            if (error === "AUTH_REQUIRED") {
                $state.go("app.login");
            }
        });
        
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            $rootScope.currentUser = user;
          } else {
            $rootScope.currentUser = null;
          }
        });

    }

})();