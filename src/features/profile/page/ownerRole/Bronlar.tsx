import BronlarTable from "./components/BronlarTable";
import UseCarsBron from "@/src/constants/UseCarsBron";

export default function Bronlar() {
  return (
    <div className="space-y-6">
      <UseCarsBron>
        <BronlarTable />
      </UseCarsBron>
    </div>
  );
}
