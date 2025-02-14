import React from "react";

const LocationSearchPanel = (props) => {
  const handleSuggestionClick = (suggestion) => {
    if (props.activeField === "pickup") {
      props.setPickup(suggestion);
    } else if (props.activeField === "destination") {
      props.setDestination(suggestion);
    }
  };

  return (
    <div>
      {props.suggestions.map((location, idx) => (
        <div
          key={idx}
          onClick={() => {
            handleSuggestionClick(location.placeName);
          }}
          className="flex items-center active:border-2 px-2 rounded-xl border-black my-4 gap-3 justify-start"
        >
          <h2 className="bg-[#eee] h-10 w-16 mr-2 flex items-center justify-center rounded-full]">
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className="font-medium">{location.placeName}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
