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
      readOnly : true // Default is False
    },
  ],
  []
);

return (
  <ListComponent columns={columns} records={records} />
);
```

## `ListComponent - Props`

| Key           | Required |     Type | Desc                              | Default                           |
| ------------- | :------: | -------: | --------------------------------- | --------------------------------- |
| columns       |    V     |    Array | Define Columns                    |                                   |
| records       |    V     |    Array | Define Records                    |                                   |
| rowHeight     |          |   Number | Resize Row Height                 | 50                                |
| avatarProps   |          |   Object | Custom Avatar type Props          | size : 30, round : 50%            |
| rowIconProps  |          |   Object | Custom Icon type Props            | size : 30, icons : react-icons/fa |
| linkProps     |          |   Object | Custom Link type Props            | target : \_blank, text : value    |
| imageProps    |          |   Object | Custom Thumbnail type Props       | target : \_blank, size : 30       |
| timeFormat    |          |   String | Custom Time type Props            | YYYY-MM-DD HH:mm:ss               |
| useBackward   |          |  Boolean | Display Backward                  | false                             |
| onBackward    |          | Function | Callback when backward clicked    |                                   |
| onMoveRecord  |          | Function | Callback when record moved        |                                   |
| onClickRecord |          | Function | Callback when record clicked      |                                   |
| onContextMenu |          | Function | Callback when mouse right clicked |                                   |
| onFileDrop    |          | Function | Callback when local file dropped  |                                   |

## `Column - Props`

| Key      | Required |   Type | Desc                  | Vaild Values                                    |
| -------- | :------: | -----: | --------------------- | ----------------------------------------------- |
| accessor |    V     | String | Access to Record Key  |                                                 |
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

## `Record - Other Props`

| Key      | Required | Type    | Desc              | Default |
| -------- | -------- | ------- | ----------------- | ------- |
| checked  | V        | Boolean | IsCheck Row       | false   |
| readOnly |          | Boolean | Css - Opacity 0.5 | false   |

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
      title: "Sample_1",
      modified: new Date(),
      extension: "folder",
      profile: "Sample",
      link: "https://www.google.com",
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/feather-5/24/download-512.png",
      checked: false,
    },
    {
      title: "Test_File",
      extension: "file",
      profile: "Test",
      link: "https://www.naver.com",
      thumbnail:
        "https://cdn4.iconfinder.com/data/icons/pop-scenes/1000/navigation___explore_space_exploration_astronaut_planets_planet-512.png",
      checked: false,
    },
    {
      title: "Test_Pdf",
      modified: moment(),
      extension: "loading",
      readOnly: true,
      checked: false,
    },
  ],
  []
);
```

![Sample Image](https://i.ibb.co/nnGrZX5/sample.jpg)

## User Custom

### want to resize Row height ?

```js
<ListComponent columns={columns} records={records} rowHeight={90} />
```

### want to custom Icons ?

```js
<ListComponent
  columns={columns}
  records={records}
  iconProps={{
    size: 25,
    icons: {
      folder:
        "https://cdn3.iconfinder.com/data/icons/feather-5/24/folder-512.png",
      file: <FaRegFile />,
    },
  }}
/>
```

※ You can use react-icons and image url
And also can add icon key

### want to custom Avatar size or round ?

```js
<ListComponent
  columns={columns}
  records={records}
  avatarProps={{
    size: 25,
    round: "20%",
  }}
/>
```

### want to custom Link property ?

```js
<ListComponent
  columns={columns}
  records={records}
  linkProps={{
    target: "_self",
    text: "Go to Link",
  }}
/>
```

### want to custom Thumbnail size ?

```js
<ListComponent
  columns={columns}
  records={records}
  imageProps={{
    target: "_self",
    size: 40,
  }}
/>
```

### want to custom Timeformat ?

```js
<ListComponent columns={columns} records={records} timeFormat={"YY/MM/DD"} />
```
