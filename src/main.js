var encryptType = 'morse';

function switch_box(btn) {
    if (btn == 'morse') {
        document.getElementById("unicode").classList.remove("switch-active");
        document.getElementById("type-info").innerHTML = '支持小写英文+数字+中文';
        encryptType = 'morse';
    } else {
        document.getElementById("morse").classList.remove("switch-active");
        document.getElementById("type-info").innerHTML = '支持全部字符';
        encryptType = 'unicode';
    }
    document.getElementById(btn).classList.add("switch-active");

}

function handleIncode() {

    let code = '';
    incodes = document.getElementById("incodes").value;
    if (encryptType === 'morse') {
        let ch_Z = incodes.match(/[\u4e00-\u9fa5]+/g)
        if (ch_Z) {
            incodes = incodes.replace(/[\u4e00-\u9fa5]/g, function (t) {
                return '\\u' + parseInt(t.charCodeAt(0), 10).toString(16)
            })
        }

        code = incode(incodes, document.getElementById("plaintext_before").value, document.getElementById(
            "plaintext_after").value);

    } else if (encryptType === 'unicode') {
        code = incodeByUnicode(incodes, document.getElementById("plaintext_before").value, document.getElementById(
            "plaintext_after").value);
    }

    let html = '';
    document.getElementById("outcodes").innerHTML = html;
    for (let i in code) {
        setTimeout(() => {
            // html += code[i]
            document.getElementById("outcodes").innerHTML += code[i]
        }, 5 * i);
    }
    document.getElementById("string").innerHTML = code;
}

function handleDecode() {
    let willDecode = document.getElementById("will_decode").value;
    let outcodes = '';

    if (encryptType === 'morse') {
        let code = decode(willDecode);
        outcodes = code.join('');
        outcodes = outcodes.replace(/\\u[0-9a-z]{4}/g, (t) => {
            return String.fromCharCode(parseInt(t.replace('\\u', ''), 16))
        })
    } else if (encryptType === 'unicode') {
        outcodes = decodeByUnicode(willDecode);
    }

    document.getElementById("outcodes").innerHTML = outcodes;
}

function copyCodes() {
    copyToClipboard('string');
}

function copyToClipboard(elementId) {
    // 创建元素用于复制
    var aux = document.createElement("input");
    // 获取复制内容
    var content = document.getElementById(elementId).innerHTML || document.getElementById(elementId).value;
    // 设置元素内容
    aux.setAttribute("value", content);
    // 将元素插入页面进行调用
    document.body.appendChild(aux);
    // 复制内容
    aux.select();
    // 将内容复制到剪贴板
    document.execCommand("copy");
    // 删除创建元素
    document.body.removeChild(aux);
    //提示
    document.getElementById("message").classList.add("message-show");
    setTimeout(() => {
        document.getElementById("message").classList.remove("message-show");
    }, 2000);

}