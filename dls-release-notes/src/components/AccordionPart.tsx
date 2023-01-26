import { FunctionComponent } from "react";
import DOMPurify from "dompurify";
import { Accordion } from "carbon-react/lib/components/accordion"
import styled from 'styled-components';

const AccordionContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    >:last-child{
        margin-bottom: 0;
    }
`;

export const AccordionPart: FunctionComponent<{ title: string, content: string }> = ({ title, content }) => {
    return <Accordion
        size="small"
        iconAlign="left"
        title={title}
    >
        <AccordionContent
            className="text-content"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { ADD_ATTR: ['target'] }) }}
        />
    </Accordion>;
}