import React, { ReactNode, useEffect, useState, useRef } from "react";
import { PageSpinner } from "./PageSpinner";
import { removeStyle } from "./loadStyles";

interface DefineAppProps {
    cssPath: string;
    appTitle: string;
    appIcon: string;
    isCssEquiv?: boolean;
    children: ReactNode;
}

const isEquivalentCss = (cssPath1: string, cssPath2: string): boolean => {
    return cssPath1 === cssPath2;
};

const getCurrentCssPath = (cssPath: string): string | null => {
    const styleElements = document.querySelectorAll("style[data-vite-dev-id]");

    for (const styleElement of styleElements) {
        const devId = styleElement.getAttribute("data-vite-dev-id") || '';
        if (devId.includes(cssPath.substring(6))) {
            return cssPath;
        }
    }
    
    return null;
};

export const DefineApp: React.FC<DefineAppProps> = ({
    cssPath,
    appTitle,
    appIcon,
    isCssEquiv = false,
    children,
}) => {
    const [loaded, setLoaded] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const currentCssPathRef = useRef<string | null>(null); // Ref to store current CSS path

    useEffect(() => {
        let isMounted = true;
        const loadingDelay = parseInt(localStorage.getItem('loadingDelay')!) || 0;

        const load = async () => {
            try {
                setLoadingError(false);
                setLoaded(false);

                if (currentCssPathRef.current) {
                    if (!isEquivalentCss(currentCssPathRef.current, cssPath)) {
                        removeStyle(currentCssPathRef.current);
                    }
                }

                await import(`${cssPath}`);

                if (isMounted) {
                    currentCssPathRef.current = cssPath;
                    if (showSpinner) {
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
        const isNavigationType = (window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).type === 'navigate';

        if (isExternalReferrer && isNavigationType) {
            setShowSpinner(true);
        } else {
            setShowSpinner(false);
        }

        load();

        return () => {
            isMounted = false;

            const previousCssPath = currentCssPathRef.current;

            if (previousCssPath && !isEquivalentCss(previousCssPath, cssPath)) {
                console.log(previousCssPath)
                removeStyle(previousCssPath);
            }
        };
    }, [cssPath]);

    useEffect(() => {
        const handlePopState = () => {
            const previousCssPath = currentCssPathRef.current;
            if (previousCssPath && !isEquivalentCss(previousCssPath, cssPath)) {
                removeStyle(previousCssPath);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
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
