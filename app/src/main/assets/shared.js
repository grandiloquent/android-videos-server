function createContextDelete(path, element) {
    const modal = document.createElement('DIV');
    modal.setAttribute('class', 'modal modal-show');
    const modalMask = document.createElement('B');
    modalMask.setAttribute('class', 'modal-mask');
    modal.appendChild(modalMask);
    const modalDialog = document.createElement('DIV');
    modalDialog.setAttribute('class', 'modal-dialog');
    const modalDialogHd = document.createElement('DIV');
    modalDialogHd.setAttribute('class', 'modal-dialog-hd clearfix');
    const modalDialogTitle = document.createElement('DIV');
    modalDialogTitle.setAttribute('class', 'modal-dialog-title');
    modalDialogTitle.appendChild(document.createTextNode('询问'));
    modalDialogHd.appendChild(modalDialogTitle);
    const iconPopClose = document.createElement('BUTTON');
    iconPopClose.setAttribute('aria-label', '关闭弹窗');
    iconPopClose.setAttribute('class', 'icon-pop-close');
    modalDialogHd.appendChild(iconPopClose);
    modalDialog.appendChild(modalDialogHd);
    const modalDialogBd = document.createElement('DIV');
    modalDialogBd.setAttribute('class', 'modal-dialog-bd');
    const span = document.createElement('SPAN');
    span.style.fontSize = '14px';
    span.appendChild(document.createTextNode(`确定要删除 ${substringAfterLast(path, "\\")} 吗？`));
    modalDialogBd.appendChild(span);
    modalDialog.appendChild(modalDialogBd);
    const modalDialogFt = document.createElement('DIV');
    modalDialogFt.setAttribute('class', 'modal-dialog-ft');
    const btnActive = document.createElement('BUTTON');
    btnActive.setAttribute('class', 'btn-active');
    btnActive.appendChild(document.createTextNode('确定'));
    modalDialogFt.appendChild(btnActive);
    const btn = document.createElement('BUTTON');
    btn.setAttribute('class', 'btn');
    btn.appendChild(document.createTextNode('取消'));
    modalDialogFt.appendChild(btn);
    modalDialog.appendChild(modalDialogFt);
    modal.appendChild(modalDialog);
    document.body.appendChild(modal);
    iconPopClose.addEventListener('click', evt => {
        modal.remove();
    })
    modalMask.addEventListener('click', evt => {
        modal.remove();
    })
    btn.addEventListener('click', evt => {
        modal.remove();
    })
    btnActive.addEventListener('click', async evt => {
        try {
            await fetch(`/api/files?path=${encodeURIComponent(path)}`, {
                method: 'DELETE'
            })
        } catch (e) {
        }
        element.remove();
        modal.remove();
    })
    requestAnimationFrame(() => {
        modal.classList.add('modal-show');
    })
}

function createContextRename(path) {
    const modal = document.createElement('DIV');
    modal.setAttribute('class', 'modal modal-show');
    const modalMask = document.createElement('B');
    modalMask.setAttribute('class', 'modal-mask');
    modal.appendChild(modalMask);
    const modalDialog = document.createElement('DIV');
    modalDialog.setAttribute('class', 'modal-dialog');
    const modalDialogHd = document.createElement('DIV');
    modalDialogHd.setAttribute('class', 'modal-dialog-hd clearfix');
    const modalDialogTitle = document.createElement('DIV');
    modalDialogTitle.setAttribute('class', 'modal-dialog-title');
    modalDialogTitle.appendChild(document.createTextNode('重命名'));
    modalDialogHd.appendChild(modalDialogTitle);
    const iconPopClose = document.createElement('BUTTON');
    iconPopClose.setAttribute('aria-label', '关闭弹窗');
    iconPopClose.setAttribute('class', 'icon-pop-close');
    modalDialogHd.appendChild(iconPopClose);
    modalDialog.appendChild(modalDialogHd);
    const modalDialogBd = document.createElement('DIV');
    modalDialogBd.setAttribute('class', 'modal-dialog-bd');
    const input = document.createElement('INPUT');
    input.setAttribute('type', 'text');
    input.style.marginBottom = '10px';
    modalDialogBd.appendChild(input);
    const input1 = document.createElement('INPUT');
    input1.setAttribute('type', 'text');
    input1.placeholder = "输入文件名或完整路径";
    modalDialogBd.appendChild(input1);
    modalDialog.appendChild(modalDialogBd);
    const modalDialogFt = document.createElement('DIV');
    modalDialogFt.setAttribute('class', 'modal-dialog-ft');
    const btnActive = document.createElement('BUTTON');
    btnActive.setAttribute('class', 'btn-active');
    btnActive.appendChild(document.createTextNode('确定'));
    modalDialogFt.appendChild(btnActive);
    const btn = document.createElement('BUTTON');
    btn.setAttribute('class', 'btn');
    btn.appendChild(document.createTextNode('取消'));
    modalDialogFt.appendChild(btn);
    modalDialog.appendChild(modalDialogFt);
    modal.appendChild(modalDialog);
    document.body.appendChild(modal);
    iconPopClose.addEventListener('click', evt => {
        modal.remove();
    })
    modalMask.addEventListener('click', evt => {
        modal.remove();
    })
    btn.addEventListener('click', evt => {
        modal.remove();
    })
    btnActive.addEventListener('click', async evt => {
        try {
            await fetch(`/api/files?path=${encodeURIComponent(path)}&newPath=${encodeURIComponent(input1.value)}`, {})
        } catch (e) {
        }
        modal.remove();
        //renderItems(location.hash ? location.hash.substring(1) : "D:\\", groupList);
    })
    input1.addEventListener('keydown', evt => {
        if (evt.keyCode === 13) {
            btnActive.click();
        }
    })
    input.value = substringAfterLast(path, "\\");
}

