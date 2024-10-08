export const loadStyle = (cssPath: string) => {
    return new Promise<void>((resolve, reject) => {
        const existingLink = document.querySelector(`link[href="${cssPath}"]`);
        if (existingLink) {
            resolve();
            return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;

        link.onload = () => resolve();
        link.onerror = () => {
            removeStyle(cssPath);
            reject(new Error(`Failed to load CSS at ${cssPath}`));
        };

        document.head.appendChild(link);
    });
};

export const removeStyle = (cssPath: string) => {
    // Remove the <link> element that references the CSS
    const link = document.querySelector(`link[href="${cssPath}"]`);
    if (link) {
        document.head.removeChild(link);
    }

    // Remove <style> elements that may be related to the CSS
    const styleElements = document.querySelectorAll('style');
    styleElements.forEach((style) => {
        const viteDevId = style.getAttribute('data-vite-dev-id');
        // Check if the style has a vite dev id and it includes part of the cssPath
        if (viteDevId && viteDevId.includes(cssPath.substring(cssPath.lastIndexOf('/') + 1))) {
            document.head.removeChild(style);
        }
    });
};

