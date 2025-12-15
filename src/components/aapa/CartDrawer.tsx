import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  AlertCircle,
  PackageX,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";

const JK_DISTRICTS = [
  "Srinagar",
  "Anantnag",
  "Ganderbal",
  "Shopian",
  "Kulgam",
  "Pulwama",
  "Budgam",
  "Baramulla",
  "Bandipora",
  "Kupwara",
  "Jammu",
  "Kathua",
  "Samba",
  "Udhampur",
  "Reasi",
  "Rajouri",
  "Poonch",
  "Doda",
  "Kishtwar",
  "Ramban",
];

const CartDrawer = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    clearCart,
    hasOutOfStockItems,
  } = useCart();

  const [step, setStep] = useState<"cart" | "delivery" | "policy">("cart");
  const [formData, setFormData] = useState({
    fullName: "",
    district: "",
    customState: "",
    address: "",
    pincode: "",
    phone: "",
    coupon: "",
  });

  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    district: "",
    customState: "",
    address: "",
    pincode: "",
    phone: "",
  });

  // Calculate delivery charge based on district
  useEffect(() => {
    if (formData.district && formData.district !== "Other") {
      const isJK = JK_DISTRICTS.includes(formData.district);
      setDeliveryCharge(isJK ? 60 : 100);
    } else if (formData.district === "Other" && formData.customState) {
      setDeliveryCharge(100);
    } else {
      setDeliveryCharge(0);
    }
  }, [formData.district, formData.customState]);

  // Calculate discount based on coupon
  useEffect(() => {
    if (formData.coupon === "SAVE10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else if (formData.coupon === "SAVE20") {
      setDiscount(Math.round(subtotal * 0.2));
    } else {
      setDiscount(0);
    }
  }, [formData.coupon, subtotal]);

  const finalTotal = subtotal - discount + deliveryCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleProceedToDelivery = () => {
    setStep("delivery");
  };

  const handleProceedToPolicy = () => {
    const newErrors = {
      fullName: "",
      district: "",
      customState: "",
      address: "",
      pincode: "",
      phone: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.district) {
      newErrors.district = "Please select your district";
    }

    if (formData.district === "Other" && !formData.customState.trim()) {
      newErrors.customState = "Please enter your state name";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (formData.pincode.length !== 6) {
      newErrors.pincode = "Pincode must be 6 digits";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must contain only numbers";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone must be 10 digits";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must contain only numbers";
    }

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setStep("policy");
  };

  const generateWhatsAppMessage = () => {
    const orderDetails = items
      .map(
        (item) =>
          `${item.quantity}x ${item.product.name} - ${item.product.weight} (₹${
            item.product.price
          } × ${item.quantity} = ₹${item.product.price * item.quantity})`
      )
      .join("\n");

    const displayDistrict =
      formData.district === "Other" ? formData.customState : formData.district;

    const message = `🛒 *NEW ORDER - AAPA FOODS*\n\n*CUSTOMER DETAILS:*\n━━━━━━━━━━━━━━━━\n👤 Name: ${
      formData.fullName
    }\n📍 District: ${displayDistrict}\n🏠 Address: ${
      formData.address
    }\n📮 Pincode: ${formData.pincode}\n📞 Phone: ${
      formData.phone
    }\n\n*ORDER DETAILS:*\n━━━━━━━━━━━━━━━━\n${orderDetails} (${
      JK_DISTRICTS.includes(formData.district) ? "J&K" : "Outside J&K"
    })\n━━━━━━━━━━━━━━━━\n💰 *TOTAL: ₹${finalTotal}*\n\n✅ Customer agrees: Pre-paid orders only (No COD)\n\n_Please share payment details (UPI/QR/Bank) to complete this order._`;

    return `https://wa.me/919541526345?text=${encodeURIComponent(message)}`;
  };

  const handleFinalSubmit = () => {
    // Check if any item is out of stock
    if (hasOutOfStockItems) {
      setShowOutOfStockModal(true);
      return;
    }

    const whatsappLink = generateWhatsAppMessage();
    window.open(whatsappLink, "_blank");
    clearCart();
    setFormData({
      fullName: "",
      district: "",
      customState: "",
      address: "",
      pincode: "",
      phone: "",
      coupon: "",
    });
    setErrors({
      fullName: "",
      district: "",
      customState: "",
      address: "",
      pincode: "",
      phone: "",
    });
    setStep("cart");
    setIsOpen(false);
  };

  const handleClose = () => {
    setStep("cart");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center">
        <div className="bg-[#1a1f2e] w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-[#1a1f2e] border-b border-gray-700 p-6 flex items-center justify-between z-10">
            <h2 className="font-serif text-2xl flex items-center gap-3 text-white">
              <ShoppingBag className="w-6 h-6 text-yellow-500" />
              {step === "cart" && "Your Cart"}
              {step === "delivery" && "Delivery Details"}
              {step === "policy" && "Payment Policy"}
            </h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* STEP 1: CART */}
          {step === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-600 mb-4" />
                  <p className="text-gray-400 mb-2">Your cart is empty</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {/* Out of Stock Warning in Cart */}
                  {hasOutOfStockItems && (
                    <div className="bg-red-900/30 border border-red-600/50 rounded-xl p-3 flex gap-2">
                      <PackageX className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-200">
                        Some items in your cart are currently out of stock
                      </p>
                    </div>
                  )}

                  {/* Cart Items */}
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className={`flex gap-4 p-4 rounded-xl relative ${
                        !item.product.inStock
                          ? "bg-[#232938]/50 border-2 border-red-600/30"
                          : "bg-[#232938]"
                      }`}
                    >
                      {!item.product.inStock && (
                        <div className="absolute top-14 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          Out of Stock
                        </div>
                      )}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className={`w-20 h-20 rounded-lg object-cover ${
                          !item.product.inStock ? "opacity-50" : ""
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h4
                              className={`font-serif text-lg ${
                                !item.product.inStock
                                  ? "text-gray-500"
                                  : "text-white"
                              }`}
                            >
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1">
                              {item.product.weight}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors p-1"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center gap-2 bg-[#1a1f2e] rounded-full p-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700 text-white"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-white font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700 text-white"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <p
                            className={`font-serif text-lg ${
                              !item.product.inStock
                                ? "text-gray-500"
                                : "text-yellow-500"
                            }`}
                          >
                            ₹{item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Price Summary */}
                  <div className="border-t border-gray-700 pt-4 mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400 text-lg">Total</span>
                      <span className="font-serif text-3xl text-white">
                        ₹{subtotal}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 text-center mb-6">
                      Shipping calculated at checkout
                    </p>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={handleProceedToDelivery}
                    className="w-full bg-yellow-500 text-gray-900 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Order via WhatsApp
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    You'll be redirected to WhatsApp to complete your order
                  </p>
                </div>
              )}
            </>
          )}

          {/* STEP 2: DELIVERY DETAILS */}
          {step === "delivery" && (
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-400 mb-4">
                Please provide your delivery details to calculate shipping
                charges
              </p>

              {/* Full Name */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Full Name *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#232938] border ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700 focus:ring-yellow-500"
                  } text-white rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500`}
                  required
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#232938] border ${
                    errors.district
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700 focus:ring-yellow-500"
                  } text-white rounded-lg focus:outline-none focus:ring-2`}
                  required
                >
                  <option value="">Select Your District *</option>
                  <optgroup label="Jammu & Kashmir (₹60 delivery)">
                    {JK_DISTRICTS.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Other States (₹100 delivery)">
                    {/* <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option> */}
                    <option value="Other">Other </option>
                  </optgroup>
                </select>
                {errors.district && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.district}
                  </p>
                )}
              </div>

              {/* Custom State Input (shows when "Other" is selected) */}
              {formData.district === "Other" && (
                <div>
                  <input
                    type="text"
                    name="customState"
                    placeholder="Enter Your State/City Name *"
                    value={formData.customState}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#232938] border ${
                      errors.customState
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-700 focus:ring-yellow-500"
                    } text-white rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500`}
                    required
                  />
                  {errors.customState && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.customState}
                    </p>
                  )}
                </div>
              )}

              {/* Address */}
              <div>
                <textarea
                  name="address"
                  placeholder="Full Delivery Address (Street, Locality, House No., Landmark) *"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 bg-[#232938] border ${
                    errors.address
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-700 focus:ring-yellow-500"
                  } text-white rounded-lg focus:outline-none focus:ring-2 resize-none placeholder-gray-500`}
                  required
                />
                {errors.address && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Pincode & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode (6) *"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    maxLength={6}
                    pattern="[0-9]{6}"
                    className={`w-full px-4 py-3 bg-[#232938] border ${
                      errors.pincode
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-700 focus:ring-yellow-500"
                    } text-white rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500`}
                    required
                  />
                  {errors.pincode && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.pincode}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (10) *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className={`w-full px-4 py-3 bg-[#232938] border ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-700 focus:ring-yellow-500"
                    } text-white rounded-lg focus:outline-none focus:ring-2 placeholder-gray-500`}
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Summary with Delivery Charge */}
              <div className="border-t border-b border-gray-700 py-4 space-y-2 text-sm bg-[#232938] rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-white mb-3">Order Summary</h4>
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span className="text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Charge:</span>
                  <span className="text-yellow-500">
                    {deliveryCharge > 0
                      ? `+₹${deliveryCharge}`
                      : "Select district"}
                  </span>
                </div>
                <div className="flex justify-between font-serif text-xl text-white pt-2 border-t border-gray-700">
                  <span>Final Total:</span>
                  <span className="text-yellow-500">₹{finalTotal}</span>
                </div>
              </div>

              {/* Buttons */}
              <button
                onClick={handleProceedToPolicy}
                className="w-full bg-yellow-500 text-gray-900 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-colors mt-4"
              >
                Continue to Payment Policy
              </button>

              <button
                onClick={() => setStep("cart")}
                className="w-full text-yellow-500 py-2 text-center text-sm font-medium hover:underline"
              >
                ← Back to Cart
              </button>
            </div>
          )}

          {/* STEP 3: PAYMENT POLICY */}
          {step === "policy" && (
            <div className="p-6 space-y-6">
              {/* Warning Box */}
              <div className="bg-amber-900/30 border-2 border-amber-600/50 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-amber-400">
                    Important Payment Policy
                  </h3>
                  <ul className="text-sm text-amber-200/90 space-y-1">
                    <li>
                      ✅ <strong>Pre-paid orders only</strong>
                    </li>
                    <li>
                      ❌ <strong>No Cash on Delivery (COD)</strong>
                    </li>
                    <li>
                      💳 Payment details (UPI/QR/Bank) will be sent via WhatsApp
                    </li>
                    <li>📦 Order confirmed after payment verification</li>
                  </ul>
                </div>
              </div>

              {/* Out of Stock Warning in Policy Step */}
              {hasOutOfStockItems && (
                <div className="bg-red-900/30 border-2 border-red-600/50 rounded-xl p-4 flex gap-3">
                  <PackageX className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-red-400">
                      Items Out of Stock
                    </h3>
                    <p className="text-sm text-red-200/90">
                      Some products in your cart are currently unavailable.
                      Please remove them to continue with your order.
                    </p>
                  </div>
                </div>
              )}

              {/* Final Order Summary */}
              <div className="bg-[#232938] rounded-xl p-4 space-y-3">
                <h4 className="font-serif text-lg text-white">
                  Final Order Summary
                </h4>

                <div className="space-y-1 text-sm">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className={`flex justify-between ${
                        !item.product.inStock
                          ? "text-gray-500 line-through"
                          : "text-gray-400"
                      }`}
                    >
                      <span>
                        {item.quantity}x {item.product.name}{" "}
                        {!item.product.inStock && "(Out of Stock)"}
                      </span>
                      <span
                        className={!item.product.inStock ? "" : "text-white"}
                      >
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-2 space-y-1 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal:</span>
                    <span className="text-white">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Discount:</span>
                    <span className="text-green-400">-₹{discount}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>
                      Delivery (
                      {formData.district === "Other"
                        ? formData.customState
                        : formData.district}
                      ):
                    </span>
                    <span className="text-yellow-500">+₹{deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between font-serif text-xl text-white pt-2 border-t border-gray-700">
                    <span>Total Amount:</span>
                    <span className="text-yellow-500">₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Details Summary */}
              <div className="bg-[#232938] rounded-xl p-4 space-y-1 text-sm">
                <h4 className="font-semibold text-white mb-2">Delivery To:</h4>
                <p className="text-gray-300">{formData.fullName}</p>
                <p className="text-gray-300">{formData.address}</p>
                <p className="text-gray-300">
                  {formData.district === "Other"
                    ? formData.customState
                    : formData.district}
                  , {formData.pincode}
                </p>
                <p className="text-gray-300">Phone: {formData.phone}</p>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleFinalSubmit}
                disabled={hasOutOfStockItems}
                className={`w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors ${
                  hasOutOfStockItems
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                {hasOutOfStockItems
                  ? "Cannot Proceed - Items Out of Stock"
                  : "I Understand, Proceed to Order"}
              </button>

              <button
                onClick={() => setStep("delivery")}
                className="w-full text-yellow-500 py-2 text-center text-sm font-medium hover:underline"
              >
                ← Back to Delivery Details
              </button>

              <button
                onClick={handleClose}
                className="w-full text-gray-500 py-2 text-center text-sm font-medium hover:underline"
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Out of Stock Modal */}
      {showOutOfStockModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1a1f2e] rounded-2xl max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <PackageX className="w-8 h-8" />
              <h3 className="font-serif text-xl">Products Out of Stock</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Unfortunately, some items in your cart are currently out of stock
              and cannot be ordered at this time. Please remove these items from
              your cart to proceed with your order.
            </p>
            <div className="space-y-2">
              {items
                .filter((item) => !item.product.inStock)
                .map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between bg-[#232938] p-3 rounded-lg"
                  >
                    <span className="text-gray-300 text-sm">
                      {item.product.name}
                    </span>
                    <button
                      onClick={() => {
                        removeFromCart(item.product.id);
                        if (!items.some((i) => !i.product.inStock)) {
                          setShowOutOfStockModal(false);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
            <button
              onClick={() => setShowOutOfStockModal(false)}
              className="w-full bg-yellow-500 text-gray-900 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;
