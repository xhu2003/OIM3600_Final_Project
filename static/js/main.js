document.addEventListener('DOMContentLoaded', function() {
    const recommendationsContent = document.querySelector('.recommendations-box');
    if (recommendationsContent) {
        const rawText = recommendationsContent.querySelector('.recommendations-content').textContent;
        
        // Parse the sections
        const sections = {
            places: extractSection(rawText, "1.", "2."),
            items: extractSection(rawText, "2.", "3."),
            activities: extractSection(rawText, "3.", null)
        };

        // Update the content
        document.querySelector('.places-content').innerHTML = formatList(sections.places);
        document.querySelector('.items-content').innerHTML = formatList(sections.items);
        document.querySelector('.activities-content').innerHTML = formatList(sections.activities);
    }
});

function extractSection(text, startMarker, endMarker) {
    let start = text.indexOf(startMarker);
    let end = endMarker ? text.indexOf(endMarker) : text.length;
    if (start === -1) return "";
    let section = text.slice(start, end).trim();
    // Remove the number at the start and section headers
    section = section.replace(/^\d+\.\s*(Places to Visit:|What to Bring\/Wear:|Suitable Activities:)\s*/i, '');
    return section;
}

function formatList(text) {
    // Split by newlines and create list items
    const items = text.split('\n')
        .filter(item => item.trim())
        // Convert bullet points to list items
        .map(item => `<li>${item.replace(/^[•\-]\s*/, '')}</li>`)
        .join('');
    return `<ul>${items}</ul>`;
}

function shareRecommendations() {
    try {
        // Get all recommendation items by section
        const sections = document.querySelectorAll('.recommendation-section');
        let shareText = '';
        
        // Get city name (if available)
        const cityElement = document.querySelector('.city-name');
        const city = cityElement ? cityElement.textContent.replace('location_on', '').trim() : 'your city';
        
        // Start building share text
        shareText = `Weather Travel Tips for ${city}\n\n`;

        // Add each section's content
        sections.forEach((section, index) => {
            const heading = section.querySelector('h4').textContent.trim();
            const items = section.querySelectorAll('.recommendation-item');
            
            shareText += `${heading}:\n`;
            items.forEach(item => {
                shareText += `${item.textContent.trim()}\n`;
            });
            shareText += '\n';
        });

        console.log('Share text:', shareText); // Debug log
        
        if (shareText.trim()) {
            fallbackShare(shareText.trim());
        } else {
            showToast('No recommendations to share');
        }
    } catch (error) {
        console.error('Error in shareRecommendations:', error);
        showToast('Unable to share recommendations');
    }
}

function fallbackShare(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '0';
    textarea.style.top = '0';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    try {
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (success) {
            showToast('Recommendations copied to clipboard!');
        } else {
            showToast('Failed to copy recommendations');
        }
    } catch (err) {
        console.error('Failed to copy:', err);
        document.body.removeChild(textarea);
        showToast('Failed to copy recommendations');
    }
}

function showToast(message) {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add toast styles
const style = document.createElement('style');
style.textContent = `
.toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--primary-dark, #3b82f6);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 9999;
}
`;
document.head.appendChild(style);