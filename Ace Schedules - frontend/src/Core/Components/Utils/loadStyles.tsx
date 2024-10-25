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
        link.onerror = () => reject(new Error(`Failed to load CSS at ${cssPath}`));

        document.head.appendChild(link);
    });
};

export const removeStyle = (cssPath: string) => {
    const link = document.querySelector(`link[href="${cssPath}"]`);
    if (link) {
        document.head.removeChild(link);
    }
};