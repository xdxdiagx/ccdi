'use strict';


angular.module('newApp').controller('CourseCtrl', function ($firebaseArray, $scope) {

    // console.log("Settings");

    // Get the modal
    var modal = document.getElementById('myModal12');
    var modal2 = document.getElementById('myModal2');
    var modal3 = document.getElementById('myModal3');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var accept = document.getElementById("accept");

    $("#editBtn").click(function () {
        modal.style.display = "block";
    });

    var ref = firebase.database().ref('courses');

    var username, email, role, id;

    $scope.clickedUser = {};

    $scope.userRoles = function () {
        // var payment = document.getElementById("payment");
        var userRole = $('#userRole').val();
        if (userRole == "admin") {
            $("#studentExtra").hide();
            // console.log("Admin")
        } else if (userRole == "faculty") {
            $("#studentExtra").hide();
            // console.log("Faculty");
        } else if (userRole == "registrar") {
            $("#studentExtra").hide();
            // console.log("Registrar");
        } else if (userRole == "student") {
            $("#studentExtra").show();
            // console.log("student");
        }
    };

    $scope.edit_userRoles = function () {
        // var payment = document.getElementById("payment");
        var userRole = $('#edit_userRole').val();
        if (userRole == "admin") {
            $("#edit_studentExtra").hide();
            // console.log("Admin")
        } else if (userRole == "faculty") {
            $("#edit_studentExtra").hide();
            // console.log("Faculty");
        } else if (userRole == "registrar") {
            $("#edit_studentExtra").hide();
            // console.log("Registrar");
        } else if (userRole == "student") {
            $("#edit_studentExtra").show();
            // console.log("student");
        }
    };

    $scope.addData = function () {
        var code = $('#code').val();
        var title = $('#title').val();
        var years = $('#years').val();


        if (code && title && years) {

            ref.push({
                    code: code,
                    title: title,
                    years: $scope.years
                })
                .then(function (ref) {
                    console.log(ref.key);
                    ref.update({
                        key: ref.key
                    })
                    $("#myModal11").modal("hide");
                    document.getElementById("code").innerHTML = " ";
                    document.getElementById("title").innerHTML = " ";
                    document.getElementById("years").innerHTML = " ";

                    console.log('Added to database');
                });

        } else {
            console.log("error");
            // $('#error').show();
            document.getElementById("errorMessage").innerText = "All fields are required!";
            setTimeout(() => {
                document.getElementById("errorMessage").innerText = '';
            }, 3000);

        }
    };


    $scope.data = $firebaseArray(ref);
    ref.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            // var childKey = childSnapshot.key();
            var childData = childSnapshot.val();
            // $scope.data = childSnapshot.val();
            console.log($scope.data);

            username = childSnapshot.child('username').val();
            // fullname = childSnapshot.child('fullname').val();
            // address = childSnapshot.child('address').val();
            // country = childSnapshot.child('country').val();
            // number = childSnapshot.child('number').val();
            email = childSnapshot.child('email').val();
            role = childSnapshot.child('role').val();

        })
    });

    $scope.addUsers = function () {
        // console.log(users);
        // $scope.clickedUser = users;
        // id = users;
        modal3.style.display = "block";
    };

    $scope.selectUser = function (users) {
        // console.log(users);
        $scope.clickedUser = users;
        id = users;
        $('#myModal12').modal()
    };

    $scope.selectUser2 = function (users) {
        // console.log(users);
        $scope.clickedUser = users;
        id = users;
        // modal2.style.display = "block";
        $('#myModal13').modal("show")

    };

    $scope.updateData = function () {
        var ref2 = firebase.database().ref("courses/" + id.$id);
        ref2.update({
            code: $scope.clickedUser.code,
            title: $scope.clickedUser.title,
            years: $scope.clickedUser.years
        })

        $("#myModal12").modal("hide");

    };

    $scope.deleteUser = function () {
        var ref = firebase.database().ref("courses/" + id.$id);
        ref.remove();
        // modal2.style.display = "none";
        $("#myModal13").modal("hide");
    };

    $scope.close = function () {
        modal.style.display = "none";
    };

    $scope.close2 = function () {
        modal2.style.display = "none";
    };

    $scope.close3 = function () {
        modal3.style.display = "none";
    };


    // console.log(email);



    // })





});