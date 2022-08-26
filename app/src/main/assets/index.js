/////////////////////////////////////////////////////////////////
const groupList = document.querySelector('.group-list');
refresh();
window.addEventListener('hashchange', evt => {
    renderItems(location.hash ? location.hash.substring(1) : "D:\\", groupList);
})
document.addEventListener('click', evt => {
    optionsMenu.style.visibility = 'hidden';
    document.querySelectorAll('.bubble-context-menu')
        .forEach(x => x.remove());
    let m = actionMore.querySelector('.bubble-menu');
    if (m)
        m.style.visibility = 'hidden';
})


const actionOptions = document.querySelector('.action-options');
const optionsMenu = actionOptions.querySelector('.bubble-menu');
const actionSearch = optionsMenu.querySelector('.action-search');
const actionDelete = document.querySelector('.action-delete');
const actionNewFolder = document.querySelector('.action-new-folder');
const actionRename = document.querySelector('.action-rename');


optionsMenu.style.width = '150px';
actionSearch.style.width = "100%";
actionSearch.addEventListener('click', evt => {
    evt.stopPropagation();
    optionsMenu.style.visibility = 'hidden';
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
    modalDialogTitle.appendChild(document.createTextNode('搜索'));
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
    input.placeholder = "输入正则表达式在当前目录中搜索";
    input.value = localStorage.getItem('search') || '';
    modalDialogBd.appendChild(input);
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
        localStorage.setItem('search', input.value);
        renderItems(location.hash ? location.hash.substring(1) : "D:\\", groupList, input.value);
        modal.remove();
    })
    requestAnimationFrame(() => {
        modal.classList.add('modal-show');
    })
    input.addEventListener('keydown', evt => {
        if (evt.keyCode === 13) {
            btnActive.click();
        }
    })
});
actionRename.addEventListener('click', evt => {
    evt.stopPropagation();
    optionsMenu.style.visibility = 'hidden';
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
    input.placeholder = "输入文件名或完整路径";

    modalDialogBd.appendChild(input);
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
        const groupItems = [...document.querySelectorAll('.group-item')].map(x => x.dataset.path);

        const response = await fetch(`/api/rename?newPath=${input.value}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(groupItems)
        })

        await response.json();
        modal.remove();
        renderItems(location.hash ? location.hash.substring(1) : "D:\\", groupList);
    })
    requestAnimationFrame(() => {
        modal.classList.add('modal-show');
    })
    input.addEventListener('keydown', evt => {
        if (evt.keyCode === 13) {
            btnActive.click();
        }
    })

});
actionNewFolder.addEventListener('click', evt => {
    evt.stopPropagation();
    optionsMenu.style.visibility = 'hidden';

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
    modalDialogTitle.appendChild(document.createTextNode('新建文件夹'));
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
        const path = location.hash ? location.hash.substring(1) : "D:\\";
        const response = await fetch(`/api/mkdir?path=${path}&name=${encodeURIComponent(input.value)}`);
        await response.text();
        modal.remove();
        renderItems(location.hash ? location.hash.substring(1) : "D:\\", groupList);

    })
    requestAnimationFrame(() => {
        modal.classList.add('modal-show');
    })
    input.addEventListener('keydown', evt => {
        if (evt.keyCode === 13) {
            btnActive.click();
        }
    })
});
actionDelete.addEventListener('click', async evt => {
    evt.stopPropagation();
    optionsMenu.style.visibility = 'hidden';
    makeAlertDialog("询问", '', async () => {
        await deleteCurrentFiles();
    });
});

actionOptions.addEventListener('click', evt => {
    evt.stopPropagation();
    optionsMenu.style.visibility = 'visible';
})

document.querySelectorAll('.bubble-menu-item[data-path]')
    .forEach(x => {
        x.addEventListener('click', evt => {
            evt.stopPropagation();
            optionsMenu.style.visibility = 'hidden';
            location.hash = x.dataset.path;
        })
    })

const actionUpload = document.querySelector('#action-upload');

actionUpload.addEventListener('click', actionUploadCallback)

function actionUploadCallback(evt) {
    evt.stopPropagation();
    const uploadFile = document.createElement('INPUT');
    uploadFile.style = 'position:fixed;left:-1000px;top:0';
    //uploadFile.accept = "image/*";
    uploadFile.type = 'file';
    uploadFile.multiple = true;
    document.body.appendChild(uploadFile);

    uploadFile.click();
    uploadFile.addEventListener('change', async ev => {
        const formData = new FormData();
        [...uploadFile.files].forEach(file => {
            formData.append('file', file, file.name);
        })
        const res = await fetch('/api/upload', {
            method: 'POST',
            cache: 'no-store',
            body: formData
        });
    });

}


async function createFolderListDialog() {

    /*  const modal = document.createElement('DIV');
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
      modalDialogTitle.appendChild(document.createTextNode('常见文件夹'));
      modalDialogHd.appendChild(modalDialogTitle);
      const iconPopClose = document.createElement('BUTTON');
      iconPopClose.setAttribute('aria-label', '关闭弹窗');
      iconPopClose.setAttribute('class', 'icon-pop-close');
      modalDialogHd.appendChild(iconPopClose);
      modalDialog.appendChild(modalDialogHd);
      const modalDialogBd = document.createElement('DIV');
      modalDialogBd.setAttribute('class', 'modal-dialog-bd');
      const div = document.createElement('DIV');
      div.style.padding = '16px';
      div.style.maxHeight = '300px';
      div.style.overflowY = 'scroll';
  
      //const response = await fetch('/api/folders');
      const folders = localStorage.getItem("folders");
      const items = folders ? JSON.parse(folders) : [
          "C:\\Users\\Administrator\\Desktop",
          "C:\\Users\\Administrator\\Downloads",
          "D:\\文档\\阅读"
      ];
  
      items.forEach(x => {
          const modalListItem = document.createElement('DIV');
          modalListItem.setAttribute('class', 'modal-list-item');
          modalListItem.textContent = substringAfterLast(x, "\\");
          modalListItem.dataset.path = x;
          div.appendChild(modalListItem);
          modalListItem.addEventListener('click', evt => {
              modal.remove();
              location.hash = encodeURIComponent(modalListItem.dataset.path);
          })
      })
  
      modalDialogBd.appendChild(div);
      modalDialog.appendChild(modalDialogBd);
      const modalDialogFt = document.createElement('DIV');
      modalDialogFt.setAttribute('class', 'modal-dialog-ft');
  
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
  
      requestAnimationFrame(() => {
          modal.classList.add('modal-show');
      })*/

    const menuContainer = document.createElement('div');

    [
        [
            "position",
            "fixed"
        ],
        [
            "top",
            "0"
        ],
        [
            "left",
            "0"
        ],
        [
            "right",
            "0"
        ],
        [
            "bottom",
            "0"
        ],
        [
            "display",
            "flex"
        ],
        [
            "WebkitBoxAlign",
            "center"
        ],
        [
            "alignItems",
            "center"
        ],
        [
            "WebkitBoxPack",
            "center"
        ],
        [
            "justifyContent",
            "center"
        ],
        [
            "zIndex",
            "4"
        ]
    ]
        .forEach(x => menuContainer.style[x[0]] = x[1]);

    const menuContent = document.createElement('div');

    [
        [
            "position",
            "relative"
        ],
        [
            "zIndex",
            "2"
        ],
        [
            "maxHeight",
            "100%"
        ],
        [
            "overflowY",
            "auto"
        ],
        [
            "color",
            "#030303"
        ],
        [
            "backgroundColor",
            "#f9f9f9"
        ],
        [
            "padding",
            "3px"
        ],
        [
            "minWidth",
            "250px"
        ],
        [
            "maxWidth",
            "356px"
        ],
        [
            "margin",
            "40px"
        ]
    ]
        .forEach(x => menuContent.style[x[0]] = x[1]);

    const ytmMenuItem = document.createElement('div');

    [
        [
            "display",
            "block"
        ],
        [
            "padding",
            "3px 0"
        ],
        [
            "maxHeight",
            "300px"
        ]
    ]
        .forEach(x => ytmMenuItem.style[x[0]] = x[1]);

    const menuItemButton = document.createElement('button');

    [
        [
            "border",
            "none"
        ],
        [
            "outline",
            "none"
        ],
        [
            "font",
            "inherit"
        ],
        [
            "color",
            "inherit"
        ],
        [
            "background",
            "transparent"
        ],
        [
            "cursor",
            "pointer"
        ],
        [
            "boxSizing",
            "border-box"
        ],
        [
            "display",
            "block"
        ],
        [
            "fontSize",
            "16px"
        ],
        [
            "padding",
            "9px 12px"
        ],
        [
            "textAlign",
            "initial"
        ],
        [
            "textTransform",
            "unset"
        ],
        [
            "width",
            "100%"
        ],
        ['display', 'flex'],
        ['alignItems', 'center'],
        ['justifyContent', 'space-between'],
    ]
        .forEach(x => menuItemButton.style[x[0]] = x[1]);

    const c3Overlay = document.createElement('div');

    [
        [
            "position",
            "fixed"
        ],
        [
            "top",
            "0"
        ],
        [
            "bottom",
            "0"
        ],
        [
            "left",
            "0"
        ],
        [
            "right",
            "0"
        ],
        [
            "zIndex",
            "1"
        ],
        [
            "cursor",
            "pointer"
        ],
        [
            "backgroundColor",
            "rgba(0,0,0,0.8)"
        ]
    ]
        .forEach(x => c3Overlay.style[x[0]] = x[1]);

    const hiddenButton = document.createElement('button');

    [
        [
            "padding",
            "0"
        ],
        [
            "border",
            "none"
        ],
        [
            "outline",
            "none"
        ],
        [
            "font",
            "inherit"
        ],
        [
            "textTransform",
            "inherit"
        ],
        [
            "color",
            "inherit"
        ],
        [
            "background",
            "transparent"
        ],
        [
            "cursor",
            "pointer"
        ],
        [
            "position",
            "fixed"
        ],
        [
            "top",
            "0"
        ],
        [
            "left",
            "0"
        ],
        [
            "height",
            "1px"
        ],
        [
            "width",
            "1px"
        ]
    ]
        .forEach(x => hiddenButton.style[x[0]] = x[1]);


    const menuItemButton1 = menuItemButton.cloneNode();
    ytmMenuItem.appendChild(menuItemButton1);
    menuItemButton1.textContent = "首页";
    menuItemButton1.addEventListener('click', evt => {
        location.href = '/';
    })

    ytmMenuItem.appendChild(menuItemButton);
    menuItemButton.textContent = "帮助";
    menuItemButton.addEventListener('click', evt => {
        location.href = '/help.html';
    });

    let items =
        [
            "/storage/FD12-1F1D"
        ];
    if (localStorage.getItem('items')) {
        items.push(...JSON.parse(localStorage.getItem('items')));
    }
    items.forEach(x => {
        const menuItemButton2 = menuItemButton.cloneNode();
        ytmMenuItem.appendChild(menuItemButton2);
        const div = document.createElement('div');
        div.textContent = substringAfterLast(x, "\\");
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z');
        svg.appendChild(path);
        svg.style.width = '24px';
        svg.style.height = '24px';
        menuItemButton2.appendChild(div);
        menuItemButton2.appendChild(svg);
        menuItemButton2.addEventListener('click', evt => {
            location.hash = encodeURIComponent(x);
            menuContainer.remove();
        });
        svg.addEventListener('click', evt => {
            if (localStorage.getItem('items')) {
                const items = JSON.parse(localStorage.getItem('items'));
                const index = items.indexOf(x);
                if (index !== -1) {
                    items.splice(index, 1);
                }
                localStorage.setItem('items', JSON.stringify(items))
            }
        })
    })


    menuContent.appendChild(ytmMenuItem);

    menuContainer.appendChild(menuContent);
    c3Overlay.appendChild(hiddenButton);
    menuContainer.appendChild(c3Overlay);
    document.body.appendChild(menuContainer);

    c3Overlay.addEventListener('click', evt => {
        menuContainer.remove();
    });
}


const actionNewFile = document.querySelector('.action-new-file');

function actionNewFileCallback(evt) {
    evt.stopPropagation();
    optionsMenu.style.visibility = 'hidden';
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
    modalDialogTitle.appendChild(document.createTextNode('新建文件'));
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
    input.placeholder = "输入文件名";
    modalDialogBd.appendChild(input);
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
        const path = location.hash ? location.hash.substring(1) : "D:\\";
        const response = await fetch(`/api/new?path=${path}&fileName=${encodeURIComponent(input.value)}`);
        await response.text();

        modal.remove();
    })
    requestAnimationFrame(() => {
        modal.classList.add('modal-show');
    })
    input.addEventListener('keydown', evt => {
        if (evt.keyCode === 13) {
            btnActive.click();
        }
    })
}

actionNewFile.addEventListener('click', actionNewFileCallback);


const actionMore = document.querySelector('.action-more');

function actionMoreCallback(evt) {
    evt.stopPropagation();
    /* actionMore.querySelector('.bubble-menu')
         .style.visibility = 'visible';*/
    createFolderListDialog();
}

actionMore.addEventListener('click', actionMoreCallback);


/*
const actionFavorite = document.querySelector('.action-favorite');

function actionFavoriteCallback(evt) {
    evt.stopPropagation();
    actionMore.querySelector('.bubble-menu')
        .style.visibility = 'hidden';
    createFolderListDialog();

}

actionFavorite.addEventListener('click', actionFavoriteCallback);
*/

appendOrderOptions();

function appendOrderOptions() {
    const Pg70bf = document.createElement('div');

    [
        [
            "display",
            "flex"
        ],
        [
            "width",
            "100%"
        ],
        [
            "fontSize",
            "12px"
        ],
        [
            "lineHeight",
            "37px"
        ],
        [
            "overflowX",
            "auto"
        ],
        [
            "WebkitBoxPack",
            "justify"
        ],
        [
            "justifyContent",
            "space-between"
        ],
        [
            "borderBottom",
            "1px solid #dadce0"
        ],
        [
            "boxShadow",
            "0px 1px 3px 0px rgba(60, 64, 67, 0.08)"
        ],
        [
            "height",
            "36px"
        ],
        /* [
             "padding",
             "0 8px"
         ],
         [
             "marginLeft",
             "-8px"
         ],
         [
             "marginRight",
             "-8px"
         ]*/
    ]
        .forEach(x => Pg70bf.style[x[0]] = x[1]);

    const a = document.createElement('div');

    [
        [
            "textDecoration",
            "none"
        ],
        [
            "color",
            "#70757a"
        ],
        [
            "textAlign",
            "center"
        ],
        [
            "textTransform",
            "uppercase"
        ],
        [
            "flex",
            "none"
        ],
        [
            "display",
            "block"
        ],
        [
            "padding",
            "0 16px"
        ]
    ]
        .forEach(x => a.style[x[0]] = x[1]);

    const span = document.createElement('div');

    [
        [
            "textAlign",
            "center"
        ],
        [
            "textTransform",
            "uppercase"
        ],
        [
            "flex",
            "none"
        ],
        [
            "display",
            "block"
        ],
        [
            "padding",
            "0 16px"
        ],
        [
            "fontWeight",
            "bold"
        ],
        [
            "color",
            "#1a73e8"
        ],
        [
            "borderBottom",
            "2px solid #4285f4"
        ]
    ]
        .forEach(x => span.style[x[0]] = x[1]);

    //Pg70bf.appendChild(span);
    a.textContent = "名称";
    Pg70bf.appendChild(a);

    ["大小", "修改时间", "递增", "递减"]
        .forEach((x, k) => {
                const size = a.cloneNode();
                size.textContent = x;
                Pg70bf.appendChild(size);

                size.addEventListener('click', evt => {
                    const order = localStorage.getItem('order');
                    let o = 2;
                    if (order) {
                        o = parseInt(order);
                    }

                    const b = o & 1;
                    if (k === 0) {
                        if (b) {
                            o = 5;
                        } else {
                            o = 4;
                        }
                    }
                    if (k === 1) {
                        if (b) {
                            o = 9;
                        } else {
                            o = 8;
                        }
                    }
                    if (k === 2) {

                        if (b) {
                            o = o ^ 1;
                        }
                    }
                    if (k === 3) {
                        if (!b) {
                            o = o ^ 1;
                        }
                    }
                    localStorage.setItem('order', o.toString());
                    refresh();

                });
            }
        );

    a.addEventListener('click', evt => {
        console.log('---------------------')
        const order = localStorage.getItem('order');
        let o = 2;
        if (order) {
            o = parseInt(order);
        }
        const b = o & 1;
        if (b) {
            o = 3;
        } else {
            o = 2;
        }
        localStorage.setItem('order', o.toString());

        refresh();

    })


    groupList.insertAdjacentElement('beforebegin', Pg70bf);

    /*
    10 名称递增 2
    11 名称递减 3
    100 大小 4
    101 5
    1000 修改时间 8
    1001 9
    
    1 & 1 == 1 区别递增递减
    (3>>>0).toString(2); parseInt('',2)
     */
}

function refresh() {
    renderItems(location.hash ? location.hash.substring(1) : "", groupList);
}