function createContextCopy(path) {
    const modal = document.createElement('DIV');
    modal.setAttribute('class', 'modal modal-show');
    const modalMask = document.createElement('B');
    modalMask.setAttribute('class', 'modal-mask');
    modal.appendChild(modalMask);
    const modalDialog = document.createElement('DIV');
    modalDialog.setAttribute('class', 'modal-dialog');
    const modalDialogHd = document.createElement('DIV');
    modalDialogHd.setAttribute('class', 'modal-dialog-hd clearfix');
    const modalDialogTitle = document.createElement('DIV');
    modalDialogTitle.setAttribute('class', 'modal-dialog-title');
    modalDialogTitle.appendChild(document.createTextNode('重命名'));
    modalDialogHd.appendChild(modalDialogTitle);
    const iconPopClose = document.createElement('BUTTON');
    iconPopClose.setAttribute('aria-label', '关闭弹窗');
    iconPopClose.setAttribute('class', 'icon-pop-close');
    modalDialogHd.appendChild(iconPopClose);
    modalDialog.appendChild(modalDialogHd);
    const modalDialogBd = document.createElement('DIV');
    modalDialogBd.setAttribute('class', 'modal-dialog-bd');
    const input = document.createElement('INPUT');
    input.setAttribute('type', 'text');
    input.style.marginBottom = '10px';
    modalDialogBd.appendChild(input);
    const input1 = document.createElement('INPUT');
    input1.setAttribute('type', 'text');
    input1.placeholder = "输入文件名或完整路径";
    modalDialogBd.appendChild(input1);
    modalDialog.appendChild(modalDialogBd);
    const modalDialogFt = document.createElement('DIV');
    modalDialogFt.setAttribute('class', 'modal-dialog-ft');
    const btnActive = document.createElement('BUTTON');
    btnActive.setAttribute('class', 'btn-active');
    btnActive.appendChild(document.createTextNode('确定'));
    modalDialogFt.appendChild(btnActive);
    const btn = document.createElement('BUTTON');
    btn.setAttribute('class', 'btn');
    btn.appendChild(document.createTextNode('取消'));
    modalDialogFt.appendChild(btn);
    modalDialog.appendChild(modalDialogFt);
    modal.appendChild(modalDialog);
    document.body.appendChild(modal);
    iconPopClose.addEventListener('click', evt => {
        modal.remove();
    })
    modalMask.addEventListener('click', evt => {
        modal.remove();
    })
    btn.addEventListener('click', evt => {
        modal.remove();
    })
    btnActive.addEventListener('click', async evt => {
        try {
            await fetch(`/api/copy?path=${encodeURIComponent(path)}&dir=${encodeURIComponent(input1.value)}`, {})
        } catch (e) {
        }
        modal.remove();

    })
    input1.addEventListener('keydown', evt => {
        if (evt.keyCode === 13) {
            btnActive.click();
        }
    })
    input.value = substringAfterLast(path, "\\");
}

