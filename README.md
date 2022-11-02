# @baronote/ListComponents

## How To Install

```
# NPM
npm i @baronote/listcomponents

# Yarn
yarn add @baronote/listcomponents
```

## Example

```js
 import ListComponent from "@baronote/listcomponents";
    ...
 return <ListComponent
   header = {[]}
   items = {[]}
   resizeWidth = {3}
   maximumRowCount = {10}
   totalCount={30}
   useAddPopup = {true}
   useSearchFilter = {true}
   useFolderPath = {true}
   usePagination = {true}
   useColumn = {true}
   onChangeColumnWidth = {(column) => {}}
   onChangeColumnOrder = {(column) => {}}
   onAddFolder = {(currentFolder) => {}}
   onMoveRow = {(dragIndex, hoverIndex) => {}}
   onMoveItemToFolder = {(checkList, row) => {}}
   onChangeHiddenColumn = {(column) => {}}
   onChangeCurrentPage = {(page) => {}}
   onChangePath = {(path) => {}}
   onUpdateItem = {(item) => {}}
   onDeleteItem = {(item) => {}}
   onClickItem ={(item) => {}}
    />;
```

## `Props`

| Key                  | Required |     Type | Desc                                | Default |
| -------------------- | :------: | -------: | ----------------------------------- | ------- |
| header               |    V     |    Array | Define Column Information           |         |
| items                |    V     |    Array | Define Row Information              |         |
| resizeWidth          |          |   Number | Resizing border width               | 3       |
| maximumRowCount      |          |   Number | display Item Count                  | 10      |
| totalCount           |          |   Number | Total Item Count                    | 100     |
| useAddPopup          |          |  Boolean | Display Add Utility Button          | true    |
| useSearchFilter      |          |  Boolean | Display Search Filter               | true    |
| useFolderPath        |          |  Boolean | Display Folder Path                 | true    |
| usePagination        |          |  Boolean | Display Pagination                  | true    |
| useColumn            |          |  Boolean | Display Column                      | true    |
| onChangeColumnWidth  |          | Function | Callback when changed Column Width  |         |
| onChangeColumnOrder  |          | Function | Callback when changed Column Order  |         |
| onAddFolder          |          | Function | Callback when Add Folder            |         |
| onMoveRow            |          | Function | Callback when Move Row              |         |
| onMoveItemToFolder   |          | Function | Callback when Item Move into Folder |         |
| onChangeHiddenColumn |          | Function | Callback when Change Hidden Column  |         |
| onChangeCurrentPage  |          | Function | Callback when Change Current Page   |         |
| onChangePath         |          | Function | Callback when Change Path           |         |
| onUpdateItem         |          | Function | Callback when Update Item           |         |
| onDeleteItem         |          | Function | Callback when Delete Item           |         |
| onClickItem          |          | Function | Callback when Click Item            |         |

## `header - Props`

| Key             | Required |    Type | Example              | Default |
| --------------- | :------: | ------: | -------------------- | ------- |
| header          |    V     |  String | Name, Title, etc ... |         |
| accessor        |    V     |  String | name, title, etc ... |         |
| maxWidth        |          |  Number | 50, 300, etc...      |         |
| minWidth        |          |  Number | 50, 300, etc...      |         |
| width           |          |  Number | 50, 300, etc...      | 150     |
| disableResizing |          | Boolean | true, false          | false   |
| show            |          | Boolean | true, false          | false   |
| disableSortBy   |          | Boolean | true, false          | false   |

## `items - Default Props`

| Key       | Required |   Type | Example                                           |
| --------- | :------: | -----: | ------------------------------------------------- |
| name      |    V     | String | "Test_File", "Test_Folder" etc ...                |
| extension |    V     | String | "folder", "file", "note", "pdf" etc...            |
| lastwork  |    V     |   Date | new Date()                                        |
| path      |    V     | String | 'home', 'home/Test_Folder', etc ...               |
| status    |    V     | Number | 0, 1, 2 (0 - Not Use / 1 - Can Use / 2 - Loading) |

## Example

```js
const items = [
  {
    name: "Cannot_Use_File",
    extension: "pdf",
    lastwork: new Date(),
    path: "home",
    status: 0,
  },
  {
    name: "Test_Folder",
    extension: "folder",
    lastwork: new Date(),
    path: "home",
    status: 1,
  },
  {
    name: "Test_File",
    extension: "file",
    lastwork: new Date(),
    path: "home",
    status: 2,
  },
];

const columns = [
  {
    Header: "Name",
    accessor: "name", // accessor is the "key" in the data
  },
  {
    Header: "Extension",
    accessor: "extension",
  },
  {
    Header: "LastWork",
    accessor: "name",
  },
  {
    Header: "Action",
    accessor: "action", // if you want some event
  },
];
```
