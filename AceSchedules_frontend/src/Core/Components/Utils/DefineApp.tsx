import React, { ReactNode, useEffect } from "react";

interface DefineAppProps {
    appTitle: string;
    appIcon: string;
    bodyStyle?: string;
    children: ReactNode;
}

export const DefineApp: React.FC<DefineAppProps> = ({
    appTitle,
    appIcon,
    bodyStyle,
    children,
}) => {
    useEffect(() => {
        document.title = appTitle;

        const mainFavicon = document.getElementById('mainFavicon') as HTMLLinkElement;
        if (mainFavicon) {
            mainFavicon.href = appIcon;
        }
    }, [appTitle, appIcon]);

    return (
        <div className={bodyStyle}>
            {children}
        </div>
    );
};
