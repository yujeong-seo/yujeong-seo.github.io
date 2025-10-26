/* 
Project List Page
Handles the list and tag population
*/

export function initProjectList(projects_preview) {

    const template = document.getElementById("project-template");
    const container = document.getElementById("project-list-container");
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

            clone.querySelector(".project-name").textContent = name;
            clone.querySelector(".project-link-wrapper").href = `/projects/${slug}.html`;
            const colorBlock = clone.querySelector(".project-color");
            colorBlock.style.backgroundColor = color;
            const thumbnailPreview = clone.querySelector(".thumbnail-preview");
            thumbnailPreview.style.backgroundImage = `url('${thumbnail}')`;;


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
                colorBlock.classList.add("hidden");
                document.documentElement.style.setProperty("--gradient-main", color);
                tagsContainer.style.display = "flex";
                setTimeout(() => {
                    thumbnailPreview.classList.add("full");
                }, 10);
            });
            projectBlock.addEventListener("mouseleave", () => {
                thumbnailPreview.style.display = "none";
                thumbnailPreview.classList.remove("full");
                colorBlock.classList.remove("hidden");
                document.documentElement.style.setProperty("--gradient-main", "#50535a");
                tagsContainer.style.display = "none";
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
}