/* eslint-disable react-refresh/only-export-components */
import { Disclosure } from "@headlessui/react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { SoArrowDown, SoArrowUp } from "solom-icon";

interface IProps {
    question: string;
    answer: string | ReactNode;
    width?: string;
}

const FaqCards = ({ question, answer, width }: IProps) => {
    const [t, i18] = useTranslation("global");

    return (
        <div className="w-full pt-6">
            <div
                className={`w-full p-2 px-5 border-2 rounded-lg shadow-md border-primary`}
            >
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button
                                className={`flex w-full justify-between gap-12 rounded-lg bg-transparent py-2 text-left text-sm font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-primary p-3}`}
                            >
                                <span
                                    className={`text-lg max-sm:text-base ${i18.language === "en" ? "text-left" : "text-right"
                                        } duration-150 ${open ? "text-primary" : "text-black"
                                        }`}
                                >
                                    <span className="hidden">{t("aa")}</span>
                                    {question}
                                </span>
                                {open ? (
                                    <SoArrowUp
                                        className={`transform h-6 w-6 text-primary ${width}`}
                                    />
                                ) : (
                                    <SoArrowDown
                                        className={`transform h-6 w-6 text-primary ${width}`}
                                    />
                                )}
                            </Disclosure.Button>
                            <Disclosure.Panel className="pb-2 pt-4 text-base text-black/90">
                                {answer}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
};

export default FaqCards;
