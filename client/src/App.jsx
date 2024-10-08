import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './components/Home'
import Navigation from './components/Navigation'
import './App.css'
import VanList from './components/VanList'
import OrderList from './components/OrderList'
import OrderDetails from './components/OrderDetails'
import RegionalHub from './components/RegionalHub'
import VanPage from './components/VanPage'
import Footer from './components/Footer'

function App() {
  const [vans, setVans] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVans = async () => {
    const response = await fetch ('http://localhost:8080/vans')
    const data = await response.json();
    setVans(data);
  }

  const fetchOrders = async () => {
    const response = await fetch ('http://localhost:8080/orders')
    const data = await response.json();
    setOrders(data);
  }
  
  const fetchClusteredOrders = (hubId) => {
    return fetch('http://localhost:8080/clusters', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: hubId 
    }).then(response => {
      return response.json();
    }).then(clusteredOrderList => {
      fetchData();
      return clusteredOrderList;
    })
  }

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchVans(),
        fetchOrders()
      ]);
      setLoading(false);
    } catch (error) {
      console.error ("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect (() => {
    fetchData();
  }, []);

  // New function to set the selected order
  const selectOrder = (id) => {
    const order = orders.find(o => o.id === parseInt(id));
    setSelectedOrder(order);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleGetCluster = (hubId) => {
    return fetchClusteredOrders(hubId);
  }

  const setOrderToDelivered = async (orderId) => {
    const response = await fetch(`http://localhost:8080/orders/delivered/${orderId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"}
    })
    const data = await response.json()
    fetchData();
  }

  const setOrderToNotDelivered = async (orderId) => {
    const response = await fetch(`http://localhost:8080/orders/not-delivered/${orderId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"}
    })
    const data = await response.json()
    fetchData();
  }

  return (
    <Router>
      <div className='app d-flex flex-column min-vh-100'>
        <Navigation />
        <main className='flex-shrink-0'>
          <Routes>
            <Route exact path="/" element={<Home orders={orders} vans={vans}/>}/>
            <Route path="/vans" element={<VanList vans={vans} />}/>
            <Route path="/orders" element={<OrderList orders={orders} />}/>
            <Route path="/vans/:id" element={<VanPage vans={vans} setOrderToDelivered={setOrderToDelivered} setOrderToNotDelivered={setOrderToNotDelivered} orders={orders}/>}/>
            <Route 
              path="/orders/:id" 
              element={
                <OrderDetails 
                  order={selectedOrder} 
                  selectOrder={selectOrder}
                />
              }
            />
            <Route path="/regionalhubs/:id" element={<RegionalHub handleGetCluster={handleGetCluster} />} />
          </Routes>
        </main>
        {/* <Routes>
          <Route path="/about-us" component={<AboutUs />} />
        </Routes> */}
        <Footer />
      </div>
    </Router>
  )
}

export default App;