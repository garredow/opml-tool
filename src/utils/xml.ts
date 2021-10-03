import xmlFormat from 'xml-formatter';
import { OpmlFile } from '../models';

// function createElement(tagName: string, textContent: string) {
//   const element = document.createElement(tagName);
//   element.textContent = textContent;
//   return element;
// }

// export function convertFileToXMLDocument(file: OpmlFile): Document {
//   console.log('file', file);

//   const parser = new DOMParser();
//   const doc = parser.parseFromString(
//     `<?xml version="1.0" encoding="ISO-8859-1"?><opml version="2.0"><head></head><body></body></opml>`,
//     'application/xml'
//   );

//   const head = doc.querySelector('head');
//   if (file.title) head?.appendChild(createElement('title', file.title));
//   if (file.ownerName)
//     head?.appendChild(createElement('ownerName', file.ownerName));
//   if (file.ownerEmail)
//     head?.appendChild(createElement('ownerEmail', file.ownerEmail));
//   if (file.dateCreated)
//     head?.appendChild(createElement('dateCreated', file.dateCreated));
//   if (file.dateModified)
//     head?.appendChild(createElement('dateModified', file.dateModified));

//   const body = doc.querySelector('body');
//   file.feeds.forEach((feed) => {
//     const element = document.createElement('outline');
//     element.setAttribute('text', feed.text);
//     element.setAttribute('xmlUrl', feed.xmlUrl);
//     if (feed.type) element.setAttribute('type', feed.type);
//     if (feed.description) element.setAttribute('description', feed.description);
//     if (feed.htmlUrl) element.setAttribute('htmlUrl', feed.htmlUrl);
//     if (feed.language) element.setAttribute('language', feed.language);
//     if (feed.title) element.setAttribute('title', feed.title);
//     if (feed.version) element.setAttribute('version', feed.version);

//     body?.appendChild(element);
//   });

//   console.log('doc', doc);
//   return doc;
// }

function encodeString(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function convertFileToXMLString(file: OpmlFile): string {
  const xmlString = `
    <?xml version="1.0" encoding="ISO-8859-1"?>
    <opml version="2.0">
      <head>
        ${file.title ? `<title>${file.title}</title>` : ''}  
        ${file.ownerName ? `<ownerName>${file.ownerName}</ownerName>` : ''}
        ${file.ownerEmail ? `<ownerEmail>${file.ownerEmail}</ownerEmail>` : ''}
        ${
          file.dateCreated
            ? `<dateCreated>${file.dateCreated}</dateCreated>`
            : ''
        }
        ${
          file.dateModified
            ? `<dateModified>${file.dateModified}</dateModified>`
            : ''
        }
      </head>
      <body>
        ${file.feeds.reduce((acc, feed) => {
          let outline = '<outline ';
          if (feed.text) outline += `text="${encodeString(feed.text)}" `;
          if (feed.xmlUrl) outline += `xmlUrl="${encodeString(feed.xmlUrl)}" `;
          if (feed.type) outline += `type="${encodeString(feed.type)}" `;
          if (feed.description)
            outline += `description="${encodeString(feed.description)}" `;
          if (feed.htmlUrl)
            outline += `htmlUrl="${encodeString(feed.htmlUrl)}" `;
          if (feed.language)
            outline += `language="${encodeString(feed.language)}" `;
          if (feed.title) outline += `title="${encodeString(feed.title)}" `;
          if (feed.version)
            outline += `version="${encodeString(feed.version)}" `;

          acc += `${outline}/>\n`;
          return acc;
        }, '')}
      </body>
    </opml>
  `;

  return xmlFormat(xmlString);
}
