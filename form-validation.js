// Wait for the DOM to be ready
$(function() {

    $("form[name='registration']").validate({
      // Specify validation rules
      rules: {
        firstName: {
            required: true,
            lettersonly: true
        },
        lastName: {
            required: true,
            lettersonly: true
        },
        mail: {
          required: true,
          email: true
        },
        RegisterUser:{
            required: true,
        },
        RegisterPass: {
          required: true,
          minlength: 8
        },
        birthdate: {
            required: true, 
        }
      },
    });

    $("form[name='settings']").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        monsters: {
            required: true,
            range: [1,3]
        },
        food: {
            required: true,
            range: [50,90]
        },
        time: {
          required: true,
          // Specify that email should be validated
          // by the built-in "email" rule
          range: [60,600]
        },
      },
      // Specify validation error messages
      messages: {
        monsters: {
            required: "Please enter number of monsters",
            range: "Number of monsters must be between 1-3"
        },
        food:  {
            required: "Please enter your last name",
            range: "Number of food must be between 50-90"
        },
        time: {
          required: "Please provide a password",
          range: "Game time must be between 60-600 seconds"
        },
      }
    });
  });

  jQuery.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Name can contain letters only");