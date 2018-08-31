/**
 * p5.pdf - Simple PDF module for p5.js using p5.svg and browser's print API
 * Copyright (c) 2015 Zeno Zeng<zenoofzeng@gmail.com>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

 (function (root, factory) {
     if (typeof define === 'function' && define.amd) {
         define('p5.pdf', ['p5', 'p5.svg'], function (p5) {
             factory(p5);
         });
     }
     else if (typeof exports === 'object') {
         module.exports = factory;
     }
     else {
         factory(root['p5']);
     }
 }(this, function (p5) {

    "use strict";

     /**
      * Print given elements using iframe
      *
      * @private
      * @param {String} filename
      * @param {Array} elements Array of Elements
      * @param {Array} styles Array of style string
      */
     var print = function(filename, elements, styles) {
         var iframe = document.createElement("iframe");
         iframe.height = 0;
         iframe.width = 0;
         document.body.appendChild(iframe);
         var doc = iframe.contentDocument || iframe.contentWindow.documen;
         var win = iframe.contentWindow;

         var style = doc.createElement('style');
         styles = styles.join('\n');
         style.innerHTML = styles;
         doc.head.appendChild(style);

         elements.forEach(function(el) {
             doc.body.appendChild(el);
         });
         win.focus(); // required for IE

         // change the filename for print
         var _title = document.title;
         document.title = filename;
         doc.title = filename;

         win.print(); // note that window.print might be overridden by p5.js

         document.title = _title;
         iframe.remove();
     };

    /**
     * Create a new p5.PDF instance.
     *
     * @class p5.PDF
     * @return {p5.PDF} a p5.PDF instance
     */
     function PDF(p5Instance) {
         this.elements = [];
         this.width = p5Instance.width;
         this.height = p5Instance.height;
         this.p5Instance = p5Instance;
     }

     /**
      * Will return a clone of current SVG element
      */
     PDF.prototype.__snapshot = function() {
         var renderer = this.p5Instance._renderer || this.p5Instance._graphics;
         var elt = renderer.isSVG ? renderer.svg : renderer.elt;
         var snapshot = elt.cloneNode(true);
         if (elt.nodeName.toLowerCase() === 'canvas') {
             // for canvas, also copy its content
             snapshot.getContext('2d').drawImage(elt, 0, 0);
         }
         snapshot.style.display = 'inline-block';
         return snapshot;
     };

     /**
      * Push current or last frame to this.elements
      */
     PDF.prototype.__push = function() {
         if (this.isRecording) {
             this.elements.push(this.__snapshot());
         } else {
             if (this.lastFrame) {
                 this.elements.push(this.lastFrame);
                 this.lastFrame = null;
             } else {
                 var div = document.createElement('div');
                 div.className = "empty-page";
                 this.elements.push(div);
             }
         }
     };

     /**
      * Save current frame and move to next page
      *
      * @instance
      * @function nextPage
      * @memberof p5.PDF
      */
     PDF.prototype.nextPage = function() {
         this.__push();
         var div = document.createElement('div');
         div.className = "page-break";
         this.elements.push(div);
     };

     PDF.prototype.nextColumn = function() {
         this.elements.push(this.__snapshot());
         var div = document.createElement('div');
         div.className = "column-gap";
         this.elements.push(div);
     };

     PDF.prototype.nextRow = function() {
         this.elements.push(this.__snapshot());
         var div = document.createElement('div');
         div.className = "row-gap";
         this.elements.push(div);
     };

     PDF.prototype.beginRecord = function() {
         this.isRecording = true;
     };

     PDF.prototype.endRecord = function() {
         this.lastFrame = this.__snapshot();
         this.isRecording = false;
     };

     PDF.styles = [
         "body, html, canvas, svg {margin: 0; padding: 0}",
         ".page-break {page-break-before: always;}",
         ".column-gap {display: inline-block}",
         ".empty-page {width: 1px; height: 1px}"
     ];

    /**
     * Save current PDF using window.print.
     *
     * @function save
     * @memberof p5.PDF
     * @param {Object} options - The options for generating pdf
     * @param {String} options.filename - Filename for your pdf file, defaults to untitled
     * @param {String} options.width - Page width, defaults to canvas width
     * @param {String} options.height - Page height, defaults to canvas height
     * @param {Object} options.margin - Margins for PDF Page {top, right, bottom, left}
     * @param {String} options.margin.top - marginTop (eg. '1mm', '10px'), defaults to 0
     * @param {String} options.margin.right - marginRight in mm, defaults to 0
     * @param {String} options.margin.bottom - marginBottom in mm, defaults to 0
     * @param {String} options.margin.left - marginLeft in mm, defaults to 0
     * @param {String} options.columnGap - Size of the gap between columns (eg. '1mm', '10px'), defaults to 0
     * @param {String} options.rowGap - Size of the gap between rows, defaults to 0
     */
     PDF.prototype.save = function(options) {
         options = options || {};

         var styles = PDF.styles.concat();

         // page size
         var width = options.width || this.width + 'px';
         var height = options.height || this.height + 'px';
         if (typeof width === 'number') {
             width += 'px';
         }
         if (typeof height === 'number') {
             height += 'px';
         }
         styles.push('@page { size: ' + width + ' ' + height + ';}');
         // using page's margin sometimes not work
         // disable it, and control by other css
         styles.push('@page { margin: 0 }');
         styles.push('body { width: ' + width + '; box-sizing: border-box; }');

         // page margin
         options.margin = options.margin || {};
         var top = options.margin.top || 0;
         var bottom = options.margin.bottom || 0;
         var left = options.margin.left || 0;
         var right = options.margin.right || 0;
         styles.push(['body { padding: ', top, right, bottom, left, '; }'].join(' '));
         styles.push(['.page-break { padding-top: ', top, '; }'].join(' '));

         if (typeof options.columnGap !== "undefined") {
             styles.push(".column-gap {padding-left: " + options.columnGap + "}");
         }

         if (typeof options.rowGap !== "undefined") {
             styles.push(".row-gap {padding-top: " + options.rowGap + "}");
         }

         var lastFrame = this.isRecording ? this.__snapshot() : this.lastFrame;
         var elements = this.elements.concat(lastFrame);

         var filename = typeof options.filename == "undefined" ? "untitled" : options.filename;
         print(filename, elements, styles);
     };

     p5.PDF = PDF;

     p5.prototype.createPDF = function() {
         return new PDF(this);
     };
 }));
