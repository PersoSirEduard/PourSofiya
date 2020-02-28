function typewriter(sentences, speed, waitTime) {
  var container = $('<div>', {"class": "console-container"});
  var title = $('<span>', {"class": "title"});
  var underscore = $('<div>', {"class": "console-underscore"});
  container.append(title);
  container.append(underscore);
  $("body").append(container);
  var visibleUnderscore = true;
  var currentSentence = 0;
  var txt = '';
  var isDeleting = false;
  var wait = false;
  var waitTicks = 0;

  var animation = setInterval(function() {
    var fullTxt = sentences[currentSentence];
    if (txt.length == 0) isDeleting = false;
    if (txt.length == fullTxt.length && isDeleting == false) {
      wait = true;
    }
    if (wait) {
      waitTicks++;
      if (waitTicks >= waitTime[currentSentence]) {
        wait = false;
        waitTicks = 0;
        isDeleting = true;
      }
    } else {
    if (isDeleting) {
      txt = fullTxt.substring(0, txt.length - 1);
      fullTxt = sentences[currentSentence];
      if (txt.length == 0) currentSentence++;
      if (currentSentence > sentences.length - 1) {
        clearInterval(animation);
        container.remove();
      }
    } else {
      txt = fullTxt.substring(0, txt.length + 1);
    }
    if (visibleUnderscore) {
      visibleUnderscore = false;
      underscore.text("|");
    } else {
      visibleUnderscore = true;
      underscore.text("");
    }
    title.text(txt);
  }
  }, speed);
}
