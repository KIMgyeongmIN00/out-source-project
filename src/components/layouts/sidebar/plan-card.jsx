import React, { forwardRef } from 'react';
import { MdOutlineAccessTime, MdOutlineLocationOn } from 'react-icons/md';

const PlanCard = forwardRef(({ plan }, ref) => {
  return (
    <li ref={ref} key={plan.id} className="p-2 mb-3 border border-primary rounded-sm">
      <h5 className="font-semibold overflow-hidden text-ellipsis text-nowrap">{plan.title}</h5>
      <p className="text-sm flex items-center gap-1">
        <MdOutlineAccessTime className="mr-1" />
        <span className="flex-1 overflow-hidden text-ellipsis text-nowrap">{plan.date}</span>
      </p>
      <p className="text-sm flex items-center gap-1">
        <MdOutlineLocationOn className="mr-1" />
        <span className="flex-1 overflow-hidden text-ellipsis text-nowrap">{plan.address}</span>
      </p>
    </li>
  );
});

PlanCard.displayName = 'PlanCard';
export default React.memo(PlanCard);
