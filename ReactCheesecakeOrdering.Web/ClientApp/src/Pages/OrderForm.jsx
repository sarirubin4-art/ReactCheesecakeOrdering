import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const OrderForm = () => {
  const baseFlavors = [
    'Classic New York',
    'Vanilla Bean',
    'Belgian Chocolate',
    'Lemon Zest',
    'Pumpkin Spice',
    'Espresso Bean',
    'Matcha Green Tea',
    'Toasted Almond',
    'Ricotta & Honey',
    'Salted Caramel Swirl',
    'Mixed Berry Swirl',
    'Sour Cream'
  ];

  const toppingOptions = [
    'Macerated Strawberries with Vanilla',
    'Warm Salted Caramel Sauce',
    'Dark Chocolate Ganache',
    'Blueberry Compote with Lemon Zest',
    'Raspberry Coulis',
    'Cherry Amaretto Compote',
    'Golden Graham Crumble',
    'Lemon Curd & Zest',
    'Espresso Crunch',
    'Seasonal Berry Medley',
    'Praline Almond Crunch',
    'Vanilla Bean Whipped Cream'
  ];

  const basePrice = 49.99;
  const toppingPrice = 3;

  const [order, setOrder] = useState({
    name: '',
    email: '',
    base: '',
    toppings: [],
    special: '',
    quantity: 1,
    deliveryDate: ''
  });

  const navigate = useNavigate();

  const onInputChange = e => {
    const copy = { ...order };
    copy[e.target.name] = e.target.value;
    setOrder(copy);
  }

  const toggleTopping = (topping) => {
    setOrder((prev) => {
      const has = prev.toppings.includes(topping);
      const newToppings = has ? prev.toppings.filter((t) => t !== topping) : [...prev.toppings, topping];
      return { ...prev, toppings: newToppings };
    });
  };
  const getTotal = () => {
    const singleTotal = basePrice + toppingPrice * order.toppings.length;
    return singleTotal * (order.quantity || 1);
  }

  const completeOrder = () => {
      const completed = { ...order, total: Number(getTotal()), toppings: order.toppings.join(', ') }
      
    return completed;
  }

  const onPlaceOrderClick = async () => {
      const completedOrder = completeOrder();
      const correctFormat = {
          CustomerName: completedOrder.name,
          Email: completedOrder.email,
          BaseFlavor: completedOrder.base,
          Toppings: completedOrder.toppings,
          Quantity: completedOrder.quantity,
          DeliveryDate: completedOrder.deliveryDate,
          SpecialRequests: completedOrder.special,
          total: completedOrder.total
      }
      if (order.name == '' || order.email == '' || order.base == '' || order.deliveryDate == '' || order.toppings.length === 0) {
          alert('Please fill in all required fields and select at least one topping');
          return;
      }
    await axios.post('/api/home/placeorder', correctFormat);
      navigate(`/success?order=${{ order: completedOrder }}`);
  }

  // warm-brown used inline for accents (keeps everything Bootstrap-first)
  const accent = { color: '#5b4229', fontFamily: `'Playfair Display', serif` };
  const bodyFont = { fontFamily: `'Lora', serif` };

  return (
    <div className="container-fluid vh-100 bg-light" style={bodyFont}>
      <div className="row h-100 g-0">
        {/* Left: Form */}
        <div className="col-md-8 col-lg-9 d-flex align-items-start">
          <div className="container py-3">
            <div className="row">
              <div className="col-12 col-xl-10">
                <h1 className="h4 fw-bold mb-1" style={accent}>Redefine Your Cheesecake</h1>
                <h2 className="h6 text-muted mb-3" style={{ color: '#8b7355' }}>Choose your preferences</h2>

                <div className="mb-2">
                  <input
                    type="text"
                    value={order.name}
                    className="form-control form-control-sm rounded-3"
                    placeholder="Name"
                    name="name"
                    onChange={onInputChange}
                  />
                </div>

                <div className="mb-2">
                  <input
                    type="email"
                    value={order.email}
                    className="form-control form-control-sm rounded-3"
                    placeholder="Email"
                    name="email"
                    onChange={onInputChange}
                  />
                </div>

                <div className="mb-2">
                  <select
                    className="form-select form-select-sm rounded-3"
                    onChange={onInputChange}
                    value={order.base}
                    name="base"
                  >
                    <option value="">Choose your base...</option>
                    {baseFlavors.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <fieldset className="mb-2 p-2 border rounded-3 bg-white">
                  <legend className="small fw-semibold mb-2" style={accent}>Toppings</legend>
                  <div className="row gx-2 gy-1">
                    {toppingOptions.map((t, idx) => (
                      <div className="col-6" key={t}>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id={`topping-${idx}`}
                            className="form-check-input"
                            checked={order.toppings.includes(t)}
                            onChange={() => toggleTopping(t)}
                          />
                          <label className="form-check-label small text-dark" htmlFor={`topping-${idx}`}>{t}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div className="mb-2">
                  <textarea
                    value={order.special}
                    className="form-control form-control-sm rounded-3"
                    name="special"
                    placeholder="Special Requests:"
                    onChange={onInputChange}
                    rows={2}
                  />
                </div>

                <div className="row gx-2">
                  <div className="col-6 mb-2">
                    <input
                      type="number"
                      value={order.quantity}
                      className="form-control form-control-sm rounded-3"
                      placeholder="Quantity"
                      name="quantity"
                      min="1"
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <input
                      type="date"
                      value={order.deliveryDate}
                      className="form-control form-control-sm rounded-3"
                      name="deliveryDate"
                      onChange={onInputChange}
                    />
                  </div>
                </div>

                {/* Sticky action */}
                <div className="position-sticky" style={{ bottom: 12 }}>
                  <button
                    className="btn btn-dark btn-sm rounded-3"
                    name="placeOrder"
                    onClick={onPlaceOrderClick}
                    style={{ backgroundColor: '#5b4229', borderColor: '#4a341f' }}
                  >
                    Place Order
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview sidebar */}
        <div className="col-md-4 col-lg-3 bg-white border-start d-flex flex-column align-items-center py-3">
          <h3 className="h6 text-center fw-bold mb-2" style={accent}>
            {order.name ? `${order.name}'s Dream` : 'Your Creation'}
          </h3>

          <img
            src="https://images.unsplash.com/photo-1615996001375-c76ee27c5c1a?w=500&q=80"
            alt="Cheesecake slice preview"
            className="img-fluid rounded-3 mb-3 shadow-sm"
          />

          <div className="text-center small text-dark w-100 px-2">
            {order.base && (
              <div className="mb-2">
                <div className="text-muted small">BASE</div>
                <div className="fw-semibold" style={{ color: '#6b4f38' }}>{order.base}</div>
              </div>
            )}

            {order.toppings.length > 0 && (
              <div className="mb-2">
                <div className="text-muted small">TOPPINGS</div>
                <div className="">{order.toppings.join(', ')}</div>
              </div>
            )}

            <div className="mb-2">
              <div className="text-muted small">QTY</div>
              <div className="fw-semibold">{order.quantity}</div>
            </div>

            {order.deliveryDate && (
              <div className="mb-2">
                <div className="text-muted small">DELIVERY</div>
                <div>{dayjs(order.deliveryDate).format('MM/DD/YYYY')}</div>
              </div>
            )}

            {order.special && (
              <div className="mb-2">
                <div className="text-muted small">REQUESTS</div>
                <div className="small">{order.special}</div>
              </div>
            )}

            {order.base && (
              <div className="mt-3 pt-2 border-top w-100">
                <div className="fs-5 fw-bold" style={{ color: '#5b4229' }}>${getTotal().toFixed(2)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
