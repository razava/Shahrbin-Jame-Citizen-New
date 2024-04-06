import React from "react";
import { getNewsById } from "../../services/CommonApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { convertserverTimeToDateString } from "../../utils/functions";

export default function New() {
  const { id } = useParams();
  console.log(id);

  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["new", id],
    queryFn: () => getNewsById(id),
  });

  return (
    <div className=" w-full">
      <div className=" flex justify-between items-center w-full">
        <h1 className=" text-3xl text-[var(--blue)]">{data?.title}</h1>
        <p className=" text-gray-600">
          {convertserverTimeToDateString(data?.created)}
        </p>
      </div>
      <div
        className="news-description w-full "
        dangerouslySetInnerHTML={{ __html: data?.description }}
      ></div>
    </div>
  );
}
