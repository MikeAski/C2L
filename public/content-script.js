
var dict = Ember.Object.create({
  'Б': 'B',  'В': 'V',  'Г': 'G',  'Д': 'D',  'Ђ': 'Đ',  'Ж': 'Ž',  'З': 'Z',  'И': 'I',
  'К': 'K',  'Л': 'L',  'Љ': 'LJ', 'М': 'M',  'Н': 'N',  'Њ': 'NJ', 'П': 'P',  'Р': 'R',
  'С': 'S',  'Т': 'T',  'Ћ': 'Ć',  'У': 'U',  'Ф': 'F',  'Х': 'H',  'Ц': 'C',  'Ч': 'Č',
  'Џ': 'DŽ', 'Ш': 'Š',

  'б': 'b',  'в': 'v',  'г': 'g',  'д': 'd',  'ђ': 'đ',  'ж': 'ž',  'з': 'z',  'и': 'i',
  'к': 'k',  'л': 'l',  'љ': 'lj', 'м': 'm',  'н': 'n',  'њ': 'nj', 'п': 'p',  'р': 'r',
  'с': 's',  'т': 't',  'ћ': 'ć',  'у': 'u',  'ф': 'f',  'х': 'h',  'ц': 'c',  'ч': 'č',
  'џ': 'dž', 'ш': 'š',

  transcode: function (text) {
    return text.split('').map(function (c) {
      if (['.'].contains(c)) {
        return c;
      }
      return this.getWithDefault(c, c);
    }, this).join('');
  }
});

function css (style) {
  return Ember.keys(style).map(function (k) {
    return '%@: %@;'.fmt(k, style[k]);
  }).join(' ');
}

var progress = Ember.Object.extend({
  el: null,

  init: function () {
    var style = {
      'position': 'absolute',
      'left': 0,
      'top': 0,
      'background': ' rgba(255, 255, 255, 0.5)',
      'border': 'solid 1px rgba(0, 0, 0, 0.5)',
      'border-radius': '5px',
      'margin': '10px',
      'font-family': 'sans-serif',
      'font-size': '8pt',
      'z-index': 10000,
      'overflow': 'hidden'
    },
        bar = {
      'width': 0,
      'background-color': 'rgba(0, 192, 0, 0.25)',
      'position': 'absolute',
      'height': '100%',
      'z-index': -1
    };

    var el = Ember.$(
      '<div class="c2l-progress" style="%@">'.fmt(css(style)) +
        '<div class="c2l-bar" style="%@"></div>'.fmt(css(bar)) +
        '<div class="c2l-label" style="padding: 5px 10px;">Cyrillic to Latin processing...</div>' +
      '</div>'
    );
    el.appendTo('body');
    this.set('el', el);
  },

  show: function () {
    this.get('el').show();
    console.log('C2L processing started...');

    this.setProperties({
      count: Ember.$('*').contents().filter(function () { return this.nodeType === 3; }).length,
      index: 0
    });
  },
  hide: function () {
    this.get('el').fadeOut(300);
    console.log('C2L processing complete');
  },

  increment: function () {
    this.incrementProperty('index');
    this.get('el').find('.c2l-bar').width('%@%'.fmt(this.get('index') * 100 / this.get('count')));
  }
}).create();


function processElement (el) {
  el.contents().each(function (i, content) {
    switch (content.nodeName) {
    case '#text':
      Ember.$(content).replaceWith(dict.transcode(content.wholeText));
      break;

    case 'INPUT':
      content.placeholder = dict.transcode(content.placeholder);
      content.value = dict.transcode(content.value);
      break;

    default:
      processElement(Ember.$(content));
    }
  });
  progress.increment();
}

var alreadyProcessed = false;

function processPageIf (active) {
  if (active) {
    console.log('C2L extension is enabled');

    progress.show();
    processElement(Ember.$(document));
    progress.hide();

    alreadyProcessed = true;
  } else {
    console.log('C2L extension is disabled');

    if (alreadyProcessed) {
      window.location.reload();
    }
  }
}

var extensionActive = false;
C2LSettings.loadActive(function (active) {
  extensionActive = active;
  processPageIf(active);
});

C2LSettings.whenActive(function (active) {
  extensionActive = active;
  processPageIf(active);
});

Ember.$(function () {
  document.addEventListener('DOMNodeInserted', function (event) {
    if (extensionActive) {
      processElement(Ember.$(event.target));
    }
  });
});
