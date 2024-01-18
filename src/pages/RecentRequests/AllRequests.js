import RequestList from "./RequestList";

const AllRequests = () => {
  return (
    <>
      <RequestList source={{ controller: "CitizenReport" , params:"" }} />
    </>
  );
};

export default AllRequests;
