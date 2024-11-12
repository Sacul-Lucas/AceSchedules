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
    if (typeof cssPath !== 'string') {
        console.error('cssPath deve ser uma string:', cssPath);
        return;
    }

    const link = document.querySelector(`link[href="${cssPath}"]`);
    if (link) {
        document.head.removeChild(link);
    }
};