document.addEventListener("DOMContentLoaded", function() {

    const chessLink = document.querySelector("#chess-link");
    console.log(chessLink);

    if (chessLink) {
        
        chessLink.addEventListener("click", function(event) {
            event.preventDefault(); 

            const chessSection = document.getElementById("chess-section");
            console.log(chessSection);
            
            const offsetTop = chessSection.offsetTop;

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        });
    } else {
        console.error("Chess link not found");
    }
});

document.addEventListener("DOMContentLoaded", function() {

    const archeryLink = document.querySelector("#archery-link");
    console.log(archeryLink);

    if (archeryLink) {
        
        archeryLink.addEventListener("click", function(event) {
            event.preventDefault(); 

            const archerySection = document.getElementById("archery-section");
            console.log(archerySection);
            
            const offsetTop = archerySection.offsetTop;

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        });
    } else {
        console.error("Chess link not found");
    }
});