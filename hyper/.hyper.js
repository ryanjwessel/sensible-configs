"use strict";
// See https://hyper.is#cfg for all currently supported options.
module.exports = {
    config: {
        MaterialTheme: {
            theme: 'Palenight',
        },
        hypercwd: {
            initialWorkingDirectory: '~/_dev',
        },
        fontSize: 16,
        fontFamily: '"Dank Mono", "UbuntuMono Nerd Font", "Apple Color Emoji", Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
        lineHeight: 1,
        letterSpacing: 0,
        cursorShape: 'BLOCK',
        cursorBlink: true,
        padding: '14px',
        colors: {
            black: '#000000',
            red: '#C51E14',
            green: '#1DC121',
            yellow: '#C7C329',
            blue: '#0A2FC4',
            magenta: '#C839C5',
            cyan: '#20C5C6',
            white: '#C7C7C7',
            lightBlack: '#686868',
            lightRed: '#FD6F6B',
            lightGreen: '#67F86F',
            lightYellow: '#FFFA72',
            lightBlue: '#6A76FB',
            lightMagenta: '#FD7CFC',
            lightCyan: '#68FDFE',
            lightWhite: '#FFFFFF',
            limeGreen: '#32CD32',
            lightCoral: '#F08080',
        },
        shell: '/bin/zsh',
        webGLRenderer: false,
        disableLigatures: false,
        disableAutoUpdates: false,
    },
    plugins: ["hypercwd", "hyper-search", "hyper-material-theme", "hyper-tabs-enhanced"],
};
//# sourceMappingURL=config-default.js.map
