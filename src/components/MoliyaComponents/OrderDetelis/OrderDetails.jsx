import './OrderDetails.scss'

const OrderDetails = () => {


   const someArr = [
      {
         title: "#The Complete JavaScript Course 2020: Real Projects!",
         price: "$96.00"
      },
      {
         title: "Productivity and Time Management f or the...",
         price: "$96.00"
      }
   ]

   return (
      <div className="orderDetails">
         <div className="heading">
            <h1>Order Details</h1>
         </div>

         <div className="main_order">
            <div className="main_heading">
               <h1>Kurslar</h1>
               <h1>Summa</h1>
            </div>

            <div className="main_infor">
               {
                  someArr.map((item, i) => (
                     <div key={i} className="information">
                        <p>{item.title}</p>
                        <span>{item.price}</span>
                     </div>
                  ))
               }
            </div>

            <div className="total_nfo">
               <div className="sub_price">
                  <span>Subtotal</span>
                  <span>100</span>
               </div>
               <div className="sub_price">
                  <span>Total</span>
                  <span>100</span>
               </div>
            </div>

            <div className="keys">
               <span>Order key: ORDER5F0DEE5A04738</span>
               <button>Tugatish</button>
            </div>
         </div>
      </div>
   )
}

export default OrderDetails