var myApp = angular.module('myApp', ['ngMaterial']);


myApp.controller('controller', ['$scope', '$http', function($scope, $http) {
    $scope.title = "Currency exchange";
    var destinations = {};

    $http({
        method: 'GET',
        url: 'https://www.easysend.pl/api/calculator/countries'
    }).then(function(response) {
        $scope.countries = response.data;
        $scope.fast = true;
        $scope.selcountry = $scope.countries[1];
        var selcountry = $scope.selcountry.name;
        $scope.countryincheck = countryincheck;
        $scope.countryincheck();
    }, function errorCallback(response) {});


    function countryincheck() {
        selcountry = $scope.selcountry.id;
        $http({
                method: 'GET',
                url: "https://www.easysend.pl/api/calculator/countries/" + selcountry + "/destinations"
            })
            .then(function(response) {

                $scope.destinations = response.data;
                this.destinations = response.data;
                console.log(this.destinations);
                $scope.destination = $scope.destinations[0];
                var destination = $scope.destination.id;
                $scope.destcheck = destcheck;
                $scope.destcheck();
            }, function errorCallback(response) {});
    }

    function destcheck() {
        destination = $scope.destination.id;


        $http({
                method: 'GET',
                url: "https://www.easysend.pl/api/calculator/currencies/" + selcountry + "/" + destination + ""
            })
            .then(function(response) {

                angular.forEach(this.destinations, function(dest, key) {
                    if (dest.id == destination) {

                        angular.forEach(response.data, function(currencyOption, key) {
                            if (currencyOption.currency_out.id == dest.default_currency.id) {
                                $scope.currency2 = currencyOption;
                            }
                        });

                    }
                });

                $scope.currency = response.data;
                $scope.currency1 = $scope.currency[0];
                //$scope.currency2 = $scope.currency[0];
                $scope.moneyocheck = moneyocheck;
                $scope.moneyicheck = moneyicheck;

            }, function errorCallback(response) {});
    }

    function moneyocheck() {
        var currencyin = $scope.currency1.currency_in.name;
        var currencyout = $scope.currency2.currency_out.name;
        var amount = $scope.amount_in;
        $http({
                method: 'GET',
                url: "https://www.easysend.pl/api/calculator/exchange-rate/" + currencyin + "/" + currencyout + "/" + amount + ""
            })
            .then(function(response) {
                var convert = response.data;
                var inverse = convert.is_inverse;
                $scope.unit = convert.rate;
                if (inverse) {
                    $scope.amount_out = (amount * 1 / $scope.unit).toFixed(2);
                } else {
                    $scope.amount_out = (amount * $scope.unit).toFixed(2);
                }
                $scope.default = 1.00;
                $scope.eq = "=";
                $scope.fast = $scope.currency2.super_fast_available;
            }, function errorCallback(response) {});
    }

    function moneyicheck() {
        var currencyin = $scope.currency1.currency_in.name;
        var currencyout = $scope.currency2.currency_out.name;
        var amount = $scope.amount_out;
        $http({
            method: 'GET',
            url: "https://www.easysend.pl/api/calculator/exchange-rate/" + currencyin + "/" + currencyout + "/" + amount + ""
        }).then(function(response) {
            var convert = response.data;
            var inverse = convert.is_inverse;
            $scope.unit = convert.rate;
            if (inverse) {
                $scope.amount_in = (amount * $scope.unit).toFixed(2);
            } else {
                $scope.amount_in = (amount * (1 / $scope.unit)).toFixed(2);
            }
            $scope.default = 1;
            $scope.eq = "=";
            $scope.fast = $scope.currency2.super_fast_available;
            $scope.moneyicheck();
        }, function errorCallback(response) {});
        $scope.moneyocheck();
    }

}]);