import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <nav
        aria-label="Page navigation example"
        className="flex justify-center mt-2"
      >
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1}>
              <button
                onClick={() => onPageChange(index + 1)}
                disabled={index + 1 === currentPage}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export { Pagination };

// import React from "react";
// import { IEmployee } from "../../../interfaces/Employee";

// interface PaginationProps {
//   currencyPerPage: number;
//   totalCurrency: number;
//   currentPage: number;
//   employees: IEmployee[];
//   setCurrentPage: (arg0: number) => void;
//   paginate: (arg0: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currencyPerPage,
//   totalCurrency,
//   currentPage,
//   employees,
//   setCurrentPage,
//   paginate,
// }) => {
//   const pages = [];
//   for (let i = 1; i <= Math.ceil(totalCurrency / currencyPerPage); i++) {
//     pages.push(i);
//   }

//   const nextPage = () => {
//     if (currentPage < Math.ceil(employees.length / currencyPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <>
//       <nav
//         aria-label="Page navigation example"
//         className="flex justify-center mt-2"
//       >
//         <ul className="inline-flex -space-x-px text-sm">
//           <li>
//             <button
//               onClick={prevPage}
//               className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
//             >
//               Previous
//             </button>
//           </li>
//           {pages.map((number, id) => (
//             <li key={id}>
//               <a
//                 href="/"
//                 onClick={() => paginate(number)}
//                 className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
//               >
//                 {number}
//               </a>
//             </li>
//           ))}

//           <li>
//             <button
//               onClick={nextPage}
//               className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Pagination;
