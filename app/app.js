'use strict'

require( 'angular' );
require( 'angular-ui-router' );
require( 'angular-websocket' );
require( 'angular-loading-bar' );

var app = angular.module( "app", ['ui.router', 'angular-websocket', 'angular-loading-bar'] )
    .config(function($locationProvider, $stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "/app/views/index.html",
                controller: "HomeCtrl"
            })
            .state('home.btc', {
                url: "btc/:btc",
                controller: "HomeCtrl"
            })
            .state('home.brl', {
                url: "brl/:brl",
                controller: "HomeCtrl"
            })
            .state('foxbit', {
                url: "/foxbit/",
                templateUrl: "/app/views/index.html",
                controller: "FoxbitCtrl"
            })
            .state('foxbit.btc', {
                url: "btc/:btc",
                controller: "FoxbitCtrl"
            })
            .state('foxbit.brl', {
                url: "brl/:brl",
                controller: "FoxbitCtrl"
            })
            .state('mercadobitcoin', {
                url: "/mercadobitcoin/",
                templateUrl: "/app/views/index.html",
                controller: "MBCtrl"
            })
            .state('mercadobitcoin.btc', {
                url: "btc/:btc",
                controller: "MBCtrl"
            })
            .state('mercadobitcoin.brl', {
                url: "brl/:brl",
                controller: "MBCtrl"
            })
            .state('bitcointoyou', {
                url: "/bitcointoyou/",
                templateUrl: "/app/views/index.html",
                controller: "B2YCtrl"
            })
            .state('bitcointoyou.btc', {
                url: "btc/:btc",
                controller: "B2YCtrl"
            })
            .state('bitcointoyou.brl', {
                url: "brl/:brl",
                controller: "B2YCtrl"
            })
            .state('flowbtc', {
                url: "/flowbtc/",
                templateUrl: "/app/views/index.html",
                controller: "FlowBtcCtrl"
            })
            .state('flowbtc.btc', {
                url: "btc/:btc",
                controller: "FlowBtcCtrl"
            })
            .state('flowbtc.brl', {
                url: "brl/:brl",
                controller: "FlowBtcCtrl"
            })
            .state('negociecoins', {
                url: "/negociecoins/",
                templateUrl: "/app/views/index.html",
                controller: "NegocieCoinsCtrl"
            })
            .state('negociecoins.btc', {
                url: "btc/:btc",
                controller: "NegocieCoinsCtrl"
            })
            .state('negociecoins.brl', {
                url: "brl/:brl",
                controller: "NegocieCoinsCtrl"
            });

        cfpLoadingBarProvider.includeSpinner = true;
    })

    .controller("HomeCtrl", function($scope, $state, $http, $interval, cfpLoadingBar) {
        console.log('BitValor');
        $scope.title = 'BitValor';
        $scope.ticker = {};
        $scope.btc = 1;
        if ($state.params.brl > 0) {
            $scope.brl = parseFloat($state.params.brl);
        }
        if ($state.params.btc > 0) {
            $scope.btc = parseFloat($state.params.btc);
        }

        $scope.changeBTC = function(state) {
            var result = ($scope.btc * $scope.ticker.data.last).toFixed(2);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.brl = parseFloat(result);
            }

            if (state) {
                $state.go('home.btc', { btc : $scope.btc }, { notify: false });
            }
        }

        $scope.changeBRL = function(state) {
            var result = ($scope.brl / $scope.ticker.data.last).toFixed(8);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.btc = parseFloat(result);
            }

            if (state) {
                $state.go('home.brl', { brl : $scope.brl }, { notify: false });
            }
        }

        $scope.start = function() {
          cfpLoadingBar.start();
        };

        $scope.complete = function () {
          cfpLoadingBar.complete();
        }

        $scope.start();

        function getData() {
            var query = 'select * from html where url = "http://api.bitvalor.com/v1/ticker.json"'
              , url = "http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(query) + "&format=json";

            $http.get(url).then(function(response) {
                console.log(response);
                var data = JSON.parse(response.data.query.results.body);
                console.log(data);

                $scope.ticker.data = data['ticker_24h']['total'];

                $scope.complete();

                $scope.changeBRL(false);
                $scope.changeBTC(false);
            });
        }

        getData();

        var promise = $interval(function() {
            getData();
        }, 15000);

        $scope.$on('$destroy', function() {
            $interval.cancel(promise);
        });
    })

    .controller("FoxbitCtrl", function($scope, $state, $http, $interval, cfpLoadingBar) {
        console.log('FoxBit');
        $scope.title = 'FoxBit';
        $scope.ticker = {};
        $scope.btc = 1;
        if ($state.params.brl > 0) {
            $scope.brl = parseFloat($state.params.brl);
        }
        if ($state.params.btc > 0) {
            $scope.btc = parseFloat($state.params.btc);
        }

        $scope.changeBTC = function(state) {
            var result = ($scope.btc * $scope.ticker.data.last).toFixed(2);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.brl = parseFloat(result);
            }

            if (state) {
                $state.go('foxbit.btc', { btc : $scope.btc }, { notify: false });
            }
        }

        $scope.changeBRL = function(state) {
            var result = ($scope.brl / $scope.ticker.data.last).toFixed(8);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.btc = parseFloat(result);
            }

            if (state) {
                $state.go('foxbit.brl', { brl : $scope.brl }, { notify: false });
            }
        }

        $scope.start = function() {
          cfpLoadingBar.start();
        };

        $scope.complete = function () {
          cfpLoadingBar.complete();
        }

        $scope.start();

        function getData() {
            var query = 'select * from html where url = "https://api.blinktrade.com/api/v1/BRL/ticker"'
              , url = "http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(query) + "&format=json";

            $http.get(url).then(function(response) {
                console.log(response);
                var data = JSON.parse(response.data.query.results.body);
                console.log(data);

                $scope.ticker.data = data;

                $scope.complete();

                $scope.changeBRL(false);
                $scope.changeBTC(false);
            });
        }

        getData();

        var promise = $interval(function() {
            getData();
        }, 15000);

        $scope.$on('$destroy', function() {
            $interval.cancel(promise);
        });
    })

    .controller("MBCtrl", function($scope, $state, $http, $interval, cfpLoadingBar) {
        console.log('MercadoBitcoin');
        $scope.title = 'MercadoBitcoin';
        $scope.ticker = {};
        $scope.btc = 1;
        if ($state.params.brl > 0) {
            $scope.brl = parseFloat($state.params.brl);
        }
        if ($state.params.btc > 0) {
            $scope.btc = parseFloat($state.params.btc);
        }

        $scope.changeBTC = function(state) {
            var result = ($scope.btc * $scope.ticker.data.last).toFixed(2);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.brl = parseFloat(result);
            }

            if (state) {
                $state.go('mercadobitcoin.btc', { btc : $scope.btc }, { notify: false });
            }
        }

        $scope.changeBRL = function(state) {
            var result = ($scope.brl / $scope.ticker.data.last).toFixed(8);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.btc = parseFloat(result);
            }

            if (state) {
                $state.go('mercadobitcoin.brl', { brl : $scope.brl }, { notify: false });
            }
        }

        $scope.start = function() {
          cfpLoadingBar.start();
        };

        $scope.complete = function () {
          cfpLoadingBar.complete();
        }

        $scope.start();

        function getData() {
            var query = 'select * from html where url = "https://www.mercadobitcoin.com.br/api/ticker/"'
              , url = "http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(query) + "&format=json";

            $http.get(url).then(function(response) {
                console.log(response);
                var data = JSON.parse(response.data.query.results.body);
                console.log(data);

                $scope.ticker.data = data.ticker;

                $scope.complete();

                $scope.changeBRL(false);
                $scope.changeBTC(false);
            });
        }

        getData();

        var promise = $interval(function() {
            getData();
        }, 15000);

        $scope.$on('$destroy', function() {
            $interval.cancel(promise);
        });
    })

    .controller("B2YCtrl", function($scope, $state, $http, $interval, cfpLoadingBar) {
        console.log('BitcoinToYou');
        $scope.title = 'BitcoinToYou';
        $scope.ticker = {};
        $scope.btc = 1;
        if ($state.params.brl > 0) {
            $scope.brl = parseFloat($state.params.brl);
        }
        if ($state.params.btc > 0) {
            $scope.btc = parseFloat($state.params.btc);
        }

        $scope.changeBTC = function(state) {
            var result = ($scope.btc * $scope.ticker.data.last).toFixed(2);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.brl = parseFloat(result);
            }

            if (state) {
                $state.go('bitcointoyou.btc', { btc : $scope.btc }, { notify: false });
            }
        }

        $scope.changeBRL = function(state) {
            var result = ($scope.brl / $scope.ticker.data.last).toFixed(8);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.btc = parseFloat(result);
            }

            if (state) {
                $state.go('bitcointoyou.brl', { brl : $scope.brl }, { notify: false });
            }
        }

        $scope.start = function() {
          cfpLoadingBar.start();
        };

        $scope.complete = function () {
          cfpLoadingBar.complete();
        }

        $scope.start();

        function getData() {
            var query = 'select * from html where url = "https://www.bitcointoyou.com/api/ticker.aspx"'
              , url = "http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(query) + "&format=json";

            $http.get(url).then(function(response) {
                console.log(response);
                var data = JSON.parse(response.data.query.results.body);
                console.log(data);

                $scope.ticker.data = data.ticker;

                $scope.complete();

                $scope.changeBRL(false);
                $scope.changeBTC(false);
            });
        }

        getData();

        var promise = $interval(function() {
            getData();
        }, 15000);

        $scope.$on('$destroy', function() {
            $interval.cancel(promise);
        });
    })

    .controller("FlowBtcCtrl", function($scope, $state, $location, $websocket, cfpLoadingBar) {
        console.log('FlowBTC');
        $scope.title = 'FlowBTC';
        $scope.ticker = {};
        $scope.btc = 1;
        if ($state.params.brl > 0) {
            $scope.brl = parseFloat($state.params.brl);
        }
        if ($state.params.btc > 0) {
            $scope.btc = parseFloat($state.params.btc);
        }

        $scope.changeBTC = function(state) {
            var result = ($scope.btc * $scope.ticker.data.last).toFixed(2);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.brl = parseFloat(result);
            }

            if (state) {
                $state.go('flowbtc.btc', { btc : $scope.btc }, { notify: false });
            }
        }

        $scope.changeBRL = function(state) {
            var result = ($scope.brl / $scope.ticker.data.last).toFixed(8);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.btc = parseFloat(result);
            }

            if (state) {
                $state.go('flowbtc.brl', { brl : $scope.brl }, { notify: false });
            }
        }

        $scope.start = function() {
          cfpLoadingBar.start();
        };

        $scope.complete = function () {
          cfpLoadingBar.complete();
        }

        $scope.start();

        var ws = $websocket('wss://api.flowbtc.com:8401/v1/GetTicker/');

        ws.onOpen(function() {
            ws.send(JSON.stringify({messageType:'logon'}));
        });

        ws.onMessage(function(e) {
            var data = JSON.parse(e.data);
            var pair = data.prodPair;

            if (pair === 'BTCBRL') {
              console.log(data);
              $scope.ticker.data = data;

              $scope.complete();

              $scope.changeBRL(false);
              $scope.changeBTC(false);
            }
        });

        $scope.$on('$destroy', function() {
            ws.close();
        });
    })

    .controller("NegocieCoinsCtrl", function($scope, $state, $http, $interval, cfpLoadingBar) {
        console.log('NegocieCoins');
        $scope.title = 'NegocieCoins';
        $scope.ticker = {};
        $scope.btc = 1;
        if ($state.params.brl > 0) {
            $scope.brl = parseFloat($state.params.brl);
        }
        if ($state.params.btc > 0) {
            $scope.btc = parseFloat($state.params.btc);
        }

        $scope.changeBTC = function(state) {
            var result = ($scope.btc * $scope.ticker.data.last).toFixed(2);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.brl = parseFloat(result);
            }

            if (state) {
                $state.go('negociecoins.btc', { btc : $scope.btc }, { notify: false });
            }
        }

        $scope.changeBRL = function(state) {
            var result = ($scope.brl / $scope.ticker.data.last).toFixed(8);

            if (state === undefined) {
                state = true;
            }

            if (!isNaN(result)) {
                $scope.btc = parseFloat(result);
            }

            if (state) {
                $state.go('negociecoins.brl', { brl : $scope.brl }, { notify: false });
            }
        }

        $scope.start = function() {
          cfpLoadingBar.start();
        };

        $scope.complete = function () {
          cfpLoadingBar.complete();
        }

        $scope.start();

        function getData() {
            var query = 'select * from html where url = "http://www.negociecoins.com.br/api/v3/btcbrl/ticker"'
              , url = "http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(query) + "&format=json";

            $http.get(url).then(function(response) {
                console.log(response);
                var data = JSON.parse(response.data.query.results.body);
                console.log(data);

                $scope.ticker.data = data;

                $scope.complete();

                $scope.changeBRL(false);
                $scope.changeBTC(false);
            });
        }

        getData();

        var promise = $interval(function() {
            getData();
        }, 15000);

        $scope.$on('$destroy', function() {
            $interval.cancel(promise);
        });
    })

    .controller('CollapseCtrl', function ($scope) {
      $scope.isCollapsed = true;
    });

