const texts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suscipit tellus mauris a diam maecenas sed enim ut. In mollis nunc sed id semper. Leo in vitae turpis massa. Nullam eget felis eget nunc. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Porttitor eget dolor morbi non arcu risus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Cras ornare arcu dui vivamus. Pretium nibh ipsum consequat nisl vel pretium lectus. Leo a diam sollicitudin tempor id eu nisl nunc mi. Risus sed vulputate odio ut. Odio eu feugiat pretium nibh ipsum consequat nisl. Eget egestas purus viverra accumsan in nisl. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Viverra maecenas accumsan lacus vel facilisis volutpat. Vel eros donec ac odio tempor orci dapibus. Ligula ullamcorper malesuada proin libero nunc.Nisl suscipit adipiscing bibendum est ultricies integer quis. Vivamus at augue eget arcu dictum. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Senectus et netus et malesuada fames ac turpis egestas. Lorem mollis aliquam ut porttitor leo. Elit pellentesque habitant morbi tristique senectus et. Scelerisque purus semper eget duis at tellus at. Sit amet commodo nulla facilisi nullam vehicula ipsum a. Et leo duis ut diam quam nulla porttitor massa. Amet consectetur adipiscing elit pellentesque habitant morbi. Vivamus at augue eget arcu dictum varius. Neque viverra justo nec ultrices dui sapien eget mi. Vitae elementum curabitur vitae nunc sed velit. Auctor elit sed vulputate mi sit amet. Massa tempor nec feugiat nisl pretium fusce. Ac feugiat sed lectus vestibulum mattis. Sit amet est placerat in egestas erat imperdiet. Dictum varius duis at consectetur."];
const speed = 10; // Typing speed in milliseconds

async function clearText(speed) {
    const targetElement = document.getElementById("description-text");
    if (!targetElement) {
        console.error("Element with id 'description-text' not found!");
        return;
    }
    const textLength = targetElement.textContent.length;
    for (let i = textLength - 1; i >= 0; i--) {
        targetElement.textContent = targetElement.textContent.slice(0, i);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

async function typeWriter(text, speed) {
    const targetElement = document.getElementById("description-text");
    if (!targetElement) {
        console.error("Element with id 'description-text' not found!");
        return;
    }
    await clearText(speed); // Clear the text
    for (let i = 0; i < text.length; i++) {
        targetElement.textContent += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

async function startTypewriter() {
    for (let i = 0; i < texts.length; i++) {
        await typeWriter(texts[i], speed);
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay before clearing the text
    }
    // Restart the typewriter after completing all texts
    startTypewriter();
}

// Start the typewriter
startTypewriter();


// Redirect to About Us section
document.addEventListener("DOMContentLoaded", function() {
    // Find the About Us link
    const aboutUsLink = document.querySelector("#about-section-link");
    console.log(aboutUsLink); // Log the About Us link to the console
    
    // Check if the About Us link exists
    if (aboutUsLink) {
        // Add click event listener to the About Us link
        aboutUsLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior

            // Get the offset position of the target section
            const aboutUsSection = document.getElementById("about-us-section");
            console.log(aboutUsSection); // Log the About Us section to the console
            
            const offsetTop = aboutUsSection.offsetTop;

            // Scroll to the About Us section smoothly
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        });
    } else {
        console.error("About Us link not found");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var alertElement = document.querySelector('.message');
        if (alertElement) {
            alertElement.classList.remove('show');
            alertElement.classList.add('fade');
        }
    }, 3000);
});