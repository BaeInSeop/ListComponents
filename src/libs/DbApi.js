import axios from "axios";
import { resolve } from "path";
import { getExtension } from "./CommonUtil";

const API_FOLDERS = "/api/db/folders/";
const API_FILES = "/api/db/files/";

/**
 *
 * @param {*} folderKey
 * @param {*} contentsType 1: 파일, 2: 노트
 * @returns
 */
const selectFolder = (folderKey, contentsType, isIncludeContents) => {
  return new Promise((resolve, reject) => {
    const url = `${API_FOLDERS}${folderKey}?isIncludeContents=${isIncludeContents}&contentsType=${contentsType}`;

    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject({ status: false, desc: e });
      });
  });
};

/**
 * 폴더 생성
 * @param {name, parentKey, type} param 폴더
 * @returns
 */
const insertFolder = (folder) => {
  return new Promise((resolve, reject) => {
    const url = `${API_FOLDERS}`;

    axios
      .post(url, folder)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject({ status: false, desc: e });
      });
  });
};

/**
 * 폴더 수정
 * @param {name, parentKey, type} param 폴더
 * @returns
 */
const updateFolder = (folder) => {
  return new Promise((resolve, reject) => {
    const url = `${API_FOLDERS}${folder.pk}`;

    axios
      .put(url, folder)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject({ status: false, desc: e });
      });
  });
};

/**
 * 폴더 삭제
 * @param {} folder
 * @returns
 */
const deleteFolder = (folder) => {
  return new Promise((resolve, reject) => {
    const url = `${API_FOLDERS}${folder.pk}`;
    axios
      .delete(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject({ status: false, desc: e });
      });
  });
};

/**
 *
 * @param {*} file
 * @returns
 */
const insertFile = (file) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API_FILES, file)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject({ status: false, desc: e });
      });
  });
};

const deleteFile = (file) => {
  return new Promise(() => {
    resolve();
  });
};

export { selectFolder, insertFolder, updateFolder, deleteFolder, insertFile };
