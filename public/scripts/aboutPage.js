$('#mailForm').submit(function(e){
    e.preventDefault();
    var emailInput = $('#emailInput').val();
    var subjectInput = $('#subjectInput').val();
    var emailMessageInput = $('#emailMessageInput').val();
    $('#emailInput').prop('disabled', true);
    $('#subjectInput').prop('disabled', true);
    $('#emailMessageInput').prop('disabled', true);
    var data = {};
    data.email = emailInput;
    data.subject = subjectInput;
    data.emailMessage = emailMessageInput;
    var emailJSON = JSON.stringify(data);
    $.ajax({
        type: 'POST',
        data: emailJSON,
        contentType: 'application/json',
        url: '/api/mail'
    }).done(function(data){
        $('#serverMessageResponse').append('<div class="alert alert-success alert-dismissible fade show">' + data.message +'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>' );
        $('#emailInput').val('');
        $('#subjectInput').val('');
        $('#emailMessageInput').val('');
        $('#emailInput').prop('disabled', false);
        $('#subjectInput').prop('disabled', false);
        $('#emailMessageInput').prop('disabled', false);
    }).fail(function(err){
        $('#serverMessageResponse').append('<div class="alert alert-danger alert-dismissible fade show">' + err.message +'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>' );
        $('#emailInput').prop('disabled', false);
        $('#subjectInput').prop('disabled', false);
        $('#emailMessageInput').prop('disabled', false);
    });
});