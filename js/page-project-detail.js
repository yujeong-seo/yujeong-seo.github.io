/* 
Project Detail Page
Handles the hero background scroll animation
*/

export function initProjectDetail() {
    const bgImg = document.getElementById("background-img");
    // const projectName = document.getElementById("project-name");
    
    if (!bgImg) return;
    // if (!bgImg || !projectName) return;
    
    function handleProjectScroll() {
        const scrollY = window.scrollY;
        const winHeight = window.innerHeight;
        
        const fadeStart = winHeight * 0.2;
        const fadeEnd = winHeight;
        const fadeRange = fadeEnd - fadeStart;
        let fadeProgress = Math.min(1, Math.max(0, (scrollY - fadeStart) / fadeRange));
        bgImg.style.opacity = 1 - fadeProgress;
        // projectName.style.opacity = 1 - fadeProgress;
    }
    
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleProjectScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    handleProjectScroll();
}