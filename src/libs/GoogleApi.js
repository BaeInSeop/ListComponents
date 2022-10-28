import axios from "axios";

const DOMAIN = "https://baronote.com";
const GOOGLE_API =
  "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";

// const fileUpload = async ( file, head ) => {
//   const { google } = require( "googleapis" );
//   var res = await getToken();
//   if ( res.status ) {
//     const ACCESS_TOKEN = res.token;
//     const drive = google.drive( {
//       version: "v3",
//       headers: {
//         Authorization: `Bearer ${ ACCESS_TOKEN }`,
//       },
//     } );

//     const res = await drive.files.create( {
//       requestBody: {
//         name: file.name,
//         mimeType: "application/octet-stream",
//       },
//       media: {
//         mimeType: "application/octet-stream",
//         body: file,
//       },
//     } );
//     console.log( res.data );
//   }
// };

const fileUpload = async (file, head, callback) => {
  var { token } = await getToken();
  const fileMeta = await createFileMetadata(file, head);

  const formData = new FormData();
  formData.append("options", fileMeta);
  formData.append("file", file);

  const res = await axios({
    method: "post",
    url: GOOGLE_API,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  callback && callback(res.data.id);
};

const getHead = () => {
  return new Promise((resolve, reject) => {
    console.log("getHead");

    axios
      .post("/api/google/init")
      .then((res) => {
        if (200 === res.data.resCode) {
          resolve({ status: true, head: res.data.resData.head });
        } else {
          reject({ status: false });
        }
      })
      .catch(() => {
        reject({ status: false });
      });
  });
};

const getToken = () => {
  return new Promise((resolve, reject) => {
    console.log("getToken");

    axios
      .get("/api/google/token")
      .then((res) => {
        if (200 === res.data.resCode) {
          resolve({ status: true, token: res.data.resData.token });
        } else {
          reject({ status: false });
        }
      })
      .catch(() => {
        reject({ status: false });
      });
  });
};

const createFileMetadata = async ({ name }, head) => {
  if (!head) head = (await getHead()).head;

  console.log("[createFileMetadata] head  => ", head);

  const fileOption = {
    name: name,
    parents: [head],
  };

  const blob = new Blob([JSON.stringify(fileOption)]);
  return new File([blob], "options.json", { type: "application/json" });
};

export { fileUpload };
