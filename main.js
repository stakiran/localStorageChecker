'use strict';

class LocalStorageManager {
    // @param storageInst a window.localStorage
    constructor(storageInst){
        this._storage = storageInst;
    }

    setItem(k, v){
        this._storage.setItem(k, v);
    }

    // @retval null if the key 'k' is not found.
    getItem(k){
        return this._storage.getItem(k);
    }

    removeItem(k){
        this._storage.removeItem(k);
    }
}

function rnd(n){
    return Math.floor(Math.random()*n);
}

function generateRandomString(){
    const table = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const len = 3;
    let retStr = ''
    for(let i=0;i<len;i++){
        const curChar = table.charAt(rnd(table.length));
        retStr += curChar;
    }
    return retStr;
}

function writeMessage(msg){
    const selector = '#messages';
    const html = `<p>${msg}</p>`;
    $('#messages').append(html);
}

$(function(){
    let ls = window.localStorage;
    if(ls == null){
        writeMessage('[Failed] ローカルストレージは無効です。（ブラウザの設定により無効または不許可になっている等が考えられます）');
        return;
    }

    const ROOTKEY = 'localStorageChecker';
    let localstorageManager = new LocalStorageManager(window.localStorage);

    const setteeData = generateRandomString();

    const gotData = localstorageManager.getItem(ROOTKEY);
    if(gotData){
        writeMessage(`[OK] 読み込まれたデータは ${gotData} です。`);
    }

    try{
        localstorageManager.setItem(ROOTKEY, setteeData);
    }catch(e){
        writeMessage('[Failed] ローカルストレージのデータの書き込みに失敗しました。（空き容量が足らないか、Safari ブラウザでプライベートモードになっているか等が考えられます）');
    }
    writeMessage(`[OK] 書き込まれたデータは ${setteeData} です。`);

    writeMessage(`指示(1) このページをリロードして、データ ${setteeData} が読み込まれることを確認してください。`);

    writeMessage(`指示(2) ブラウザを再起動して、データ ${setteeData} が読み込まれることを確認してください。`);

    writeMessage(`指示 (1) (2) を行っても読み込まれない場合、ブラウザの設定により「ブラウザ終了時にデータを削除する」または「普段はデータを保存しないが許可サイトに限りブラウザ終了時までは保存する」になっている等が考えられます。`);
});
