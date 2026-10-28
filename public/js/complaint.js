// Complaint form, review copy. Nothing is sent anywhere.
// One question per page, then an editable draft, then "check your answers".
(function () {
  var app = document.getElementById("complaint-app");
  if (!app) return;
  var form = document.getElementById("complaint-form");
  var summary = form.querySelector(".error-summary");
  var baseTitle = document.title;
  var ORDER = ["start", "name", "address", "contact", "connection", "seen", "spoken", "draft", "check", "done"];
  var current = "start";
  var returnToCheck = false;
  var template = null;
  var edited = {};

  function $(id) { return document.getElementById(id); }
  function val(id) { var el = $(id); return el ? el.value.trim() : ""; }
  function section(step) { return app.querySelector('[data-step="' + step + '"]'); }

  function show(step, push) {
    ORDER.forEach(function (s) { var el = section(s); if (el) el.hidden = s !== step; });
    form.hidden = step === "start" || step === "done";
    clearErrors();
    current = step;
    if (step === "draft") { prefillDraft(); requestAnimationFrame(function () { DRAFT_FIELDS.forEach(function (f) { grow($(f[0])); }); }); }
    if (step === "check") renderSummary();
    if (push) history.pushState({ step: step }, "", step === "start" ? location.pathname : "#" + step);
    var heading = section(step).querySelector("h1");
    window.scrollTo(0, 0);
    if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus({ preventScroll: true }); }
  }

  window.addEventListener("popstate", function (e) {
    var step = (e.state && e.state.step) || (location.hash || "#start").slice(1);
    if (ORDER.indexOf(step) === -1) step = "start";
    show(step, false);
  });

  // Error handling, following the GOV.UK error summary pattern
  function clearErrors() {
    summary.hidden = true;
    summary.querySelector("ul").innerHTML = "";
    form.querySelectorAll(".form-group-error").forEach(function (g) {
      g.classList.remove("form-group-error");
      var m = g.querySelector(".error-message"); if (m) { m.hidden = true; m.textContent = ""; }
      g.querySelectorAll(".input-error").forEach(function (i) { i.classList.remove("input-error"); i.removeAttribute("aria-invalid"); });
    });
    document.title = baseTitle;
  }

  function showErrors(errors) {
    var ul = summary.querySelector("ul");
    errors.forEach(function (err) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + err.target; a.textContent = err.message;
      a.addEventListener("click", function (e) { e.preventDefault(); var t = $(err.target); if (t) t.focus(); });
      li.appendChild(a); ul.appendChild(li);
      var group = form.querySelector('[data-field="' + err.field + '"]');
      if (group) {
        group.classList.add("form-group-error");
        var m = group.querySelector(".error-message");
        if (m) { m.hidden = false; m.innerHTML = '<span class="visually-hidden">Error: </span>' + err.message; }
        var input = $(err.target);
        if (input && input.matches("input[type=text],input[type=email],input[type=tel],textarea")) { input.classList.add("input-error"); input.setAttribute("aria-invalid", "true"); }
      }
    });
    summary.hidden = false;
    document.title = "Error: " + baseTitle;
    summary.focus();
  }

  var POSTCODE = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}$/i;
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var DRAFT_FIELDS = [
    ["describe", "the description of the change of use"],
    ["harm", "the harm being caused"],
    ["resolve", "whether you have tried to resolve the matter"],
    ["healthSafety", "the health and safety answer"],
    ["why", "why you are making this complaint"],
    ["details", "the details for an initial assessment"]
  ];

  function validate(step) {
    var e = [];
    function need(id, msg, field) { if (!val(id)) e.push({ field: field || id, target: id, message: msg }); }
    if (step === "name") {
      need("firstName", "Enter your first name");
      need("lastName", "Enter your last name");
    } else if (step === "address") {
      need("address1", "Enter your house name or number and street");
      need("town", "Enter your town");
      if (!val("postcode")) e.push({ field: "postcode", target: "postcode", message: "Enter your postcode" });
      else if (!POSTCODE.test(val("postcode"))) e.push({ field: "postcode", target: "postcode", message: "Enter a full UK postcode, like CO10 8DT" });
    } else if (step === "contact") {
      if (!val("email")) e.push({ field: "email", target: "email", message: "Enter your email address" });
      else if (!EMAIL.test(val("email"))) e.push({ field: "email", target: "email", message: "Enter an email address in the correct format, like name@example.com" });
      if (!val("phone")) e.push({ field: "phone", target: "phone", message: "Enter a phone number, like 01440 123456 or 07700 900982" });
      else if (val("phone").replace(/[^0-9]/g, "").length < 10) e.push({ field: "phone", target: "phone", message: "Enter a phone number, like 01440 123456 or 07700 900982" });
    } else if (step === "connection") {
      if (!form.querySelector('input[name="connection"]:checked')) e.push({ field: "connection", target: "c-near", message: "Select how what is happening at The Plough affects you" });
    } else if (step === "seen") {
      if (val("seen").length > 3000) e.push({ field: "seen", target: "seen", message: "What you have seen or heard must be 3,000 characters or less" });
    } else if (step === "spoken") {
      var s = form.querySelector('input[name="spoken"]:checked');
      if (!s) e.push({ field: "spoken", target: "s-yes", message: "Select yes if you have spoken to the owners about this yourself" });
      else if (s.value === "yes" && !val("spokenDetail")) e.push({ field: "spokenDetail", target: "spokenDetail", message: "Enter what was said, and when" });
    } else if (step === "draft") {
      DRAFT_FIELDS.forEach(function (f) {
        var v = val(f[0]);
        if (!v) e.push({ field: f[0], target: f[0], message: "Enter " + f[1] });
        else if (/\[[^\]]*\]/.test(v)) e.push({ field: f[0], target: f[0], message: "Replace or delete the text in square brackets in " + f[1] });
      });
    } else if (step === "check") {
      if (!$("declaration").checked) e.push({ field: "declaration", target: "declaration", message: "Select the box to confirm your complaint is true to the best of your knowledge" });
    }
    return e;
  }

  function next(to) {
    var errors = validate(current);
    if (errors.length) { showErrors(errors); return; }
    if (returnToCheck && current !== "draft" && to !== "check" && current !== "start") { returnToCheck = false; to = "check"; }
    show(to, true);
  }

  app.addEventListener("click", function (e) {
    var t = e.target.closest("[data-next]");
    if (t) { e.preventDefault(); next(t.getAttribute("data-next")); return; }
    var b = e.target.closest("[data-back]");
    if (b) { e.preventDefault(); history.back(); return; }
    var c = e.target.closest("[data-change]");
    if (c) { e.preventDefault(); returnToCheck = true; show(c.getAttribute("data-change"), true); }
  });

  // Reveal the follow-up question when someone answers yes
  form.querySelectorAll('input[name="spoken"]').forEach(function (r) {
    r.addEventListener("change", function () {
      var yes = form.querySelector('input[name="spoken"]:checked').value === "yes";
      $("spoken-detail").hidden = !yes;
      $("s-yes").setAttribute("aria-expanded", String(yes));
    });
  });

  function grow(el) { el.style.height = "auto"; el.style.height = (el.scrollHeight + 4) + "px"; }
  DRAFT_FIELDS.forEach(function (f) {
    $(f[0]).addEventListener("input", function (e) { edited[f[0]] = true; grow(e.target); });
  });

  // Choose a template that suits how the resident says they are affected.
  function pickTemplate() {
    var list = window.COMPLAINT_TEMPLATES || [];
    if (!list.length) return null;
    var chosen = Array.prototype.map.call(form.querySelectorAll('input[name="connection"]:checked'), function (c) { return c.value; });
    var pool = list.filter(function (t) {
      var tags = t["for"] || ["any"];
      if (tags.indexOf("any") !== -1) return true;
      return chosen.some(function (c) { return tags.indexOf(c) !== -1; });
    });
    if (!pool.length) pool = list;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function prefillDraft() {
    if (!template) template = pickTemplate();
    if (!template) return;
    ["describe", "healthSafety", "why", "details"].forEach(function (k) {
      if (!edited[k]) $(k).value = template[k];
    });
    if (!edited.harm) {
      var seen = val("seen");
      $("harm").value = (seen ? "What I have seen or heard myself: " + seen + "\n\n" : "") + template.harm;
    }
    if (!edited.resolve) {
      var s = form.querySelector('input[name="spoken"]:checked');
      if (s && s.value === "yes") {
        $("resolve").value = "Yes. " + val("spokenDetail") + "\n\nNo planning application has been made since then, so I am asking the council to look into this.";
      } else {
        $("resolve").value = template.resolve;
      }
    }
  }

  function row(dl, label, value, step) {
    var div = document.createElement("div");
    var dt = document.createElement("dt"); dt.textContent = label;
    var dd = document.createElement("dd"); dd.textContent = value || "Not given";
    var act = document.createElement("dd"); act.className = "actions";
    if (step) {
      var a = document.createElement("a"); a.href = "#" + step; a.setAttribute("data-change", step);
      a.innerHTML = 'Change<span class="visually-hidden"> ' + label.toLowerCase() + "</span>";
      act.appendChild(a);
    }
    div.appendChild(dt); div.appendChild(dd); div.appendChild(act); dl.appendChild(div);
  }

  function renderSummary() {
    var you = $("summary-you"); you.innerHTML = "";
    var labels = { near: "I live nearby", road: "I use Hundon Road or the lanes nearby", pub: "I used The Plough when it was a pub", loss: "I am worried about losing the village pub", other: "Something else" };
    var conn = Array.prototype.map.call(form.querySelectorAll('input[name="connection"]:checked'), function (c) { return labels[c.value]; }).join("\n");
    row(you, "Name", val("firstName") + " " + val("lastName"), "name");
    row(you, "Address", [val("address1"), val("address2"), val("town"), val("postcode").toUpperCase()].filter(Boolean).join("\n"), "address");
    row(you, "Email address", val("email"), "contact");
    row(you, "Phone number", val("phone"), "contact");
    row(you, "How it affects you", conn, "connection");
    var c = $("summary-complaint"); c.innerHTML = "";
    DRAFT_FIELDS.forEach(function (f) {
      var label = $(f[0]).closest(".form-group").querySelector("label").textContent;
      row(c, label, val(f[0]), "draft");
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var errors = validate("check");
    if (errors.length) { showErrors(errors); return; }
    show("done", true);
  });

  var start = app.querySelector('[data-next="name"]');
  if (start) start.addEventListener("click", function () {});
  if (location.hash && location.hash !== "#start") history.replaceState({ step: "start" }, "", location.pathname);
  history.replaceState({ step: "start" }, "", location.pathname);
})();
