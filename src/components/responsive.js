const sidebar = document.querySelector(".sidebar");
const hamburger = document.querySelector(".hamburger");

function checkMediaQuery(e) {
  if (e.matches) {
    sidebar.classList.add("hide-sidebar");
    hamburger.style.display = "block";
  } else {
    sidebar.classList.remove("hide-sidebar");
    hamburger.style.display = "none";
  }
}

export function hideSidebarOnSmallScreens() {
  const mq = window.matchMedia("(max-width: 768px)");
  mq.addEventListener("change", checkMediaQuery);
  checkMediaQuery(mq);
}

export function handleNavEvents() {
  function openNav() {
    document.querySelector(".sideNav").style.width = "250px";
    document.querySelector(".sideNav").style.transform = "translateX(0px)";
    document.querySelector(".navCloseBtn").style.display = "block";
    
  }
  function closeNav() {
    document.querySelector(".sideNav").style.width = "";
    document.querySelector(".sideNav").style.transform = "translateX(-100px)";
    document.querySelector(".navCloseBtn").style.display = "none";
  }
  return {
    openNav,
    closeNav
  }
}