async function deleteCurrentFiles() {
    const groupItems = [...document.querySelectorAll('.group-item')].map(x => x.dataset.path);
    const response = await fetch('/api/files', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(groupItems)
    })
    await response.json();
}

function getThumbnail(name) {
    switch (substringAfterLast(name, '.')) {
        case 'txt':
            return 'icon-txt-m';
        case 'xml':
        case 'ini':
        case 'bat':
        case 'java':
        case 'c':
        case 'cc':
        case 'h':
        case 'cs':
        case 'css':
        case 'html':
        case 'xhtml':
        case 'htm':
            return 'icon-code-m';
        case 'zip':
        case 'rar':
        case '7z':
            return 'icon-zip-m';
        case 'pdf':
            return 'icon-pdf-m';
        case 'mp4':
            return 'icon-video-m';
        case 'mp3':
            return 'icon-audio-m';
        case 'apk':
            return 'icon-apk-m';
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'svg':
        case 'bmp':
            return 'icon-pic-m';
        case 'psd':
            return 'icon-ps-m';
        default:
            return 'icon-nor-m';
    }
}

function humanFileSize(size) {
    if (size === 0)
        return '0';
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}

async function loadItems(path, pattern) {
    const order = localStorage.getItem('order');
    let o = 2;
    if (order) {
        o = parseInt(order);
    }
    const response = await fetch(`/api/files?path=${path}&pattern=${pattern || ''}&order=${o}`);
    return await response.json();
}

function makeAlertDialog(title, message, fn) {
    const modal = document.createElement('DIV');
    modal.setAttribute('class', 'modal');
    const modalMask = document.createElement('B');
    modalMask.setAttribute('class', 'modal-mask');
    modal.appendChild(modalMask);
    const modalDialog = document.createElement('DIV');
    modalDialog.setAttribute('class', 'modal-dialog');
    const modalDialogHd = document.createElement('DIV');
    modalDialogHd.setAttribute('class', 'modal-dialog-hd clearfix');
    const modalDialogTitle = document.createElement('DIV');
    modalDialogTitle.setAttribute('class', 'modal-dialog-title');
    modalDialogTitle.appendChild(document.createTextNode(title));
    modalDialogHd.appendChild(modalDialogTitle);
    const iconPopClose = document.createElement('BUTTON');
    iconPopClose.setAttribute('aria-label', '关闭弹窗');
    iconPopClose.setAttribute('class', 'icon-pop-close');
    modalDialogHd.appendChild(iconPopClose);
    modalDialog.appendChild(modalDialogHd);
    const modalDialogBd = document.createElement('DIV');
    modalDialogBd.setAttribute('class', 'modal-dialog-bd');
    const input = document.createElement('span');
    input.style.fontSize = '14px'
    input.textContent = message || "确定要删除吗？"
    modalDialogBd.appendChild(input);
    /* let input1
    if (!hidden) {
        input1 = document.createElement('INPUT');
        input1.setAttribute('type', 'text');
        modalDialogBd.appendChild(input1);
    }*/
    modalDialog.appendChild(modalDialogBd);
    const modalDialogFt = document.createElement('DIV');
    modalDialogFt.setAttribute('class', 'modal-dialog-ft');
    const btnActive = document.createElement('BUTTON');
    btnActive.setAttribute('class', 'btn-active');
    btnActive.appendChild(document.createTextNode('确定'));
    modalDialogFt.appendChild(btnActive);
    const btn = document.createElement('BUTTON');
    btn.setAttribute('class', 'btn');
    btn.appendChild(document.createTextNode('取消'));
    modalDialogFt.appendChild(btn);
    modalDialog.appendChild(modalDialogFt);
    modal.appendChild(modalDialog);
    document.body.appendChild(modal);
    iconPopClose.addEventListener('click', evt => {
        modal.remove();
    })
    modalMask.addEventListener('click', evt => {
        modal.remove();
    })
    btn.addEventListener('click', evt => {
        modal.remove();
    })
    btnActive.addEventListener('click', evt => {
        fn();
        modal.remove();
    })
    requestAnimationFrame(() => {
        modal.classList.add('modal-show');
    })
    //input1.value=inputValue1;
    return modal;
}

