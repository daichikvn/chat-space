$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var img = message.image ? `<img src= ${ message.image } class="message-image">` : "";
    
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info--talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info--date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    ${message.content}
                  </div>
                    ${img}
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-box').append(html)
      $('#new_message')[0].reset();
      $('.main-body').animate({ scrollTop: $('.main-body')[0].scrollHeight });
      $('.send-btn').prop("disabled", false);
    })
    .fail(function(data){
      alert('入力されていません');
      $('.send-btn').prop("disabled", false);
    })
  })
})

