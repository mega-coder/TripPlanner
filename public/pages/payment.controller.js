
function PaymentControllerFN($scope,$http,$timeout,$route){

    var stationsRef = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","T13","T14","T15","T16","T17","T18"];


    $scope.depart = ''
    $scope.tarif = ''
    $scope.destination = ''
    $scope.dateTicket = ''
    $scope.prix = ''
    $scope.tabRef = []

    $scope.tarifs = [
        {id:1,type :"Tarif Adulte"},
        {id:0,type :"Tarif Enfant"}
    ]


    $scope.stationTrain = [
        {Ref:13,Station :"ARRET DU STADE"},
        {Ref:16,Station :"BIR EL BEY"},
        {Ref:17,Station :"BORJ CEDRIA"},
        {Ref:11,Station :"BOUKORNINE"},
        {Ref:18,Station :"ERRIADH"},
        {Ref:9,Station :"EZZAHRA"},
        {Ref:15,Station :"HAMMAM CHATT"},
        {Ref:12,Station :"HAMMAM LIF"},
        {Ref:2,Station :"JBEL JELLOUD"},
        {Ref:10,Station : "LYCEE EZZAHRA"},
        {Ref:6,Station :"LYCEE RADES"},
        {Ref:4,Station :"MEGRINE"},
        {Ref:3,Station :"MEGRINE RIADH"},
        {Ref:7,Station :"RADES"},
        {Ref:8,Station :"RADES MELIANE"},
        {Ref:5,Station :"SIDI REZIG"},
        {Ref:14,Station :"TAHAR SFAR"},
        {Ref:1,Station :"TUNIS"}
    ]

    $scope.changePrice = function (dep,des,t) {
        console.log("dep : "+ dep)
        console.log("des : "+ des)
        var diff = Math.abs(parseInt(dep)-parseInt(des));
        if(diff <= 7){
            if( parseInt(t) == 0)
                $scope.price = 400;
            else if( parseInt(t) == 1)
                $scope.price = 500;
        }
        else if ( diff > 7 && diff <= 13) {
            if (parseInt(t) == 0)
                $scope.price = 450;
            else if (parseInt(t) == 1)
                $scope.price = 650;
        }else if ( diff > 13 && diff <= 18) {
            if (parseInt(t) == 0)
                $scope.price = 500;
            else if (parseInt(t) == 1)
                $scope.price = 850;
        }
    }

    $scope.pay = function (dt,pc,nm,des,dep) {
        //console.log("donnees "+dt+" "+pc +" "+nm+" "+t+" "+des+" "+dep)
        $http.get("http://localhost:3000/payment/elhenimariem@gmail.com/"+nm+"/"+pc)
            .then(function(response) {
                if(response.data.id == 1)
                {
                    $http.put("http://localhost:3000/payment/elhenimariem@gmail.com/"+response.data.amount)
                        .then(function(response) {
                            if(response.data.id == 1) {
                                var date = dt.replace(/\//g, "-");
                                $http.post("http://localhost:3000/payment/ticket/elhenimariem@gmail.com/" + pc + "/" + date + "/" + dep + "/" + des)
                                    .then(function (response) {
                                        $scope.idMsg = response.data.id;
                                        $scope.msg = response.data.message;
                                    });
                            }
                        });
                }
                else{
                    $scope.idMsg = response.data.id;
                    $scope.msg = response.data.message;
                }
            });

    }


    $('#dp3').datepicker({
        inline: true,
        //nextText: '&rarr;',
        //prevText: '&larr;',
        showOtherMonths: true,
        //dateFormat: 'dd MM yy',
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        //showOn: "button",
        //buttonImage: "img/calendar-blue.png",
        //buttonImageOnly: true,);
    })

}
PaymentControllerFN.$inject=["$scope","$http","$timeout","$route"];
angular
    .module("mean-stack")
    .controller("PaymentController",PaymentControllerFN);



