/* 
Project Detail Page
Handles the hero background scroll animation
*/

export function initProjectDetail() {
    const bgImg = document.getElementById("background-img");
    const bgOverlay = document.getElementById("background-overlay");
    const projectName = document.getElementById("project-name");
    
    if (!bgImg || !projectName) return;
    
    function handleProjectScroll() {
        const scrollY = window.scrollY;
        const winHeight = window.innerHeight;
        
        const fadeStart = winHeight * 0;
        const fadeEnd = winHeight * 0.80;
        const fadeRange = fadeEnd - fadeStart;
        let fadeProgress = Math.min(1, Math.max(0, (scrollY - fadeStart) / fadeRange));
        bgImg.style.opacity = 1 - fadeProgress;
        bgOverlay.style.opacity = 1 - fadeProgress;
        
        projectName.style.opacity = 1 - fadeProgress;
        const distanceUp = -300 * fadeProgress;
        projectName.style.transform = `translateY(${distanceUp}px)`;
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