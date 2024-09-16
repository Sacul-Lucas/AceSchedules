import React, { ReactNode, useEffect, useState } from "react";
import { loadStyle, removeStyle } from "./loadStyles";
// import { PageSpinner } from "./PageSpinner";

interface DefineAppProps {
    cssPath: string;
    appTitle: string;
    appIcon: string;
    isCssDiff?: boolean;
    children: ReactNode;
}

export const DefineApp: React.FC<DefineAppProps> = ({
    cssPath,
    appTitle,
    appIcon,
    isCssDiff,
    children,
}) => {
    const [loaded, setLoaded] = useState(false);
    const [currentCssPath, setCurrentCssPath] = useState<string | null>(null);
    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        // const delay = parseInt(localStorage.getItem('delay')!) || 0;

        const load = async () => {
            if (currentCssPath && currentCssPath !== cssPath) {
                removeStyle(currentCssPath);
            } else if (!loaded && !loadingError && !isCssDiff) {
                removeStyle(cssPath)
            }

            try {
                setLoadingError(false);
                setLoaded(false);

                if (cssPath !== currentCssPath) {
                    setCurrentCssPath(cssPath);
                    await loadStyle(cssPath);
                }

                if (isMounted) {
                    setLoaded(true);
                }
            } catch (error) {
                console.error(error);
                setLoadingError(true);
                setLoaded(false);
            }
        };

        load();

        return () => {
            isMounted = false;

            if (currentCssPath && !loaded && !loadingError) {
                removeStyle(currentCssPath);
            } else if (!loaded && !loadingError && !isCssDiff) {
                removeStyle(cssPath)
            }
        };
    }, [cssPath]);

    useEffect(() => {
        document.title = appTitle;

        const mainFavicon = document.getElementById('mainFavicon') as HTMLLinkElement;
        if (mainFavicon) {
            mainFavicon.href = appIcon;
        }
    }, [appTitle, appIcon]);

    return (
        loaded ? 
            <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}>
                {children}
            </div> 
        :
        null
        // <PageSpinner isLoading={!loaded && !loadingError} />
    );
};