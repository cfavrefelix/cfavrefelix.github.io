import Typography from "carbon-react/lib/components/typography";
import { FunctionComponent, useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { useLabels } from "../context/Labels.context";

import { ModuleContext } from "../context/Modules.context";

import { AnchorNavigationItem } from './AnchorNavigationItem';


const AnchorNavWrap = styled.nav`
    flex: 1;
    position: relative;
    margin: 0;
`;

const AnchorNavUL = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const AnchorNavLI = styled.li`
    margin: 0;
    padding: 0;
    display: block;
`;


export const AnchorNavigation: FunctionComponent = () => {

    // eslint-disable-next-line
    const [active, setActive] = useState<number>(-1);

    const { modules } = useContext(ModuleContext);

    const t = useLabels();

    const throttle = useRef<boolean>(false);

    const handleScroll = useCallback((_: Event | null) => {
        if (throttle.current) {
            return;
        }

        throttle.current = true;

        const getActive = (): number => {
            for (let index = 0; index < modules.length; index++) {
                const thisModule = modules[index];
                const clientRect = thisModule.ref.current?.getBoundingClientRect();

                // Continue if rect is null
                if (!clientRect) {
                    continue;
                }
                const { top, bottom } = clientRect;
                if (top < document.documentElement.clientHeight && bottom > 60) {
                    return index;
                }
            }

            // No element is in the "active" position, so return -1 so none are active;
            return -1;
        }

        setActive(getActive());

        requestAnimationFrame(() => {
            throttle.current = false;
        });
    }, [modules, setActive, throttle]);

    useEffect(() => {
        handleScroll(null);
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    return <>
        {modules.length > 1 && <AnchorNavWrap>
            <Typography fontSize="14px" mb={1} lineHeight="1.5" fontWeight="600">{t('titles.anchorNav')}</Typography>
            <AnchorNavUL>
                {modules.map((item, index) => <AnchorNavLI key={index}>
                    <AnchorNavigationItem
                        active={active === index}
                        title={item.title}
                        id={item.id}
                        targetRef={item.ref}
                    />
                </AnchorNavLI>)}
            </AnchorNavUL>
        </AnchorNavWrap>}
    </>;
}