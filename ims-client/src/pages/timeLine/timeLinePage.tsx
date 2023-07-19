import React, { useEffect, useState } from "react";
import apiCalls from "../../service/apiCalls";
import TimeLine from "./timeLine";
import { Incident } from "./modules/interface";
import Search from "../../components/search/search";
import { CustomScrollbar, StyledPaper} from "./timeLinePage.style";
import { WithIdProps } from "../../HOC";
import AddUpdateComp from "../../components/AddUpdate/AddUpdateComp"

const TimeLinePage = ({ _id }: WithIdProps) => {
  const [incident, setIncident] = useState<Incident>();
  useEffect(() => {
    const FetchData = async () => {
      const getIncidentById = await apiCalls.getTimeLineForIncident(_id);
      console.log(getIncidentById);
      setIncident(getIncidentById);
    };
    FetchData();
  }, [_id]);
  const [myValue, setMyValue] = useState<string>("");
  const someFunction = () => {
    console.log("The event was triggered!");
  };
  //change search design..
  // const StyledPagination = styled(Pagination)(({ theme }) => ({
  //   "& .MuiPaginationItem-root:hover, & .MuiPaginationItem-root.Mui-selected": {
  //     color: "white",
  //     backgroundColor: theme.palette.secondary.main,
  //   },
  // }));
  return (
    <>
    {/* <StyledSearch onEvent={someFunction} setValue={setMyValue}></StyledSearch> */}
      <Search onEvent={someFunction} setValue={setMyValue}></Search>

      <StyledPaper>
        {/* profile */}
        {/* current priority */}
        {/* tags */}
      </StyledPaper>
      <StyledPaper>
        {incident && (
                   
          <CustomScrollbar>
            <AddUpdateComp/>   
            <TimeLine _id={incident._id} />
          </CustomScrollbar>
        )}
 {/* images */}
      </StyledPaper>
      
    </>
  );
};

export default TimeLinePage;
