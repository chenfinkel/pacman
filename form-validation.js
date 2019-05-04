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
  });

  jQuery.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Name can contain letters only");