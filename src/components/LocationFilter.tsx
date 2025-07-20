import React from "react";
import { LOCATIONS, LocationId } from "../utils/locationUtils";

interface LocationFilterProps {
  selectedLocation: LocationId | "all";
  onLocationChange: (location: LocationId | "all") => void;
  className?: string;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  selectedLocation,
  onLocationChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        onClick={() => onLocationChange("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedLocation === "all"
            ? "bg-[#FF8C00] text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Todas las sedes
      </button>

      {Object.entries(LOCATIONS).map(([id, location]) => (
        <button
          key={id}
          onClick={() => onLocationChange(id as LocationId)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedLocation === id
              ? "bg-[#FF8C00] text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {location.name}
        </button>
      ))}
    </div>
  );
};

export default LocationFilter;
