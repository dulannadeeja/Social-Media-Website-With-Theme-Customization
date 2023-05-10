const sideNavItems = document.querySelectorAll(".sidenav-item");

// left-sidenav items click functionality 
sideNavItems.forEach((item) => {
    item.addEventListener("click", () => {
        sideNavItems.forEach((item) => {
            item.classList.toggle("active");
        });
    });
});