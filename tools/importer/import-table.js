/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console, class-methods-use-this */


const createMetadata = (main, document) => {
    const meta = {};
  
    const title = document.querySelector('title');
    if (title) {
      meta.Title = title.textContent.replace(/[\n\t]/gm, '');
    }
  
    const desc = document.querySelector('[property="og:description"]');
    if (desc) {
      meta.Description = desc.content;
    }
    const type = document.querySelector('[property="og:type"]');
    if (type) {
      meta.Type = type.content;
    }
    const url = document.querySelector('[property="og:url"]');
    console.dir("URL +++++++++" + url);
    if (url) {
        const e2 = document.createElement('a');
      e2.href = url.content;
      meta.URL = e2;
    }
    const img = document.querySelector('[property="og:image"]');
    if (img && img.content) {
      const el = document.createElement('img');
      el.src = img.content;
      meta.Image = el;
    }
    meta.CreatedBy = "Saroj Mishra"
    meta.INFO = "Could put required generic META properties in to a config file and loop th the input param to generate the meta table"
    const block = WebImporter.Blocks.getMetadataBlock(document, meta);
    main.append(block);
  
    return meta;
  };
  
  
const createCardTable = (main, document) => {
  const meta = {};
  const el = document.createElement('img');
  el.src = 'https://placehold.jp/250x250.png';
  /* const img = document.querySelector('[property="og:image"]');
    if (img && img.content) {
      el.src = img.content; */
  const cells = [
    ['Card'],
    [el],
    ['The Hello World block ']
    
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  main.append(table);
  
}
  export default {
    /**
     * Apply DOM operations to the provided document and return
     * the root element to be then transformed to Markdown.
     * @param {HTMLDocument} document The document
     * @param {string} url The url of the page imported
     * @param {string} html The raw html (the document is cleaned up during preprocessing)
     * @param {object} params Object containing some parameters given by the import process.
     * @returns {HTMLElement} The root element to be transformed
     */
    transformDOM: ({
      // eslint-disable-next-line no-unused-vars
      document, url, html, params,
    }) => {
      // define the main element: the one that will be transformed to Markdown
      const main = document.body;
      console.log("Main" + document.HTMLElement);  
      // use helper method to remove header, footer, etc.
      WebImporter.DOMUtils.remove(main, [
        'header',
        'footer',
        '.elementor-widget-image',
      ]);
  

      const elements = document.querySelectorAll('.elementor-widget-wrap.elementor-element-populated');
      console.log("no of elem..." + elements.length);

      // create the metadata block and append it to the main element
      createMetadata(main, document);
        
      // create the metadata block and append it to the main element
      createCardTable(main, document);
      return main;
    },
  
    /**
     * Return a path that describes the document being transformed (file name, nesting...).
     * The path is then used to create the corresponding Word document.
     * @param {HTMLDocument} document The document
     * @param {string} url The url of the page imported
     * @param {string} html The raw html (the document is cleaned up during preprocessing)
     * @param {object} params Object containing some parameters given by the import process.
     * @return {string} The path
     */
    generateDocumentPath: ({
      // eslint-disable-next-line no-unused-vars
      document, url, html, params,
    }) => WebImporter.FileUtils.sanitizePath(new URL(url).pathname.replace(/\.html$/, '').replace(/\/$/, '')),
  };