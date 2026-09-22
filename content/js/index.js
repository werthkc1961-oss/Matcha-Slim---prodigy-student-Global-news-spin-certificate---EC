$(function () {
  $("#calcweight").click(function (a) {
    a.preventDefault();
    a = Math.ceil(Number($("#minus_weight").val()) / .666666);
    Number($("#weight").val()) > Number($("#minus_weight").val()) + 40 ? $(".formResult").html("<p><b>¡Si sigue las instrucciones a continuación, podrá perder " + $("#minus_weight").val() + " en solo " + a + " días sin dieta ni ejercicio!</b></p><p>¿Crees que es imposible? Lea el artículo a continuación hasta el final y cambiará de opinión. ¡Espero que esto cambie tu vida!</p>") : $(".formResult").html("<p><b>Datos Incorrectos.</b></p>");
    $(".formResult").css({
      transition: "background 1s",
      backgroundColor: "#bf0909c4",
      border: '2px solid #bf0909c4'
    });
    setTimeout(function () {
      $(".formResult").css({
        backgroundColor: "#fff"
      })
    }, 2E3)
  })
});

var resultWrapper = document.querySelector('.spin-result-wrapper');
var wheel = document.querySelector('.wheel-img');

function spin() {
  if (wheel.classList.contains('rotated')) {
    resultWrapper.style.display = "block";
  } else {
    wheel.classList.add('super-rotation');
    setTimeout(function () {
      resultWrapper.style.display = "block";
    }, 8000);
    setTimeout(function () {
      $('.spin-wrapper').slideUp();
      $('.order_block').slideDown();
      start_timer();
    }, 10000);
    wheel.classList.add('rotated');
  }
}
var closePopup = document.querySelector('.close-popup');
$('.close-popup, .pop-up-button').click(function (e) {
  e.preventDefault();
  $('.spin-result-wrapper').fadeOut();


  var top = $('#order0').offset().top;
  $('body,html').animate({
    scrollTop: top
  }, 800);
});

var time = 600;
var intr;

function start_timer() {
  intr = setInterval(tick, 1000);
}

function tick() {
  time = time - 1;
  var mins = Math.floor(time / 60);
  var secs = time - mins * 60;
  if (mins == 0 && secs == 0) {
    clearInterval(intr);
  }
  secs = secs >= 10 ? secs : "0" + secs;
  $(".timer").html("0" + mins + ':' + secs);
}

// --------------SCROLL-------------------
$("a").on("touchend, click", function (e) {
  e.preventDefault();
  $('body,html').animate({
    scrollTop: $('#order0').offset().top
  }, 400);
});

$(".ac_footer a, .ac_gdpr_fix a").unbind("click");

//packs
function Random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var count = $(".prod_left_val").eq(0).text(),
  timeLeft = setTimeout(function t() {
    count--;
    $(".prod_left_val").text(count);
    var b = Random(1, 75);
    if (count > 4) {
      timeLeft = setTimeout(t, b * 1000);
    }
  }, Random(5, 10) * 1000);