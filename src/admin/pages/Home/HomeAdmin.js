import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/WidgetSm/WidgetSm";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
export default function HomeAdmin() {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Topbar />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          {" "}
          <div className="home">
            <FeaturedInfo />
            <Chart
              // data={userData}
              title="User Analytics"
              grid
              dataKey="Active User"
            />
            <div className="homeWidgets">
              <WidgetSm />
              <WidgetLg />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
