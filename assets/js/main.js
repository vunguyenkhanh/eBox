// Header Scroll
$(window).scroll(function () {
  if ($(this).scrollTop() > 1) {
    $('header').addClass('header_sticky');
  } else {
    $('header').removeClass('header_sticky');
  }
});

// Category filter
$('.item_category').click(function () {
  $(this).siblings().removeClass('active');
  $(this).addClass('active');
});

// Price filter
$('.filter_current').click(function () {
  if ($('.filter_option').css('display') === 'none') {
    $(this).addClass('active');
    $('.filter_option').css('display', 'block');
  } else {
    $(this).removeClass('active');
    $('.filter_option').css('display', 'none');
  }
});

$('.filter_item').each(function () {
  $(this).on('click', function () {
    $(this).toggleClass('active');
  });
});

// FAQ accordion
$('.card').each(function (index) {
  let collapse = $(this).find('.collapse');
  let btnLink = $(this).find('.btn_link');

  if (index === 0) {
    collapse.css('display', 'block');
    btnLink.addClass('collapsed');
  }

  $(this).click(function () {
    if (collapse.css('display') === 'none') {
      collapse.css('display', 'block');
      btnLink.addClass('collapsed');
    } else {
      collapse.css('display', 'none');
      btnLink.removeClass('collapsed');
    }
  });
});

// Map filter
$(document).ready(function () {
  const locations = ['#location1', '#location2'];
  const navLinks = $('.contact_map .nav_link');

  $(locations[0]).hide();
  $(locations[1]).show();

  navLinks.each(function (index) {
    $(this).click(function () {
      locations.forEach((location, i) => {
        $(location).toggle(i === index);
      });

      navLinks.removeClass('active');
      $(this).addClass('active');
    });
  });
});

// Animation người đăng ký
$(document).ready(function () {
  let messages = [
    '<span class="material-icons">person_add</span> kimk** vừa đăng ký',
    '<span class="material-icons">person_add</span> thuo***** vừa đăng ký',
    '<span class="material-icons">person_add</span> tran**** vừa đăng ký',
    '<span class="material-icons">person_add</span> chil** vừa đăng ký',
  ];

  let currentIndex = 0;

  function showNextMessage() {
    let textValue = $('.text_value');
    textValue.removeClass('show');

    setTimeout(function () {
      currentIndex = (currentIndex + 1) % messages.length;
      textValue.html(messages[currentIndex]);
      textValue.addClass('show');
    }, 800);
  }

  setInterval(showNextMessage, 4000);
});

// Magnific Popup Image
$('.item_popup').magnificPopup({
  delegate: 'a',
  type: 'image',
});

$('.slide_post').magnificPopup({
  delegate: 'a',
  type: 'image',
  gallery: {
    enabled: true,
  },
});

// Swiper Slider
const slide_gallery = new Swiper('.slide_gallery', {
  loop: true,
  slidesPerView: 2.4,
  spaceBetween: 16,
  loop: true,
  speed: 800,
  watchOverflow: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: true,
  },

  navigation: {
    nextEl: '.swiper_button_next',
    prevEl: '.swiper_button_prev',
  },
});

const slide_related_post = new Swiper('.slide_related_post', {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: false,
  speed: 800,
  watchOverflow: true,
  navigation: {
    nextEl: '.swiper_button_next',
    prevEl: '.swiper_button_prev',
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: true,
  },
});

// Flip Countdown
const lang = 'VI';
const typeCountdown = 'time';

let EndDate = '2023/01/01, 00:00';

let days = 10;
let timeOut = '00:00';
const ColorDigitEnd = '#bfbfbf';

let hours, minutes, target_date, ExpirationDate;
let formatCountdown = null;
let day_lang = (hour_lang = minute_lang = second_lang = '');

function daysLeft(target) {
  if (target > 24 * 60 * 60 * 1000) {
    formatCountdown = 'day|hour|minute|second';
  } else if (target > 60 * 60 * 1000) {
    formatCountdown = 'hour|minute|second';
  } else {
    formatCountdown = 'minute|second';
  }
}

