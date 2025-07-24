const sideBar = document.querySelector(".sidebar");
const menu = document.querySelector(".menu-icon");
const close = document.querySelector(".close-icon");

menu.addEventListener("click", function() {
    sideBar.classList.add("open-sidebar");
    sideBar.classList.remove("close-sidebar");
});

close.addEventListener("click", function() {
    sideBar.classList.add("close-sidebar");
    sideBar.classList.remove("open-sidebar");
});
