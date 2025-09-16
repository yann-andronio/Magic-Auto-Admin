import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, parse, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

export function Calendarfilter({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  }) {
  
  const [inputStart, setInputStart] = useState(startDate ? format(startDate, "dd-MM-yyyy") : "");
  const [inputEnd, setInputEnd] = useState(endDate ? format(endDate, "dd-MM-yyyy") : "");

  useEffect(() => {
    if (startDate) setInputStart(format(startDate, "dd-MM-yyyy"));
    if (endDate) setInputEnd(format(endDate, "dd-MM-yyyy"));
  }, [startDate, endDate]);

  const handleStartChange = (val: string) => {
    setInputStart(val);
    if (val.length === 10) {
      const parsed = parse(val, "dd-MM-yyyy", new Date());
      if (isValid(parsed)) setStartDate(parsed);
    }
  };

  const handleEndChange = (val: string) => {
    setInputEnd(val);
    if (val.length === 10) {
      const parsed = parse(val, "dd-MM-yyyy", new Date());
      if (isValid(parsed)) setEndDate(parsed);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl w-full text-white bg-white border border-gray-300 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg shadow-inner">
          <FaCalendarAlt className="text-[#759eee]" />
          <input
            className="border-none outline-none w-28 text-center text-sm bg-transparent"
            value={inputStart}
            onChange={(e) => handleStartChange(e.target.value)}
            placeholder="Début"
          />
        </div>
        <span className="text-gray-500">-</span>
        <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg shadow-inner">
          <FaCalendarAlt className="text-[#759eee]" />
          <input
            className="border-none outline-none w-28 text-center text-sm bg-transparent"
            value={inputEnd}
            onChange={(e) => handleEndChange(e.target.value)}
            placeholder="Fin"
          />
        </div>
      </div>
      <DatePicker
        selected={startDate}
        onChange={(dates: [Date | null, Date | null]) => {
          const [start, end] = dates;
          setStartDate(start);
          setEndDate(end);
        }}
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        selectsRange
        inline
        locale={fr}
      />
    </div>
  );
}
