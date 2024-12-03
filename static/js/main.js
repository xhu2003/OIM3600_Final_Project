document.addEventListener('DOMContentLoaded', function() {
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            try {
                // Get city name and weather info
                const city = document.querySelector('.city-name').textContent.trim();
                const temp = document.querySelector('.weather-item:first-child .value').textContent;
                const condition = document.querySelector('.weather-item:nth-child(2) .value').textContent;

                let shareContent = `Weather Travel Tips for ${city}\n`;
                shareContent += `Weather: ${temp}, ${condition}\n\n`;

                // Get recommendations from each section
                const sections = document.querySelectorAll('.recommendation-section');
                
                sections.forEach(section => {
                    if (section) {
                        const title = section.querySelector('h4')?.textContent?.trim() || '';
                        const items = Array.from(section.querySelectorAll('.recommendation-item'))
                            .map(item => item.textContent.trim())
                            .filter(text => text)
                            .join('\n');

                        if (title && items) {
                            shareContent += `${title}:\n${items}\n\n`;
                        }
                    }
                });

                if (shareContent.trim()) {
                    fallbackShare(shareContent.trim());
                } else {
                    showToast('No recommendations to share');
                }
            } catch (error) {
                console.error('Error sharing recommendations:', error);
                showToast('Unable to share recommendations');
            }
        });
    }
});

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

// Add toast styling
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