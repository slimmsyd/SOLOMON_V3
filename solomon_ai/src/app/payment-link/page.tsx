import PaymentSuccess from "../payment-success/page";
import PayementGatway from "../hooks/PaymentGateWay";

export default function PaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center p-[2rem] h-[100vh] bg-white">
      <div className="text-black paymentDiv max-w-[450px] text-center py-[20px] ">
        <h2 className="text-black font-bold">Subscribe To Illumiate Your Self</h2>
        <p></p>
        <p>Buy purchasing this app you agree to the "terms and agreements"</p>
      </div>

      <PayementGatway />
    </div>
  );
}
