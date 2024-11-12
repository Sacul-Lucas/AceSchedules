import React, { ReactNode, useEffect, useState, useRef } from "react";
import { PageSpinner } from "./PageSpinner";
import { loadStyle, removeStyle } from "./loadStyles";

interface DefineAppProps {
    cssPath: string;
    appTitle: string;
    appIcon: string;
    children: ReactNode;
}

let animationStyleTag: HTMLStyleElement | null = null;

const disableAnimations = () => {
    animationStyleTag = document.createElement('style');
    animationStyleTag.innerHTML = `
        @keyframes anim-lineUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(0); }
        }
        @keyframes anim-lineDown2 {
            0% { transform: translateY(0); }
            100% { transform: translateY(0); }
        }
        ${localStorage.getItem('isSidebarLocked') === 'true' ? `
        .p-sidebar {
            transition: none !important;
            animation: none !important;
        }
        ` : ''}
    `;
    document.head.appendChild(animationStyleTag);
};

const enableAnimations = () => {
    animationStyleTag = document.createElement('style');
    animationStyleTag.innerHTML = `
        @keyframes anim-lineUp {
            0% { transform: translateY(80%); }
            100% { transform: translateY(0); }
        }
        @keyframes anim-lineDown2 {
            0% { transform: translateY(-15%); }
            100% { transform: translateY(0); }
        }
    `;
    document.head.appendChild(animationStyleTag);
};

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
        const oldCssPath = localStorage.getItem('previousCssPath');

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

                if (!loaded && oldCssPath && oldCssPath !== cssPath) {
                    removeStyle(oldCssPath);
                    enableAnimations();
                }

                await loadStyle(cssPath);

                if (isMounted) {
                    currentCssPathRef.current = cssPath;

                    if (oldCssPath === cssPath) {
                        disableAnimations();
                    }

                    if (!loaded && oldCssPath && oldCssPath !== cssPath || showSpinner) {
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
                localStorage.setItem('previousCssPath', previousCssPath);
            }

            if (!loaded && oldCssPath && oldCssPath !== cssPath) {
                removeStyle(oldCssPath);
                enableAnimations();
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
        <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.65s' }}>
            {loadingError ? (
                <div>Error loading the application.</div>
            ) : loaded && currentCssPathRef ? (
                children
            ) : (
                <PageSpinner isLoading={!loaded} />
            )}
        </div>
    );
};
