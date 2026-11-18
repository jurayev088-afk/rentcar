import BronlarTable from "./components/BronlarTable";
import UseCarsBron from "@/src/constants/UseCarsBron";

export default function Bronlar() {
  return (
    <div>
      <div>
        <h2>Bronlar</h2>
      </div>
      <UseCarsBron>
        <BronlarTable />
      </UseCarsBron>
    </div>
  );
}
