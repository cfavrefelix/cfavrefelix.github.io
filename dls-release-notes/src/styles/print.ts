import styled from "styled-components";

export const HideOnPrint = styled.div`
    @media print {
        display: none!important;
    }
`;