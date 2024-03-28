import React from "react";
import useNewRequest from "./useNewRequest";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "./styles.module.css";
import noImage from "../../assets/images/no-image.jpeg";
import useTree from "../../components/Tree/useTree";
import { useQuickStore } from "./zustand";
import { getQuickAccess } from "../../services/CitizenReport";

function QuickAccess() {
  const { goToNextStep, setCurrentStep, setQuickAccess, onChange } =
    useNewRequest();
  const { goIntoNextLevel, currentNodes } = useTree();

  const { data, isLoading } = useQuery({
    queryKey: ["quickAccess"],
    queryFn: getQuickAccess,
  });
  
  const update = useQuickStore((state) => state.inc);
  
  return (
    <>
      <p className={styles.quickAccessText}>درخواست های پرتکرار</p>
      <div className="grid w-full grid-cols-2 gap-1 lg:grid-cols-1 md:mt-2">
        {data?.map((item, index) => {
          if (!item.isDeleted) {
            return (
              <>
                <div
                  onClick={() => {
                    console.log(item);
                    update(item);
                    // if (item.category.processId) {
                    //   setQuickAccess(true);
                    //   setCurrentStep({
                    //     id: "address",
                    //     title: "آدرس",
                    //     order: 2,
                    //     active: true,
                    //     required: true,
                    //   });
                    //   goToNextStep();
                    //   console.log(1111);

                    //   onChange(
                    //     {
                    //       id: item.category.id,
                    //       order: item.category.order,
                    //       code: item.category.code,
                    //       title: item.category.title,
                    //       description: item.category.description,
                    //       attachmentDescription:
                    //         item.category.attachmentDescription,
                    //       duration: item.category.duration,
                    //       responseDuration: item.category.responseDuration,
                    //       formElements: item.category.formElements,
                    //       categories: item.category.categories,
                    //       objectionAllowed: item.category.objectionAllowed,
                    //       hideMap: item.category.hideMap,
                    //     },
                    //     "category"
                    //   );
                    // } else {
                    //   console.log(item);

                    //         }

                    // setCurrentStep({
                    //   id: "address",
                    //   title: "آدرس",
                    //   order: 2,
                    //   active: true,
                    //   required: true,
                    // });
                    // goToNextStep()
                    // goToNextStep()
                  }}
                  className={`text-center p-2 w-full h-14 sm:h-20 lg:h-20 flex items-center justify-center md:text-xl text-white transition cursor-pointer bg-blue-800 rounded-xl ${
                    index == data.length - 1 &&
                    data?.filter((item) => item.isDeleted == false).length %
                      2 !==
                      0 &&
                    "max-lg:col-span-2"
                  }`}
                >
                  {item.title}
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
}

export default QuickAccess;
