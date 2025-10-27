// Project List
const projects_preview = [
    {
        color: "#da6022",
        name: "My Gathering Record, Namo",
        thumbnail: "projects/temp_thumbnail.jpg",
        tag: ["UI/UX", "Branding"],
        slug: "namo"
    },
    {
        color: "#f3593f",
        name: "Cooking Assistant, SAVRR",
        thumbnail: "projects/temp_thumbnail.jpg",
        tag: ["UI/UX"],
        slug: "savrr"
    },
    {
        color: "#0c8c84",
        name: "Logical Cycling, Cyclogic",
        thumbnail: "projects/temp_thumbnail.jpg",
        tag: ["UI/UX"],
        slug: "cyclogic"
    },
    {
        color: "#f4e116",
        name: "SkillGrip",
        thumbnail: "projects/temp_thumbnail.jpg",
        tag: ["Product", "Coding"],
        slug: "skillgrip"
    },
    {
        color: "#5081b3",
        name: "Heta Architects Website Renewal",
        thumbnail: "projects/temp_thumbnail.jpg",
        tag: ["Web", "Branding"],
        slug: "temp"
    },
    {
        color: "#16274a",
        name: "H3 Investments Branding",
        thumbnail: "projects/temp_thumbnail.jpg",
        tag: ["Branding"],
        slug: "temp"
    },
    {
        color: "#dadada",
        name: "Portfolio Website",
        thumbnail: "projects/temp_thumbnail.jpg",
        tag: ["Web", "Coding"],
        slug: "temp"
    },
    {
        color: "#17793d",
        name: "Lilou, the Dog",
        thumbnail: "projects/temp_thumbnail.jpg",
        tag: ["Product", "Coding"],
        slug: "gizmo-lilou"
    },
    {
        color: "#253054",
        name: "Elenect Web Game",
        thumbnail: "projects/temp_thumbnail.jpg",
        tag: ["Web", "Coding"],
        slug: "elenect"
    }
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