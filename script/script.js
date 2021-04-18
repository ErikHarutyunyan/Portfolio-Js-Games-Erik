// HEADER SCROLL
window.onscroll = function() {
  scrollFunction()
};
let element = document.getElementById("header");
function scrollFunction() {
  if (document.body.scrollTop >= 50 || document.documentElement.scrollTop > 50)
  {
    element.classList.add("fixed");
    document.getElementsByClassName("headering")[0].style.paddingTop =  '1vh';
  } else
  {
    element.classList.remove("fixed");
    document.getElementsByClassName("headering")[0].style.paddingTop =  '4vh';
  }
}

// =================== SWIPER SETTINGS ===================
let swiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 50,
  initialSlide: 1,
  loop: true,
  // slideToClickedSlide: true,
  coverflowEffect: {
    rotate: 15,
    stretch: 0,
    depth: 400,
    modifier: 1,
    slideShadows: true,
  },
  speed: 1000,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
  // mousewheel: {
  //     sensitivity: 1,
  // },
  autoplay: {
    delay: 800,
    disbleONInteraction: false,
  },
  //  on: {
  // init() {
  // Jquery
  // this.el.addEventListener('mouseenter', () => {
  //   this.autoplay.stop();
  // });
  // this.el.addEventListener('mouseleave', () => {
  //   this.autoplay.start();
  // });
  //
  // JavaScript
  //     document.getElementsByClassName("swiper-container")[0].addEventListener("mouseover", function( ) {
  //        swiper.autoplay.stop();
  //     });
  //     document.getElementsByClassName("swiper-container")[0].addEventListener("mouseout", function( ) {
  //        swiper.autoplay.start();
  //     });
  //   }
  // },
  // breakpoints: {
    // when window width is >= 320px
    // 320: {
      // spaceBetween: 30,
      // coverflowEffect: {
      //   rotate: 35,
      //   stretch: 0,
      //   depth: 600,
      //   modifier: 1,
      //   slideShadows: true,
      // },
    // },
    // when window width is >= 480px
    // 481: {
      // slidesPerView: 'auto',
      // spaceBetween: 50,
      // coverflowEffect: {
      //   rotate: 15,
      //   stretch: 0,
      //   depth: 400,
      //   modifier: 1,
      //   slideShadows: true,
      // },
    // },
  // },
  // swiper.on('resize',function(){
  //   let arrow = document.getElementsByClassName('swiper-button');
  //   let ww = $(window).width()
  //   if (ww<=413) arrow.style.display = 'none';
  //   swiper.reInit()
  //

//   on: {
//     init: function() {
//       let arrow = document.getElementsByClassName('swiper-button');
//       const ww = window.innerWidth;
//       if (ww >= 413) {
//         arrow[0].style.display = 'none';
//         arrow[1].style.display = 'none';
//       }
//       else {
//         arrow[0].style.display = 'block';
//         arrow[1].style.display = 'block';
//       }
//     }
// },

});


// /* hide left arrow on load (Another option is to put this code inside init event) */
//     var arrow = document.getElementsByClassName('swiper-button-prev')[0];
//     arrow.style.display = 'none';
//     /* Swiper API - if index = 1 hide left arrow / otherwise show */
//     swiper.on('slideChange', function() {
//       var realIndex = swiper.realIndex;
//       if (realIndex == 0) {
//         console.log(realIndex + " - hide arrow");
//         arrow.style.display = 'none';
//       } else {
//         console.log(realIndex + " - show arrow");
//         arrow.style.display = 'block';
//       }
//     });


// =================== SCROLLING ===================
// $('a[href^="#"').on('click', function() {
//     let href = $(this).attr('href');
//     $('html, body').animate({
//         scrollTop: $(href).offset().top
//     }, {
//         duration: 500,
//         easing: "linear"
//     });
//     return false;
// });

let linkScroll = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
  V = 0.8; // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (let i = 0; i < linkScroll.length; i++) {
  linkScroll[i].addEventListener('click', function(e) { //по клику на ссылку
    e.preventDefault(); //отменяем стандартное поведение
    let w = window.pageYOffset, // производим прокрутка прокрутка
      hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти
    t = document.querySelector(hash).getBoundingClientRect().top, // отступ от окна браузера до id
      start = null;
    requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
    function step(time) {
      if (start === null) start = time;
      let progress = time - start,
        r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
      window.scrollTo(0, r);
      if (r != w + t) {
        requestAnimationFrame(step)
      } else {
        location.hash = hash // URL с хэшем
      }
    }
  }, false);
}
// =================== FORM ===================
$("#sendMail").on("click", function() {
  let email = $("#email").val().trim();
  let name = $("#name").val().trim();
  let phone = $("#phone").val().trim();
  let message = $("#message").val().trim();

  let phoneReg = /[0-9 -()+]+$/;
  let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  // let nameReg = /^[a-zA-Z]+$/;

  // if (!nameReg.test(name) || name.length < 3)
  if (name.length < 3) {
    $("#errorMess").text("The entered name is incorrect or does not exist");
    $("#name").addClass("error");
    return false;
  } else if ((!emailReg.test(email)) || (email === "")) {
    $("#errorMess").text("The entered email is incorrect or does not exist");
    $("#email").addClass("error");
    return false;
  } else if ((!phoneReg.test(phone)) || (phone.length < 6)) {
    $("#errorMess").text("The entered phone is incorrect or does not exist");
    $("#phone").addClass("error");
    return false;
  } else if (message.length < 5) {
    $("#errorMess").text("Enter a message not changed by 5 letters");
    $("#message").addClass("error");
    return false;
  }

  $('.contact-form-text').removeClass('error');
  $("#errorMess").text("")

  $.ajax({
    url: '../php/mail.php',
    type: 'POST',
    cache: false,
    data: {
      'name': name,
      'email': email,
      'phone': phone,
      'message': message
    },
    dataType: 'html',
    beforeSend: function() {
      $("#sendMail").prop("disabled", true);
      $('.contact-form').addClass('_sending');
    },
    success: function(data) {
      if (data === '1')
        $("#errorMess").text("There were errors, the message was not sent!");
      else
        $("#mailForm").trigger("reset");

      $("#errorMess").text("")

      $("#sendMail").prop("disabled", false);
      $('.contact-form').removeClass('_sending');
    }
  });
});