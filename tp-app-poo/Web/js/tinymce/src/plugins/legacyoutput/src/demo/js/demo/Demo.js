/**
 * Demo.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*eslint no-console:0 */

define(
    'tinymce.plugins.legacyoutput.demo.Demo',

    [
        'tinymce.core.EditorManager',
        'tinymce.plugins.code.Plugin',
        'tinymce.plugins.legacyoutput.Plugin',
        'tinymce.themes.modern.Theme'
    ],

    function (EditorManager, CodePlugin, LegacyOutputPlugin, ModernTheme) {
        return function () {
            CodePlugin();
            LegacyOutputPlugin();
            ModernTheme();

            EditorManager.init({
                selector: "textarea.tinymce",
                theme: "modern",
                skin_url: "../../../../../skins/lightgray/dist/lightgray",
                plugins: "legacyoutput code",
                toolbar: "legacyoutput code",
                height: 600
            });
        };
    }
);