import React, { ReactNode, useEffect, useState, useRef } from "react";
import { PageSpinner } from "./PageSpinner";
import { loadStyle, removeStyle } from "./loadStyles";

interface DefineAppProps {
    cssPath: string;
    appTitle: string;
    appIcon: string;
    children: ReactNode;
}

export const DefineApp: React.FC<DefineAppProps> = ({
    cssPath,
    appTitle,
    appIcon,
    children,
}) => {
    const [loaded, setLoaded] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const currentCssPathRef = useRef<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const loadingDelay = parseInt(localStorage.getItem('loadingDelay')!) || 0;

        const referrer = document.referrer;
        const isExternalReferrer = referrer && !referrer.includes(window.location.hostname);
        const isNavigationType = (window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).type === 'navigate';

        if (isExternalReferrer && isNavigationType) {
            setShowSpinner(true);
        } else {
            setShowSpinner(false);
        }

        const load = async () => {
            try {
                setLoadingError(false);
                setLoaded(false);

                const oldCssPath = localStorage.getItem('previousCssPath')

                if (!loaded && oldCssPath && oldCssPath !== cssPath) {
                    removeStyle(oldCssPath);
                }

                await loadStyle(cssPath);

                if (isMounted) {
                    currentCssPathRef.current = cssPath;
                    if (showSpinner || oldCssPath && oldCssPath !== cssPath) {
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

        load();

        return () => {
            isMounted = false;

            const previousCssPath = currentCssPathRef.current;

            if (!loaded && previousCssPath) {
                localStorage.setItem('previousCssPath', previousCssPath)
            }

            const oldCssPath = localStorage.getItem('previousCssPath')

            if (!loaded && oldCssPath && oldCssPath !== cssPath) {
                removeStyle(oldCssPath);
            }
        };
    }, [cssPath, currentCssPathRef]);

    useEffect(() => {
        const handlePopState = () => {
            const oldCssPath = localStorage.getItem('previousCssPath')

            if (!loaded && oldCssPath && oldCssPath !== cssPath) {
                removeStyle(oldCssPath);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [cssPath, currentCssPathRef]);

    useEffect(() => {
        document.title = appTitle;

        const mainFavicon = document.getElementById('mainFavicon') as HTMLLinkElement;
        if (mainFavicon) {
            mainFavicon.href = appIcon;
        }
    }, [appTitle, appIcon]);

    return (
        loaded ? 
            <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.65s' }}>
                {children}
            </div> 
        :
        showSpinner || localStorage.getItem('previousCssPath') !== cssPath ? <PageSpinner isLoading={!loaded && !loadingError} /> : null
    );
};
