'use strict';


angular.module('newApp').controller('MySubjectsCtrl', function ($firebaseArray, $scope) {

    // console.log("Settings");



    // Get the modal
    $scope.faculty = [];
    $scope.students = [];
    $scope.subjects = [];
    firebase.database().ref("users").orderByChild("role").equalTo("faculty").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.val());
            // var childKey = childSnapshot.key();
            var childData = childSnapshot.val();
            $scope.faculty.push(childSnapshot.val());
            console.log($scope.faculty);


        })
        var select = document.getElementById('faculty');

        for (var i = 0; i < $scope.faculty.length; i++) {
            var opt = document.createElement('option');
            opt.value = $scope.faculty[i].email;
            opt.innerHTML = $scope.faculty[i].email;
            select.appendChild(opt);
        }
        console.log(snapshot.val());

    });

    var email = localStorage.getItem("email");

    firebase.database().ref("users").orderByChild("email").equalTo(email).once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.val());
            // var childKey = childSnapshot.key();
            var childData = childSnapshot.val();
            $scope.students.push(childSnapshot.val());
            console.log($scope.students);


        })
        // var select = document.getElementById('students');

        // for (var i = 0; i < $scope.students.length; i++) {
        //     var opt = document.createElement('option');
        //     opt.value = $scope.students[i].key;
        //     opt.innerHTML = $scope.students[i].firstName + " " + $scope.students[i].lastName + " (" + $scope.students[i].email + ")";
        //     select.appendChild(opt);
        // }
        console.log(snapshot.val());

    });

    firebase.database().ref("subjects").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.val());
            // var childKey = childSnapshot.key();
            var childData = childSnapshot.val();
            $scope.subjects.push(childSnapshot.val());
            // console.log($scope.students);


        })
        var select = document.getElementById('subjects');

        for (var i = 0; i < $scope.subjects.length; i++) {
            var opt = document.createElement('option');
            opt.value = $scope.subjects[i].title;
            opt.innerHTML = $scope.subjects[i].title;
            select.appendChild(opt);
        }
        console.log(snapshot.val());

    });

    $scope.addStudent = function () {
        var ref = firebase.database().ref('block');

        firebase.database().ref("users").orderByChild("key").equalTo($scope.students).once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                console.log(childSnapshot.val().firstName);
                console.log(childSnapshot.val().middleName);
                console.log(childSnapshot.val().lastName);
                // var childKey = childSnapshot.key();
                var childData = childSnapshot.val();
                // $scope.students.push(childSnapshot.val());
                // console.log($scope.students);
                var key = localStorage.getItem('key');
                if (key) {
                    ref.child(key).update({
                            blockname: $scope.blockName,
                            faculty: $scope.faculty,
                            schoolYear: $scope.schoolYear,
                            subject: $scope.subject
                        })
                        .then(function (ref) {
                            // console.log(ref.key);
                            // ref.update({
                            //     key: ref.key,
                            // })
                            // localStorage.setItem("key", ref.key);
                            var ref2 = firebase.database().ref('block/' + key + "/students");
                            ref2.push({
                                    firstName: childSnapshot.val().firstName,
                                    middleName: childSnapshot.val().middleName,
                                    lastName: childSnapshot.val().lastName,
                                    email: childSnapshot.val().email,
                                    year: childSnapshot.val().year,
                                    course: childSnapshot.val().course,
                                    prelim: '',
                                    midterm: '',
                                    prefinal: '',
                                    final: '',
                                    key: key
                                })
                                .then(function (ref) {
                                    ref2.child(ref.key).update({
                                        studentKey: ref.key,
                                    })
                                });
                            // $("#myModal11").modal("hide");
                            // document.getElementById("code").innerHTML = " ";
                            // document.getElementById("title").innerHTML = " ";
                            // document.getElementById("years").innerHTML = " ";

                            console.log('Added to database');
                        });
                } else {

                    ref.push({
                            blockname: $scope.blockName,
                            faculty: $scope.faculty,
                            schoolYear: $scope.schoolYear,
                            subject: $scope.subject
                        })
                        .then(function (ref) {
                            console.log(ref.key);
                            ref.update({
                                key: ref.key,
                            })
                            localStorage.setItem("key", ref.key);
                            var ref2 = firebase.database().ref('block/' + ref.key + "/students");
                            ref2.push({
                                firstName: childSnapshot.val().firstName,
                                middleName: childSnapshot.val().middleName,
                                lastName: childSnapshot.val().lastName,
                                email: childSnapshot.val().email,
                                year: childSnapshot.val().year,
                                course: childSnapshot.val().course,
                                prelim: '',
                                midterm: '',
                                prefinal: '',
                                final: '',
                            })
                            // $("#myModal11").modal("hide");
                            // document.getElementById("code").innerHTML = " ";
                            // document.getElementById("title").innerHTML = " ";
                            // document.getElementById("years").innerHTML = " ";
                            $("#myModal11").modal("hide");

                            setTimeout(() => {
                                window.location.href = '#/';
                                window.location.href = '#/Blocks';
                                // document.getElementById("blockName").value = $scope.blockName;
                                // document.getElementById("schoolYear").value = $scope.schoolYear;
                                // document.getElementById("subjects").value = $scope.subject;
                                // document.getElementById("faculty").value = $scope.faculty;
                                // document.getElementById("students").value = $scope.students;
                                // console.log($scope.subject);
                                // console.log($scope.faculty);
                                $("#myModal11").modal("show");
                            }, 500);

                            console.log('Added to database');
                        });
                }



            })
            document.getElementById("students").value = "";
            // console.log(snapshot.val());

        });
        // var ref = firebase.database().ref("subjects/" + id.$id);
        // ref.remove();
        // $("#myModal13").modal("hide");
        // modal2.style.display = "none";
    };

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


    var user_key = localStorage.getItem("user_key");
    var user_role = localStorage.getItem("role");
    var ref = firebase.database().ref('block');
    var reftemp = firebase.database().ref('users/' + user_key + "/subjects");

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
        window.localStorage.removeItem("key");
        const random = (length = 8) => {
            // Declare all characters
            let chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            // Pick characers randomly
            let str = "";
            for (let i = 0; i < length; i++) {
                str += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            return str;
        };
        localStorage.setItem("key", random(20));
        // localStorage.clear();

        $("#myModal11").modal("hide");


        setTimeout(() => {
            window.location.href = '#/';
            window.location.href = '#/Blocks';
            // location.reload();
        }, 500);

        document.getElementById("blockName").value = "";
        document.getElementById("schoolYear").value = "";
        document.getElementById("subjects").value = "";
        document.getElementById("faculty").value = "";
        document.getElementById("students").value = "";
    };


    if (user_role == 'admin' || user_role == 'faculty') {
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
    } else if (user_role == 'student') {
        $scope.alt = [];
        $scope.average;
        $scope.allgrades = [];
        // $scope.data = $firebaseArray(reftemp);
        reftemp.once('value', function (snapshot) {
            var sub = snapshot.val();
            for (key in sub) {
                // console.log(key);
                if (key != 'gwa') {
                    var value = sub[key];
                    const perSubGWA = ((value.prelim * 1) + (value.midterm * 1) + (value.prefinal * 1) + (value.final * 1)) / 4;
                    $scope.alt.push(value);
                    $scope.allgrades.push(perSubGWA);
                }
            }
            var sum = $scope.allgrades.reduce((r, c) => r + parseFloat(c), 0)
            $scope.average = sum / $scope.allgrades.length
            // console.log(sum / $scope.allgrades.length);
            // console.log(snapshot.val());
            snapshot.forEach(function (childSnapshot) {
                // var childKey = childSnapshot.key();
                var childData = childSnapshot.val();
                console.log(childData);
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
        $scope.data = $scope.alt;

    }

    var key2 = localStorage.getItem('key');
    var ref2 = firebase.database().ref('block/' + key2 + "/students");
    $scope.data2 = $firebaseArray(ref2);
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
        $('#myModal13').modal()
        // modal2.style.display = "block";
    };

    $scope.updateData = function () {
        var ref2 = firebase.database().ref("subjects/" + id.$id);
        ref2.update({
            code: $scope.clickedUser.code,
            title: $scope.clickedUser.title,
            lecUnits: $scope.clickedUser.lecUnits,
            labUnits: $scope.clickedUser.labUnits,
            units: $scope.clickedUser.units,
            preRequisited: $scope.clickedUser.preRequisited
        })
        $("#myModal12").modal("hide");

        // modal.style.display = "none";

    };

    $scope.deleteUser = function () {
        var ref = firebase.database().ref("subjects/" + id.$id);
        ref.remove();
        $("#myModal13").modal("hide");
        // modal2.style.display = "none";
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