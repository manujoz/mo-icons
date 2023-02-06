declare interface MoIcon extends HTMLElement {
    icon: string;
    src: string;
    mode: "round" | "filled" | "outlined" | "two-tone" | "sharp";
}

declare global {
    interface HTMLElementTagNameMap {
        "mo-icon": MoIcon;
    }
}

declare var MoIcon: {
    prototype: MoIcon;
    new (): MoIcon;
};
