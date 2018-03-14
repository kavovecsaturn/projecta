$('#clear').hide();
$('#snip').hide();
$('#maxRowCol').hide();
$('#saveInfo').hide();
$('#undo').hide();

//Alert when max no. of rows/cols is exceeded
function maxrowAlert(){
  let rowSize = $('#inputHeight').val();
  if (rowSize > 30 || rowSize <= 0) {
    $('#maxRowCol').show();
    // $('.maxSize').css('margin-left','-250px');
    // $('.maxSize').css('margin-top','2px');
    $('#maxRowCol').val("Valid values are 1-30");
    $('#inputHeight').val('10');
    $('#inputHeight').focus();
  } else {
    $('#maxRowCol').hide();
  }
}
$('#inputHeight').keyup(maxrowAlert);
$('#inputHeight').focusout(maxrowAlert);

function maxcolAlert(){
  let colSize = $('#inputWidth').val();
  if (colSize > 60 || colSize <= 0) {
  $('#maxRowCol').show();
  // $('.maxSize').css('margin-left','100px');
  // $('.maxSize').css('margin-top','2px');
  $('#maxRowCol').val("Valid values are 1-60");
  $('#inputWidth').val('10');
  $('#inputWidth').focus();
  } else {
  $('#maxRowCol').hide();
  }
}

$('#inputWidth').keyup(maxcolAlert);
$('#inputWidth').focusout(maxcolAlert);


//Stop animation background when user clicks anywhere
$('#colorPicker').on('click', function() {
      $('.pickers').removeClass('anime');
      // $('.pickers').css('animation','paused');
});

// When size is submitted by the user, call makeGrid()
function makeGrid() {
  $('#clear').show();
  $("#snip").show();
  $('#chooseGrid').removeClass('anime');
  $('.pickers').addClass('anime');
  let rowSize = $('#inputHeight').val();
  let colSize = $('#inputWidth').val();
  for(rw = 1 ; rw <= rowSize ; rw++) {
    $('#pixelCanvas').append('<tr id="row' + rw + '"></tr>');
      for(cl = 1; cl <= colSize; cl++) {
        $('#row' + rw).append('<td id="col' + cl + '"></td>');
      }
  }
  $('#pixelCanvas').css('background-color','white');
};
$('#submit').click(makeGrid);



//Reset page
function clearAll() {
  location.reload();
  $('#pixelCanvas').children().remove();
  $('#inputHeight').val('10');
  $('#inputWidth').val('10');
  $('#clear').hide();
  $('#snip').hide();
  $('#maxRowCol').hide();
  $("#snip").hide();
  $('#undo').hide();
  $('#saveInfo').hide();
}
$('#reset').click(clearAll);

//Assigning user color when cells are clicked
$('#pixelCanvas').on('mousedown','td', function(e){
  e.preventDefault();
  if (e.which===1){
  $('.pickers').removeClass('anime');
  let pickColor = $('#colorPicker').val();
  $(this).css('background-color', pickColor);
  }
});

$('#pixelCanvas').on('mouseover','td', function(e) {
    e.preventDefault();
    if (e.which===1){
  $('.pickers').removeClass('anime');
   let pickColor=$('#colorPicker').val();
   $( this ).css('background-color', pickColor);
    }
 });

$('#pixelCanvas').on('dblclick','td', function(e){
  e.preventDefault();
  $(this).css('background-color', 'white');
});

$('#pixelCanvas').on('mouseover','td', function(e){
  e.preventDefault();
  if (e.ctrlKey) {
  $(this).css('background-color', 'white');
  }
});

// $('#pixelCanvas').on('mouseover','td', function(e){
//   e.preventDefault();
//   if (e.ctrlKey) {
//   $(this).css('background-color', 'white');
//   };
// });

$('#clear').click(function() {
  $('#pixelCanvas').children().find('td').css('background-color','white');
});

$("#snip").click(function() {
  $('#saveInfo').show();
        // html2canvas($("#tablepos"), {
          html2canvas($("#pixelCanvas"), {
              onrendered: function(canvas) {
                // document.body.appendChild(canvas);
                $('#pixelCanvas').children().remove();
                $('#pixelCanvas').prepend(canvas);

                // Convert to image
                Canvas2Image.saveAsPNG(canvas);
                //$("#tablepos").append(canvas);
        }
    });
});
