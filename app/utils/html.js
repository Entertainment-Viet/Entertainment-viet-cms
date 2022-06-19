import React from 'react';
import DOMPurify from "dompurify";
// import ReactHtmlParser from 'react-html-parser';

export default function parserHtml(html) {
    const cleanHTML = DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
    });
    return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}