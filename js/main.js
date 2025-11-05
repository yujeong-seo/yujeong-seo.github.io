// Project List
const projects_preview = [
    {
        color: "#da6022",
        name: "My Gathering Record, Namo",
        thumbnail: "projects/images/thumbnails/namo-thumb.jpg",
        tag: ["UI/UX", "Branding"],
        slug: "namo"
    },
    /* {
        color: "#5081b3",
        name: "Heta Architects Website Renewal",
        thumbnail: "projects/images/thumbnails/heta-thumb.jpg",
        tag: ["Web", "Branding"],
        slug: "heta-internship"
    }, */
    {
        color: "#0c8c84",
        name: "Logical Cycling, Cyclogic",
        thumbnail: "projects/images/thumbnails/cyclogic-thumb.jpg",
        tag: ["UI/UX"],
        slug: "cyclogic"
    },
    {
        color: "#f3593f",
        name: "Cooking Assistant, SAVRR",
        thumbnail: "projects/images/thumbnails/savrr-thumb.jpg",
        tag: ["UI/UX"],
        slug: "savrr"
    },
    {
        color: "#f4e116",
        name: "Ultimate Grip Trainer, SkillGrip",
        thumbnail: "projects/images/thumbnails/skillgrip-thumb.jpg",
        tag: ["Product", "Coding"],
        slug: "skillgrip"
    },
    /* {
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
    }, */
    {
        color: "#17793d",
        name: "Lilou, the Dog",
        thumbnail: "projects/images/thumbnails/lilou-thumb.jpg",
        tag: ["Product", "Coding"],
        slug: "gizmo-lilou"
    },
    {
        color: "#253054",
        name: "Web Game Elenect",
        thumbnail: "projects/images/thumbnails/elenect-thumb.jpg",
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

// Page Specific Accent Color
function applyProjectColor(currentSlug) {
    const project = projects_preview.find(p => p.slug === currentSlug);
    if (project) {
        document.documentElement.style.setProperty("--gradient-main", project.color);
    } else return;
}

// Mobile Style Update
function renderBlock() {
    const projectWrapper = document.getElementById("project-wrapper");
    const detailWrapper = document.getElementById("detail-wrapper");
    const winWidth = window.innerWidth;
    const widthThreshold = 600;
    
    const applyLogic = (element) => {
        if (!element) return;
        
        if (winWidth <= widthThreshold) {
            element.classList.remove("glass");
        } else {
            element.classList.add("glass");
        }
    }
    
    applyLogic(detailWrapper);
}

// Custom Cursor
function updateCursor(e) {
    let x = e.clientX;
    let y = e.clientY;
    document.documentElement.style.setProperty("--mouse-x", x + "px");
    document.documentElement.style.setProperty("--mouse-y", y + "px");
    
    const cursor = document.getElementById("mycursor");
    const target = e.target;
    
    if (target.closest("a") || target.closest("button")) {
        cursor.classList.add("hovering");
    } else {
        cursor.classList.remove("hovering");
    }
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
            
            const path = window.location.pathname;
            const parts = path.split("/");
            const filename = parts[parts.length - 1];
            const slug = filename.split(".")[0];
            if (slug) {
                applyProjectColor(slug);
            }
            
            break;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initGlobalNav();
    loadPageModule(); 
    renderBlock();
    
    window.addEventListener("resize", renderBlock);
    window.addEventListener("mousemove", updateCursor);
});