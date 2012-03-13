$(document).ready(function() { 

	$('.btn-submit').click(function(e){

        // Declare the function variables:
        // Parent form, form URL, email regex and the error HTML
        var $formId = $(this).parents('form');
        var formAction = $formId.attr('action');
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var phoneReg = /^(\+\d{4}-\d{3}-\d{2}-\d{2})?$/;
        var $error = $('<span class="error"></span>');

        // Prepare the form for validation - remove previous errors
        $('li',$formId).removeClass('error');
        $('span.error').remove();

        // Validate all inputs with the class "required"
        $('.required',$formId).each(function(){
            var inputVal = $(this).val();
            var $parentTag = $(this).parent();
            if(inputVal == ''){
                $parentTag.addClass('error').append($error.clone().text('Обязательное поле'));
            }

            // Run the email validation using the regex for those input items also having class "email"
            if($(this).hasClass('email') == true){
                if(!emailReg.test(inputVal)){
                    $parentTag.addClass('error').append($error.clone().text('Введите правильный Email'));
                }
            }
			
			if($(this).hasClass('phone') == true){
                if(!phoneReg.test(inputVal)){
                    $parentTag.addClass('error').append($error.clone().text('Введите правильный телефон'));
                }
            }

            // Check passwords match for inputs with class "password"
            if($(this).hasClass('password') == true){
                var password1 = $('#password-1').val();
                var password2 = $('#password-2').val();
                if(password1 != password2){
                $parentTag.addClass('error').append($error.clone().text('Пароли должны совпадать'));
                }
            }
        });

        // All validation complete - Check if any errors exist
        // If has errors
        if ($('span.error').length > 0) {

            $('span.error').each(function(){

                // Set the distance for the error animation
                var distance = 5;

                // Get the error dimensions
                var width = $(this).outerWidth();

                // Calculate starting position
                var start = width + distance;

                // Set the initial CSS
                $(this).show().css({
                    display: 'block',
                    opacity: 0,
                    right: -start+'px'
                })
                // Animate the error message
                .animate({
                    right: -width+'px',
                    opacity: 1
                }, 'slow');

            });
        } else {
            $formId.submit();
        }
        // Prevent form submission
            e.preventDefault();
    });

    // Fade out error message when input field gains focus
    $('.required').focus(function(){
        var $parent = $(this).parent();
        $parent.removeClass('error');
        $('span.error',$parent).fadeOut();
    });

});
