$(function() {

    //********************************** Aside show

    $(".filter-click").click(function() {
        $('aside').toggleClass("active");
    });


    // ********************************* Scrollbar

    $(".content").mCustomScrollbar({
        axis:"y",
        theme:"inset-3-dark",
        autoDraggerLength: false,
    });


    // ********************************* Slider Price



    $('.slider-brand').slick({
            nextArrow: '<i class="fa fa-arrow-right slick-next"></i>',
            prevArrow: '<i class="fa fa-arrow-left slick-prev"></i>',
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 919,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: false
                    }
                },
                {
                    breakpoint: 616,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false
                    }
                }
            ]
    });




    // ********************************* Filter Price


    jQuery(document).ready(function(){



        /* слайдер цен */

        $("#slider").slider({
            min: 0,
            max: 15000,
            values: [0,15000],
            range: true,
            stop: function(event, ui) {
                jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
                jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));

            },
            slide: function(event, ui){
                jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
                jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
            }
        });

        $("input#minCost").change(function(){

            var value1=jQuery("input#minCost").val();
            var value2=jQuery("input#maxCost").val();

            if(parseInt(value1) > parseInt(value2)){
                value1 = value2;
                jQuery("input#minCost").val(value1);
            }
            jQuery("#slider").slider("values",0,value1);
        });


       $("input#maxCost").change(function(){

            var value1=jQuery("input#minCost").val();
            var value2=jQuery("input#maxCost").val();

            if (value2 > 1000) { value2 = 1000; jQuery("input#maxCost").val(1000)}

            if(parseInt(value1) > parseInt(value2)){
                value2 = value1;
                jQuery("input#maxCost").val(value2);
            }
            jQuery("#slider").slider("values",1,value2);
        });



// фильтрация ввода в поля
        jQuery('input').keypress(function(event){
            var key, keyChar;
            if(!event) var event = window.event;

            if (event.keyCode) key = event.keyCode;
            else if(event.which) key = event.which;

            if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
            keyChar=String.fromCharCode(key);

            if(!/\d/.test(keyChar))	return false;

        });


    });









    //Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

    $('.popup').magnificPopup();

});

//Форма отправки 2.0
$(function() {
    $("[name=send]").click(function () {
        $(":input.error").removeClass('error');
        $(".allert").remove();

        var error;
        var btn = $(this);
        var ref = btn.closest('form').find('[required]');
        var msg = btn.closest('form').find('input, textarea');
        var send_btn = btn.closest('form').find('[name=send]');
        var subject = btn.closest('form').find('[name=form_subject]');
        var form = btn.closest('form'), name = form.find('[name=name]').val();
        $(ref).each(function () {
            if ($(this).val() == '') {
                var errorfield = $(this);
                $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                error = 1;
                $(":input.error:first").focus();
                return;
            } else {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if ($(this).attr("type") == 'email') {
                    if (!pattern.test($(this).val())) {
                        $("[name=email]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
                var patterntel = /^()[0-9]{9,18}/i;
                if ($(this).attr("type") == 'tel') {
                    if (!patterntel.test($(this).val())) {
                        $("[name=phone]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный номер телефона</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
            }
        });
        if (!(error == 1)) {
            $(send_btn).each(function () {
                $(this).attr('disabled', true);
            });



            $.ajax({
                type: 'POST',
                url: 'mail.php',
                data: msg,
                success: function (data) {
                    $.magnificPopup.close();
                    form[0].reset();
                    $(send_btn).each(function () {
                        $(this).attr('disabled', false);
                    });

                    $("a[href='#popupty']").click();


                },
                error: function (xhr, str) {
                    alert('Возникла ошибка: ' + xhr.responseCode);
                }
            });
        }
        else{
            if(form.hasClass("form-shake")){
                form.parents(".form-block").addClass("shake");
                form.parents(".form-block").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                    $(this).removeClass("shake");
                });
            }
        }
        return false;
    });
});