document.getElementById("logoutLink").addEventListener("click", function () {
  sessionStorage.clear();

  window.location.href = "index.html";
});
