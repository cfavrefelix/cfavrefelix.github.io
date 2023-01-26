import { createContext, FunctionComponent, useState, useEffect, useCallback } from "react";

interface Context {
    isOpen: boolean,
    open: (ele?: HTMLElement) => void,
    close: () => void,
}

export const SidebarContext = createContext<Context>({
    isOpen: false,
    open: () => { },
    close: () => { }
});

export const SidebarContextProvider: FunctionComponent = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [exitEle, setExitEle] = useState<HTMLElement | null>(null);

    const open = (ele?: HTMLElement) => {
        setIsOpen(true)
        if (ele) {
            setExitEle(ele)
        }
    };

    const close = useCallback(
        () => {
            setIsOpen(false)
            if (exitEle) {
                requestAnimationFrame(() => {
                    exitEle.focus({ preventScroll: true });
                })
            }
        },
        [exitEle, setIsOpen],
    );

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const handler = (ev: KeyboardEvent) => {
            if (ev.key === 'Escape') {
                close();
            }
        }
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
        }
    }, [isOpen, close])

    return <SidebarContext.Provider value={{
        isOpen, open, close
    }}>
        {children}
    </SidebarContext.Provider>
}