# @baronote/ListComponents

## How To Install

```
# NPM
npm i @baronote/listcomponents

# Yarn
yarn add @baronote/listcomponents
```

## Usage

```js
import ListComponent from "@baronote/listcomponents";

...

const columns = React.useMemo(
  () => [
    {
      accessor: "col1", // accessor is the "key" in the data
      type: "checkbox", // if not define, Default text
      width: 50, // if not define, Default 150
    },
    {
      accessor: "col2", // accessor is the "key" in the data
      type: "text", // if not define, Default text
    },
    {
      accessor: "col3",
    },
  ],
  []
);

const records = React.useMemo(
  () => [
    {
      col1: true,
      col2: "Hello",
      col3: "World",
    },
    {
      col1: false,
      col2: "안녕",
      col3: "하세요",
    },
  ],
  []
);

return (
  <ListComponent
    columns={columns}
    records={records}
    onMoveRow={(dragIndex, hoverIndex, movedItem, droppedRow) => {}}
    onClickItem={(item) => {}}
    onContextMenu={(row, event) => {}}
    onFileDrop={(droppedFile) => {}}
    onSelectedRows={(records) => {}}
  />
);
```

## `Column - Props`

| Key      | Required |   Type | Desc                  | Vaild Values                                    |
| -------- | :------: | -----: | --------------------- | ----------------------------------------------- |
| accessor |    V     |  Array | Access to Record Key  |                                                 |
| type     |          | String | Resizing border width | text, time, icon, avatar, link, checkbox, image |
| width    |          | Number | Define Column Width   | 50, 120, 300 etc ...                            |

## `Record - Value by Type`

| Header Type |  Value  |                                                                        Example |
| ----------- | :-----: | -----------------------------------------------------------------------------: |
| text        | String  |                                          'Hong Gil Dong', 'Hi, Hello', etc ... |
| time        |  Date   |                                                           new Date(), moment() |
| icon        | String  |                           'folder', 'file', 'pdf', 'image', 'audio', 'loading' |
| avatar      | String  |                                              'Hong', '홍길동', 'John', etc ... |
| link        | String  |                                                'http://www.google.com', etc... |
| checkbox    | Boolean |                                                                    true, false |
| image       | String  | 'https://cdn3.iconfinder.com/data/icons/feather-5/24/download-512.png', etc... |

## Example

```js
const columns = React.useMemo(
  () => [
    {
      accessor: "checkbox",
      type: "checkbox",
      width: 50,
    },
    {
      accessor: "title",
      type: "text",
    },
    {
      accessor: "modified",
      type: "time",
    },
    {
      accessor: "extension",
      type: "icon",
      width: 50,
    },
    {
      accessor: "profile",
      type: "avatar",
    },
    {
      accessor: "link",
      type: "link",
    },
    {
      accessor: "thumbnail",
      type: "image",
    },
  ],
  []
);

const records = React.useMemo(
  () => [
    {
      checkbox: false,
      title: "Sample_1",
      modified: new Date(),
      extension: "folder",
      profile: "Sample",
      link: "https://www.google.com",
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/feather-5/24/download-512.png",
    },
    {
      checkbox: true,
      title: "Test_File",
      extension: "file",
      profile: "Test",
      link: "https://www.naver.com",
      thumbnail:
        "https://cdn4.iconfinder.com/data/icons/pop-scenes/1000/navigation___explore_space_exploration_astronaut_planets_planet-512.png",
    },
    {
      checkbox: true,
      title: "Test_Pdf",
      modified: moment(),
      extension: "pdf",
    },
  ],
  []
);
```

![Sample Image](https://i.ibb.co/nnGrZX5/sample.jpg)
