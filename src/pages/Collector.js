// import * as React from "react";
// import {
//   ScheduleComponent,
//   Day,
//   Week,
//   WorkWeek,
//   Month,
//   Agenda,
//   Inject,
// } from "@syncfusion/ej2-react-schedule";
// import Header from "../components/Header";

// const Collector = () => {
//   const data = [
//     {
//       Id: 1,
//       Subject: "Garbage Collection - Downtown",
//       StartTime: new Date(2025, 2, 28, 6, 30),
//       EndTime: new Date(2025, 2, 28, 9, 0),
//       IsAllDay: false,
//       Status: "Scheduled",
//       Priority: "High",
//     },
//     {
//       Id: 2,
//       Subject: "Recyclable Pickup - Greenfield",
//       StartTime: new Date(2025, 2, 28, 10, 0),
//       EndTime: new Date(2025, 2, 28, 12, 0),
//       IsAllDay: false,
//       Status: "Scheduled",
//       Priority: "Medium",
//     },
//     {
//       Id: 3,
//       Subject: "Meeting with Supervisor",
//       StartTime: new Date(2025, 2, 28, 14, 0),
//       EndTime: new Date(2025, 2, 28, 15, 30),
//       IsAllDay: false,
//       Status: "Pending",
//       Priority: "High",
//     },
//     {
//       Id: 4,
//       Subject: "Waste Collection - Riverside",
//       StartTime: new Date(2025, 2, 29, 7, 0),
//       EndTime: new Date(2025, 2, 29, 10, 0),
//       IsAllDay: false,
//       Status: "Scheduled",
//       Priority: "High",
//     },
//     {
//       Id: 5,
//       Subject: "Hazardous Waste Disposal",
//       StartTime: new Date(2025, 2, 29, 13, 0),
//       EndTime: new Date(2025, 2, 29, 16, 0),
//       IsAllDay: false,
//       Status: "In Progress",
//       Priority: "Critical",
//     },
//     {
//       Id: 6,
//       Subject: "Equipment Maintenance",
//       StartTime: new Date(2025, 3, 1, 8, 30),
//       EndTime: new Date(2025, 3, 1, 10, 30),
//       IsAllDay: false,
//       Status: "Pending",
//       Priority: "Medium",
//     },
//     {
//       Id: 7,
//       Subject: "Organic Waste Collection - Hilltop",
//       StartTime: new Date(2025, 3, 1, 11, 0),
//       EndTime: new Date(2025, 3, 1, 13, 30),
//       IsAllDay: false,
//       Status: "Scheduled",
//       Priority: "High",
//     },
//     {
//       Id: 8,
//       Subject: "Emergency Cleanup Request",
//       StartTime: new Date(2025, 3, 2, 9, 0),
//       EndTime: new Date(2025, 3, 2, 12, 0),
//       IsAllDay: false,
//       Status: "Urgent",
//       Priority: "Critical",
//     },
//     {
//       Id: 9,
//       Subject: "Recyclable Sorting - Facility A",
//       StartTime: new Date(2025, 3, 3, 14, 0),
//       EndTime: new Date(2025, 3, 3, 16, 30),
//       IsAllDay: false,
//       Status: "Scheduled",
//       Priority: "Medium",
//     },
//     {
//       Id: 10,
//       Subject: "Public Awareness Event",
//       StartTime: new Date(2025, 3, 4, 10, 0),
//       EndTime: new Date(2025, 3, 4, 12, 30),
//       IsAllDay: false,
//       Status: "Confirmed",
//       Priority: "Low",
//     },
//   ];

//   const fieldsData = {
//     id: "Id",
//     subject: { name: "Subject" },
//     isAllDay: { name: "IsAllDay" },
//     startTime: { name: "StartTime" },
//     endTime: { name: "EndTime" },
//   };
//   const eventSettings = { dataSource: data, fields: fieldsData };
//   return (
//     <div className="max-w-[1320px]">
//       <Header />
//       <ScheduleComponent
//         height="550px"
//         selectedDate={new Date(2025, 2, 28)}
//         eventSettings={eventSettings}
//       >
//         <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//       </ScheduleComponent>
//     </div>
//   );
// };

// export default Collector;
//ReactDOM.render(<Collector />, document.getElementById("schedule"));


import React from 'react'
import Header from '../components/Header'

const Collector = () => {
  return (
    <div>
    <Header/>
    <div className='px-3 md:px-9 xl:px-0 mt-[70px] lg:mt-[100px] flex items-center justify-between mx-auto relative max-w-[1320px]'>
    <img
              className="rounded-2xl mb-[30px] lg:mb-0 lg:flex-1"
              src="/assets/shedule.png"
              alt="Agon"
              width={500}
              height={500}
            />
    </div>
    

    </div>
  )
}

export default Collector
