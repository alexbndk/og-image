import { ParsedRequest } from './types';
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Hellix-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Hellix-Bold.woff2`).toString('base64');
const aurora = readFileSync(`${__dirname}/../_images/aurora.png`).toString('base64');
const logo = readFileSync(`${__dirname}/../_images/logo.png`).toString('base64');

function getCss() {
    return `
    @font-face {
        font-family: 'Hellix';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Hellix';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
        background: #041417 url(data:image/png;charset=utf-8;base64,${aurora}) no-repeat 150% 75%;
        background-size: 60%;
        height: 100vh;
        padding: 100px;
    }
    
    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        margin-top: 75px;
        width: 75%;
        font-family: 'Hellix', sans-serif;
        font-size: 120px;
        font-style: normal;
        font-weight: bold;
        color: #fff;
        line-height: 1.1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }
    
    .subtitle {
        margin-top: 50px;
        width: 60%;
        font-family: 'Hellix', sans-serif;
        font-size: 65px;
        font-style: normal;
        color: #fff9;
        line-height: 1.33;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, subtitle } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div>
            <img src="data:image/png;charset=utf-8;base64,${logo}" alt="Aurora" />
            <div class="heading">${emojify(sanitizeHtml(text))}</div>
            <div class="subtitle">${emojify(sanitizeHtml(subtitle))}</div>
        </div>
    </body>
</html>`;
}
