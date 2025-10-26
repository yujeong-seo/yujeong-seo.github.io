/* 
Project Detail Page
Handles the hero background scroll animation
*/

export function initProjectDetail() {
    const bgImg = document.getElementById("background-img");
    const projectName = document.getElementById("project-name");
    
    if (!bgImg || !projectName) return;
    
    function handleProjectScroll() {
        const scrollY = window.scrollY;
        const winHeight = window.innerHeight;
        
        // Background Image Animation
        let bgProgress = Math.min(1, Math.max(0, scrollY / winHeight));
        bgImg.style.opacity = 1 - bgProgress;
        
        // Project Name Animation 
        const fadeStart = winHeight * 0.10;
        const fadeEnd = winHeight * 0.90;
        const fadeRange = fadeEnd - fadeStart;
        let nameProgress = Math.min(1, Math.max(0, (scrollY - fadeStart) / fadeRange));
        
        projectName.style.opacity = 1 - nameProgress;
        const distanceUp = -200 * nameProgress;
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