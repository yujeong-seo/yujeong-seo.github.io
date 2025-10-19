const projects_preview = [
    ["#da6022", "My Gathering Record, Namo", "projects/temp_thumbnail.jpg", ["UI/UX", "Branding"], "namo"],
    ["#f3593f", "Cooking Assistant, SAVRR", "projects/temp_thumbnail.jpg", ["UI/UX"], "savrr"],
    ["#0c8c84", "Logical Cycling, Cyclogic", "projects/temp_thumbnail.jpg", ["UI/UX", "Business"], "cyclogic"],
    ["#f4e116", "SkillGrip", "projects/temp_thumbnail.jpg", ["Product", "Coding"], "skillgrip"],
    ["#5081b3", "Heta Architects Website Renewal", "projects/temp_thumbnail.jpg", ["Web", "Branding"], "temp"],
    ["#fafafa", "H3 Investments Branding", "projects/temp_thumbnail.jpg", ["Branding"], "temp"],
    ["#dadada", "Portfolio Website", "projects/temp_thumbnail.jpg", ["UI/UX", "Web"], "temp"],
    ["#17793d", "Lilou, the Dog", "projects/temp_thumbnail.jpg", ["Product", "Coding"], "gizmo-lilou"],
    ["#253054", "Elenect Web Game", "projects/temp_thumbnail.jpg", ["Web", "Coding"], "elenect"]
];

document.addEventListener("DOMContentLoaded", () => {
    const template = document.getElementById("project-template");
    const container = document.getElementById("project-list-container");
    const thumbnailPreview = document.getElementById("thumbnail-preview");
    const tagFiltersContainer = document.getElementById("tag-filters");
    const emptyState = document.getElementById("empty-state");

    let currentFilter = "All";

    function renderProjects(projectsToRender) {
        container.innerHTML = "";
        emptyState.style.display = projectsToRender.length === 0 ? "block" : "none";

        projectsToRender.forEach(project => {
            const clone = document.importNode(template.content, true);
            const color = project[0];
            const name = project[1];
            const thumbnail = project[2];
            const tags = project[3];
            const slug = project[4];

            clone.querySelector(".project-color").style.backgroundColor = color;
            clone.querySelector(".project-name").textContent = name;
            clone.querySelector(".project-link-wrapper").href = `/projects/${slug}.html`;

            // Dynamically create and add tag elements
            const tagsContainer = clone.querySelector(".project-tag-container");
            tags.forEach(tagText => {
                const tagElement = document.createElement("div");
                tagElement.className = "project-tag";
                tagElement.textContent = tagText;
                tagsContainer.appendChild(tagElement);
            });

            // Add hover listeners for thumbnail
            const projectBlock = clone.querySelector(".project-block");
            projectBlock.addEventListener("mouseover", () => {
                thumbnailPreview.style.display = "block";
                thumbnailPreview.style.backgroundImage = `url('${thumbnail}')`;;
            });
            projectBlock.addEventListener("mouseleave", () => {
                thumbnailPreview.style.display = "none";
            });

            container.appendChild(clone);
        });
    }

    function applyFilter() {
        let filteredProjects = projects_preview;

        if (currentFilter !== "All") {
            filteredProjects = projects_preview.filter(p => p[3].includes(currentFilter));
        }

        renderProjects(filteredProjects);
    }

    function setupTagFilters() {
        // Use flatMap to get all tags from all projects into a single array
        const allTags = projects_preview.flatMap(p => p[3]);
        const uniqueTags = ["All", ...new Set(allTags)];

        uniqueTags.forEach(tag => {
            const button = document.createElement("button");
            button.textContent = tag;
            if (tag === "All") button.classList.add("active");

            button.addEventListener("click", () => {
                currentFilter = tag;
                tagFiltersContainer.querySelectorAll("button").forEach(btn => btn.classList.remove('active'));
                button.classList.add("active");
                applyFilter();
            });
            tagFiltersContainer.appendChild(button);
        });
    }

    setupTagFilters();
    applyFilter();

    window.addEventListener("mousemove", (e) => {
        thumbnailPreview.style.left = e.clientX + "px";
        thumbnailPreview.style.top = e.clientY + "px";
    });
});

