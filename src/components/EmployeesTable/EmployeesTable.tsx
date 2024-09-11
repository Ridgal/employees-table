import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  filterEmployees,
  setCurrentPage,
  toggleSortDirection,
} from "../../redux/slices/employeeSlice";
import { Pagination } from "../generic/pagination/Pagination";
import { Link } from "react-router-dom";

const EmployeesTable: FC = () => {
  const dispatch = useAppDispatch();
  const { filteredEmployees, sortField, sortOrder } = useAppSelector(
    (state) => state.employee
  );

  // Параметры пагинации
  const currentPage = useAppSelector((state) => state.employee.currentPage);
  const currencyPerPage = useAppSelector(
    (state) => state.employee.currencyPerPage
  );

  // Применяем пагинацию к отфильтрованным сотрудникам
  const currentCurrency = filteredEmployees.slice(
    (currentPage - 1) * currencyPerPage,
    currentPage * currencyPerPage
  );

  const totalEmployees = filteredEmployees.length; // Общее количество отфильтрованных сотрудников
  const totalPages = Math.ceil(totalEmployees / currencyPerPage); // Общее количество страниц

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleSort = (field: "name" | "birthday") => {
    dispatch(toggleSortDirection(field));
    dispatch(filterEmployees());
  };

  return (
    <div className="w-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-lg text-gray-700 uppercase bg-gray-400 ">
            <tr>
              <th
                onClick={() => handleSort("name")}
                scope="col"
                className="px-6 py-3 text-base xl:text-xs truncate"
              >
                Имя{" "}
                {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-base xl:text-xs truncate"
              >
                Должность
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-base xl:text-xs truncate"
              >
                Телефон
              </th>
              <th
                onClick={() => handleSort("birthday")}
                scope="col"
                className="px-6 py-3 text-base xl:text-xs truncate"
              >
                Дата рождения{" "}
                {sortField === "birthday"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th scope="col" className="px-6 py-3 text-base">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          {currentCurrency?.map((employee) => (
            <tbody key={employee.id}>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap truncate"
                >
                  {employee.name}
                </th>
                <td className="px-6 py-4 truncate">{employee.role}</td>
                <td className="px-6 py-4 truncate">{employee.phone}</td>
                <td className="px-6 py-4 truncate">
                  {employee.birthday.toString()}
                </td>
                <td className="px-6 py-4 text-right truncate">
                  <Link to={`/edit/${employee.id}`}>
                    <button className="font-medium text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-sm px-5 py-1 text-center">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export { EmployeesTable };
