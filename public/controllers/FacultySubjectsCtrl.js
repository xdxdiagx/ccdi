'use strict';


angular.module('newApp').controller('FacultySubjectsCtrl', function ($firebaseArray, $scope) {

    // console.log("Settings");
    console.log(window.location.hash);
    if (window.location.hash == '#/FacultySubjects') {
        window.location.hash = '#/FacultySubjects#1'
        setTimeout(() => {
            location.reload();
        }, 500);
    }



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


    if (user_role == 'faculty') {
        var user_email_faculty = localStorage.getItem('email');
        // console.log(user_email_faculty);
        $scope.test101 = []
        firebase.database().ref("block").once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // console.log(childSnapshot.val());
                // var childKey = childSnapshot.key();
                var childData = childSnapshot.val();
                if (childSnapshot.val().faculty == user_email_faculty) {
                    $scope.test101.push(childSnapshot.val());
                    // console.log($scope.faculty);
                }


            })

        });

        $scope.data = $scope.test101;
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

        $scope.data = $firebaseArray(reftemp);
        reftemp.once('value', function (snapshot) {
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
    } else if (user_role == 'admin' || user_role == 'registrar') {

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

    $scope.studentsValKey = [];
    $scope.selectUser = function (users) {
        console.log(users.students);
        $scope.clickedUser = users;
        $scope.studentsVal = [];
        $scope.studentsValKey = [];

        for (key in users.students) {
            if (users.students.hasOwnProperty(key)) {
                var value = users.students[key];
                var studentKeyVal = value.studentKey;
                // console.log(value);
                $scope.studentsVal.push(value);
                $scope.studentsValKey.push(value);
            }
        }
        id = users;
        $scope.data3;
        $scope.data3 = $scope.studentsVal;
        console.log($scope.data3);
        console.log($scope.studentsValKey);
        ref.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // var childKey = childSnapshot.key();
                var childData = childSnapshot.val();
                // $scope.data = childSnapshot.val();
                // console.log($scope.data);

                username = childSnapshot.child('username').val();
                // fullname = childSnapshot.child('fullname').val();
                // address = childSnapshot.child('address').val();
                // country = childSnapshot.child('country').val();
                // number = childSnapshot.child('number').val();
                email = childSnapshot.child('email').val();
                role = childSnapshot.child('role').val();

            })
        });
        $('#myModal12').modal()
    };

    $scope.selectUser2 = function (users) {
        // console.log(users);
        $scope.clickedUser = users;
        id = users;
        $('#myModal13').modal()
        // modal2.style.display = "block";
    };

    $scope.selectUser3 = function (users) {
        // console.log(users);
        $scope.clickedUser2 = users;
        console.log(users);
        id = users;
        $('#myModal14').modal()
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

    $scope.SaveNew = function () {

        var updateGradeRef = firebase.database().ref('block/' + $scope.clickedUser2.key + "/students/" + $scope.clickedUser2.studentKey);
        // console.log($scope.clickedUser2);
        updateGradeRef.update({
            prelim: $scope.clickedUser2.prelim,
            midterm: $scope.clickedUser2.midterm,
            prefinal: $scope.clickedUser2.prefinal,
            final: $scope.clickedUser2.final,
        })
        // $('#myModal14').modal('hide')
        firebase.database().ref("users").orderByChild("email").equalTo($scope.clickedUser2.email).once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                console.log(childSnapshot.val());
                // var childKey = childSnapshot.key();
                var childData = childSnapshot.val();
                console.log(childData.subjects);
                $scope.studentSubj = [];
                $scope.studentSubjtemp = [];
                var temp1;
                for (key in childData.subjects) {
                    if (childData.subjects.hasOwnProperty(key)) {
                        var value = childData.subjects[key];
                        console.log($scope.clickedUser2.subject);
                        console.log(value.subject);
                        // console.log(value);
                        if (value.subject == $scope.clickedUser2.subject) {
                            $scope.studentSubjtemp.push(value)
                            temp1 = value;
                        }
                        $scope.studentSubj.push(value)
                        //do something with value;
                    }
                }
                console.log($scope.studentSubj);
                console.log($scope.studentSubjtemp);
                console.log(temp1);
                var updateGradeForUsersRef = firebase.database().ref('users/' + childSnapshot.val().key + "/subjects/" + temp1.key);

                updateGradeForUsersRef.update({
                    prelim: $scope.clickedUser2.prelim,
                    midterm: $scope.clickedUser2.midterm,
                    prefinal: $scope.clickedUser2.prefinal,
                    final: $scope.clickedUser2.final,
                })
                $('#myModal14').modal('hide')


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
    };

    var obj;
    $scope.tojson = function (obj) {
        var table = $("#myTableTest").tableToJSON({
            extractor: function (cellIndex, $cell) {
                return (
                    $cell.find("input").val() ||
                    $cell.find("#type option:selected").text()
                );
            },
        });
        return table;
    };

    $scope.SaveTest = function () {
        $scope.tojson();
        console.log($scope.tojson(obj));
        console.log($scope.studentsValKey);
        console.log($scope.studentsValKey.length);

        for (var i = 0; i < $scope.studentsValKey.length; i++) {
            var updateGradeRef = firebase.database().ref('block/' + $scope.studentsValKey[i].key + "/students/" + $scope.studentsValKey[i].studentKey);
            // console.log($scope.clickedUser2);
            updateGradeRef.update({
                    prelim: $scope.tojson(obj)[i].Prelim,
                    midterm: $scope.tojson(obj)[i].Midterm,
                    prefinal: $scope.tojson(obj)[i].Prefinals,
                    final: $scope.tojson(obj)[i].Finals,
                })
                .then(function (ref) {
                    console.log('Added to database');
                    $('#myModal12').modal('hide')
                });
        }
        // var x = 0;
        // while (x < $scope.studentsValKey.length) {
        //     console.log($scope.studentsValKey[i]);
        // }

        // $scope.studentsValKey.forEach(element => {
        //     console.log(element);
        // });


        // const table = document.getElementById("myTableTest");
        // var test = $('.grade_form').val();
        // console.log(test);
        // for (const row of table.rows) {
        //     for (const cell of row.cells) {
        //         // console.log(cell.length);
        //         console.log(cell.getElementsByTagName('td'));
        //     }
        // }


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