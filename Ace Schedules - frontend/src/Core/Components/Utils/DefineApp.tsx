import React, { useEffect, useState } from "react";

interface DefineAppProps {
    cssPath: string;
    appTitle: string;
    appIcon: string;
    onReady: () => void;
}

export const defineApp: React.FC<DefineAppProps> = ({ 
    cssPath,
    appTitle,
    appIcon,
    onReady
}) => {
    const [isCssLoaded, setIsCssLoaded] = useState(false);

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        link.onload = () => setIsCssLoaded(true); // Notificar que o CSS foi carregado
        link.onerror = () => console.error(`Failed to load CSS: ${cssPath}`); // Adicionar tratamento de erro

        document.head.appendChild(link);

        document.title = appTitle;

        const mainFavicon = document.getElementById('mainFavicon') as HTMLLinkElement;
        if (mainFavicon) {
            mainFavicon.href = appIcon;
        }

        return () => {
            document.head.removeChild(link);
        };
    }, [cssPath, appTitle, appIcon]);

    useEffect(() => {
        if (isCssLoaded) {
            onReady();
        }
    }, [isCssLoaded, onReady]);

    return null;
};