// Small helpers used on every page.
document.documentElement.classList.add("js");

(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
    toggle.textContent = open ? "Menu" : "Close";
  });
})();

// Review copy: simple forms (sign-up, event record) show a message instead of sending.
(function () {
  var forms = document.querySelectorAll("form[data-review-form]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var done = document.getElementById(form.getAttribute("data-review-form"));
      if (done) {
        form.hidden = true;
        done.hidden = false;
        done.setAttribute("tabindex", "-1");
        done.focus();
      }
    });
  });
})();
