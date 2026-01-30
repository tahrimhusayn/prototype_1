// js/main.js
async function loadLayout() {
    try {
        const headerRes = await fetch('components/header.html');
        const headerHtml = await headerRes.text();
        document.getElementById('header-placeholder').innerHTML = headerHtml;

        const footerRes = await fetch('components/footer.html');
        const footerHtml = await footerRes.text();
        document.getElementById('footer-placeholder').innerHTML = footerHtml;
    } catch (error) {
        console.error("Error loading layout components:", error);
    }
}

// Run the function
loadLayout();


