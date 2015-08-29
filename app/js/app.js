(function () {
  "use strict";
  
  var app = angular.module("calcApp", []);
  
  app.controller("CalcCtrl", ["$scope", function ($scope) {
    
    //variables needed for calculations
    var op1 = "",
      op2 = "",
      operator = "",
      freshInput = true,
      decimalPlaces = 8;

    //mathematical operations
    $scope.add = function (x, y) {
      return x + y;
    };

    $scope.subtract = function (x, y) {
      return x - y;
    };

    $scope.multiply = function (x, y) {
      return x * y;
    };

    $scope.divide = function (x, y) {
      return x / y;
    };
    
    $scope.power = function (x, y) {
      return Math.pow(x, y);
    };

    function calculate(x, y, op) {
      return op(x, y);
    }

    //allow variables to be set
    function setOp1(val) {
      op1 = val;
    }

    function setOp2(val) {
      op2 = val;
    }

    function setOperator(val) {
      operator = val;
    }
    
    //round the answers to a certain number of decimal points
    function roundToPlaces(num, places) {
      return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
    }

    //functions to allow interaction from app
    $scope.input = "";
    
    $scope.digitPress = function (val) {
      if (freshInput) {
        $scope.clearEntry();
        freshInput = false;
        $scope.digitPress(val);
      //don't add zeroes to the beggining of the input
      } else if (val === "0" && $scope.input === "") {
        return;
      } else {
        $scope.input += val;
      }
    };
    
    $scope.decimalPress = function () {
      if (freshInput) {
        $scope.clearEntry();
        freshInput = false;
        $scope.decimalPress();
      } else {
        //only add decimal if there isn't already a decimal in the input
        if ($scope.input.match(/\./) === null) {
          //add a zero if the decimal point is first
          if ($scope.input === "") {
            $scope.digitPress("0.");
          } else {
            $scope.digitPress(".");
          }
        }
      }
    };
    
    $scope.zeroPress = function () {
      //don't add zeros to the beginning of the input 
      if ($scope.input !== "") {
        $scope.digitPress("0");
      }
    };

    $scope.operatorPress = function (val) {
      //if there are no other operations in the chain, set operator and op1
      if (operator === "") {
        setOperator(val);
        setOp1(parseFloat($scope.input));
        freshInput = true;
      //if there is another operation in the chain, perfrom that operation, then set operator and op1  
      } else {
        setOp2(parseFloat($scope.input));
        $scope.input = roundToPlaces(calculate(op1, op2, operator), decimalPlaces).toString();
        setOp1(parseFloat($scope.input));
        setOperator(val);
        freshInput = true;
      }
    };

    $scope.equalsPress = function () {
      //do nothing if no operator is set
      if (operator !== "") {
        setOp2(parseFloat($scope.input));
        $scope.input = roundToPlaces(calculate(op1, op2, operator), decimalPlaces).toString();
        setOperator("");
        freshInput = true;
      }
    };

    //clear everything 
    $scope.clearAll = function () {
      $scope.input = "";
      op1 = "";
      op2 = "";
      operator = "";
    };
    
    //clear entry
    $scope.clearEntry = function () {
      $scope.input = "";
    };
    
  }]);
}());