function makeDialog(title, inputValue, fn, hidden) {
    const modal = document.createElement('DIV');
    modal.setAttribute('class', 'modal');
    const modalMask = document.createElement('B');
    modalMask.setAttribute('class', 'modal-mask');
    modal.appendChild(modalMask);
    const modalDialog = document.createElement('DIV');
    modalDialog.setAttribute('class', 'modal-dialog');
    const modalDialogHd = document.createElement('DIV');
    modalDialogHd.setAttribute('class', 'modal-dialog-hd clearfix');
    const modalDialogTitle = document.createElement('DIV');
    modalDialogTitle.setAttribute('class', 'modal-dialog-title');
    modalDialogTitle.appendChild(document.createTextNode(title));
    modalDialogHd.appendChild(modalDialogTitle);
    const iconPopClose = document.createElement('BUTTON');
    iconPopClose.setAttribute('aria-label', '关闭弹窗');
    iconPopClose.setAttribute('class', 'icon-pop-close');
    modalDialogHd.appendChild(iconPopClose);
    modalDialog.appendChild(modalDialogHd);
    const modalDialogBd = document.createElement('DIV');
    modalDialogBd.setAttribute('class', 'modal-dialog-bd');
    const input = document.createElement('INPUT');
    input.setAttribute('type', 'text');
    input.style.marginBottom = '10px';
    modalDialogBd.appendChild(input);
    let input1
    if (!hidden) {
        input1 = document.createElement('INPUT');
        input1.setAttribute('type', 'text');
        modalDialogBd.appendChild(input1);
    }
    modalDialog.appendChild(modalDialogBd);
    const modalDialogFt = document.createElement('DIV');
    modalDialogFt.setAttribute('class', 'modal-dialog-ft');
    const btnActive = document.createElement('BUTTON');
    btnActive.setAttribute('class', 'btn-active');
    btnActive.appendChild(document.createTextNode('确定'));
    modalDialogFt.appendChild(btnActive);
    const btn = document.createElement('BUTTON');
    btn.setAttribute('class', 'btn');
    btn.appendChild(document.createTextNode('取消'));
    modalDialogFt.appendChild(btn);
    modalDialog.appendChild(modalDialogFt);
    modal.appendChild(modalDialog);
    document.body.appendChild(modal);
    iconPopClose.addEventListener('click', evt => {
        modal.remove();
    })
    modalMask.addEventListener('click', evt => {
        modal.remove();
    })
    btn.addEventListener('click', evt => {
        modal.remove();
    })
    btnActive.addEventListener('click', evt => {
        if (input1)
            fn(input1.value);
        else
            fn(input.value);
        modal.remove();
    })
    requestAnimationFrame(() => {
        modal.classList.add('modal-show');
    })
    input.value = inputValue;
    //input1.value=inputValue1;
    return modal;
}

