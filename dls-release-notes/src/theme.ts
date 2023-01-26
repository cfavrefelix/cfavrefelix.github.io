import { sageTheme } from "carbon-react/lib/style/themes";

const THEME = {
    ...sageTheme,
    containerWidth: '1000px',
    breakpoints: {
        mobile: {
            min: '0',
            max: '599px'
        },
        tablet: {
            min: '600px',
            max: '959px'
        },
        tabletLandscape: {
            min: '960px',
            max: '1260px',
        },
        desktop: {
            min: '1261px',
            max: '1439px',
        },
        desktopLg: {
            min: '1440px',
            max: '8200px',
        }
    }
};

export default THEME;