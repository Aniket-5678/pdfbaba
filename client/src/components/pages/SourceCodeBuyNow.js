import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const SourceCodeBuyNow = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.user) {
      toast("Log in to continue with your purchase.", { icon: "🔒" });
      navigate("/login", { replace: true, state: { from: { pathname: location.pathname, search: location.search, hash: location.hash } } });
      return;
    }
    fetchService();
  }, [auth.user, navigate, location.pathname, location.search, location.hash]);

  const fetchService = async () => {
    try {
      const res = await axios.get(`/api/v1/sourcecode/${id}`);
      const project = res.data.service || res.data;
      setService(project);
      setMainImage(project.thumbnail || project.multipleImages?.[0] || "");
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!auth.user) {
      toast("Log in to continue with your purchase.", { icon: "🔒" });
      navigate("/login", { state: { from: { pathname: location.pathname, search: location.search, hash: location.hash } } });
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/v1/sourcecode/buy",
        { sourceCodeId: id },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      if (!window.Razorpay) {
        toast.error("Secure checkout is unavailable right now. Please refresh and try again.");
        return;
      }

      const options = {
        key: "rzp_live_RZGTtRmXVsMddp",
        amount: data.amount,
        currency: data.currency,
        name: service.title,
        description:
          service.title.length > 100
            ? service.title.slice(0, 100) + "..."
            : service.title,
        image: service.thumbnail,
        order_id: data.orderId,
        prefill: {
          name: auth.user?.name,
          email: auth.user?.email,
        },
        theme: {
          color: "#1976d2",
        },


  redirect: true, // ✅ Fix redirect glitch

  method: {
    upi: true,
    card: true,
    netbanking: true,
    wallet: false,
  },

  config: {
    display: {
      sequence: ["upi", "card", "netbanking"],
      blocks: {
        upi: {
          name: "Pay Using UPI",
          instruments: [
            {
              method: "upi",
              flows: ["intent"], // ✅ No permission popup → smooth redirect
            },
          ],
        },
      },
    },
  },


        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              "/api/v1/sourcecode/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                sourceCodeId: id,
                amount: data.amount / 100,
              },
              { headers: { Authorization: `Bearer ${auth.token}` } }
            );

            const downloadToken = verifyRes.data.orderId; 
           toast.success("✅ Payment successful! Redirecting to download...");

            window.location.href = `/success/${downloadToken}`;
          } catch (verifyErr) {
            console.error(
              "Verification failed:",
              verifyErr.response?.data || verifyErr.message
            );
            toast.error("❌ Payment verification failed. Please contact support.");
          }
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Buy request failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Payment could not be started. Please try again.");
    }
  };

  if (!auth.user) return null;
  if (loading) return <Layout><div className="flex min-h-[70vh] items-center justify-center text-sm font-semibold text-violet-700">Preparing your secure checkout…</div></Layout>;

  if (!service)
    return (
      <Layout><div className="py-32 text-center text-lg font-semibold text-slate-600">Project not found.</div></Layout>
    );

  return (
    <Layout>
      <div className="min-h-[80vh] bg-gradient-to-b from-violet-50/70 via-white to-white px-4 pb-12 pt-8 sm:px-6 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-6xl">
          <button onClick={() => navigate(`/service/${id}`)} className="mb-5 text-sm font-semibold text-violet-700 hover:underline">← Back to project</button>
          <div className="mb-5 sm:mb-7"><p className="text-[10px] font-extrabold tracking-[.2em] text-violet-600 sm:text-xs">SECURE CHECKOUT</p><h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">You’re one step away.</h1><p className="mt-2 text-sm text-slate-500 sm:text-base">Review your project and complete your one-time payment.</p></div>
          <div className="grid min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-violet-100/60 sm:rounded-[28px] lg:grid-cols-[1.1fr_.9fr]">
          {/* Left Side - Image Gallery */}
          <div className="min-w-0 bg-slate-50 p-3 sm:p-6">
            <div className="flex h-[230px] items-center justify-center overflow-hidden rounded-xl bg-white p-3 sm:h-[380px] sm:rounded-2xl lg:h-[460px]"><img className="max-h-full w-full object-contain" src={mainImage || "/placeholder.png"} alt={service.title} /></div>
            {service.multipleImages?.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-4 sm:gap-3">
                {[service.thumbnail, ...service.multipleImages].filter(Boolean).map((img, i) => (
                  <button key={`${img}-${i}`} type="button" onClick={() => setMainImage(img)} aria-label={`Show project image ${i + 1}`} aria-pressed={mainImage === img} className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 transition sm:h-20 sm:w-24 ${mainImage === img ? "border-violet-600" : "border-transparent"}`}>
                    <img src={img} alt="" className="h-full w-full rounded-md object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Details */}
          <div className="flex min-w-0 flex-col justify-between p-5 sm:p-8 lg:p-9"><div>
              <h2 className="break-words text-xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-2xl">
                {service.title}
              </h2>

              <p className="mb-5 mt-3 whitespace-pre-line break-words text-sm leading-7 text-slate-600 sm:mb-6 sm:mt-4">
                {service.description}
              </p>

              <div className="border-t border-slate-100" />

              <p className="mb-1 mt-5 text-4xl font-extrabold text-slate-950">
                ₹{service.price}
              </p>

              <p className="mb-6 text-sm text-slate-500">One-time payment · Instant download access</p>

              <button onClick={handlePayment} className="w-full rounded-2xl bg-violet-700 px-4 py-4 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800 sm:text-base">Pay securely & get your source code →</button><p className="mt-3 text-center text-xs leading-5 text-slate-500">Secure payment · Files unlock after successful payment</p>
            </div>

            <div className="mt-7 border-t border-slate-100 pt-5 sm:mt-8"><h3 className="mb-3 font-bold text-slate-900">Your purchase includes</h3><ul className="space-y-2 text-sm text-slate-600"><li>✓ Complete source code and setup instructions</li><li>✓ Ready-to-use project files</li><li>✓ Lifetime access after purchase</li><li className="text-xs text-slate-500">Digital purchases are non-refundable.</li></ul></div>
          </div></div>
        </div>
      </div>
    </Layout>
  );
};

export default SourceCodeBuyNow;
