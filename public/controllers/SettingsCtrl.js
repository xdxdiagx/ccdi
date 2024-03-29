'use strict';


angular.module('newApp').controller('SettingsCtrl', function ($firebaseArray, $scope) {

    // console.log("Settings");
    var loc = window.location.hash;
    var res = loc.split("#");
    var url = res[0]
    var params = res[1]
    console.log(res.length);
    if (res.length == 3) {
        window.location.hash = '#/Dashboard#2'
    }

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

    var ref = firebase.database().ref('users');

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
        var userRole = $('#userRole').val();
        var year = $('#year').val();
        var course = $('#course').val();
        var firstName = $('#firstName').val();
        var middleName = $('#middleName').val();
        var lastName = $('#lastName').val();
        var email = $('#email').val()
        var password = $('#password').val()


        if (firstName && middleName && lastName && email && password && userRole) {
            if (userRole == "student") {
                if (year && course) {
                    ref.push({
                            firstName: firstName,
                            middleName: middleName,
                            lastName: lastName,
                            email: email,
                            password: password,
                            role: userRole,
                            year: year,
                            course: course,
                        })
                        .then(function (ref) {
                            console.log(ref.key);
                            ref.update({
                                key: ref.key
                            })

                            $("#myModal11").modal("hide");
                            document.getElementById("firstName").innerHTML = "";
                            document.getElementById("middleName").innerHTML = "";
                            document.getElementById("lastName").innerHTML = "";
                            document.getElementById("email").innerHTML = "";
                            document.getElementById("password").innerHTML = "";
                            document.getElementById("userRole").innerHTML = "";
                            document.getElementById("year").innerHTML = "";
                            document.getElementById("course").innerHTML = "";
                            console.log('Added to database');
                        });
                    // firebase.auth().createUserWithEmailAndPassword(email, password)
                    //     .then(function (user) {
                    //         console.log(user.uid);
                    //         var uid = user.uid
                    //         ref.push({
                    //                 firstName: firstName,
                    //                 middleName: middleName,
                    //                 lastName: lastName,
                    //                 email: email,
                    //                 password: password,
                    //                 role: userRole,
                    //                 year: year,
                    //                 course: course,
                    //             })
                    //             .then(function (ref) {
                    //                 console.log(ref.key);
                    //                 ref.update({
                    //                     key: ref.key
                    //                 })

                    //                 $("#myModal11").modal("hide");
                    //                 document.getElementById("firstName").innerHTML = "";
                    //                 document.getElementById("middleName").innerHTML = "";
                    //                 document.getElementById("lastName").innerHTML = "";
                    //                 document.getElementById("email").innerHTML = "";
                    //                 document.getElementById("password").innerHTML = "";
                    //                 document.getElementById("userRole").innerHTML = "";
                    //                 document.getElementById("year").innerHTML = "";
                    //                 document.getElementById("course").innerHTML = "";
                    //                 console.log('Added to database');
                    //             });
                    //         // document.getElementById("username").innerHTML = " ";
                    //         // document.getElementById("email").innerHTML = " ";
                    //         // document.getElementById("password").innerHTML = " ";
                    //         // window.location.href = './index.html';
                    //         // username = "";
                    //         // email = "";
                    //         // password = "";
                    //     }).catch(function (error) {
                    //         console.log(error.code);
                    //         console.log(error.message);
                    //         document.getElementById("errorMessage").innerText = error.message;
                    //         setTimeout(() => {
                    //             document.getElementById("errorMessage").innerText = '';
                    //         }, 3000);
                    //     });
                } else {
                    // console.log("error");
                    // $('#error').show();
                    document.getElementById("errorMessage").innerText = "All fields are required!";
                    setTimeout(() => {
                        document.getElementById("errorMessage").innerText = '';
                    }, 3000);
                }
            } else {
                ref.push({
                        firstName: firstName,
                        middleName: middleName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        role: userRole,
                    })
                    .then(function (ref) {
                        console.log(ref.key);
                        ref.update({
                            key: ref.key
                        })

                        $("#myModal11").modal("hide");
                        document.getElementById("firstName").innerHTML = "";
                        document.getElementById("middleName").innerHTML = "";
                        document.getElementById("lastName").innerHTML = "";
                        document.getElementById("email").innerHTML = "";
                        document.getElementById("password").innerHTML = "";
                        document.getElementById("userRole").innerHTML = "";
                        console.log('Added to database');
                    });
                // firebase.auth().createUserWithEmailAndPassword(email, password)
                //     .then(function (user) {
                //         console.log(user.uid);
                //         var uid = user.uid;
                //         ref.push({
                //                 firstName: firstName,
                //                 middleName: middleName,
                //                 lastName: lastName,
                //                 email: email,
                //                 password: password,
                //                 role: userRole,
                //             })
                //             .then(function (ref) {
                //                 console.log(ref.key);
                //                 ref.update({
                //                     key: ref.key
                //                 })

                //                 $("#myModal11").modal("hide");
                //                 document.getElementById("firstName").innerHTML = "";
                //                 document.getElementById("middleName").innerHTML = "";
                //                 document.getElementById("lastName").innerHTML = "";
                //                 document.getElementById("email").innerHTML = "";
                //                 document.getElementById("password").innerHTML = "";
                //                 document.getElementById("userRole").innerHTML = "";
                //                 console.log('Added to database');
                //             });
                //         // document.getElementById("username").innerHTML = " ";
                //         // document.getElementById("email").innerHTML = " ";
                //         // document.getElementById("password").innerHTML = " ";
                //         // window.location.href = './index.html';
                //         // username = "";
                //         // email = "";
                //         // password = "";
                //     }).catch(function (error) {
                //         console.log(error.code);
                //         console.log(error.message);
                //         // document.getElementById("messages2").innerHTML = error.message;
                //         document.getElementById("errorMessage").innerText = error.message;
                //         setTimeout(() => {
                //             document.getElementById("errorMessage").innerText = '';
                //         }, 3000);
                //     });
            }

        } else {
            // console.log("error");
            // $('#error').show();
            document.getElementById("errorMessage").innerText = "All fields are required!";
            setTimeout(() => {
                document.getElementById("errorMessage").innerText = '';
            }, 3000);

        }
    };

    $scope.show_user = function () {
        var show_user = $('#showUser').val();
        console.log(show_user);
        $scope.student = [];
        $scope.faculty = [];
        $scope.registrar = [];
        $scope.admin = [];
        if (show_user == 'student') {
            firebase.database().ref("users").orderByChild("role").equalTo("student").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    $scope.student.push(childSnapshot.val());
                    console.log('student');


                })

            });
            $scope.data = $scope.student;
        } else if (show_user == 'faculty') {
            firebase.database().ref("users").orderByChild("role").equalTo("faculty").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    $scope.faculty.push(childSnapshot.val());
                    console.log('faculty');


                })

            });
            $scope.data = $scope.faculty;
        } else if (show_user == 'registrar') {
            firebase.database().ref("users").orderByChild("role").equalTo("registrar").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    $scope.registrar.push(childSnapshot.val());
                    console.log('registrar');


                })

            });
            $scope.data = $scope.registrar;
        } else if (show_user == 'admin') {
            firebase.database().ref("users").orderByChild("role").equalTo("admin").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    $scope.admin.push(childSnapshot.val());
                    // console.log($scope.faculty);


                })

            });
            $scope.data = $scope.admin;
        }
    };

    $scope.show_course = function () {
        var showCourse = $('#showCourse').val();
        // console.log(showCourse);
        $scope.multimedia = [];
        $scope.networking = [];
        $scope.bsoa = [];
        $scope.bsis = [];
        $scope.bsit = [];
        $scope.bscs = [];
        if (showCourse == 'Multimedia') {
            firebase.database().ref("users").orderByChild("course").equalTo("Multimedia").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    $scope.multimedia.push(childSnapshot.val());
                })

            });
            $scope.data = $scope.multimedia;
        } else if (showCourse == 'Networking') {
            firebase.database().ref("users").orderByChild("course").equalTo("Networking").limitToLast(10).once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    $scope.networking.push(childSnapshot.val());

                })

            });
            $scope.networking = $scope.admin;
        } else if (showCourse == 'BSOA') {
            firebase.database().ref("users").orderByChild("course").equalTo("BSOA").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    $scope.bsoa.push(childSnapshot.val());
                })

            });
            $scope.data = $scope.bsoa;
        } else if (showCourse == 'BSIS') {
            firebase.database().ref("users").orderByChild("course").equalTo("BSIS").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    $scope.bsis.push(childSnapshot.val());
                })

            });
            $scope.data = $scope.bsis;
        } else if (showCourse == 'BSIT') {
            firebase.database().ref("users").orderByChild("course").equalTo("BSIT").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    $scope.bsit.push(childSnapshot.val());
                })

            });
            $scope.data = $scope.bsit;
        } else if (showCourse == 'BSCS') {
            firebase.database().ref("users").orderByChild("course").equalTo("BSCS").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    $scope.bscs.push(childSnapshot.val());
                })
            });
            $scope.data = $scope.bscs;
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
        // console.log(users.role);
        if (users.year != null && users.course != null) {
            $("#edit_studentExtra").show();
        } else {
            console.log("none");
            $("#edit_studentExtra").hide();
        }
        $scope.clickedUser = users;
        id = users;
        $('#myModal12').modal()
    };

    $scope.selectUser2 = function (users) {
        // console.log(users);
        $("#myModal13").modal("show");
        $scope.clickedUser = users;
        id = users;
        // modal2.style.display = "block";
    };

    $scope.updateData = function () {
        var edit_firstName = $('#edit_firstName').val();
        var edit_middleName = $('#edit_middleName').val();
        var edit_lastName = $('#edit_lastName').val();
        var edit_email = $('#edit_email').val();
        var edit_userRole = $('#edit_userRole').val();
        var edit_year = $('#edit_year').val();
        var edit_course = $('#edit_course').val();
        console.log(edit_course);

        var ref2 = firebase.database().ref("users/" + id.key);

        console.log(id.key);

        if (userRole == "student") {
            ref2.update({
                    firstName: edit_firstName,
                    middleName: edit_middleName,
                    lastName: edit_lastName,
                    email: edit_email,
                    role: edit_userRole,
                    year: edit_year,
                    course: edit_course,
                })
                .then(function (ref) {
                    // console.log(ref.key);
                    $("#myModal12").modal("hide");
                    document.getElementById("edit_firstName").innerHTML = "";
                    document.getElementById("edit_middleName").innerHTML = "";
                    document.getElementById("edit_lastName").innerHTML = "";
                    document.getElementById("edit_email").innerHTML = "";
                    document.getElementById("edit_userRole").innerHTML = "";
                    document.getElementById("edit_year").innerHTML = "";
                    document.getElementById("edit_course").innerHTML = "";

                    console.log('Added to database');
                });

        } else {
            ref2.update({
                    firstName: edit_firstName,
                    middleName: edit_middleName,
                    lastName: edit_lastName,
                    email: edit_email,
                    role: edit_userRole

                })
                .then(function (ref) {
                    // console.log(ref.key);
                    $("#myModal12").modal("hide");
                    document.getElementById("edit_firstName").innerHTML = "";
                    document.getElementById("edit_middleName").innerHTML = "";
                    document.getElementById("edit_lastName").innerHTML = "";
                    document.getElementById("edit_email").innerHTML = "";
                    document.getElementById("edit_userRole").innerHTML = "";
                    document.getElementById("edit_year").innerHTML = "";
                    document.getElementById("edit_course").innerHTML = "";

                    console.log('Added to database');
                });
        }

        // modal.style.display = "none";

    };

    $scope.deleteUser = function () {
        var ref = firebase.database().ref("users/" + id.$id);
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