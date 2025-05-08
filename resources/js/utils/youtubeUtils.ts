/**
 * Utility functions for handling YouTube videos in HTML content
 */

/**
 * Transform YouTube iframes in HTML content to make them responsive and properly sized
 * @param {string} htmlContent - The HTML content containing YouTube iframes
 * @returns {string} - The transformed HTML content
 */
export const transformYoutubeIframes = (htmlContent: string): string => {
    if (!htmlContent) return '';

    // Regular expression to find YouTube iframes
    const iframeRegex = /<iframe([\s\S]*?)src="([\s\S]*?youtube[\s\S]*?)"([\s\S]*?)><\/iframe>/gi;

    // Replace each iframe with a wrapped version
    return htmlContent.replace(iframeRegex, (match, before, src, after) => {
        return `<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 2rem 0;">
                  <iframe src="${src}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" width="640" height="360" frameborder="0" allowfullscreen></iframe>
                </div>`;
    });
};

/**
 * Process YouTube iframes in the DOM to make them responsive and properly sized
 * @param {string} containerSelector - CSS selector for the container element
 */
export const processYoutubeIframes = (containerSelector: string): void => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const iframes = container.querySelectorAll('iframe');
    if (iframes.length === 0) return;

    iframes.forEach(iframe => {
        // Only process YouTube iframes
        const src = iframe.getAttribute('src');
        if (!src || !src.includes('youtube')) return;

        // Skip already processed iframes
        if (iframe.hasAttribute('data-youtube-processed')) return;

        // Mark as processed to avoid double-processing
        iframe.setAttribute('data-youtube-processed', 'true');

        // Create responsive wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'video-container';
        wrapper.style.position = 'relative';
        wrapper.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
        wrapper.style.height = '0';
        wrapper.style.overflow = 'hidden';
        wrapper.style.maxWidth = '100%';
        wrapper.style.marginBottom = '2rem';
        wrapper.style.marginTop = '2rem';

        // Style the iframe with explicit dimensions
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.width = '640';  // Set explicit width
        iframe.height = '360'; // Set explicit height (16:9 ratio)

        // Replace the iframe with the wrapped version
        if (iframe.parentNode) {
            iframe.parentNode.insertBefore(wrapper, iframe);
            wrapper.appendChild(iframe);
        }
    });
};

/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param {string} url - The YouTube URL
 * @returns {string|null} - The video ID or null if not found
 */
export const extractYoutubeVideoId = (url: string): string | null => {
    if (!url) return null;

    // Match patterns like youtube.com/watch?v=VIDEO_ID or youtu.be/VIDEO_ID
    const patterns = [
        /youtube\.com\/watch\?v=([^&]+)/,
        /youtu\.be\/([^?&]+)/,
        /youtube\.com\/embed\/([^?&]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
};

/**
 * Generate a YouTube embed URL from a video ID
 * @param {string} videoId - The YouTube video ID
 * @returns {string} - The embed URL
 */
export const generateYoutubeEmbedUrl = (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}`;
};

/**
 * Generate a responsive YouTube iframe HTML from a video URL
 * @param {string} url - The YouTube URL
 * @returns {string} - HTML for a responsive YouTube iframe
 */
export const generateYoutubeIframe = (url: string): string => {
    const videoId = extractYoutubeVideoId(url);
    if (!videoId) return '';

    const embedUrl = generateYoutubeEmbedUrl(videoId);

    return `<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 2rem 0;">
                <iframe src="${embedUrl}" width="640" height="360" frameborder="0" allowfullscreen="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
            </div>`;
};
