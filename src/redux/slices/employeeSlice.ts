import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee } from "../../interfaces/Employee";
import { getEmployees } from "./actions";

interface EmployeeState {
  employees: IEmployee[];
  filteredEmployees: IEmployee[];
  sortField: "name" | "birthday";
  sortOrder: "asc" | "desc";
  filters: {
    role: "cook" | "waiter" | "driver" | "all";
    inArchive: boolean;
  };
  currentPage: number;
  currencyPerPage: number;
  loading: boolean;
  error: null;
}

const initialState: EmployeeState = {
  employees: [],
  filteredEmployees: [],
  sortField: "name",
  sortOrder: "asc",
  filters: {
    role: "all",
    inArchive: false,
  },
  currentPage: 1,
  currencyPerPage: 10,
  loading: false,
  error: null,
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<IEmployee[]>) {
      state.employees = action.payload;
      state.filteredEmployees = action.payload;
    },

    addEmployee(state, action: PayloadAction<IEmployee>) {
      state.employees.push(action.payload);
      state.filteredEmployees.push(action.payload);
    },

    updateEmployee(state, action: PayloadAction<IEmployee>) {
      const index = state.filteredEmployees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.filteredEmployees[index] = action.payload;
        state.employees[index] = action.payload;
      }
    },

    filterEmployees(state) {
      const { role, inArchive } = state.filters;

      state.filteredEmployees = state.employees.filter((employee) => {
        const matchesPosition = role === "all" || employee.role === role;
        const matchesArchive = inArchive ? employee.isArchive : true;
        return matchesPosition && matchesArchive;
      });

      state.filteredEmployees.sort((a, b) => {
        const isAsc = state.sortOrder === "asc";
        if (state.sortField === "name") {
          return isAsc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (state.sortField === "birthday") {
          const today = new Date();

          const parseDate = (dateString: string): Date => {
            const [day, month, year] = dateString.split(".").map(Number);
            return new Date(year, month - 1, day);
          };

          const aDate = parseDate(a.birthday.toString());
          const bDate = parseDate(b.birthday.toString());

          // Вычисляем разницу в миллисекундах между датами
          const diffA = Math.abs(today.getTime() - aDate.getTime());
          const diffB = Math.abs(today.getTime() - bDate.getTime());

          return isAsc ? diffA - diffB : diffB - diffA;
        }
        return 0;
      });
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setPositionFilter(
      state,
      action: PayloadAction<"cook" | "waiter" | "driver" | "all">
    ) {
      state.filters.role = action.payload;
    },

    setInArchiveFilter(state, action: PayloadAction<boolean>) {
      state.filters.inArchive = action.payload;
    },

    sortEmployees(state) {
      const { sortField, sortOrder } = state;
      state.employees.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    },

    toggleSortDirection(state, action: PayloadAction<"name" | "birthday">) {
      if (state.sortField === action.payload) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortField = action.payload;
        state.sortOrder = "asc";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        state.filteredEmployees = action.payload;
        // console.log(action.payload);
      })
      .addCase(getEmployees.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setEmployees,
  sortEmployees,
  toggleSortDirection,
  filterEmployees,
  setPositionFilter,
  setInArchiveFilter,
  setCurrentPage,
  updateEmployee,
  addEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;
