var myapp = angular.module('myapp', [])

myapp.controller('myctrl', function ($scope){

    $scope.values = [
        {value: 10},
        {value: 20},
        {value: 10},
        {value: 0},
        {value: 15}
    ];

    $scope.data = [$scope.values[0].value, $scope.values[1].value, $scope.values[2].value, $scope.values[3].value, $scope.values[4].value];


    $scope.$watch('values', function() {
        $scope.data = [$scope.values[0].value, $scope.values[1].value, $scope.values[2].value, $scope.values[3].value, $scope.values[4].value];
        }, true);
    });

myapp.directive('barChart', function(){
    return {                
        template: '<canvas id="myChart" width="600" height="400"></canvas>',
        link: function(scope, element, attrs) {

            scope.chartdata = {
                        labels: ["Value1", "Value2", "Value3", "Value4", "Value5"],
                        datasets: [
                            {
                                label: "somedata",
                                fillColor: "rgba(130,150,210,0.5)",
                                strokeColor: "rgba(130,150,210,0.8)",
                                highlightFill: "rgba(130,150,210,0.75)",
                                highlightStroke: "rgba(130,150,210,1)",
                                data: angular.fromJson(attrs.details)
                            }
                        ]
                   };

            scope.ctx = document.getElementById("myChart").getContext("2d");                
            scope.myChart = new Chart(scope.ctx).Bar(scope.chartdata);
              
            attrs.$observe('details', function(value){                    
                scope.chartdata.datasets[0].data = angular.fromJson(value);
                scope.myChart.destroy();
                scope.myChart = new Chart(scope.ctx).Bar(scope.chartdata);   
            }); 

        }
    };
});