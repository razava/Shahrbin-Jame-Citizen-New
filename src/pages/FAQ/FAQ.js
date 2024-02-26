import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import styles from "./styles.module.css";
import { useQuery } from "@tanstack/react-query";
import { getFAQ } from "../../services/Api";
function FAQ() {
  const { data, isLoading } = useQuery({
    queryKey: ["FAQ"],
    queryFn: getFAQ,
  });
  console.log(data);
  return (
    <div className={styles.co}> 
      <Accordion allowZeroExpanded dir="rtl">
        {data?.map((item) => {
          return (
            <AccordionItem dir="rtl">
              <AccordionItemHeading>
                <AccordionItemButton dir="rtl">
                  {item.question}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                {/* <p>{item.answer}</p> */}
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default FAQ;
