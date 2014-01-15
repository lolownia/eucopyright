var problems = [];
var currentProblem = 0;
var guideSlug = 'fnp';


var problems2questions = {};
var questions_chosen = [11, 14, 20, 23, 34, 38, 45, 48, 61, 71, 77, 80];

$.map(questions_chosen, function(qn, i) {
  problems2questions['q'+qn] = [qn];
});


function start(btn) {
  $('.download-document').click(function(){
    var data = EUCopyright.collectData();
    EUCopyright.compile(data, EUCopyright.settings).done(EUCopyright.createDownload);
  });
  problems = $(btn).data("problems");
  var plen = problems.length;
  problems = $.map(problems, function(key, i) {
    var qtitle = $("#title-" + key).eq(0).text();
    var override_questions = $("#override-"+key);
    if (override_questions.length > 0) {
      $(".q-" + key.substr(1) + " .panel-title").text(override_questions.eq(0).text() + " (Pytanie Komisji Europejskiej nr&nbsp;"+key.substr(1)+")");
    }

    return [[key, qtitle + ' (Pyt. ' + (i+1) + ')']];
  });
  // $('input[type=checkbox]').each(function(i, cb) {
  //   if (cb.checked) {
  //     var isDuplicate = false;
  //     for (var j=0; j<problems.length; j++) { // is it already in there?
  //       if (problems2questions[problems[j][0]][0] == problems2questions[cb.value][0]) {
  //         // first question for this problem is equal? TODO this only works in simple cases
  //         isDuplicate = true;
  //         problems[j][1] += '<br />& '+cb.getAttribute('title');
  //       }
  //     }
  //    if (!isDuplicate) problems.push([cb.value, cb.getAttribute('title')]);
  //   }
  // });
  if (problems.length > 0) {
    $('.container')[0].className = 'container step-problem'; // switch to next "tab"
    $('.download-document').click(function(e){ step() }); // make final button do the right thing
    if (typeof guideSlug != 'undefined') {
      EUCopyright.loadGuide(guideSlug);
    } else {
      EUCopyright.loadGuide('30c3');
    }
    step();
  } else { // nothing selected
    btn.innerHTML = "Please select a problem above before continuing &raquo;";
  }
}

function step(back) {
  if (back && currentProblem > 1)
    currentProblem = currentProblem - 2;
  if (currentProblem < problems.length) { // not at end yet

    $('#step-problem h2')[0].innerHTML = problems[currentProblem][1];

    // move last q's back to hidden container
    var cl = document.getElementById('problem').children.length;
    for (var i=0; i<cl; i++) {
      $('#questions')[0].appendChild($('#problem')[0].children[0]);
    }

    // fetch new q's
    $(problems2questions[problems[currentProblem][0]]).each(function(i, q) {
      $('#problem')[0].appendChild($('.q-'+q)[0]);
    });

    if (currentProblem == problems.length-1) {
      $('#next').hide();
      $('#prev').hide();
      $('.give-name').show();
      $('.download-document').show();
    }
    currentProblem++;

    $('html, body').animate({
        scrollTop: $(".container").offset().top
    }, 1000);
//    $(".container h2").focus();
//    $('#problem').find(':input:first').focus(); // TODO doesn't work?
    //$('#problem textarea')[0].focus(); // if there's a textarea, place the cursor inside

  } else { // reached end
    $('.container')[0].className = 'container step-end';
    $('#step-end').find(':input:first')[0].focus(); // TODO doesn't work?
  }
}
