// import { useState, Fragment } from "react";
// import { Listbox, Transition } from "@headlessui/react";
// import { useTranslation } from "react-i18next";

// interface IProps {
//   id?: string;
//   name: string;
//   width?: string;
// }

// const Select = ({ id, name, width }: IProps) => {
//   const [selected, setSelected] = useState(0);
//   const [t, i18n] = useTranslation("global");

//   return (
//     <div className="max-sm:w-full" id={id}>
//       <Listbox value={selected} onChange={setSelected}>
//         <div className="relative mt-1">
//           <Listbox.Button
//             className={`${width} flex flex-row
//             relative max-sm:w-full cursor-pointer rounded-md py-2 px-[2px] max-sm:px-0 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
//           >
//             <span
//               className={`block truncate ${i18n.language === "ar" ? "text-right ml-6" : "text-left"
//                 } max-sm:text-sm`}
//             >
//               {name}
//               {t("")}
//             </span>
//             <span
//               className={`pointer-events-none absolute inset-y-0 ${i18n.language === "ar" ? "left-0" : "right-0"
//                 } flex items-center pr-2`}
//             >
//               <ChevronDownIcon
//                 className="w-5 max-sm:w-3 text-gray-400"
//                 aria-hidden="true"
//               />
//             </span>
//           </Listbox.Button>
//           <Transition
//             as={Fragment}
//             leave="transition ease-in duration-100"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Listbox.Options className="absolute mt-1 w-fit max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
//               <Listbox.Option
//                 className={({ active }) =>
//                   `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"
//                   }`
//                 }
//                 value={"aa"}
//               >
//                 {({ selected }) => (
//                   <>
//                     <h2
//                       className={`block truncate ${selected ? "font-medium" : "font-normal"
//                         }`}
//                     >
//                       Solom
//                     </h2>
//                     {selected ? (
//                       <h2 className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
//                         <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                       </h2>
//                     ) : null}
//                   </>
//                 )}
//               </Listbox.Option>
//             </Listbox.Options>
//           </Transition>
//         </div>
//       </Listbox>
//     </div>
//   );
// };

// export default Select;
