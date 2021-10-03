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
          const element = document.createElement('outline');
          let outline = '<outline ';
          if (feed.text)
            outline += `text="${feed.text.replace(/"/gi, '&quot;')}" `;
          if (feed.xmlUrl)
            outline += `xmlUrl="${feed.xmlUrl.replace(/"/gi, '&quot;')}" `;
          if (feed.type)
            outline += `type="${feed.type.replace(/"/gi, '&quot;')}" `;
          if (feed.description)
            outline += `description="${feed.description.replace(
              /"/gi,
              '&quot;'
            )}" `;
          if (feed.htmlUrl)
            outline += `htmlUrl="${feed.htmlUrl.replace(/"/gi, '&quot;')}" `;
          if (feed.language)
            outline += `language="${feed.language.replace(/"/gi, '&quot;')}" `;
          if (feed.title)
            outline += `title="${feed.title.replace(/"/gi, '&quot;')}" `;
          if (feed.version)
            outline += `version="${feed.version.replace(/"/gi, '&quot;')}" `;

          acc += `${outline}/>\n`;
          return acc;
        }, '')}
      </body>
    </opml>
  `;

  return xmlFormat(xmlString);
}
