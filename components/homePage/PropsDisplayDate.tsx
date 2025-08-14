// ✅ PropsDisplayDate.tsx - אחראי רק על הצגת הקומפוננטה HorizontalDateSelector
import React from "react";
import HorizontalDateSelector from "./HorizontalDateSelector";

interface Props {
  activeDate: string;
  setActiveDate: (date: string) => void;
  appointments: any[];
}

const PropsDisplayDate = ({
  activeDate,
  setActiveDate,
  appointments,
}: Props) => {
  return (
    <HorizontalDateSelector
      activeDate={activeDate}
      onDateSelect={setActiveDate}
      appointments={appointments}
    />
  );
};

export default PropsDisplayDate;
