'use strict';

angular.module('newApp').controller('DashboardCtrl', function ($firebaseArray, $scope) {
    // var username = localStorage.getItem("username");

    // var register = localStorage.getItem("register");

    // var ref = firebase.database().ref("datasets/users");

    // var userVerify = firebase.auth().currentUser;
    var loc = window.location.hash;
    var res = loc.split("#");
    var url = res[0]
    var params = res[1]
    console.log(res.length);
    if (res.length == 2) {
        // setTimeout(() => {
        // }, 1000);
        window.location.hash = '#/Settings#1'
    } else if (res.length == 3) {
        window.location.hash = '#/Dashboard#3'
    }

    $scope.evanGoal = 0;
    $scope.sfuGoal = 0;
    $scope.stGoal = 0;
    $scope.cmdGoal = 0;
    $scope.churchesGoal = 0;
    $scope.evanCurrent = 0;
    $scope.sfuCurrent = 0;
    $scope.stCurrent = 0;
    $scope.cmdCurrent = 0;
    $scope.churchesCurrent = 0;

    $scope.faculty = [];
    $scope.students = [];
    $scope.subjects = [];

    firebase.database().ref("users").orderByChild("role").equalTo("student").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.val());
            // var childKey = childSnapshot.key();
            var childData = childSnapshot.val();
            $scope.students.push(childSnapshot.val());
            // console.log($scope.students);


        })
        document.getElementById('students').innerHTML = $scope.students.length;

    });

    firebase.database().ref("users").orderByChild("role").equalTo("faculty").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.val());
            // var childKey = childSnapshot.key();
            var childData = childSnapshot.val();
            $scope.faculty.push(childSnapshot.val());
            console.log($scope.faculty);


        })
        document.getElementById('faculty').innerHTML = $scope.faculty.length;

    });

    firebase.database().ref("subjects").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            // console.log(childSnapshot.val());
            // var childKey = childSnapshot.key();
            var childData = childSnapshot.val();
            $scope.subjects.push(childSnapshot.val());
            // console.log($scope.students);


        })
        document.getElementById('subjects').innerHTML = $scope.subjects.length;

    });


    // firebase.database().ref("users").once('value', function (snapshot) {
    //     snapshot.forEach(function (childSnapshot) {
    //         // console.log(childSnapshot.val().subjects);
    //         if (childSnapshot.val().subjects == null) {
    //             // console.log("you need to add");

    //             function getRandomInt(min, max) {
    //                 return Math.random() * (max - min) + min;
    //             }
    //             var test = getRandomInt(89, 97).toFixed();
    //             console.log(Number(test));
    //             console.log(childSnapshot.key);
    //             var gwa = Number(test);



    //             var ref2 = firebase.database().ref("users/" + childSnapshot.key + "/subjects");

    //             ref2.update({
    //                     gwa: gwa
    //                 })
    //                 .then(function (ref) {

    //                     console.log('Added to database');
    //                 });

    //         } else {

    //         }


    //     })

    // });


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
                    // $scope.multimedia.push(childSnapshot.val());
                    if (childData.subjects.gwa) {
                        if (childData.subjects.gwa >= 90) {
                            $scope.multimedia.push(childSnapshot.val());
                        }
                        console.log('Multimedia');
                    }


                })

            });
            // console.log($scope.multimedia);

            // $scope.multimedia.sort((a, b) => {
            //     return a.gwa - b.gwa;
            // });
            // $scope.multimedia.sort((a, b) => b.subjects.gwa - a.subjects.gwa);
            // // console.log($scope.multimedia);
            // $scope.multimedia.forEach((e) => {
            //     console.log(`${e.subjects.gwa}`);
            // });
            // $scope.data = $scope.multimedia.slice(0, 10);
            localStorage.setItem("data", "multimedia");
            $('#filterYear').val(0);
            $scope.data = $scope.multimedia;

            // console.log($scope.multimedia);
        } else if (showCourse == 'Networking') {
            firebase.database().ref("users").orderByChild("course").equalTo("Networking").limitToLast(10).once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    // $scope.networking.push(childSnapshot.val());
                    if (childData.subjects.gwa >= 90) {
                        $scope.networking.push(childSnapshot.val());
                    }
                    // console.log($scope.faculty);


                })

            });
            // $scope.networking.sort((a, b) => b.subjects.gwa - a.subjects.gwa);
            // // console.log($scope.multimedia);
            // $scope.networking.forEach((e) => {
            //     console.log(`${e.subjects.gwa}`);
            // });
            // $scope.data = $scope.networking.slice(0, 10);
            localStorage.setItem("data", "networking");
            $('#filterYear').val(0);
            $scope.data = $scope.networking;

        } else if (showCourse == 'BSOA') {
            firebase.database().ref("users").orderByChild("course").equalTo("BSOA").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    // $scope.bsoa.push(childSnapshot.val());
                    if (childData.subjects.gwa >= 90) {
                        $scope.bsoa.push(childSnapshot.val());
                    }
                    // console.log($scope.faculty);


                })

            });
            // $scope.registrar.sort((a, b) => b.subjects.gwa - a.subjects.gwa);
            // // console.log($scope.multimedia);
            // $scope.registrar.forEach((e) => {
            //     console.log(`${e.subjects.gwa}`);
            // });
            // $scope.data = $scope.registrar.slice(0, 10);
            localStorage.setItem("data", "bsoa");
            $('#filterYear').val(0);
            $scope.data = $scope.bsoa;

        } else if (showCourse == 'BSIS') {
            firebase.database().ref("users").orderByChild("course").equalTo("BSIS").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    // $scope.bsis.push(childSnapshot.val());
                    if (childData.subjects.gwa >= 90) {
                        $scope.bsis.push(childSnapshot.val());
                    }
                    console.log('BSIS');


                })

            });
            // $scope.bsis.sort((a, b) => b.subjects.gwa - a.subjects.gwa);
            // // console.log($scope.multimedia);
            // $scope.bsis.forEach((e) => {
            //     console.log(`${e.subjects.gwa}`);
            // });
            // $scope.data = $scope.bsis.slice(0, 10);
            localStorage.setItem("data", "bsis");
            $('#filterYear').val(0);
            $scope.data = $scope.bsis;

        } else if (showCourse == 'BSIT') {
            firebase.database().ref("users").orderByChild("course").equalTo("BSIT").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    if (childData.subjects.gwa >= 90) {
                        $scope.bsit.push(childSnapshot.val());
                    }
                    console.log('BSIT');
                    // console.log(childData.subjects.gwa);


                })

            });
            // $scope.bsit.sort((a, b) => b.subjects.gwa - a.subjects.gwa);
            // // console.log($scope.multimedia);
            // $scope.bsit.forEach((e) => {
            //     console.log(`${e.subjects.gwa}`);
            // });
            // $scope.data = $scope.bsit.slice(0, 10);
            localStorage.setItem("data", "bsit");
            $('#filterYear').val(0);
            $scope.data = $scope.bsit;

        } else if (showCourse == 'BSCS') {
            firebase.database().ref("users").orderByChild("course").equalTo("BSCS").once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    // var childKey = childSnapshot.key();
                    var childData = childSnapshot.val();
                    // $scope.bscs.push(childSnapshot.val());
                    if (childData.subjects.gwa >= 90) {
                        $scope.bscs.push(childSnapshot.val());
                    }
                    console.log('BSCS');


                })

            });
            // $scope.bscs.sort((a, b) => b.subjects.gwa - a.subjects.gwa);
            // // console.log($scope.multimedia);
            // $scope.bscs.forEach((e) => {
            //     console.log(`${e.subjects.gwa}`);
            // });
            // $scope.data = $scope.bscs.slice(0, 10);
            localStorage.setItem("data", "bscs");
            $('#filterYear').val(0);
            $scope.data = $scope.bscs;

        }
    };

    $scope.filter_year = function () {
        // $scope.tempData = [];
        $scope.yearShow = [];
        var year = $('#filterYear').val();
        var data = localStorage.getItem('data');
        var filter_data = localStorage.getItem('filter_data');
        // console.log(data);
        console.log($scope.tempData);
        if (data == filter_data) {

        } else {
            localStorage.setItem("filter_data", data);
            $scope.tempData = $scope.data;
        }
        console.log(year);
        if (year == 1) {
            if (data == filter_data) {
                $scope.tempData.forEach((e) => {
                    if (e.year == '1' || e.year == 1) {
                        $scope.yearShow.push(e)
                    }
                });
            } else {
                $scope.data.forEach((e) => {
                    if (e.year == '1' || e.year == 1) {
                        $scope.yearShow.push(e)
                    }
                });
            }

            $scope.yearShow.sort((a, b) => b.subjects.gwa - a.subjects.gwa);
            // console.log($scope.multimedia);
            $scope.yearShow.forEach((e) => {
                console.log(`${e.subjects.gwa}`);
            });
            $scope.data = $scope.yearShow.slice(0, 10);
            // $scope.data = $scope.yearShow;
        } else if (year == 2) {
            if (data == filter_data) {
                $scope.tempData.forEach((e) => {
                    if (e.year == '2' || e.year == 2) {
                        $scope.yearShow.push(e)
                    }
                });
            } else {
                $scope.data.forEach((e) => {
                    if (e.year == '2' || e.year == 2) {
                        $scope.yearShow.push(e)
                    }
                });
            }
            $scope.yearShow.sort((a, b) => b.subjects.gwa - a.subjects.gwa);
            // console.log($scope.multimedia);
            $scope.yearShow.forEach((e) => {
                console.log(`${e.subjects.gwa}`);
            });
            $scope.data = $scope.yearShow.slice(0, 10);

        } else if (year == 3) {
            if (data == filter_data) {
                $scope.tempData.forEach((e) => {
                    if (e.year == '3' || e.year == 3) {
                        $scope.yearShow.push(e)
                    }
                });
            } else {
                $scope.data.forEach((e) => {
                    if (e.year == '3' || e.year == 3) {
                        $scope.yearShow.push(e)
                    }
                });
            }
            $scope.yearShow.sort((a, b) => b.subjects.gwa - a.subjects.gwa);
            // console.log($scope.multimedia);
            $scope.yearShow.forEach((e) => {
                console.log(`${e.subjects.gwa}`);
            });
            $scope.data = $scope.yearShow.slice(0, 10);

        } else if (year == 4) {
            if (data == filter_data) {
                $scope.tempData.forEach((e) => {
                    if (e.year == '4' || e.year == 4) {
                        $scope.yearShow.push(e)
                    }
                });
            } else {
                $scope.data.forEach((e) => {
                    if (e.year == '4' || e.year == 4) {
                        $scope.yearShow.push(e)
                    }
                });
            }
            $scope.yearShow.sort((a, b) => b.subjects.gwa - a.subjects.gwa);
            // console.log($scope.multimedia);
            $scope.yearShow.forEach((e) => {
                console.log(`${e.subjects.gwa}`);
            });
            $scope.data = $scope.yearShow.slice(0, 10);

        }

        // console.log($scope.data);


    };


    var ref = firebase.database().ref('users');
    $scope.studentAll = [];
    $scope.testAll;
    firebase.database().ref("users").orderByChild("role").equalTo("student").once('value', function (snapshot) {
        console.log(snapshot.val());
        $scope.testAll = snapshot.val();
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.val());
            // var childKey = childSnapshot.key();
            var childData = childSnapshot.val();
            $scope.studentAll.push(childSnapshot.val());
            // console.log($scope.faculty);


        })

    });
    $scope.data = $scope.studentAll;

    // $scope.mYear = function () {
    //     // var payment = document.getElementById("payment");
    //     var mYear = $('#mYear').val();
    //     // if (mYear == "2016") {
    //     //     console.log("2016-2017");
    //     //     $('span.info-box-number').eq(0).html("---");
    //     //     $('span.info-box-number').eq(1).html("---");
    //     //     $('span.info-box-number').eq(2).html("---");
    //     //     $('span.info-box-number').eq(3).html("---");
    //     //     $('span.info-box-number').eq(4).html("---");
    //     //     $('span.info-box-number').eq(5).html("---");
    //     // } else if (mYear == "2017") {
    //     //     console.log("2017-2018");
    //     //     $('span.info-box-number').eq(0).html("---");
    //     //     $('span.info-box-number').eq(1).html("---");
    //     //     $('span.info-box-number').eq(2).html("---");
    //     //     $('span.info-box-number').eq(3).html("---");
    //     //     $('span.info-box-number').eq(4).html("---");
    //     //     $('span.info-box-number').eq(5).html("---");
    //     // } else if (mYear == "2018") {
    //     //     console.log("2018-2019");
    //     //     $('span.info-box-number').eq(0).html("---");
    //     //     $('span.info-box-number').eq(1).html("---");
    //     //     $('span.info-box-number').eq(2).html("---");
    //     //     $('span.info-box-number').eq(3).html("---");
    //     //     $('span.info-box-number').eq(4).html("---");
    //     //     $('span.info-box-number').eq(5).html("---");
    //     // } else if (mYear == "2019") {
    //     //     console.log("2019-2020");
    //     //     $('span.info-box-number').eq(0).html("---");
    //     //     $('span.info-box-number').eq(1).html("---");
    //     //     $('span.info-box-number').eq(2).html("---");
    //     //     $('span.info-box-number').eq(3).html("---");
    //     //     $('span.info-box-number').eq(4).html("---");
    //     //     $('span.info-box-number').eq(5).html("---");
    //     // } else if (mYear == "2020") {
    //     //     console.log("2020-2021");
    //     //     $('span.info-box-number').eq(0).html("---");
    //     //     $('span.info-box-number').eq(1).html("---");
    //     //     $('span.info-box-number').eq(2).html("---");
    //     //     $('span.info-box-number').eq(3).html("---");
    //     //     $('span.info-box-number').eq(4).html("---");
    //     //     $('span.info-box-number').eq(5).html("---");
    //     // } else 
    //     if (mYear == "2021") {
    //         var year = mYear + "to" + (1 + (mYear * 1));
    //         console.log("2021-2022");
    //         var ref2021 = firebase.database().ref(year);
    //         var refaia = firebase.database().ref("aia");
    //         var refgan = firebase.database().ref("gan");
    //         var refsr = firebase.database().ref("sr");
    //         var refjf = firebase.database().ref("jf");
    //         var refgcmm = firebase.database().ref("gcmm");
    //         var refr8 = firebase.database().ref("r8");

    //         console.log(year);
    //         // ref2021.orderByChild("team").equalTo("aia").on("child_added", function (snapshot) {
    //         //     var goalevan = snapshot.val().evangelism,
    //         //         goalsfu = snapshot.val().sfu,
    //         //         goalst = snapshot.val().st,
    //         //         goalcmd = snapshot.val().cmd,
    //         //         goalchurches = snapshot.val().churches,
    //         //         goalbudget = snapshot.val().budget;
    //         //     console.log(snapshot.val());
    //         //     ref2.orderByChild("year").equalTo(2021).on("value", (snapshot2) => {
    //         //         // do some stuff once
    //         //         console.log(snapshot2.val());
    //         //         var evan = 0,
    //         //             sfu = 0,
    //         //             st = 0,
    //         //             cmd = 0,
    //         //             churches = 0;
    //         //         snapshot2.forEach((data) => {
    //         //             // console.log('The ' + data.key + ' Evangelism is ' + data.val().evangelism);
    //         //             evan = evan + (data.val().evangelism * 1);
    //         //             sfu = sfu + (data.val().sfu * 1);
    //         //             st = st + (data.val().st * 1);
    //         //             cmd = cmd + (data.val().cmd * 1);
    //         //             churches = churches + (data.val().churches * 1);
    //         //             // console.log(evan);
    //         //         });
    //         //         console.log(goalevan);
    //         //         $("#evan_num").html(goalevan - evan);
    //         //         $("#sfu_num").html(goalsfu - sfu);
    //         //         $("#st_num").html(goalst - st);
    //         //         $("#cmd_num").html(goalcmd - cmd);
    //         //         $("#churches_num").html(goalchurches - churches);
    //         //         $("#budget_num").html("₱" + goalbudget);
    //         //     });
    //         // });


    //         ref2021.on("value", (snapshot3) => {
    //             // do some stuff once
    //             console.log(snapshot3.val());
    //             var goalevan = 0,
    //                 goalsfu = 0,
    //                 goalst = 0,
    //                 goalcmd = 0,
    //                 goalchurches = 0,
    //                 goalbudget = 0;
    //             var AIAevan = 0,
    //                 AIAsfu = 0,
    //                 AIAst = 0,
    //                 AIAcmd = 0,
    //                 AIAchurches = 0;
    //             var GANevan = 0,
    //                 GANsfu = 0,
    //                 GANst = 0,
    //                 GANcmd = 0,
    //                 GANchurches = 0;
    //             var SRevan = 0,
    //                 SRsfu = 0,
    //                 SRst = 0,
    //                 SRcmd = 0,
    //                 SRchurches = 0;
    //             var JFevan = 0,
    //                 JFsfu = 0,
    //                 JFst = 0,
    //                 JFcmd = 0,
    //                 JFchurches = 0;
    //             var GCMMevan = 0,
    //                 GCMMsfu = 0,
    //                 GCMMst = 0,
    //                 GCMMcmd = 0,
    //                 GCMMchurches = 0;
    //             var R8evan = 0,
    //                 R8sfu = 0,
    //                 R8st = 0,
    //                 R8cmd = 0,
    //                 R8churches = 0;
    //             snapshot3.forEach((data) => {
    //                 // console.log('The ' + data.key + ' Evangelism is ' + data.val().evangelism);
    //                 goalevan = goalevan + (data.val().evangelism * 1);
    //                 goalsfu = goalsfu + (data.val().sfu * 1);
    //                 goalst = goalst + (data.val().st * 1);
    //                 goalcmd = goalcmd + (data.val().cmd * 1);
    //                 goalchurches = goalchurches + (data.val().churches * 1);
    //                 goalbudget = goalbudget + (data.val().budget * 1);
    //                 // console.log(evan);
    //                 // console.log(evan);
    //                 // console.log(evan);
    //                 // console.log(evan);
    //                 // console.log(evan);
    //             });
    //             refaia.on("value", (snapshot4) => {
    //                 console.log(snapshot4.val());
    //                 snapshot4.forEach((data) => {
    //                     // console.log('The ' + data.key + ' Evangelism is ' + data.val().evangelism);
    //                     AIAevan = AIAevan + (data.val().evangelism * 1);
    //                     AIAsfu = AIAsfu + (data.val().sfu * 1);
    //                     AIAst = AIAst + (data.val().st * 1);
    //                     AIAcmd = AIAcmd + (data.val().cmd * 1);
    //                     AIAchurches = AIAchurches + (data.val().churches * 1);
    //                     // console.log(data);
    //                     // console.log(AIAsfu);
    //                     // console.log(AIAst);
    //                     // console.log(AIAcmd);
    //                     // console.log(AIAchurches);
    //                 });
    //                 refgan.on("value", (snapshot5) => {
    //                     console.log(snapshot5.val());
    //                     snapshot5.forEach((data) => {
    //                         // console.log('The ' + data.key + ' Evangelism is ' + data.val().evangelism);
    //                         GANevan = GANevan + (data.val().evangelism * 1);
    //                         GANsfu = GANsfu + (data.val().sfu * 1);
    //                         GANst = GANst + (data.val().st * 1);
    //                         GANcmd = GANcmd + (data.val().cmd * 1);
    //                         GANchurches = GANchurches + (data.val().churches * 1);
    //                         // console.log(GANevan);
    //                         // console.log(GANsfu);
    //                         // console.log(GANst);
    //                         // console.log(GANcmd);
    //                         // console.log(GANchurches);
    //                     });
    //                     refsr.on("value", (snapshot6) => {
    //                         console.log(snapshot6.val());
    //                         snapshot6.forEach((data) => {
    //                             // console.log('The ' + data.key + ' Evangelism is ' + data.val().evangelism);
    //                             SRevan = SRevan + (data.val().evangelism * 1);
    //                             SRsfu = SRsfu + (data.val().sfu * 1);
    //                             SRst = SRst + (data.val().st * 1);
    //                             SRcmd = SRcmd + (data.val().cmd * 1);
    //                             SRchurches = SRchurches + (data.val().churches * 1);
    //                             // console.log(SRevan);
    //                             // console.log(SRsfu);
    //                             // console.log(SRst);
    //                             // console.log(SRcmd);
    //                             // console.log(SRchurches);
    //                         });
    //                         refjf.on("value", (snapshot7) => {
    //                             console.log(snapshot7.val());
    //                             snapshot7.forEach((data) => {
    //                                 // console.log('The ' + data.key + ' Evangelism is ' + data.val().evangelism);
    //                                 JFevan = JFevan + (data.val().evangelism * 1);
    //                                 JFsfu = JFsfu + (data.val().sfu * 1);
    //                                 JFst = JFst + (data.val().st * 1);
    //                                 JFcmd = JFcmd + (data.val().cmd * 1);
    //                                 JFchurches = JFchurches + (data.val().churches * 1);
    //                                 // console.log(JFevan);
    //                                 // console.log(JFsfu);
    //                                 // console.log(JFst);
    //                                 // console.log(JFcmd);
    //                                 // console.log(JFchurches);
    //                             });
    //                             refgcmm.on("value", (snapshot8) => {
    //                                 console.log(snapshot8.val());
    //                                 snapshot8.forEach((data) => {
    //                                     // console.log('The ' + data.key + ' Evangelism is ' + data.val().evangelism);
    //                                     GCMMevan = GCMMevan + (data.val().evangelism * 1);
    //                                     GCMMsfu = GCMMsfu + (data.val().sfu * 1);
    //                                     GCMMst = GCMMst + (data.val().st * 1);
    //                                     GCMMcmd = GCMMcmd + (data.val().cmd * 1);
    //                                     GCMMchurches = GCMMchurches + (data.val().churches * 1);
    //                                     // console.log(GCMMevan);
    //                                     // console.log(GCMMsfu);
    //                                     // console.log(GCMMst);
    //                                     // console.log(GCMMcmd);
    //                                     // console.log(GCMMchurches);
    //                                 });
    //                                 refr8.on("value", (snapshot9) => {
    //                                     console.log(snapshot9.val());
    //                                     snapshot9.forEach((data) => {
    //                                         // console.log('The ' + data.key + ' Evangelism is ' + data.val().evangelism);
    //                                         R8evan = R8evan + (data.val().evangelism * 1);
    //                                         R8sfu = R8sfu + (data.val().sfu * 1);
    //                                         R8st = R8st + (data.val().st * 1);
    //                                         R8cmd = R8cmd + (data.val().cmd * 1);
    //                                         R8churches = R8churches + (data.val().churches * 1);
    //                                         // console.log(R8evan);
    //                                         // console.log(R8sfu);
    //                                         // console.log(R8st);
    //                                         // console.log(R8cmd);
    //                                         // console.log(R8churches);
    //                                         $scope.evanGoal = goalevan;
    //                                         $scope.evanCurrent = goalevan - (AIAevan + GANevan + SRevan + JFevan + GCMMevan + R8evan);
    //                                         $scope.sfuGoal = goalsfu;
    //                                         $scope.sfuCurrent = goalsfu - (AIAsfu + GANsfu + SRsfu + JFsfu + GCMMsfu + R8sfu);
    //                                         $scope.stGoal = goalst;
    //                                         $scope.stCurrent = goalst - (AIAst + GANst + SRst + JFst + GCMMst + R8st);
    //                                         $scope.cmdGoal = goalcmd;
    //                                         $scope.cmdCurrent = goalcmd - (AIAcmd + GANcmd + SRcmd + JFcmd + GCMMcmd + R8cmd);
    //                                         $scope.churchesGoal = goalchurches;
    //                                         $scope.churchesCurrent = goalchurches - (AIAchurches + GANchurches + SRchurches + JFchurches + GCMMchurches + R8churches);

    //                                         $("#evan_num").html(goalevan - (AIAevan + GANevan + SRevan + JFevan + GCMMevan + R8evan));
    //                                         $("#sfu_num").html(goalsfu - (AIAsfu + GANsfu + SRsfu + JFsfu + GCMMsfu + R8sfu));
    //                                         $("#st_num").html(goalst - (AIAst + GANst + SRst + JFst + GCMMst + R8st));
    //                                         $("#cmd_num").html(goalcmd - (AIAcmd + GANcmd + SRcmd + JFcmd + GCMMcmd + R8cmd));
    //                                         $("#churches_num").html(goalchurches - (AIAchurches + GANchurches + SRchurches + JFchurches + GCMMchurches + R8churches));
    //                                         $("#budget_num").html("₱" + goalbudget);
    //                                     });
    //                                 });
    //                             });
    //                         });
    //                     });
    //                 });
    //             });

    //             // console.log(arrAIA);
    //             // console.log(goalevan - AIAevan);
    //             // console.log(goalsfu - AIAsfu);
    //             // console.log(goalst - AIAst);
    //             // console.log(goalcmd - AIAcmd);
    //             // console.log(goalchurches - AIAchurches);
    //             // $("#evan_num").html(goalevan - evan);
    //             // $("#sfu_num").html(goalsfu - sfu);
    //             // $("#st_num").html(goalst - st);
    //             // $("#cmd_num").html(goalcmd - cmd);
    //             // $("#churches_num").html(goalchurches - churches);
    //             // $("#budget_num").html("₱" + goalbudget);
    //         });
    //     } else if (mYear == "2022") {
    //         console.log("2022-2023");
    //         $("#evan_num").html("---");
    //         $("#sfu_num").html("---");
    //         $("#st_num").html("---");
    //         $("#cmd_num").html("---");
    //         $("#churches_num").html("---");
    //         $("#budget_num").html("---");
    //     } else if (mYear == "2023") {
    //         console.log("2023-2024");
    //         $("#evan_num").html("---");
    //         $("#sfu_num").html("---");
    //         $("#st_num").html("---");
    //         $("#cmd_num").html("---");
    //         $("#churches_num").html("---");
    //         $("#budget_num").html("---");
    //     } else if (mYear == "2024") {
    //         console.log("2024-2025");
    //         $("#evan_num").html("---");
    //         $("#sfu_num").html("---");
    //         $("#st_num").html("---");
    //         $("#cmd_num").html("---");
    //         $("#churches_num").html("---");
    //         $("#budget_num").html("---");
    //     } else if (mYear == "2025") {
    //         console.log("2025-2026");
    //         $("#evan_num").html("---");
    //         $("#sfu_num").html("---");
    //         $("#st_num").html("---");
    //         $("#cmd_num").html("---");
    //         $("#churches_num").html("---");
    //         $("#budget_num").html("---");
    //     }
    // };






    var bc = [];
    var hc = [];


    var currentUrl = window.location.hostname;



    var ref = firebase.database().ref("/datasets/human/");
    ref.orderByChild("url").equalTo(currentUrl).on("child_added", function (snapshot) {
        hc.push(snapshot.val());
        console.log('Human:', hc.length)
        $('#humancliks').text(hc.length)
        $('#traffic').text(bc.length + hc.length)
    });

    var ref = firebase.database().ref("/datasets/bot/");
    ref.orderByChild("url").equalTo(currentUrl).on("child_added", function (snapshot) {
        bc.push(snapshot.val());
        console.log('Bot:', bc.length)
        $('#botcliks').text(bc.length)
        $('#traffic').text(bc.length + hc.length)
    });

    var ref = firebase.database().ref("/datasets/adscount");
    ref.orderByChild("domain").equalTo(currentUrl).on("child_added", function (snapshot) {
        console.log("Data:", snapshot.val().count);
        $('#Campaign').text(snapshot.val().count);
    });





});