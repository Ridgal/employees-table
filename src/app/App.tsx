import { useEffect } from "react";
import { EmployeesTable } from "../components/EmployeesTable/EmployeesTable";
import { useAppDispatch } from "../hooks";
import { getEmployees } from "../redux/slices/actions";
import { EmployeesFilter } from "../components/EmployeesFilter/EmployeesFilter";
import { Link, Route, Routes } from "react-router-dom";
import { EmployeesEdit } from "../components/EmployeesEdit/EmployeesEdit";
import { EmployeesAdd } from "../components/EmployeesAdd/EmployeesAdd";
import "./App.css";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <main className="w-[90vw] h-[85vh] mt-[5.5rem] mb-6 px-4 mx-auto rounded-lg border-2 border-zinc-300 bg-zinc-200 shadow-2xl shadow-slate-400">
      <div className="">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="flex items-center text-2xl font-extrabold text-gray-700 my-4">
              Employees
              <span className="bg-blue-300 text-blue-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded ms-2">
                PRO
              </span>
            </h1>
          </Link>

          <div className="flex items-center gap-10">
            <EmployeesFilter />
            <Link
              to="/add-employee"
              className="text-white xl:text-xs truncate  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 xl:px-3 xl:py-2 me-2 mb-2 md:m-0 focus:outline-none "
            >
              <span className="md:hidden">Новый сотрудник</span> +
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<EmployeesTable />} />
          <Route path="/edit/:id" element={<EmployeesEdit />} />
          <Route path="/add-employee" element={<EmployeesAdd />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
