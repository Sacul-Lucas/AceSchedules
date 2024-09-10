import { useEffect } from "react";

interface defineAppProps {
    cssPath: string,
    appTitle: string,
    appIcon: string,
}

export const defineApp: React.FC<defineAppProps> = ({ 
    cssPath,
    appTitle,
    appIcon
}) => {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);

        document.title = appTitle;
        const mainFavicon = document.getElementById('mainFavicon') as HTMLLinkElement;
        if (mainFavicon) {
            mainFavicon.href = appIcon;
        }

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <div hidden></div>
    )
}