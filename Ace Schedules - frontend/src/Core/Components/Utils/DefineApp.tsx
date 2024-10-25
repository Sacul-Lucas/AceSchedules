import React, { ReactNode, useEffect, useState } from "react";
import { loadStyle, removeStyle } from "./loadStyles";
import { PageSpinner } from "./PageSpinner";

interface DefineAppProps {
    cssPath: string;
    appTitle: string;
    appIcon: string;
    isCssEquiv?: boolean;
    children: ReactNode;
}

export const DefineApp: React.FC<DefineAppProps> = ({
    cssPath,
    appTitle,
    appIcon,
    isCssEquiv = false,
    children,
}) => {
    const [loaded, setLoaded] = useState(false);
    const [currentCssPath, setCurrentCssPath] = useState<string | null>(null);
    const [loadingError, setLoadingError] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const loadingDelay = parseInt(localStorage.getItem('loadingDelay')!) || 0;

        const load = async () => {
            if (currentCssPath && currentCssPath !== cssPath) {
                removeStyle(currentCssPath);
            } else if (!loaded && !loadingError && !isCssEquiv) {
                removeStyle(cssPath);
            }

            try {
                setLoadingError(false);
                setLoaded(false);

                if (cssPath !== currentCssPath) {
                    setCurrentCssPath(cssPath);
                    await loadStyle(cssPath);
                }

                if (isMounted) {
                    if (!isCssEquiv && showSpinner) {
                        setTimeout(() => {
                            setLoaded(true);
                        }, loadingDelay);
                    } else {
                        setLoaded(true);
                    }
                }
            } catch (error) {
                console.error(error);
                setLoadingError(true);
                setLoaded(false);
            }
        };

        const referrer = document.referrer;
        const isExternalReferrer = referrer && !referrer.includes(window.location.hostname);
        const isNavigationType = (window.performance.getEntriesByType('navigation')
        [0] as PerformanceNavigationTiming).type === 'navigate';

        if (isExternalReferrer && isNavigationType) {
            setShowSpinner(true);
        } else {
            setShowSpinner(false);
        }

        load();

        return () => {
            isMounted = false;

            if (currentCssPath && !loaded && !loadingError) {
                removeStyle(currentCssPath);
            } else if (!loaded && !loadingError && !isCssEquiv) {
                removeStyle(cssPath);
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
        showSpinner ? <PageSpinner isLoading={!loaded && !loadingError} /> : null
    );
};