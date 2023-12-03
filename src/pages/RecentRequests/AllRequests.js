import RequestList from "./RequestList";

const AllRequests = () => {
  return (
    <>
      <RequestList source={{ controller: "CitizenReport" }} />
    </>
  );
};

export default AllRequests;
