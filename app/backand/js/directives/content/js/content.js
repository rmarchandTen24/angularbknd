/**
* @ngdoc overview
* @name directive.bkndContent
*/
var backAndDirectives = angular.module('backAnd.directives');
backAndDirectives.run(function ($templateCache) {
    $templateCache.put("backand/js/directives/content/partials/content.html", '<div>\n' +
        '<div ng-switch on="content.pageType">\n' +
            '<htmlcontent content-id="content.__metadata.id" ng-switch-when="Content">	</htmlcontent>\n' +
            '<iframecontent content-id="content.__metadata.id" ng-switch-when="IFrame">	</iframecontent>\n' +
            '<linkcontent content-id="content.__metadata.id" ng-switch-when="External">	</linkcontent>\n' +
        '</div>\n' +
    '</div>')
})
.directive('bkndContent', function (Global, $http, configService, $sce, $location, $templateCache) {
    /**
   * @ngdoc directive
   * @name directive.bkndContent
   * @description base content 
   * @param {string} contentId, required, id of the content
   * @returns {object} directive
   */
    return {
		restrict: 'E',
		templateUrl: 'backand/js/directives/content/partials/content.html',
		replace: false,
		scope: {
		    contentId: '='
		},
        /**
         * @name link
         * @methodOf directive.bkndContent
         * @description manage the scope of the bkndContent directive
         * @param {object} scope, required, the scope of the directive
         * @param {object} el, required, the element of the directive
         * @param {object} attrs, required, the attributes of the directive
         */
		link: function (scope, el, attrs) {
		    /**
        * @ngdoc function
        * @name contentId
        * @methodOf backand.js.directive.bkndContent
        * @description Get the new Backand's content id and re-load the data
        */
		    scope.$watch('contentId', function () {
		        if (scope.contentId)
		            scope.setData(scope.contentId);
		        else if ($location.search().contentId) {
		            scope.setData($location.search().contentId);
		        }
		    });

		    /**
            * @ngdoc function
            * @name setData
            * @methodOf backand.js.directive.bkndContent
            * @param {string} id reference to content
            * @description set the data
            */
		    scope.setData = function (id) {
		        configService.read({
		            dataType: "content",
		            id: id
		        }, function (data) {
		            scope.content = data;

		        });

		    }

		    
		}
	}
});
