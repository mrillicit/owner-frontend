import Layout from "@components/UI/Layout"
import axiosInstance from "@utils/axios"
import { timeStringToDate, dateStringToDateMonth} from "@utils/functions/datetime"
import React from "react"
import Rupee from "@utils/symbols/rupee"
import PrivateRoute from "@components/PrivateRoute"
import Header from "@components/UI/Header"
import VehicleBreakoutChart from "@components/Dashboard/VehicleBreakoutChart"
import TotalRevenueChart from "@components/Dashboard/TotalRevenueChart"
import { BOOKING_STATUS } from "@utils/constants/booking";

export default function Home() {
    const [bookings, setBookings] = React.useState();
    const [newOrders, setNewOrders] = React.useState(0);
    const [completedOrders, setCompletedOrders] = React.useState(0);
    const [cancelledOrders, setCancelledOrders] = React.useState(0);
    const [revenueLabels, setRevenueLabels] = React.useState([]);
    const [dayRevenues, setDayRevenues] = React.useState([]);
    const [totalRevenue, setTotalRevenue] = React.useState(0);
    const [vehicleLabels, setVehicleLabels] = React.useState([]);
    const [vehicleStats, setVehicleStats] = React.useState([]);
    const getBookings= () => {
        axiosInstance.get("/owner/booking/list")
            .then((response) => {
                console.log("323323232");
                console.log(response.data.results)
                setBookings(response.data.results)
                var newOrder = 0;
                var completed_orders = 0;
                var cancelled_orders = 0;
                var booking = response.data.results;
                console.log(booking)
                for(var i =0;i<booking.length;i++) {
                    if(booking[i].status === BOOKING_STATUS.PAYMENT_DONE) {
                        newOrder+=1;
                    } else if (booking[i].status === BOOKING_STATUS.SERVICE_CONMPLETED) {
                        completed_orders+=1;
                    } else if (booking[i].status === BOOKING_STATUS.NOT_ATTENDED) {
                        cancelled_orders+=1;
                    }
                }
                setNewOrders(newOrder);
                setCompletedOrders(completed_orders);
                setCancelledOrders(cancelled_orders);
            })
            .catch((error) => {

            })
    }

    const getRevenue = () => {
        axiosInstance.get("/store-owner/revenue")
        .then((response) => {
            var data = response.data
            console.log(response.data);
            setTotalRevenue(response.data["revenue"]);
            var tempDayRevenues = []
            var tempLabels = []
            for(const rev in data) {
                if(rev!=="revenue")
                {
                    tempLabels.push(dateStringToDateMonth(rev));
                    tempDayRevenues.push(parseInt(data[rev]));
                }
            }
            tempDayRevenues.reverse();
            tempLabels.reverse();
            setDayRevenues(tempDayRevenues);
            setRevenueLabels(tempLabels);

        }).catch((error) => {
            console.log(error)
            console.log(error.response)
        })
    }

    const getVehiclesStats = () => {
        axiosInstance.get("/store-owner/store/vehicles")
        .then((response) => {
            var data = response.data
            console.log(response.data);
            var tempVehicleStats = []
            var tempLabels = []
            for(const vehicle in data) {
                tempLabels.push(vehicle);
                tempVehicleStats.push(parseInt(data[vehicle]));
            }
            setVehicleLabels(tempLabels);
            setVehicleStats(tempVehicleStats);

        }).catch((error) => {
            console.log(error)
            console.log(error.response)
        })
    }

    React.useEffect(() => {
        // setBookings([booking, booking, booking])
        getBookings();
        getRevenue();
        getVehiclesStats();
    }, [])


    return (
        <PrivateRoute>
            <>
                <Header heading="Dashboard" />
                <div className="row no-gutters">
                    <div className="row no-gutters col-12 col-md-12 col-lg-7">
                        <div className="col-6 col-md-4 p-2 p-md-4">
                            <div className="item-shadow p-2 p-md-4">
                                <h6>New Orders</h6>
                                <h5 className="text-primary">{newOrders}</h5>
                            </div>
                        </div>
                        <div className="col-6 col-md-4 p-2 p-md-4">
                            <div className="item-shadow p-2 p-md-4">
                                <h6>Completed</h6>
                                <h5>{completedOrders}</h5>
                            </div>
                        </div>
                        <div className="col-6 col-md-4 p-2 p-md-4">
                            <div className="item-shadow p-2 p-md-4">
                                <h6>Cancelled</h6>
                                <h5>{cancelledOrders}</h5>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="item-shadow p-2 p-md-3">
                                <h5>Total Revenue</h5>
                                <div>
                                    <Rupee/>{totalRevenue}
                                </div>
                                <div>
                                    <TotalRevenueChart labels={revenueLabels} revenue = {dayRevenues}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-5">
                        <div className="col-12 col-md-6 col-lg-12 mb-3">
                            <div className="item-shadow p-2 p-md-3">
                                <h5>Vehicle Breakout</h5>
                                <div style={{ maxWidth: "300px", margin: 'auto' }}>
                                    <VehicleBreakoutChart labels={vehicleLabels} stats={vehicleStats}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-12">
                            <div className="item-shadow">
                                <h5 className="p-2 p-md-3">Top selling services</h5>
                                <div className="p-2 p-md-3 border-top">
                                    <div className="d-flex justify-content-between p-1 font-weight-bold">
                                        <div>Premium Carwash</div>
                                        <div className="text-primary"><Rupee />200</div>
                                    </div>
                                    <div className="d-flex justify-content-between p-1 font-weight-bold">
                                        <div>Premium Carwash</div>
                                        <div className="text-primary"><Rupee />200</div>
                                    </div>
                                    <div className="d-flex justify-content-between p-1 font-weight-bold">
                                        <div>Premium Carwash</div>
                                        <div className="text-primary"><Rupee />200</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <style jsx>{`
                
            `}</style>
        </PrivateRoute>
    );
}