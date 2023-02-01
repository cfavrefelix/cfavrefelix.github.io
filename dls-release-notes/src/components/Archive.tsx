import { FunctionComponent } from "react";
import styled from "styled-components";

const ArchiveWrap = styled.div`
    margin: var(--header-height, 3rem) 0;
    text-align: center;
`;

export const Archive:FunctionComponent = () => {
    return <ArchiveWrap>
        <h1>Archive</h1>
    </ArchiveWrap>;
}

export default Archive;