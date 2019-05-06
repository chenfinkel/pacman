// Wait for the DOM to be ready
$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='registration']").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
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
          // Specify that email should be validated
          // by the built-in "email" rule
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
      // Specify validation error messages
      messages: {
        firstname: {
            required: "Please enter your first name",
            lettersonly: "First name can not contain digits"
        },
        lastname:  {
            required: "Please enter your last name",
            lettersonly: "Last name can not contain digits"
        },
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 8 characters long"
        },
        email:{
            required: "Please enter your email address",
            email: "Please enter a valid email address"
        },
        birthdate: {
            required: "Please enter your birth date"
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
            required: "Please enter your first name",
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