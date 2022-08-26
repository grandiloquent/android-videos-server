// 组件

(function () {
    class CustomDialog extends HTMLElement {
        static get observedAttributes() {
            return ['title', 'content'];
        }

        // Fires when an instance of the element is created or updated
        constructor() {
            super();
            this.root = this.attachShadow({
                mode: 'open'
            });
            const dialogContainer = document.createElement('div');
            [
                ["position", "fixed"],
                ["top", "0"],
                ["left", "0"],
                ["right", "0"],
                ["bottom", "0"],
                ["display", "flex"],
                ["WebkitBoxAlign", "center"],
                ["alignItems", "center"],
                ["WebkitBoxPack", "center"],
                ["justifyContent", "center"],
                ["zIndex", "4"],
                ["margin", "0 40px"],
                ["padding", "0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)"],
            ].forEach(x => dialogContainer.style[x[0]] = x[1]);

            const dialog = document.createElement('div');
            [
                ["position", "relative"],
                ["zIndex", "2"],
                ["display", "flex"],
                ["WebkitBoxOrient", "vertical"],
                ["WebkitBoxDirection", "normal"],
                ["flexDirection", "column"],
                ["maxHeight", "100%"],
                ["boxSizing", "border-box"],
                ["padding", "16px"],
                ["margin", "0 auto"],
                ["overflowX", "hidden"],
                ["overflowY", "auto"],
                ["fontSize", "13px"],
                ["color", "#030303"],
                ["backgroundColor", "#f9f9f9"],
                ["border", "none"],
                ["minWidth", "250px"],
                ["maxWidth", "356px"],
            ].forEach(x => dialog.style[x[0]] = x[1]);
            dialogContainer.appendChild(dialog);

            const dialogHeader = document.createElement('div');
            [
                ["display", "flex"],
                ["WebkitBoxOrient", "vertical"],
                ["WebkitBoxDirection", "normal"],
                ["flexDirection", "column"],
                ["flexShrink", "0"],
            ].forEach(x => dialogHeader.style[x[0]] = x[1]);
            dialog.appendChild(dialogHeader);

            const title = document.createElement('h2');
            [
                ["display", "-webkit-box"],
                ["WebkitBoxOrient", "vertical"],
                ["maxHeight", "2.5em"],
                ["WebkitLineClamp", "2"],
                ["overflow", "hidden"],
                ["lineHeight", "1.25"],
                ["textOverflow", "ellipsis"],
                ["fontWeight", "400"],
                ["fontSize", "18px"],
                ["margin", "0"],
                ["padding", "8px 12px"],
                ["borderBottom", "1px solid rgba(0,0,0,0.1)"],
            ].forEach(x => title.style[x[0]] = x[1]);
            dialogHeader.appendChild(title);

            const dialogBody = document.createElement('div');
            [
                ["whiteSpace", "pre-wrap"],
                ["overflowY", "auto"],
                ["overflowX", "hidden"],
                ["maxHeight", "100vh"],
            ].forEach(x => dialogBody.style[x[0]] = x[1]);
            dialog.appendChild(dialogBody);

            const c3Overlay = document.createElement('div');
            [
                ["position", "fixed"],
                ["top", "0"],
                ["bottom", "0"],
                ["left", "0"],
                ["right", "0"],
                ["zIndex", "1"],
                ["cursor", "pointer"],
                ["backgroundColor", "rgba(0,0,0,0.8)"],
            ].forEach(x => c3Overlay.style[x[0]] = x[1]);
            dialogContainer.appendChild(c3Overlay);

            const dialogButtons = document.createElement('div');
            [

                ["display", "flex"],
                ["WebkitBoxAlign", "center"],
                ["alignItems", "center"],
                ["WebkitBoxPack", "end"],
                ["justifyContent", "flex-end"],
                ["marginTop", "12px"],
            ].forEach(x => dialogButtons.style[x[0]] = x[1]);
            dialog.appendChild(dialogButtons);

            const buttonWrapper = document.createElement('div');
            [
                ["width", "100%"],
                ["marginTop", "-12px"],
                // ["borderTop", "1px solid rgba(0,0,0,0.1)"],
                ["display", "flex"],
                ["WebkitBoxPack", "end"],
                ["justifyContent", "flex-end"],
            ].forEach(x => buttonWrapper.style[x[0]] = x[1]);
            dialogButtons.appendChild(buttonWrapper);

            const div = this.makeButton();
            buttonWrapper.appendChild(div[0]);
            div[1].textContent = "取消";


            const div1 = this.makeButton();
            buttonWrapper.appendChild(div1[0]);
            div1[1].textContent = "确定";

            div1[0].style.color = '#c00';
            div1[0].style.marginLeft = '.7em';

            const secondaryText = document.createElement('div');
            [
                ["margin", "8px 0"],
                ["color", "#606060"],
                ["lineHeight", "1.6rem"],
            ].forEach(x => secondaryText.style[x[0]] = x[1]);

            dialogBody.appendChild(secondaryText);

            this.root.appendChild(dialogContainer);


            div[2].addEventListener('click', evt => {
                this.remove();
            })
            c3Overlay.addEventListener('click', evt => {
                this.remove();
            })
            this.h2 = title;
            this.p = secondaryText;
            
            div1[1].addEventListener('click', evt => {
                this.dispatchEvent(new CustomEvent("submit", {
                    detail: {}
                }));
            })

        }

        makeButton(buttonWrapper) {
            const materialButton = document.createElement('div');
            [
                ["display", "flex"],
                ["WebkitBoxPack", "center"],
                ["justifyContent", "center"],
                ["boxSizing", "border-box"],
                ["userSelect", "none"],
                ["minWidth", "5.14em"],
                ["margin", "0 .29em"],
                ["fontSize", "14px"],
                ["textTransform", "uppercase"],
                ["borderRadius", "3px"],
            ].forEach(x => materialButton.style[x[0]] = x[1]);

            const button = document.createElement('button');
            [
                ["border", "none"],
                ["outline", "none"],
                ["font", "inherit"],
                ["textTransform", "inherit"],
                ["color", "inherit"],
                ["background", "transparent"],
                ["cursor", "pointer"],
                ["padding", ".7em .57em"],
            ].forEach(x => button.style[x[0]] = x[1]);
            materialButton.appendChild(button);

            const div = document.createElement('div');
            [
                ["display", "flex"],
                ["WebkitBoxAlign", "center"],
                ["alignItems", "center"],
            ].forEach(x => div.style[x[0]] = x[1]);
            button.appendChild(div);

            return [materialButton, div, button];
        }

        // Fires when an instance was inserted into the document
        connectedCallback() {
        }

        // Fires when an instance was removed from the document
        disconnectedCallback() {
        }

        // Fires when an attribute was added, removed, or updated
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName === 'title') {
                this.h2.textContent = newVal;
            }
            if (attrName === "content") {
                this.p.textContent = newVal;
            }
        }

        // Fires when an element is moved to a new document
        adoptedCallback() {
        }

    }

// <custom-dialog></custom-dialog> 
    // document.querySelector('custom-dialog');
    customElements.define('custom-dialog', CustomDialog);
})();