import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import type { } from "@mui/x-tree-view/themeAugmentation";





export const baseTheme = createTheme({
    palette: {
        common: {
            black: '#000',
            white: '#fff',
        },
    },
    typography: {
        fontFamily: ['Gentium Book Plus', 'serif'].join(','),
        fontWeightLight: 100,
        fontWeightRegular: 300,
        fontWeightMedium: 400,
        fontWeightBold: 700,
        fontSize: 13,
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    // fontSize: '1rem',
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    padding: 2,
                },
            },
        },
        MuiRichTreeView: {
            styleOverrides: {
                root: {},
            },
        },
    },
});


export const lightTheme = createTheme(deepmerge(baseTheme, {
    palette: {
        mode: 'light',
        primary: {
            main: 'rgb(130, 16, 88)',
        },
        secondary: {
            main: 'rgb(190,137,160)',
        },
        background: {
            default: `rgba(247,247,247,1)`,
            // default: `#e6e6e6`,
            paper: `rgb(240, 235, 238)`,
        },
        divider: 'rgba(130, 16, 88, 0.4)',
        text: {
            primary: `rgb(51,51,51)`,
            secondary: 'rgb(142 142 142)',
        },
        info: {
            main: `rgb(174, 169, 172)`,
            light: `rgb(218, 201, 212)`,
        },
        action: {
            visited: `rgb(42, 40, 40)`,
            active: `rgb(130, 16, 88)`,
            hover: `rgb(130, 16, 88)`,
            selected: `rgb(130, 16, 88)`,
            disabled: `rgb(103, 103, 103)`,
            disabledBackground: `rgb(130, 16, 88)`,
        }
    },
    cssVariables: {
        cssVarPrefix: '', // Optional: You can set a prefix if needed
        colorSchemeSelector: 'class', // Use class-based color scheme toggle
    },
}));

export const darkTheme = createTheme(deepmerge(baseTheme, {
    palette: {
        mode: 'dark',
        primary: {
            main: 'rgb(232,233,248)',
            contrastText: 'rgb(23,22,28)',
        },
        secondary: {
            main: 'rgb(160,38,98)',
        },
        background: {
            default: `rgb(23,22,28)`,
            paper: `rgb(37,40,49)`,
        },
        divider: 'rgba(84,89,126,1)',
        text: {
            primary: `#f1f1ff`,
            secondary: '#6d6d7b',
            contrastText: 'rgb(23 22 29)',
        },
        info: {
            main: `rgb(36, 18, 28)`,
            light: `rgb(36, 31, 64)`,
        },

    },
    cssVariables: {
        cssVarPrefix: '', // Optional: You can set a prefix if needed
        colorSchemeSelector: 'class', // Use class-based color scheme toggle
    },
}));
