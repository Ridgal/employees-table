import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";

import { addEmployee } from "../../redux/slices/employeeSlice";
import { IEmployee } from "../../interfaces/Employee";

const EmployeesAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState<"cook" | "waiter" | "driver">("cook");
  const [birthday, setBirthday] = useState("");
  const [isArchive, setIsArchive] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEmployee: IEmployee = {
      id: Date.now(),
      name,
      role,
      birthday,
      isArchive: false,
      phone,
    };

    dispatch(addEmployee(newEmployee));
    navigate("/");
  };

  return (
    <section className="w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 mt-6">
        <h2 className="text-2xl text-gray-800 font-semibold mb-6 text-center">
          Add employee
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              placeholder="Имя"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              placeholder="Phone"
              required
            />
          </div>
          <div className="mb-6">
            <div className="relative max-w-sm">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Дата рождения
              </label>
              <input
                type="date"
                name="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="text-gray-800"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Должность
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "cook" | "waiter" | "driver")
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="cook">Повар</option>
              <option value="waiter">Официант</option>
              <option value="driver">Водитель</option>
            </select>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="isArchive"
                checked={isArchive}
                onChange={(e) => setIsArchive(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-900"
              >
                В Архиве
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export { EmployeesAdd };
