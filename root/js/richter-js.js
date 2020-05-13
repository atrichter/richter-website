// Toggle dropdown menu and menu icon change
function toggleMenu(x) {
  var body = document.body,
      overlay = document.getElementById("nav-overlay");

  x.classList.toggle("icon-change");

  if (overlay.style.height < "100%") {
    overlay.scrollTop = 0;
    overlay.style.height = "100%";
  } else {
    overlay.style.height = "0%";
  }

  body.classList.toggle('noscroll', this.className);
}

document.querySelectorAll('a.underline').forEach(elem => {
  elem.onmouseenter =
  elem.onmouseleave = e => {
    const tolerance = 10;
    const left = 0;
    const right = elem.clientWidth;
    let x = e.pageX - elem.offsetLeft;

    if (x - tolerance < left) x = left;
    if (x + tolerance > right) x = right;

    elem.style.setProperty('--x', `${x}px`);
  };
});

// toggle drop down content
var coll = document.getElementsByClassName("collapsible");
for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("collapsible-active");
    
    var content = this.nextElementSibling;
    
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
