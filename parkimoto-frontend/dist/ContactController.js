parkimotoApp.controller('ContactController', ['$scope', '$http', 'toastr', 'vcRecaptchaService', function($scope, $http, toastr, vcRecaptchaService) {

    $scope.response = null;
    $scope.widgetId = null;
    $scope.key = "6Ld_8xATAAAAAH5oDX-0aznb9_47hviYF6itVApG";

    $scope.setResponse = function(response) {
        console.info('Response available');
        $scope.response = response;
    };
    $scope.setWidgetId = function(widgetId) {
        console.info('Created widget ID: %s', widgetId);
        $scope.widgetId = widgetId;
    };
    $scope.cbExpiration = function() {
        console.info('Captcha expired. Resetting response object');
        $scope.response = null;
    };


    $scope.contactForm = {
        loading: false,
        formSubmitted: false
    }

    $scope.reset = function() {
        $scope.contactForm = angular.copy({});
    };


    $scope.submitContactForm = function() {
        $scope.contactForm.formSubmitted = true;
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.userForm.$invalid)
            return;

        $scope.contactForm.loading = true;

        $http.post('/api/contact/send', {
                contactForm: $scope.contactForm,
                captcha: $scope.response
            })
            .then(function onSuccess() {
                toastr.success('Your message has been sent!  We will respond to you shortly.', 'Success!');
                $scope.userForm.$setUntouched();
                $scope.contactForm.formSubmitted = false;
                $scope.reset();
            })
            .catch(function onError(sailsResponse) {
                console.log(sailsResponse);
                toastr.error('An error occurred.', 'Error', {
                    timeOut: 5000
                });
            })
            .finally(function reset() {
                $scope.contactForm.loading = false;
                vcRecaptchaService.reload($scope.widgetId);
            })
    };
}]);