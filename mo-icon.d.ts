import { LitElement } from "lit";
import { customElement, property } from "lit/decorators";

/**
 * @customElement
 *
 * @attr icon
 * @attr src
 * @attr mode
 */
@customElement("mo-icon")
export class MoIcon extends LitElement {
    @property({ type: String })
    icon: string;
    @property({ type: String })
    src: string;
    @property({ type: String })
    mode: "round" | "filled" | "outlined" | "two-tone" | "sharp";
}

declare global {
    interface HTMLElementTagNameMap {
        "mo-icon": MoIcon;
    }
}
