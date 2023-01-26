import { FunctionComponent, useContext, useEffect, useState } from "react";
import Loader from "carbon-react/lib/components/loader";

import styled from 'styled-components';

import { AppContext } from "../context/AppContext";

const LoaderWrap = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

export const LoadingIndicator: FunctionComponent = () => {
    const [show, setShow] = useState(false);

    const { state } = useContext(AppContext);

    useEffect(() => {
        setShow(state.loading);
    }, [state.loading, setShow])

    if (show) {
        return <LoaderWrap><Loader size='large' /></LoaderWrap>;
    }

    return null;
}