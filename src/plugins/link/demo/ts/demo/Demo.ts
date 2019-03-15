/**
 * Demo.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

declare let tinymce: any;

tinymce.init({
  selector: 'textarea.tinymce',
  theme: 'modern',
  skin_url: '../../../../../js/tinymce/skins/lightgray',
  plugins: 'link code',
  toolbar: 'link code',
  content_css : '/css/link_unpublished.css',
  link_data_list: [
    { modulo: 'ata_da_sessao', type: 'checkbox', name: 'published', title: 'Público', classes: 'published' }
  ],
  height: 600
});

export {};
