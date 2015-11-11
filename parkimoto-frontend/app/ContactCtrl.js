parkimotoApp.controller('ContactCtrl', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

    $scope.contactForm = {
        loading: false
    }

    $scope.submitContactForm = function() {
        $scope.contactForm.loading = true;
        
        $http.post('/api/contactus', {
            contactForm: $scope.contactForm
        })
        .then(function onSuccess() {
            
        })
        .catch(function onError(sailsResponse) {
            console.log(sailsResponse);
            toastr.error('An error occurred.', 'Error', {
               timeOut: 5000 
            });
        })
        .finally(function reset() {
            $scope.contactForm.loading = false;
        })
    };

}]);