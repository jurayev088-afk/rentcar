import UseMeContext from "../constants/UseMeContext";
import Header2 from "./Header2";

export default function Header() {
  return (
    <div>
        <UseMeContext>
            <Header2/>
        </UseMeContext>
    </div>
  )
}