function makeItem(item) {
    const groupItem = document.createElement('DIV');
    groupItem.setAttribute('class', 'group-item');
    groupItem.dataset.path = item.fullName;
    const groupItemThumbnail = document.createElement('DIV');
    groupItemThumbnail.setAttribute('class', 'group-item-thumbnail');
    const icon = document.createElement('I');
    let thumbnail = 'icon-file-m';
    if (!item.isDirectory) {
        thumbnail = getThumbnail(item.name);
    }
    icon.setAttribute('class', `icon icon-m ${thumbnail}`);
    groupItemThumbnail.appendChild(icon);
    groupItem.appendChild(groupItemThumbnail);
    const groupItemDetails = document.createElement('DIV');
    groupItemDetails.setAttribute('class', 'group-item-details');
    const groupItemTitle = document.createElement('H3');
    groupItemTitle.setAttribute('class', 'group-item-title');
    groupItemTitle.appendChild(document.createTextNode(item.name));
    groupItemDetails.appendChild(groupItemTitle);
    if (!item.isDirectory) {
        const subhead = document.createElement('DIV');
        subhead.setAttribute('class', 'subhead group-item-subhead');
        subhead.appendChild(
            document.createTextNode(humanFileSize(item.length))
        );
        groupItemDetails.appendChild(subhead);
    }
    groupItem.appendChild(groupItemDetails);
    const groupItemThumbnail1 = document.createElement('DIV');
    groupItemThumbnail1.setAttribute('class', 'group-item-thumbnail');
    groupItemThumbnail1.style.margin = '0 16px 0 10px';
    groupItemThumbnail1.style.position = 'relative';
    const icon1 = document.createElement('I');
    icon1.setAttribute('class', 'icon icon-m icon-more');
    groupItemThumbnail1.appendChild(icon1);
    groupItem.appendChild(groupItemThumbnail1);
    groupItem.addEventListener('click', evt => {
        if (item.isDirectory) {
            location.hash = encodeURIComponent(item.fullName);
        } else {
            if (item.name.endsWith(".html") || item.name.endsWith(".htm") || item.name.endsWith(".xhtml")) {
                location.href = "/html/" + encodeURI(item.fullName.replaceAll('\\', '/')
                ).replaceAll('#', '%23');
                // && typeof NativeAndroid !== "undefined"
            } else if (item.name.endsWith(".mp4")) {
                if (item.fullName.indexOf("未转码") !== -1)
                    NativeAndroid.playVideo(`${location.protocol}//${location.host}/api/files?path=${item.fullName}`);
                else
                    window.open(`/video.html?path=${encodeURIComponent(item.fullName)}`);
            } else {
                window.open(`/api/files?path=${encodeURIComponent(item.fullName)}`);
            }
        }
    });
    groupItemThumbnail1.addEventListener('click', evt => {
        evt.stopPropagation();
        document.querySelectorAll('.bubble-context-menu')
            .forEach(x => x.remove());
        const element = makeMenu(item.fullName, groupItem, item.isDirectory);
        element.style.visibility = 'visible';
        element.style.left = '-220px';
        groupItemThumbnail1.appendChild(element);
    })
    return groupItem;
}

function makeMenu(path, element, isDirectory) {
    const bubbleMenu = document.createElement('DIV');
    bubbleMenu.setAttribute('class', 'bubble-menu bubble-context-menu');
    const bubbleMenuList = document.createElement('DIV');
    bubbleMenuList.setAttribute('class', 'bubble-menu-list');
    bubbleMenuList.style.display = 'block';
    bubbleMenuList.appendChild(makeMenuItem(
        '复制文件名',
        async (evt) => {
            evt.stopPropagation();
            await writeText(substringAfterLast(path, "\\"));
            bubbleMenu.remove();
        }
    ));
    bubbleMenuList.appendChild(makeMenuItem(
        '复制路径',
        async (evt) => {
            evt.stopPropagation();
            await writeText(path);
            bubbleMenu.remove();
        }
    ));
    bubbleMenuList.appendChild(makeMenuItem(
        '重命名',
        async (evt) => {
            evt.stopPropagation();
            createContextRename(path);
            bubbleMenu.remove();
            element.remove();
        }
    ));
    bubbleMenuList.appendChild(makeMenuItem(
        '复制',
        async (evt) => {
            evt.stopPropagation();
            createContextCopy(path);
            bubbleMenu.remove();
        }
    ));
    bubbleMenuList.appendChild(makeMenuItem(
        '删除',
        (evt) => {
            evt.stopPropagation();
            createContextDelete(path, element);
            bubbleMenu.remove();
        }
    ));
    actionZip(bubbleMenuList, path, bubbleMenu);
    if (!isDirectory && /\.(?:txt|html|js|cs|c|css|cc|java|ini|md)$/.test(path))
        actionEdit(bubbleMenuList, path, bubbleMenu);
    if (!isDirectory && path.endsWith(".mp4")) {
        const directoryName = substringBeforeLast(path, "\\");
        const extension = substringAfterLast(path, ".");
        const name = substringBeforeLast(substringAfterLast(path, "\\"), ".");
        bubbleMenuList.appendChild(makeMenuItem(
            '转换',
            async (evt) => {
                evt.stopPropagation();
                const arguments = `-i "${path}" -vcodec libx264 \"${directoryName}\\${name}_已转码.${extension}\"`;
                const response = await fetch(`/api/cmd?fileName=ffmpeg&arguments=${encodeURIComponent(arguments)}&path=${encodeURIComponent(path)}`);
                await response.text();
                bubbleMenu.remove();
            }
        ));
        bubbleMenuList.appendChild(makeMenuItem(
            '播放',
            async (evt) => {
                evt.stopPropagation();
                NativeAndroid.playVideo(`${location.protocol}//${location.host}/api/files?path=${path}`);
                bubbleMenu.remove();
            }
        ));
        // 
    }
    if (!isDirectory && /\.(?:zip|epub)$/.test(path)) {
        bubbleMenuList.appendChild(makeMenuItem(
            '解压',
            async (evt) => {
                evt.stopPropagation();
                const response = await fetch(`/api/unzip?path=${encodeURIComponent(path)}`);
                const obj = await response.text();
                bubbleMenu.remove();
            }
        ));
    }
    /*if (isDirectory) {
        bubbleMenuList.appendChild(makeMenuItem(
            '格式化EPUB',
            async (evt) => {
                evt.stopPropagation();
                const response = await fetch(`/api/epub?path=${encodeURIComponent(path)}`);
                const obj = await response.text();
                renderItems(location.hash ? location.hash.substring(1) : "D:\\", groupList);
                bubbleMenu.remove();
            }
        ));
    }*/
    if (isDirectory) {


        bubbleMenuList.appendChild(makeMenuItem(
            '收藏',
            async (evt) => {
                evt.stopPropagation();
                const items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
                const index = items.indexOf(path);
                if (index === -1) {
                    items.push(path);
                    localStorage.setItem('items', JSON.stringify(items))
                }

                bubbleMenu.remove();
            }
        ));

        bubbleMenuList.appendChild(makeMenuItem(
            '下载',
            async (evt) => {
                evt.stopPropagation();
                const customDialog = document.createElement('custom-dialog');
                customDialog.title = "下载文件夹"
                customDialog.setAttribute("content", `确定下载 ${substringAfterLast(path, "\\")} 吗？`);
                document.body.appendChild(customDialog);
                customDialog.addEventListener('submit', evt => {
                    customDialog.remove();
                    window.open("/api/download?path=" + encodeURIComponent(path), "_blank");
                })
                bubbleMenu.remove();
            }
        ));


    }
    bubbleMenu.appendChild(bubbleMenuList);
    return bubbleMenu;
}


