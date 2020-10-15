import Home from "./Home"
import { PageList } from "./PageList"
import { PageDetail } from "./PageDetail"
import moment from "moment";


const routes = {
  "": Home,
  "pagelist": PageList,
  "pagedetail": PageDetail,
};

export {routes};
