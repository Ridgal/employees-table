import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setPositionFilter,
  filterEmployees,
  setInArchiveFilter,
} from "../../redux/slices/employeeSlice";

const EmployeesFilter: FC = () => {
  const dispatch = useAppDispatch();
  const { inArchive, role } = useAppSelector((state) => state.employee.filters);

  const handlePositionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      setPositionFilter(
        event.target.value as "cook" | "waiter" | "driver" | "all"
      )
    );
    dispatch(filterEmployees());
  };

  const handleArchiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInArchiveFilter(event.target.checked));
    dispatch(filterEmployees());
  };

  return (
    <div className="flex justify-center items-center gap-8">
      <label
        htmlFor="employees"
        className="flex items-center gap-4 md:gap-1 text-sm lg:text-xs font-medium text-gray-900"
      >
        <span className="md:hidden">Должность</span>
        <select
          id="employees"
          value={role}
          onChange={handlePositionChange}
          className="w-40 lg:w-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        >
          <option value="all">Все</option>
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
      </label>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={inArchive}
          onChange={handleArchiveChange}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">Архив</span>
      </label>
    </div>
  );
};

export { EmployeesFilter };
