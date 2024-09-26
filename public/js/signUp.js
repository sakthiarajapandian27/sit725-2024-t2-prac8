$(document).ready(function () {
    $('select').formSelect();

    $('#ownerFormSubmit').click(function (event) {
        event.preventDefault(); 
  
        const ownerData = {
            firstName: $('#first_name').val(),
            lastName: $('#last_name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            address: $('#address').val(),
            suburb: $('#suburb').val(),
            postalCode: $('#postal_code').val(),
            password: $('#password').val(),
        };
  
        $.ajax({
            type: 'POST',
            url: '/registration/registerOwner',
            data: JSON.stringify(ownerData),
            contentType: 'application/json',
            success: function (response) {
                alert('Owner registration successful!');
                $('#registrationForm')[0].reset(); // Clear the form fields
            },
            error: function (error) {
                alert('Error saving owner registration');
                console.error('Error:', error);
            }
        });
    });
  
    $('#walkerFormSubmit').click(function (event) {
        console.log('event clicked')
      event.preventDefault(); 
  
      const walkerData = {
          firstName: $('#first_name').val(),
          lastName: $('#last_name').val(),
          phone: $('#phone').val(),
          email: $('#email').val(),
          idProof: $('#id_proof').val(),
          document_number: $('#document_number').val(),
          certification: $('#certification').val(),
          otherCertification: $('other_certification').val(),
          address: $('#address').val(),
          suburb: $('#suburb').val(),
          postalCode: $('#postal_code').val(),
          service: $('#service').val(),
          password: $('#password').val()
      }
      $.ajax({
          type: 'POST',
          url: '/registration/registerWalker',
          data: JSON.stringify(walkerData),
          contentType:  'application/json',
          success: function (response) {
              alert('Walker registration successful!');
              $('#registrationForm')[0].reset(); // Clear the form fields
              $('#document_number_field').hide(); // Hide document number field after submission
          },
          error: function (error) {
              alert('Error saving walker registration');
              console.error('Error:', error);
          }
      });
  });
  
    $('#id_proof').change(function () {
        if ($(this).val()) {
            $('#id_upload').show();
            $('#document_number_field').show();
        } else {
            $('#id_upload').hide();
            $('#document_number_field').hide();
        }
    });
  
    $('#certification').change(function () {
        if ($(this).val() === 'other') {
            $('#other_certification').show();
        } else {
            $('#other_certification').hide();
        }
    });
  
    $('.toggle-password').click(function () {
        const passwordInput = $('#password');
        const toggleIcon = $(this);
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            toggleIcon.text('visibility');
        } else {
            passwordInput.attr('type', 'password');
            toggleIcon.text('visibility_off');
        }
    });
  });
  