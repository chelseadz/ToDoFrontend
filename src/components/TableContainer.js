import React, {useMemo}from "react"
import { useTable} from "react-table"

const TableContainer = ({onDelete, onUpdate, onDone, data, sortDone, sortPriority, sortDueDate}) => {

  const handleChange = (e) => {
    const checked = e.target.checked;
    const checkedValue = e.target.value;
    const checkedName = e.target.name;
    if(checkedName === 'done'){
      sortDone(checked)
    }
    if(checkedName === 'priority'){
      sortPriority(checked)
    }
    if(checkedName === 'dueDate'){
      sortDueDate(checked)
    }
    if(checkedName === 'setDone'){
      onDone(checkedValue, checked)
    }
    };
  
  const columns = useMemo(
    () => [
      {
        Header: "Done",
        accessor: "done",
      },
      {
        Header: "Name",
        accessor: "text",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
      }
    ],
    []
  )

  const getBackgroundColor = (dueDate) => {
    if (!dueDate) return "";
    const currentDate = new Date();
    const due = new Date(dueDate);
    const diffInDays = Math.ceil((due - currentDate) / (1000 * 60 * 60 * 24));

    if (diffInDays <= 7) return "red";
    if (diffInDays <= 14) return "yellow";
    return "green";
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data,}
  )

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th>Done
              <input
              type="checkbox"
              name="done"
              onChange={(e) => handleChange(e)}/>
            </th>
            <th>Name</th>
            <th>
              Priority
              <input
              type="checkbox"
              name="priority"
              onChange={(e) => handleChange(e)}/>
            </th>
            <th>
              Due Date
              <input
              type="checkbox"
              name="dueDate"
              onChange={(e) => handleChange(e)}/>
            </th>
          </tr>

        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            const date = new Date(row.original.dueDate).toLocaleDateString('es-MX');
            const backgroundColor = getBackgroundColor(row.original.dueDate);
            const textDecoration = row.original.done ? "line-through" : "none";
            return (
              <tr 
              key={row.id} {...row.getRowProps()}
              style={{ backgroundColor, textDecoration }} >
                <td>
                  <input 
                  type="checkbox"
                  name="setDone" 
                  value={row.original.id} 
                  checked={row.original.done} 
                  onChange={(e) => handleChange(e)}>
                  </input>
                </td>
                <td >
                  {row.original.text}
                </td>
                <td >
                  {row.original.priority}
                </td>
                <td >
                  {(row.original.dueDate) ? date : ''}
                </td>
                <td>
                  <button onClick={() => onUpdate(row.original.id)}>Edit</button>
                  <button onClick={() => onDelete(row.original.id)}>Delete</button>
                </td>
              </tr>
            )

          })}
        </tbody>
      </table>
    </div>
  )
}

export default TableContainer