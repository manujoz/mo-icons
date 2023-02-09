import { LitElement, html, css } from "lit";

export class MoIcon extends LitElement {
    static styles = [
        css`
            :host {
                display: inline-block;
                width: 24px;
            }
            div svg {
                fill: currentColor;
                vertical-align: middle;
            }
        `,
    ];

    static get properties() {
        return {
            icon: { type: String },
            src: { type: String },
            /** @type {"round" | "filled" | "outlined" | "two-tone" | "sharp"} */
            mode: { type: String },
        };
    }

    constructor() {
        super();

        this.icon = "";
        this.src = "";
        /** @type {"round" | "filled" | "outlined" | "two-tone" | "sharp"} */
        this.mode = "round";
    }

    render() {
        return html`<div></div>`;
    }

    updated() {
        const div = this.shadowRoot.querySelector("div");
        div.textContent = "";

        if (!this.icon && !this.src) {
            return;
        }

        if (this.icon) {
            this.loadIcon();
        } else {
            this.fetchIcon();
        }
    }

    async loadIcon() {
        const { default: icons } = await import(`./icons/${this.mode}.js`);

        let svg = icons[this.icon];
        if (!svg) {
            throw Error("Icon " + this.icon + " not found");
        }

        const w = this.offsetWidth;
        svg = svg.replace(`width="24"`, `width="${w}"`);
        svg = svg.replace(`height="24"`, `height="${w}"`);
        const div = this.shadowRoot.querySelector("div");
        div.innerHTML = svg;
    }

    fetchIcon() {
        const url = this.src;

        fetch(url)
            .then((res) => {
                if (res.status !== 200) {
                    return;
                }
                return res.text();
            })
            .then((svg) => {
                if (!svg) {
                    return;
                }

                const w = this.offsetWidth;
                svg = svg.replace(`width="24"`, `width="${w}"`);
                svg = svg.replace(`height="24"`, `height="${w}"`);
                const div = this.shadowRoot.querySelector("div");
                div.innerHTML = svg;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
}

customElements.define("mo-icon", MoIcon);
