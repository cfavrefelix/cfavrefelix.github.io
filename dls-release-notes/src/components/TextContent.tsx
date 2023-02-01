import { FunctionComponent } from "react";
import DOMPurify from "dompurify";

export const TextContent: FunctionComponent<{content: string}> = ({content}) => {
    return <div className="text-content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content, { ADD_ATTR: ['target'] }) }}></div>;
}