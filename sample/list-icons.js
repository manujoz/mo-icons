import { LitElement, html, css, nothing } from "lit";

import "../mo-icon";

import Icons from "./icons";

export class ListIcons extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            .container,
            .personalized {
                position: relative;
                padding: 10px;
                background-color: #fafafa;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                grid-template-rows: auto;
                gap: 10px;
            }
            .personalized {
                margin-top: 50px;
            }
            .container > div,
            .personalized > div {
                position: relative;
                padding: 10px;
                background-color: white;
                border-radius: 5px;
                box-shadow: 1px 1px 3px #999999;
                color: #333333;
            }
            mo-icon {
                cursor: pointer;
                transition: color 0.3s;
            }
            mo-icon:hover {
                color: #d63737;
            }
            .icon {
                position: relative;
                text-align: center;
            }
            .icon mo-icon {
                width: 34px;
            }
            .name {
                position: relative;
                text-align: center;
                padding: 10px 0 0 0;
                overflow: hidden;
            }
            .name span {
                color: #333333;
                width: 98%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .filter {
                position: relative;
                margin: 10px;
                background-color: white;
                border: solid 1px #dddddd;
                border-radius: 5px;
            }
            .filter mo-icon {
                position: absolute;
                right: 7px;
                top: 7px;
            }
            input {
                width: 100%;
                border: none;
                padding: 10px;
                box-sizing: border-box;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14px;
            }
            .alert {
                position: fixed;
                top: 20px;
                width: 250px;
                padding: 15px;
                left: calc(50% - 125px);
                background-color: #222222;
                color: white;
                box-shadow: 2px 2px 10px #999999;
            }
        `,
    ];

    render() {
        return html`
            <div class="filter">
                <input type="text" placeholder="Search icons" @input=${this.inputHandle} />
                <mo-icon icon="search" mode="round"></mo-icon>
            </div>
            <div class="container"></div>
            <div class="personalized">
                <div>
                    <div class="icon">
                        <mo-icon src="./mood.svg" mode="round"></mo-icon>
                    </div>
                    <div class="name">Custom Icon</div>
                </div>
            </div>
            ${this.showAlert
                ? html`<div class="alert">Copied: <b style="color: orange">${this.textCopied}</b></div>`
                : nothing}
        `;
    }

    static properties = {
        showAlert: { type: Boolean, state: true },
        textCopied: { type: String, state: true },
    };

    constructor() {
        super();

        this.textCopied = "";
        this.showAlert = false;

        this.filterValue = "";
        this.timeoutFill = null;
        this.timeoutAlert = null;

        this.listeners = {
            clickIcon: (ev) => {
                this.clickIcon(ev);
            },
        };
    }

    firstUpdated() {
        this.fillIcons();

        document.addEventListener("click", this.listeners.clickIcon);
    }

    /**
     * Click icon event
     *
     * @param {Event} ev
     */
    clickIcon(ev) {
        const path = ev.composedPath();
        for (let i = 0; i < path.length; i++) {
            if (path[i].tagName === "MO-ICON") {
                navigator.clipboard.writeText(path[i].icon);
                this.textCopied = path[i].icon;
                this.showAlert = true;

                clearTimeout(this.timeoutAlert);
                this.timeoutAlert = setTimeout(() => {
                    this.showAlert = false;
                    this.textCopied = "";
                }, 3000);
                break;
            }
        }
    }

    /**
     * Fill Icons list
     * @param {int} i
     */
    fillIcons(i = 0) {
        if (i === Icons.length) {
            return;
        }

        if (this.filterValue && Icons[i].indexOf(this.filterValue) === -1) {
            this.fillIcons(i + 1);
            return;
        }

        const div = document.createElement("div");
        div.innerHTML = `
            <div class="icon">
                <mo-icon icon="${Icons[i]}" mode="round"></mo-icon>
            </div>
            <div class="name">
                <span>${Icons[i]}</span>
            </div>
        `;

        this.shadowRoot.querySelector("div.container").appendChild(div);

        this.timeoutFill = setTimeout(() => {
            this.fillIcons(i + 1);
        }, 0);
    }

    /**
     *
     * @param {Event} ev
     */
    inputHandle(ev) {
        this.filterValue = ev.currentTarget.value.toLowerCase().replaceAll(" ", "_");
        this.shadowRoot.querySelector(".container").textContent = "";

        clearTimeout(this.timeoutFill);
        this.fillIcons();
    }
}
customElements.define("list-icons", ListIcons);
