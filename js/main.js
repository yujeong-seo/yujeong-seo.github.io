// Project List
const projects_preview = [
    ["#da6022", "My Gathering Record, Namo", "projects/temp_thumbnail.jpg", ["UI/UX", "Branding"], "namo"],
    ["#f3593f", "Cooking Assistant, SAVRR", "projects/temp_thumbnail.jpg", ["UI/UX"], "savrr"],
    ["#0c8c84", "Logical Cycling, Cyclogic", "projects/temp_thumbnail.jpg", ["UI/UX"], "cyclogic"],
    ["#f4e116", "SkillGrip", "projects/temp_thumbnail.jpg", ["Product", "Coding"], "skillgrip"],
    ["#5081b3", "Heta Architects Website Renewal", "projects/temp_thumbnail.jpg", ["Web", "Branding"], "temp"],
    ["#16274a", "H3 Investments Branding", "projects/temp_thumbnail.jpg", ["Branding"], "temp"],
    ["#dadada", "Portfolio Website", "projects/temp_thumbnail.jpg", ["Web", "Coding"], "temp"],
    ["#17793d", "Lilou, the Dog", "projects/temp_thumbnail.jpg", ["Product", "Coding"], "gizmo-lilou"],
    ["#253054", "Elenect Web Game", "projects/temp_thumbnail.jpg", ["Web", "Coding"], "elenect"]
];

// Global Navigation Initalisation
function initGlobalNav() {
    const topNav = document.getElementById("top-nav");
    if (!topNav) return;
    
    let lastScrollY = window.scrollY;
    const topThreshold = 120;
    
    function updateNavVisibility() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > topThreshold) { 
            topNav.classList.add("nav-hidden");
        } else if (currentScrollY < lastScrollY){
            topNav.classList.remove("nav-hidden");
        }
        
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    }
       
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    updateNavVisibility();
}

// Page Specific Module 
async function loadPageModule() {
    const pageId = document.body.id;
    
    switch (pageId) {
        case "page-project-list":
            const projectListModule = await import("./page-project-list.js");
            projectListModule.initProjectList(projects_preview);
            break;
        
        case "page-project-detail":
            const projectDetailModule = await import("./page-project-detail.js");
            projectDetailModule.initProjectDetail();
            break;
    }
}

// Run Everything
document.addEventListener("DOMContentLoaded", () => {
    initGlobalNav();
    loadPageModule(); 
});