import Select from "../../../../components/Select";
import { listStatus } from "../../../../configs/status";
import { useTaskContext } from "../../../../contexts/TaskProvider";
import { FilterStatus as FilterStatusType } from "../../../../types/task";

const FilterStatus: React.FC = () => {
  const listAllFilterStatus: { value: string; label: string }[] = [{ value: "all", label: "All" }, ...listStatus];
  const { filterStatus, setFilterStatus } = useTaskContext();

  return (
    <div className="flex gap-2 items-center">
      Filter by status:
      <Select
        list={listAllFilterStatus}
        value={filterStatus}
        setValue={(value) => setFilterStatus(value as FilterStatusType)}
      ></Select>
    </div >
  );
};

export default FilterStatus;
