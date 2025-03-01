// portfolio.js - JavaScript for the portfolio page

document.addEventListener('DOMContentLoaded', function() {
    // Facebook iframe responsiveness and loading
    function setupFacebookEmbeds() {
        const embeds = document.querySelectorAll('.fb-embed-container iframe');
        
        embeds.forEach(iframe => {
            // Force iframe reload to ensure content displays
            const originalSrc = iframe.getAttribute('src');
            
            // Set a loading state
            const container = iframe.parentElement;
            container.classList.add('loading');
            
            // Add loading indicator
            const loader = document.createElement('div');
            loader.className = 'embed-loader';
            container.appendChild(loader);
            
            // Reload iframe
            setTimeout(() => {
                iframe.setAttribute('src', originalSrc);
                
                iframe.onload = function() {
                    container.classList.remove('loading');
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                    
                    // Resize after successful load
                    resizeEmbed(iframe);
                };
            }, 100);
        });
    }
    
    function resizeEmbed(iframe) {
        const container = iframe.parentElement;
        const containerWidth = container.clientWidth;
        
        // Calculate proportional height (original ratio)
        const originalWidth = parseInt(iframe.getAttribute('width'));
        const originalHeight = parseInt(iframe.getAttribute('height'));
        const ratio = originalHeight / originalWidth;
        
        // Set iframe width to 100% of container
        iframe.style.width = containerWidth + 'px';
        // Set height proportionally
        iframe.style.height = (containerWidth * ratio) + 'px';
    }
    
    function resizeAllEmbeds() {
        const embeds = document.querySelectorAll('.fb-embed-container iframe');
        embeds.forEach(iframe => {
            resizeEmbed(iframe);
        });
    }
    // Get all portfolio tabs and content sections
    const tabs = document.querySelectorAll('.portfolio-tabs a');
    const categories = document.querySelectorAll('.portfolio-category');
    
    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the category to show
            const categoryToShow = this.getAttribute('data-category');
            
            // Hide all categories
            categories.forEach(category => {
                category.classList.remove('active');
            });
            
            // Show the selected category
            const activeCategory = document.getElementById(categoryToShow);
            activeCategory.classList.add('active');
            
            // If social media tab is clicked, ensure embeds are loaded properly
            if (categoryToShow === 'social') {
                setupFacebookEmbeds();
            }
            
            // Update URL hash
            window.location.hash = categoryToShow;
        });
    });
    
    // Check for hash in URL on page load
    if (window.location.hash) {
        const categoryFromHash = window.location.hash.substring(1);
        const tabToActivate = document.querySelector(`.portfolio-tabs a[data-category="${categoryFromHash}"]`);
        
        if (tabToActivate) {
            tabToActivate.click();
        }
    } else {
        // If we're on the portfolio page, initialize the active tab (default is videos)
        const activeTab = document.querySelector('.portfolio-tabs a.active');
        if (activeTab) {
            const activeCategory = activeTab.getAttribute('data-category');
            if (activeCategory === 'social') {
                setupFacebookEmbeds();
            }
        }
    }
    
    // Initialize embed responsiveness
    window.addEventListener('resize', resizeAllEmbeds);
    
    // Initial setup with delay to ensure page has loaded
    setTimeout(() => {
        setupFacebookEmbeds();
        
        // Add smooth reveal animations
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('reveal');
            }, 100 * index);
        });
    }, 300);
});