$(function() {
 var data = $.getJSON('api/people',updatePeople);

  $('.people-form').submit(function (e) {
    e.preventDefault();

    var data = {
      name: $('#people-form-name').val(),
      favoriteCity: $('#people-form-favoriteCity').val()
    }

    $.ajax({
      type: 'POST',
      url: 'api/people',
      contentType : 'application/json',
      data: JSON.stringify(data),
      success: function(){window.location.reload()}
    });                                                                                                                                                                     
  });


  $(document).on('click','.delete', function (e) {
    e.preventDefault();
    e.stopPropagation();
   var id = $(this).closest('li').attr('id');
    if (e.target.className.indexOf('btn btn-danger') > -1) {
        $.ajax({
          type: 'DELETE',
          url: 'api/people/' + id,
          success: function(){window.location.reload()}
        });
      }
  });

  function updatePeople (data) {    
   var output = '';
   $.each(data, function (key, item) {
    output +='<li class="list-group-item clearfix" id=' + item.id + '>';
    output +='       <span class="label label-default" data_id='+item.id +' data_name=' + item.name + ' data_city=' +item.favoriteCity+'> ID: '+ item.id + ', Name: ' + item.name + ',  Favorite City: ' + item.favoriteCity + '</span>';
    output +='       <span class="pull-right button-group">';
    output +='           <button class="btn btn-primary""><span class="glyphicon glyphicon-edit"></span> Edit</button>'; 
    output +='           <button type="button" class="btn btn-danger delete"><span class="glyphicon glyphicon-remove"></span> Delete</button>';
    output +='       </span>';
    output +='   </li>';
   });

   $('.list-group-people').html(output);
  }


  $(document).on('click','.list-group button.btn-primary', function (event) {
   $('#editModal').modal('show')
    var $li = $(this).closest('li');
    var id = $li.attr('id');
    var name = $li.find('.label').attr('data_name');
    var favoriteCity = $li.find('.label').attr('data_city');
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $('#editModal');
  modal.find('.modal-title').text('Edit Person ' + id)
  modal.find('.modal-body input#edit-name').val(name);
  modal.find('.modal-body input#edit-city').val(favoriteCity);

 $('.modal').find('button.btn-primary').on('click',function(){
      var data = {
      name: $('#edit-name').val(),
      favoriteCity: $('#edit-city').val()
    }
    $.ajax({
      type: 'PUT',
      url: 'api/people/' +id,
      contentType : 'application/json',
      data: JSON.stringify(data),
      success: function(){window.location.reload()}
    }); 
  })

})
});
