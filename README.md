# @bis0212/ListComponents

## How To Install

```
# NPM
npm npm i @bis0212/listcomponents

# Yarn
yarn add @bis0212/listcomponents
```

## Example

```js
 import ListComponent from "@bis0212/listcomponents";
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
| resizeWidth          |          |   Number | Resizing border width               | 10      |
| maximumRowCount      |          |   Number | display Item Count                  | 100     |
| useAddPopup          |          |  Boolean | Display Add Utility Button          | true    |
| useSearchFilter      |          |  Boolean | Display Search Filter               | true    |
| useFolderPath        |          |  Boolean | Display Folder Path                 | true    |
| usePagination        |          |  Boolean | Display Pagination                  | true    |
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

## `items - Props`

| Key       | Required |   Type | Example                                           |
| --------- | :------: | -----: | ------------------------------------------------- |
| id        |    V     | Number | 0,1,2 etc ...                                     |
| name      |    V     | String | "Test_File", "Test_Folder" etc ...                |
| extension |    V     | String | "folder", "file", "note", "pdf" etc...            |
| lastwork  |    V     |   Date | new Date()                                        |
| path      |    V     | String | 'home', 'home/Test_Folder', etc ...               |
| status    |    V     | Number | 0, 1, 2 (0 - Not Use / 1 - Can Use / 2 - Loading) |
