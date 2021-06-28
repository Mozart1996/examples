let count = 0;
let cart = $('.cart-nav')

$('.cart-btn').on('click', function() {
   let imgtodrag = $(this)
      .parent('.buttons')
      .parent('.content')
      .parent('.card')
      .find('img')
      .eq(0)

   console.log(imgtodrag)

   if(imgtodrag) {
      let imgclone = imgtodrag
         .clone()
         .offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
         })
         .css({
            opacity: '0.8',
            position: 'absolute',
            'z-index': '100',
            width: '150px',
            height: '150px',
            objectFit: 'cover'
         })
         .appendTo($('body'))
         .animate({
            top: cart.offset().top + 20,
            left: cart.offset().left + 30,
            width: '75px',
            height: '75px'
         }, 1000, 'easeInOutExpo')

      setTimeout(function() {
         count++
         $('.item-count').text(count)
      }, 1100)

      imgclone.animate({
         width: 0,
         height: 0
      }), function() {
         $(this).detach()
      }
   }
})