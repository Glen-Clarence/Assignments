/* eslint-disable react/prop-types */
import filler from '../img/filler.webp'

const TableRow = ({ row }) => {
  if(!Object.prototype.hasOwnProperty.call(row,'Photo')){
    row.Photo = ''
  }
  return (
    <tr>
      {Object.entries(row).map(([key, value]) => (
        <td  data-cell={key} className=" before:content-[attr(data-cell)] grid grid-cols-[20ch,1fr] w-full md:w-[150px] md:table-cell  md:before:content-none px-4 py-4 text-sm font-medium whitespace-nowrap" key={key}>
          {key === "Photo" ? (
            <img
              className="object-cover w-[30px] h-[30px] rounded-full object-top mx-auto"
              src={value !=='' ? value : filler}
              alt="Employee"
            />
          ) : (
            <span className="font-medium text-gray-800 dark:text-white max-w-[30ch] overflow-hidden text-ellipsis block" title={value}>{value}</span>
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
