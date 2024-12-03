console.log("JavaScript loaded!");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");
    
    const recommendationsBox = document.querySelector('.recommendations-box');
    if (recommendationsBox) {
        console.log("Found recommendations box");
        const rawText = recommendationsBox.querySelector('.recommendations-content').textContent;
        console.log("Raw text:", rawText);
        
        // Parse the sections
        const sections = {
            places: extractSection(rawText, "1.", "2."),
            items: extractSection(rawText, "2.", "3."),
            activities: extractSection(rawText, "3.", null)
        };
        
        console.log("Parsed sections:", sections);

        // Update the content
        const placesContent = document.querySelector('.places-content');
        const itemsContent = document.querySelector('.items-content');
        const activitiesContent = document.querySelector('.activities-content');
        
        if (placesContent) placesContent.innerHTML = formatList(sections.places);
        if (itemsContent) itemsContent.innerHTML = formatList(sections.items);
        if (activitiesContent) activitiesContent.innerHTML = formatList(sections.activities);
    }
});


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
    // Remove the number at the start and "Places to Visit:", "What to Bring/Wear:", or "Suitable Activities:"
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

// Share functionality
function shareRecommendations() {
    // Get the content to share
    const city = document.querySelector('.city-name').textContent.trim();
    const places = document.querySelector('.places-content').textContent.trim();
    const items = document.querySelector('.items-content').textContent.trim();
    const activities = document.querySelector('.activities-content').textContent.trim();

    const shareText = `
Weather Travel Tips for ${city}

Places to Visit:
${places}

What to Bring:
${items}

Activities:
${activities}
    `.trim();

    // Try to use the Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: `Travel Tips for ${city}`,
            text: shareText
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

function fallbackShare(text) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  // Make it invisible
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    try {
        document.execCommand('copy');
        showToast('Recommendations copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
        showToast('Failed to copy recommendations');
    }
    
    document.body.removeChild(textarea);
}

function showToast(message) {
    // Create and show a toast notification
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Remove the toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