if (typeCountdown === 'time') {
  timeOut = timeOut.split(':');
  hours = timeOut[0];
  minutes = timeOut[1];
  target_date = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000;

  daysLeft(target_date);
  target_date += new Date().getTime();
} else if (typeCountdown === 'date') {
  ExpirationDate = new Date(EndDate);
  target_date = ExpirationDate - new Date();
  daysLeft(target_date);
  target_date += new Date().getTime();
} else {
  target_date = 0;
  formatCountdown = 'day|hour|minute|second';
}

if (lang === 'VI') {
  day_lang = 'Ngày';
  hour_lang = 'Giờ';
  minute_lang = 'Phút';
  second_lang = 'Giây';
}

class Countdown {
  get TIMESTAMP_SECOND() {
    return 1000;
  }
  get TIMESTAMP_MINUTE() {
    return 60 * this.TIMESTAMP_SECOND;
  }
  get TIMESTAMP_HOUR() {
    return 60 * this.TIMESTAMP_MINUTE;
  }
  get TIMESTAMP_DAY() {
    return 24 * this.TIMESTAMP_HOUR;
  }

  constructor(userOptions) {
    this.options = {
      cont: null,
      countdown: true,
      endDate: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
      },
      endCallback: null,
      outputFormat: formatCountdown,
      outputTranslation: {
        day: day_lang,
        hour: hour_lang,
        minute: minute_lang,
        second: second_lang,
      },
    };

