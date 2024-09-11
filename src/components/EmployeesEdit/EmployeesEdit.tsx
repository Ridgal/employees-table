import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { IEmployee } from "../../interfaces/Employee";
import { updateEmployee } from "../../redux/slices/employeeSlice";

const EmployeesEdit: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filteredEmployees = useAppSelector((state) =>
    state.employee.filteredEmployees.find((emp) => emp.id === Number(id))
  );

  const [formData, setFormData] = useState<IEmployee>({
    id: 0,
    name: "",
    isArchive: false,
    phone: "",
    birthday: "",
    role: "cook",
  });
  const [birthday, setBirthday] = useState<string>("");

  useEffect(() => {
    if (filteredEmployees) {
      setFormData({
        ...filteredEmployees,
        birthday: formatDateToISO(filteredEmployees.birthday), // Преобразуем дату в нужный формат
      });
    }
  }, [filteredEmployees]);

  const formatDateToISO = (dateString: string): string => {
    const [day, month, year] = dateString.split(".").map(Number);
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`; // Преобразуем в формат YYYY-MM-DD
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "date"
          ? new Date(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateEmployee(formData));
    navigate("/");
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setBirthday(date);
    setFormData((prev) => ({
      ...prev,
      birthday: date,
    }));
  };

  if (!filteredEmployees) return <div>Загрузка...</div>;

  return (
    <section className="w-full flex justify-center items-center mt-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl text-gray-800 font-semibold mb-6 text-center">
          Edit employee
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
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              placeholder="youremail@example.com"
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
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
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
                className="text-gray-800 bg-gray-400"
                value={birthday} // Устанавливаем выбранную дату
                onChange={handleDateChange} // Обработчик изменения даты
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
              value={formData.role}
              onChange={handleChange}
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
                checked={formData.isArchive}
                onChange={handleChange}
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

export { EmployeesEdit };
