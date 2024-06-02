import AddItem from "./modules/add-item/AddItem";
import FilterStatus from "./modules/filter-status/FilterStatus";

const Tools: React.FC = () => {
  return <div className="py-4 flex justify-between items-center">
    <FilterStatus></FilterStatus>
    <AddItem></AddItem>
  </div>;
};

export default Tools;
