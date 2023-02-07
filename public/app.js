// Application Modules and Routing
angular
    .module('newApp', ['ngRoute', 'firebase'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/MySubjects.html',
                controller: 'MySubjectsCtrl'
            })
            .when('/profile', {
                templateUrl: 'views/Profile.html',
                controller: 'ProfileCtrl'
            })
            .when('/AthletesInAction', {
                templateUrl: 'views/AIA.html',
                controller: 'AIACtrl'
            })
            .when('/GlobalAidNetwork', {
                templateUrl: 'views/GAN.html',
                controller: 'GANCtrl'
            })
            .when('/StoryRunners', {
                templateUrl: 'views/SR.html',
                controller: 'SRCtrl'
            })
            .when('/JesusFilms', {
                templateUrl: 'views/JF.html',
                controller: 'JFCtrl'
            })
            .when('/GCMManila', {
                templateUrl: 'views/GCMM.html',
                controller: 'GCMMCtrl'
            })
            .when('/R8', {
                templateUrl: 'views/R8.html',
                controller: 'R8Ctrl'
            })
            .when('/ReportNational', {
                templateUrl: 'views/RN.html',
                controller: 'RNCtrl'
            })
            .when('/ReportPerTeam', {
                templateUrl: 'views/RPT.html',
                controller: 'RPTCtrl'
            })
            .when('/ReportSettings', {
                templateUrl: 'views/ReportSettings.html',
                controller: 'ReportSettingsCtrl'
            })
            .when('/Subjects', {
                templateUrl: 'views/Subject.html',
                controller: 'SubjectCtrl'
            })
            .when('/Courses', {
                templateUrl: 'views/Course.html',
                controller: 'CourseCtrl'
            })
            .when('/Blocks', {
                templateUrl: 'views/Block.html',
                controller: 'BlockCtrl'
            })
            .when('/MySubjects', {
                templateUrl: 'views/MySubjects.html',
                controller: 'MySubjectsCtrl'
            })
            .when('/Dashboard', {
                templateUrl: 'views/Dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/FacultySubjects', {
                templateUrl: 'views/FacultySubjects.html',
                controller: 'FacultySubjectsCtrl'
            })
            .when('/Settings', {
                templateUrl: 'views/Settings.html',
                controller: 'SettingsCtrl'
            });;
    });