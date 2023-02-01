import DOMPurify from 'dompurify';

DOMPurify.addHook('afterSanitizeAttributes', (node: Element) => {
    // set all elements owning target to target=_blank
    if (node.hasAttribute('target')) {
        const rel = node.getAttribute('rel');
        if (!rel) {
            node.setAttribute('rel', 'noopener');
        } else if (!rel.includes('noopener')) {
            node.setAttribute('rel', `${rel} noopener`);
        }
    }
});
