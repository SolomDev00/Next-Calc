import Modal from "./Modal";
import Button from "./Button";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ITemplates, tokenSelector } from "../../app/functions/token";
import { SoEditNote, SoCatalogue, SoAirplane, SoXmarkCircle, SoCheckBadge2, SoAddSquare } from "solom-icon";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";

interface IProps {
    disabled: boolean;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const MessageMenu = ({ disabled, setMessage }: IProps) => {
    const { templates } = useSelector(tokenSelector);

    const [isTempOpen, setIsTempOpen] = useState(false);
    const [isLandingOpen, setIsLandingOpen] = useState(false);

    const openTempModal = () => setIsTempOpen(true);
    const closeTempModal = () => setIsTempOpen(false);
    const openLandingModal = () => setIsLandingOpen(true);
    const closeLandingModal = () => setIsLandingOpen(false);

    const handleTemplateSelect = (templateText: string | null) => {
        if (templateText) {
            setMessage(templateText);
            closeTempModal();
        }
    };

    const selectButtonTemplate = (rowData: ITemplates) => {
        return (
            <SoCheckBadge2
                className="w-6 h-6 text-green-500 cursor-pointer"
                onClick={() => handleTemplateSelect(rowData.text)}
            />
        );
    };

    return (
        <div>
            <Popover className={`absolute right-0 top-4 transform -translate-y-1/2 ${disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}>
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`${open ? "text-white" : "text-white/90"} group inline-flex items-center rounded-md bg-white px-1 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                        >
                            <div className={`p-1 bg-accent cursor-pointer rounded-md ${disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}>
                                <SoEditNote className="w-5 h-5 text-primary" />
                            </div>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-in duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute right-3/4 z-10 mt-1 w-screen max-w-sm translate-x-1/2 transform px-3 sm:px-0 lg:max-w-xs">
                                <div className="bg-gray-50 overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 z-20">
                                    <div className="mt-2 mb-1 px-2">
                                        <Button className="w-full flex justify-start items-center rounded-md px-2 py-2 transition bg-white hover:bg-accent ease-in-out duration-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500/50 disabled:bg-white" onClick={openTempModal}>
                                            <span className="flex items-center gap-3">
                                                <SoCatalogue className="w-5 h-5 text-primary" />
                                                <span className="text-base font-medium text-primary">
                                                    Message Template
                                                </span>
                                            </span>
                                        </Button>
                                    </div>
                                    <div className="mt-1 mb-2 px-2 hidden">
                                        <Button className="w-full flex justify-start items-center rounded-md px-2 py-2 transition bg-white hover:bg-accent ease-in-out duration-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500/50" onClick={openLandingModal}>
                                            <span className="flex items-center gap-3">
                                                <SoAirplane className="w-5 h-5 text-primary" />
                                                <span className="text-base font-medium text-primary">
                                                    Landing Page
                                                </span>
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
            <Modal isOpen={isTempOpen} closeModal={closeTempModal}>
                <div className="flex items-center gap-3 absolute top-[-10px] right-0 px-5 cursor-pointer z-50" onClick={() => closeTempModal()}>
                    <Link to="/dashboard/services/templates" className={`bg-[#E8F0F7] rounded-lg p-1 ${disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}>
                        <SoAddSquare className="w-6 h-6 text-primary" />
                    </Link>
                    <div className="bg-[#E8F0F7] rounded-full p-1">
                        <SoXmarkCircle className="w-6 h-6 cursor-pointer text-red-600" />
                    </div>
                </div>
                <h2 className="absolute top-[-10px] left-0 text-primary text-2xl font-medium mb-2 px-5">
                    Select Message Template!
                </h2>
                <DataTable value={templates} paginator rows={5} className="w-full pt-10">
                    <Column field="id" header="#" style={{ width: "1%" }} body={(_, options) => options.rowIndex + 1} />
                    <Column field="name" header="Name" style={{ width: "35%" }} />
                    <Column field="text" header="Message Text" style={{ width: "60%" }} />
                    <Column style={{ width: "5%" }} body={selectButtonTemplate} />
                </DataTable>
            </Modal>
            <Modal isOpen={isLandingOpen} closeModal={closeLandingModal}>
                <div className="absolute top-[-10px] right-0 px-5">
                    <div className="bg-[#E8F0F7] rounded-full p-1">
                        <SoXmarkCircle
                            className="w-6 h-6 cursor-pointer text-red-600"
                            onClick={closeLandingModal}
                        />
                    </div>
                </div>
                <h2 className="absolute top-[-10px] left-0 text-primary text-2xl font-medium mb-2 px-5">
                    Select Message Landing!
                </h2>
            </Modal>
        </div>
    );
};

export default MessageMenu;