    this.lastTick = null;
    this.intervalsBySize = ['day', 'hour', 'minute', 'second'];
    this.interval = null;
    this.digitConts = {};
    this._assignOptions(this.options, userOptions);
  }

  start() {
    let endDate, endDateData;
    this._fixCompatibility();

    endDate = this._getDate(this.options.endDate);
    endDateData = this._prepareTimeByOutputFormat(endDate);

    this._writeData(endDateData);
    this.lastTick = endDateData;

    if (this.options.countdown && endDate.getTime() <= Date.now()) {
      if (typeof this.options.endCallback === 'function') {
        this.stop();
        this.options.endCallback();
      }
    } else {
      this.interval = setInterval(() => {
        this._updateView(this._prepareTimeByOutputFormat(endDate));
      }, this.TIMESTAMP_SECOND);
    }
  }

  stop() {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
  }

  _getDate(date) {
    if (typeof date === 'object') {
      if (date instanceof Date) {
        return date;
      } else {
        let expectedValues = {
          day: 0,
          hour: 0,
          minute: 0,
          second: 0,
        };

        for (let i in expectedValues) {
          if (expectedValues.hasOwnProperty(i) && date.hasOwnProperty(i)) {
            expectedValues[i] = date[i];
          }
        }
        return new Date(
          expectedValues.day,
          expectedValues.hour,
          expectedValues.minute,
          expectedValues.second
        );
      }
    } else if (typeof date === 'number' || typeof date === 'string') {
      return new Date(date);
    } else {
      return new Date();
    }
  }

  _prepareTimeByOutputFormat(dateObj) {
    let usedIntervals,
      output = {},
      timeDiff;

    usedIntervals = this.intervalsBySize.filter((item) => {
      return this.options.outputFormat.split('|').indexOf(item) !== -1;
    });

    timeDiff = this.options.countdown
      ? dateObj.getTime() - Date.now()
      : Date.now() - dateObj.getTime();

    usedIntervals.forEach((item) => {
      let value;
      if (timeDiff > 0) {
        switch (item) {
          case 'day':
            value = Math.trunc(timeDiff / this.TIMESTAMP_DAY);
            timeDiff -= value * this.TIMESTAMP_DAY;
            break;
          case 'hour':
            value = Math.trunc(timeDiff / this.TIMESTAMP_HOUR);
            timeDiff -= value * this.TIMESTAMP_HOUR;
            break;
          case 'minute':
            value = Math.trunc(timeDiff / this.TIMESTAMP_MINUTE);
            timeDiff -= value * this.TIMESTAMP_MINUTE;
            break;
          case 'second':
            value = Math.trunc(timeDiff / this.TIMESTAMP_SECOND);
            timeDiff -= value * this.TIMESTAMP_SECOND;
            break;
        }
      } else {
        value = '00';
        const elements = document.querySelectorAll('.digit_cont');
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.color = ColorDigitEnd;
        }
      }
      output[item] = (('' + value).length < 2 ? '0' + value : '' + value).split('');
    });
    return output;
  }

  _fixCompatibility() {
    Math.trunc =
      Math.trunc ||
      function (x) {
        if (isNaN(x)) {
          return NaN;
        }
        if (x > 0) {
          return Math.floor(x);
        }
        return Math.ceil(x);
      };
  }

  _writeData(data) {
    let code = ``,
      intervalName;

    for (intervalName in data) {
      if (data.hasOwnProperty(intervalName)) {
        let element = `<div><div class="interval_cont interval_cont_${intervalName}">`,
          intervalDescription = `<div class="description"> ${this.options.outputTranslation[intervalName]}</div>`;

        data[intervalName].forEach((digit, index) => {
          element += `<div class="digit_cont digit_cont_${index}" id="test">${this._getDigitElementString(
            digit,
            0
          )}</div>`;
        });

        code += element + '</div>' + intervalDescription + '</div>';
      }
    }
    this.options.cont.innerHTML = code;
    this.lastTick = data;
  }

  _getDigitElementString(newDigit, lastDigit) {
    return `<div class="last_placeholder"><span>${lastDigit}</span></div>
						<div class="new_placeholder">${newDigit}</div>
						<div class="last_rotate">${lastDigit}</div>
						<div class="new_rotate">
							<div class="rotated"><span>${newDigit}</span></div>
						</div>`;
  }

  _updateView(data) {
    for (let intervalName in data) {
      if (data.hasOwnProperty(intervalName)) {
        data[intervalName].forEach((digit, index) => {
          if (
            this.lastTick !== null &&
            this.lastTick[intervalName][index] !== data[intervalName][index]
          ) {
            this._getDigitCont(intervalName, index).innerHTML = this._getDigitElementString(
              data[intervalName][index],
              this.lastTick[intervalName][index]
            );
          }
        });
      }
    }
    this.lastTick = data;
  }

  _getDigitCont(intervalName, index) {
    if (!this.digitConts[`${intervalName}_${index}`]) {
      this.digitConts[`${intervalName}_${index}`] = this.options.cont.querySelector(
        `.interval_cont_${intervalName} .digit_cont_${index}`
      );
    }
    return this.digitConts[`${intervalName}_${index}`];
  }

  _assignOptions(options, userOptions) {
    for (let i in options) {
      if (options.hasOwnProperty(i) && userOptions.hasOwnProperty(i)) {
        if (
          options[i] !== null &&
          typeof options[i] === 'object' &&
          typeof userOptions[i] === 'object'
        ) {
          this._assignOptions(options[i], userOptions[i]);
        } else {
          options[i] = userOptions[i];
        }
      }
    }
  }
}

let endDate = '2024/12/09, 17:39:02';
if ($('.count1')[0]) {
  if (endDate != null) {
    let cdtk = new Countdown({
      cont: document.querySelector('.count1'),
      endDate: endDate,
      outputTranslation: {
        day: day_lang,
        hour: hour_lang,
        minute: minute_lang,
        second: second_lang,
      },
      endCallback: null,
      outputFormat: formatCountdown,
    });
    cdtk.start();
  }
}

if ($('.count2')[0]) {
  let cd = new Countdown({
    cont: document.querySelector('.count2'),
    endDate: endDate,
    outputTranslation: {
      day: day_lang,
      hour: hour_lang,
      minute: minute_lang,
      second: second_lang,
    },
    endCallback: null,
    outputFormat: formatCountdown,
  });
  cd.start();
}

// Payment Scroll
$(window).scroll(function () {
  if ($(this).scrollTop() > 1) {
    $('.sticky_countdown_detail').removeClass('hidden');
  } else {
    $('.sticky_countdown_detail').addClass('hidden');
  }
});
