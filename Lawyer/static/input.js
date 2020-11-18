$(function() {
            let isValid = false; //for validation inputs

            let passwordCheckUp = 0;
            let showN = 0;
            let login = true;

            $('#showP1,#showP2').click(function() {
                if (!showN) {
                    showN = 1
                    $(this).siblings('input').attr('type', 'text');
                    this.class = 'fa fa-eye';
                } else {
                    showN = 0
                    $(this).siblings('input').attr('type', 'password');
                    this.class = 'fa fa-eye-slash';
                }
            });

            const check = document.getElementsByClassName('check');
        }
        $('form #try').click(function() {
            $(this).html('Create password');


            $('body,html').animate({ scrollTop: 300 }, 'slow');

            $(this).animate({
                width: '100%',
                textAlign: 'center',
                textDecoration: 'underline',
                color: 'dimgrey'
            });

            passworCheckUp = 1;

            $('#p1,p2').fadeIn('slow');
            $('.chekP1,.checkP2').css('display', 'block');
        });



        $('#choose_ow tr td').click(function() {
                $('form i').text('');
                passwordCheckUp = 0;
                $(this).siblings('td').hide().children('button').css('color', 'dimgrey');

                $(this).parent('tr').siblings('tr').children('td')
                    .hide().children('button').css('color', 'dimgrey');

                $(this).css('backg
                    round ', '
                    linear - gradient(11 deg, #e2b4f4, #c363f1)
                    ')
                    .childre n('button').css('color', 'white');

                    $('#box').css('animation-name', 'move');

                    let that = $(this);

                    setTimeout(() => {
                        let whereToGo = that.children('button').html();
                        let f, n;

                        switch (whereToGo) {
                            case 'Normal User': //where to submit form for client registration here
                                [f, n] = ['Normal_user.html', 'Enter your name'];
                                break;

                            case 'Lawyer': //where to submit form for lawyers registration here
                                [f, n] = ['lowyerAcc.html', 'Enter your name'];
                                break;

                            case 'Company': //where to submit form for company registration here
                                [f, n] = ['companyAcc.html', 'Company Name'];
                                break;

                            case 'Advocate': //where to submit form for advocate registration here
                                [f, n] = ['advocateAcc.html', 'Enter  Name'];
                                break;

                            case 'Notary': //where to submit form for Notry>
                                r gistration here
                                    [f, n] = ['NotaryAcc.html', 'Enter Name'];

                                break;


                        }

                        $('form').attr('action', f);

                        $('#name').attr('placeholder', n)

                        $('#box').css('animation-name', '');
                    }, 1100);

                    $('#try').html('Try password ?');

                    $('#try').animate({
                        width: '100%',
                        textAlign: 'right',
                        textDecoration: '',
                        color: ''
                    });

                    $('#p1,#p2').fadeOut('fast'); $('.checkP1, .checkP2').hide();
                });


            $('#login').click(function() {

                passwordCheckUp = 0;
                login = true;

                $('#loaderBox').css('display', 'flex');
                setTimeout(() => {
                    $('form footer, #loaderBox, .checkP2,.checkName,.checkCity,.checkAddress,.checkPostCode,.checkTelephone').hide();
                    $('#submit').val('Sing Up');
                    $('#do').fadeOut('fast');
                    $('#logo').show();
                    $('#choose_Now').fadeOut('fast');

                    $('.NotLogin').fadeOut('fast').animate({ position: 'absolute' });

                    $('#p1').fadeIn('fast'); //change login or register

                    $(this).css({ border: '1px solid #F3F3F3', color: '#893EDA' });

                    passwordCheckUp = 0;

                    $('#register').css({ border: '1px solid #F3F3F3', color: 'none' });
                    $('form i').html('');
                    $('#password').attr('name', 'passwordNew'); //new password
                }, 2000);
            });


            $('#register').click(function() {
                login = false;
                $('#loaderBox').css('display', 'flex');

                setTimeout(() => {
                    $('form footer').show();
                    $('#loaderBox').hide();

                    $('.checkP1,.checkP2,.checkName,.checkCity,.checkAddress,.checkPostCode,.checkTelephone').hide();

                    $('#do').fadeIn('fast')
                    $('#logo').hide();
                    $('#submit').val('Submit');

                    $(this).css({ 'border': '1px solid #F3F3F3', 'color': '#893EDA' });
                    $('#login').css({ 'border': '1px solid #F3F3F3', 'color': 'dimgrey' });

                    $('#choose_Now').fadeIn('fast');
                    $('.NotLogin').fadeIn('fast').animate({ position: '' });
                    $('#p1,#p2').fadeOut('fast');

                    $('form').attr('action', '') //where to submit login details
                    $('form i').html('')
                    $('#password').attr('name', 'password'); //login password

                }, 2000);
            });

            $('.checkP2,.checkName,.checkCity,.checkAddress,.checkPostCode,.checkTelephone').hide(); //validation

            function validateEmail(email) {
                const re = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //* /\|' 
                return re.test(email);
            }


            //password need load the password
            const validateString = (x) => x ? new RegExp('^[A-Za-z\s]+$').test(x) : false;

            let emailV = false;

            function validate() {
                const email = $('#email').val();

                if (validateEmail(email)) {
                    emailV = true;
                    $('.checkEmail').html('email: ' + email + ' is valid :)');
                    $('.checkEmail').css('color', 'green');

                } else {
                    emailV = false;
                    $('.checkEmail').html('email: ' + email + ' not valid :(');
                    $('.checkEmail').css('color', '#C46176');
                }

                $('.checkEmail').hide();
                return (isValid && emailV)
            }

            $('.checkEmail,.checkName,.checkCity,.checkAddress,.checkP1,.checkP2').hide();

            //another try validation

            $('#submit').click(function() {
                    if (!login) {
                        const name = $('#name').val();
                        let nameCheck = validateString(name)

                        if (nameCheck) {
                            $('.checkName').text('');
                            isValid = true;
                        } else {

                            isValid = false;
                            $('.checkName').text('Not valid : remove @#&@+');
                            $('.checkName').css('color', '#C46176');

                        }





                        //city


                        const city = $('#city').
                        val();

                        let cityCheck = validateString(city)

                        if (cityCheck) {
                            isValid = true;
                            $('.checkCity').text('');

                        } else {





                            isValid = fa
                            lse;

                            $('.checkCity')
                                .text('Not valid : remove @#&@+');
                            $('.checkCity').css('color', '#C46176');
                        }

                        //address
                        const address = $('#address').val();
                        let addressCheck = validateString(address)




                        if (addressCheck && address) {


                            $('.checkAddress').text('');


                            isValid = true;

                        } else {

                            isValid = false;
                            $('.checkAddress').text('Not valid : remove @#&@+');
                            $('.checkAddress').css('color', '#C46176');
                        }

                        //post code


                        const code = /[0-9]{6}/;


                        const postcode = $('#pos
                            tCode ').val();

                            if (code.test(postcode) && postcode.length < 8) {
                                $('.checkPostCode').text('')
                                isValid = true;
                            } else {


                                isValid = fa
                                lse;

                                $('.checkPost
                                    Code ').text('
                                    this code is not valid ')

                                    $('.checkPostC
                                        ode ').css('
                                        color ', '#
                                        C46176 ');

                                    }




                                    //telephone
                                    const phoneCode = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;
                                    const tel = $('#Tel').val();


                                    if (phoneCode.test(tel)) {
                                        isValid = true;
                                        $('.checkTelephone').text('');

                                    } else {
                                        isVa l id = false;
                                        $('.checkTelephone').text(tel + ' : phone number is not valid');
                                        $('.checkTelephon e').css('color', '#C46176');
                                    }



                                    const p1 = $('#password').val();
                                    if (passwordCheckUp == 1) {
                                        if (p1) {

                                            $('.checkP1').text('');
                                            i sValid = true;
                                        } else {
                                            isValid = false;
                                            $('.checkP1').text('Choose a valid  password');
                                            $('.chec kP1').css('color', '#C46176');
                                        }
                                    }



                                    const p2 = $('#passwo rd2').val();

                                    if (p1 == p2 && p1) {
                                        $('.checkP2').t ext('passwor d  is valid');
                                        $('.checkP2').css('color ', 'green');
                                    } else {
                                        $(' .checkP2').text('password not match');
                                        $('.checkP2').css('color', '#C46176');
                                    }
                                }
                                e l se {
                                    const p1 = $('#password').val();
                                    if (p1) {
                                        $('.checkP1').text('');
                                        isValid = true;
                                        isValid = false;
                                        $('.checkP1').text('Choose a valid  password');

                                        $('.checkP1').css('color', '#C46176');
                                    }
                                }

                            });
                    });