function makeMenuItem(name, fn) {
    const bubbleMenuItem = document.createElement('DIV');
    bubbleMenuItem.setAttribute('class', 'bubble-menu-item');
    const span = document.createElement('SPAN');
    span.appendChild(document.createTextNode(name));
    bubbleMenuItem.appendChild(span);
    bubbleMenuItem.addEventListener('click', fn);
    return bubbleMenuItem;
}

async function renderItems(path, groupList, pattern) {
    groupList.innerHTML = '';
    const items = await loadItems(path, pattern);
    const fragment = document.createDocumentFragment();
    for (const item of items) {
        fragment.appendChild(makeItem(item))
    }
    groupList.appendChild(fragment);
}

function substringAfterLast(string, delimiter, missingDelimiterValue) {
    const index = string.lastIndexOf(delimiter);
    if (index === -1) {
        return missingDelimiterValue || string;
    } else {
        return string.substring(index + delimiter.length);
    }
}

function substringBeforeLast(string, delimiter, missingDelimiterValue) {
    const index = string.lastIndexOf(delimiter);
    if (index === -1) {
        return missingDelimiterValue || string;
    } else {
        return string.substring(0, index);
    }
}

function writeString(message) {
    const textarea = document.createElement("textarea");
    textarea.style.position = 'fixed';
    textarea.style.right = '100%';
    document.body.appendChild(textarea);
    textarea.value = message;
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
}

async function writeText(string) {
    try {
        await navigator.clipboard.writeText(string)
    } catch (e) {
        if (typeof NativeAndroid !== "undefined") {
            NativeAndroid.writeText(string);
        } else {
            writeString(string);
        }
    }
}

function actionZip(bubbleMenuList, path, bubbleMenu) {
    async function touch() {
        const response = await fetch(`/api/zip?path=${encodeURIComponent(path)}`);
        await response.text();
    }

    bubbleMenuList.appendChild(makeMenuItem(
        '压缩',
        async (evt) => {
            evt.stopPropagation();
            await touch();
            bubbleMenu.remove();
        }
    ));
}

function actionEdit(bubbleMenuList, path, bubbleMenu) {
    bubbleMenuList.appendChild(makeMenuItem(
        '编辑',
        async (evt) => {
            evt.stopPropagation();
            bubbleMenu.remove();
            window.open("/editor.html?path=" + encodeURIComponent(path), "_blank")
        }
    ));
}