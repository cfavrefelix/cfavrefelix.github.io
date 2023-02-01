declare module 'carbon-react/lib/components/loader';
declare module 'carbon-react/lib/components/card';
declare module 'carbon-react/lib/components/pill';
declare module 'carbon-react/lib/components/icon';
declare module 'carbon-react/lib/style/themes';
declare module 'carbon-react/lib/components/sidebar';
declare module 'carbon-react/lib/components/hr';
declare module 'carbon-react/lib/components/button/button.component';
declare interface TypographyProps extends SpacingProps, ColorProps {
    /** Override the variant component */
    as?: string;
    /** The visual style to apply to the component */
    variant?:
    | "h1-large"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "segment-header"
    | "segment-header-small"
    | "segment-subheader"
    | "segment-subheader-alt"
    | "p"
    | "small"
    | "big"
    | "sup"
    | "sub"
    | "strong"
    | "b"
    | "em";
    /** Override the variant font-size */
    fontSize?: string;
    /** Override the variant font-weight */
    fontWeight?: string;
    /** Override the variant line-height */
    lineHeight?: string;
    /** Override the variant text-transform */
    textTransform?: string;
    /** Override the variant text-decoration */
    textDecoration?: string;
    /** Override the variant display */
    display?: string;
    /** Override the list-style-type */
    listStyleType?: string;
}