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


$(function(){
    const ROOTKEY = 'localStorageChecker';
    let localstorageManager = new LocalStorageManager(window.localStorage);

    const setteeData = generateRandomString();

    // Firefox で不許可にした場合、window.localStorage ← これが null になる
    const gotData = localstorageManager.getItem(ROOTKEY);
    localstorageManager.setItem(ROOTKEY, setteeData);
});
