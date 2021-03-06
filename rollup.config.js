import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import nodeJson from 'rollup-plugin-json';
import copy from 'rollup-plugin-copy';
import fs from 'fs';
import { glob } from 'glob';

const packageJson = JSON.parse(fs.readFileSync("package.json"));
const banner = `
// ==UserScript==
// @name         Typetalk custom-emoji
// @namespace    https://github.com/mohno007/typetalk-custom-emoji
// @homepage     https://github.com/mohno007/typetalk-custom-emoji
// @downloadURL  https://mohno007.github.io/typetalk-custom-emoji/TypetalkCustomEmoji.user.js
// @updateURL    https://mohno007.github.io/typetalk-custom-emoji/TypetalkCustomEmoji.user.js
// @supportURL   https://github.com/mohno007/typetalk-custom-emoji/issues/new
// @version      ${packageJson.version}
// @description  Emoji Reaction
// @author       m-ohno
// @match        https://typetalk.com/*
// @grant        none
// ==/UserScript==
//
// Copyright (c) 2018-2019 Motohiro OHNO
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
`.slice(1);

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/TypetalkCustomEmoji.user.js',
      format: 'iife',
      banner,
    },
    plugins: [
      copy({
        targets: [...glob.sync('static/*')],
        outputFolder: 'dist/',
      }),
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
        sourceMap: false,
      }),
      nodeJson(),
    ],
  },
];
