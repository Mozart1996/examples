const prevBtn = document.getElementById('btn_prev'),
      nextBtn = document.getElementById('btn_next'),
      slides = document.querySelectorAll('.slide'),
      dots = document.querySelectorAll('.dot');

let index = 0;

const activeSlide = n => {
   for(slide of slides) {
      slide.classList.remove('active');
   }
   slides[n].classList.add('active');
};

const activeDots = n => {
   for(dot of dots) {
      dot.classList.remove('active');
   }
   dots[n].classList.add('active');
};

const prepareCurrentSlide = ind => {
   activeSlide(ind);
   activeDots(ind);
};

const nextSlide = () => {
   if(index == slides.length - 1) {
      index = 0;
      prepareCurrentSlide(index);
   } else {
      index++;
      prepareCurrentSlide(index);
   }
};

const prevSlide = () => {
   clearInterval(interval);
   if(index == 0) {
      index = slides.length - 1;
      prepareCurrentSlide(index);
   } else {
      index--;
      prepareCurrentSlide(index);
   }
};

dots.forEach((item, indexDot) => {
   item.addEventListener('click', () => {
      index = indexDot;
      prepareCurrentSlide(index);
      clearInterval(interval);
   });
});

nextBtn.addEventListener('click', () => {
   clearInterval(interval);
   nextSlide();
});
prevBtn.addEventListener('click', prevSlide);

const interval = setInterval(nextSlide, 2500);

