$(document).ready(function(){
   let container = $('#works_photos');
   let sizer = '.percent_size';

   container.imagesLoaded(function(){
      container.masonry({
         itemSelector: '.works_photo',
         columnWidth: sizer,
         percentPosition: true
      });
   });
});



