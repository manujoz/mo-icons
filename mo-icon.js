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

        this.icon = ``;
        this.src = ``;
        /** @type {"round" | "filled" | "outlined" | "two-tone" | "sharp"} */
        this.mode = `round`;
    }

    render() {
        return html`<div></div>`;
    }

    updated() {
        const div = this.shadowRoot.querySelector(`div`);
        div.textContent = ``;

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
        let icons = null;
        if (this.mode === `filled`) {
            const module = await import(`./icons/filled.js`);
            icons = module.default;
        } else if (this.mode === `outlined`) {
            const module = await import(`./icons/outlined.js`);
            icons = module.default;
        } else if (this.mode === `round`) {
            const module = await import(`./icons/round.js`);
            icons = module.default;
        } else if (this.mode === `sharp`) {
            const module = await import(`./icons/sharp.js`);
            icons = module.default;
        } else if (this.mode === `two-tone`) {
            const module = await import(`./icons/two-tone.js`);
            icons = module.default;
        }

        let svg = icons[this.icon];
        if (!svg) {
            throw Error(`Icon ` + this.icon + ` not found`);
        }

        svg = svg.replace(`width="24"`, ``);
        svg = svg.replace(`height="24"`, ``);
        const div = this.shadowRoot.querySelector(`div`);
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
                const div = this.shadowRoot.querySelector(`div`);
                div.innerHTML = svg;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
}

customElements.define(`mo-icon`, MoIcon);
