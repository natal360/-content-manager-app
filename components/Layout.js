import Navbar from "components/Navbar";
import ActiveResource from "components/ActiveResource";

const Layout = ({ children }) => (
  <div>
    <Navbar />
    <ActiveResource />
    {children}
  </div>
);

export default Layout;
