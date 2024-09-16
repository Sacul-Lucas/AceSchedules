import { useState, useEffect, useRef } from 'react';
import loading from '../../../assets/icons/pageSpinner.svg';
import { loadStyle, removeStyle } from './loadStyles';

interface PageSpinnerProps {
    isLoading: boolean;
}

export const PageSpinner: React.FC<PageSpinnerProps> = ({ 
    isLoading
}) => {
    const [animationDuration, setAnimationDuration] = useState('');
    const startTimeRef = useRef<number>(0);
    let delay: number = 0;
    const cssPath = 'src/Core/Css/Owned/Spinner.css'
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const existingLink = document.querySelector(`link[href="${cssPath}"]`);

        if (existingLink) {
            setLoaded(true);
        }
  
        const load = async () => {
            try {
                if (existingLink) {
                    setLoaded(true);
                    return;
                }
                await loadStyle(cssPath);

                if (isMounted) setLoaded(true);
            }   catch (error) {
                console.error(error);
                setLoaded(false);
            }
        };
  
        load();
        
        return () => {
            isMounted = false;
            removeStyle(cssPath);
        };
    }, [cssPath]);

    useEffect(() => {
        startTimeRef.current = Date.now();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const endTime = Date.now();
            const duration = (endTime - startTimeRef.current) / 1000;
            if (duration <= 1) {
                delay = 495;
                localStorage.setItem('delay', delay.toString());
                setAnimationDuration('.5s');
            } else {
                delay = endTime - startTimeRef.current;
                localStorage.setItem('delay', delay.toString());
                setAnimationDuration(`${duration}s`);
            }
        }
    }, [isLoading]);

    return (

        loaded ? (
            <div className='relative w-full h-full'>
                <div className="fixed flex items-center justify-center w-full h-full align-middle load-container">
                    <img className='w-[6dvw] h-auto loader' src={loading} alt="loading"/>
                </div>
                <div className="fixed flex items-center justify-center w-full h-full align-middle top-[15%] load-title">
                    <h1
                        data-text="Carregando..."
                        className="relative h1-before-animation"
                        style={{ 
                            '--animation-duration': animationDuration as React.CSSProperties['animation']
                        } as React.CSSProperties}
                    >
                        Carregando...
                    </h1>
                </div>
            </div>
        ) : (
            null
        )

    );
};

