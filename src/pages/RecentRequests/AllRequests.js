import RequestList from "./RequestList";

const AllRequests = () => {
  return (
    <>
      <RequestList source={{ controller: "report", params: { tail: "all" } }} />
    </>
  );
};

export default AllRequests;
