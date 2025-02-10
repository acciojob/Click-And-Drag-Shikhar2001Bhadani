document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.querySelector(".items");
    const items = document.querySelectorAll(".item");
    let selectedItem = null;
    let offsetX, offsetY;
    let containerRect = itemsContainer.getBoundingClientRect();
    
    items.forEach(item => {
        item.addEventListener("mousedown", (event) => {
            selectedItem = event.target;
            let rect = selectedItem.getBoundingClientRect();
            offsetX = event.clientX - rect.left;
            offsetY = event.clientY - rect.top;
            selectedItem.style.position = "absolute";
            selectedItem.style.zIndex = "1000";
            document.body.style.cursor = "grabbing";
        });
    });
    
    document.addEventListener("mousemove", (event) => {
        if (!selectedItem) return;
        
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;
        
        let maxX = containerRect.right - selectedItem.offsetWidth;
        let maxY = containerRect.bottom - selectedItem.offsetHeight;
        
        if (x < containerRect.left) x = containerRect.left;
        if (y < containerRect.top) y = containerRect.top;
        if (x > maxX) x = maxX;
        if (y > maxY) y = maxY;
        
        selectedItem.style.left = `${x}px`;
        selectedItem.style.top = `${y}px`;
    });
    
    document.addEventListener("mouseup", () => {
        if (selectedItem) {
            selectedItem.style.zIndex = "1";
            selectedItem = null;
            document.body.style.cursor = "default";
        }
    });
    
    itemsContainer.addEventListener("mousedown", (event) => {
        event.preventDefault();
    });
});