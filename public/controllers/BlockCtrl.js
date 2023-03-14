'use strict';


angular.module('newApp').controller('BlockCtrl', function ($firebaseArray, $scope) {

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
            opt.value = $scope.faculty[i].key;
            // opt.innerHTML = $scope.faculty[i].firstName + " " + $scope.faculty[i].lastName + " (" + $scope.faculty[i].email + ")";
            opt.innerHTML = $scope.faculty[i].email;
            select.appendChild(opt);
        }
        console.log(snapshot.val());

    });

    firebase.database().ref("users").orderByChild("role").equalTo("student").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.val());
            // var childKey = childSnapshot.key();
            var childData = childSnapshot.val();
            $scope.students.push(childSnapshot.val());
            // console.log($scope.students);


        })
        var select = document.getElementById('students');

        for (var i = 0; i < $scope.students.length; i++) {
            var opt = document.createElement('option');
            opt.value = $scope.students[i].key;
            opt.innerHTML = $scope.students[i].firstName + " " + $scope.students[i].lastName + " (" + $scope.students[i].email + ")";
            select.appendChild(opt);
        }
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

    function getSelectedText(elementId) {
        var elt = document.getElementById(elementId);

        if (elt.selectedIndex == -1)
            return null;

        return elt.options[elt.selectedIndex].text;
    }

    $scope.addStudent = function () {
        var ref = firebase.database().ref('block');
        var num_stud;
        if (localStorage.getItem('students')) {
            num_stud = localStorage.getItem('students');
            num_stud = (num_stud * 1) + 1;
            localStorage.setItem("students", num_stud)
            // console.log(num_stud);
        } else {
            localStorage.setItem("students", 1);
        }

        firebase.database().ref("users").orderByChild("key").equalTo($scope.students).once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                console.log(childSnapshot.val().firstName);
                console.log(childSnapshot.val().middleName);
                console.log(childSnapshot.val().lastName);
                // var childKey = childSnapshot.key();
                var childData = childSnapshot.val();
                // $scope.students.push(childSnapshot.val());
                console.log($scope.students);
                console.log($scope.faculty);
                var key = localStorage.getItem('key');
                var ref2 = firebase.database().ref('users/' + $scope.students + "/subjects");
                var refFaculty = firebase.database().ref('users/' + $scope.faculty + "/subjects");
                var faculty_val = $("#faculty").text();
                faculty_val.replace(/\s/g, "");
                var facultySelected = getSelectedText('faculty');
                if (key) {
                    ref2.child(key).update({
                            blockname: $scope.blockName,
                            faculty: facultySelected,
                            schoolYear: $scope.schoolYear,
                            subject: $scope.subject,
                            prelim: '',
                            midterm: '',
                            prefinal: '',
                            final: '',
                            key: key
                        })
                        .then(function (ref) {
                            // console.log(ref.key);
                            // ref.update({
                            //     key: ref.key,
                            // })
                            // localStorage.setItem("key", ref.key);
                            // var ref3 = firebase.database().ref('users/' + $scope.students + "/subjects/" + key + "/students");
                            // ref3.push({
                            //         firstName: childSnapshot.val().firstName,
                            //         middleName: childSnapshot.val().middleName,
                            //         lastName: childSnapshot.val().lastName,
                            //         email: childSnapshot.val().email,
                            //         year: childSnapshot.val().year,
                            //         course: childSnapshot.val().course,
                            //         prelim: '',
                            //         midterm: '',
                            //         prefinal: '',
                            //         final: '',
                            //         key: key
                            //     })
                            //     .then(function (ref) {
                            //         ref3.child(ref.key).update({
                            //             studentKey: ref.key,
                            //         })
                            //     });
                            // $("#myModal11").modal("hide");
                            // document.getElementById("code").innerHTML = " ";
                            // document.getElementById("title").innerHTML = " ";
                            // document.getElementById("years").innerHTML = " ";

                            console.log('Added to database');
                        });



                    ref.child(key).update({
                            blockname: $scope.blockName,
                            faculty: facultySelected,
                            schoolYear: $scope.schoolYear,
                            subject: $scope.subject,
                            num_stud: localStorage.getItem("students", num_stud)
                        })
                        .then(function (ref) {
                            // console.log(ref.key);
                            // ref.update({
                            //     key: ref.key,
                            // })
                            // localStorage.setItem("key", ref.key);
                            var ref2 = firebase.database().ref('block/' + key + "/students");
                            // ref2.once('value', function (snapshot4) {
                            //     var num = snapshot4.val().num_stud;
                            //     var num_stud;
                            //     if (num == null || !num) {
                            //         num_stud = 1;
                            //     } else {
                            //         num = (num * 1) + 1;
                            //     }
                            //     console.log(snapshot4.val());
                            //     console.log(num);
                            // });
                            // var num_stud;
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
                                    subject: $scope.subject,
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
                            faculty: facultySelected,
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

    var ref = firebase.database().ref('block');

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
        localStorage.removeItem('students')
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
        console.log(ref.remove());
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