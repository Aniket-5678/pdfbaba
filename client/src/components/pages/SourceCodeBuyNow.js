import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../Layout/Layout";
import {
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const SourceCodeBuyNow = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
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
      setService(res.data.service || res.data);
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
      <div className="min-h-[80vh] bg-gradient-to-b from-violet-50/70 via-white to-white px-4 pb-20 pt-28 dark:from-slate-950 dark:via-slate-950 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <button onClick={() => navigate(`/service/${id}`)} className="mb-6 text-sm font-semibold text-violet-700 hover:underline">← Back to project</button>
          <div className="mb-6"><p className="text-xs font-extrabold tracking-[.2em] text-violet-600">SECURE CHECKOUT</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">You’re one step away.</h1><p className="mt-2 text-slate-500">Review your project and complete your one-time payment.</p></div>
          <div className="grid overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-violet-100/60 dark:border-white/10 dark:bg-slate-900 lg:grid-cols-[1.1fr_.9fr]">
          {/* Left Side - Image Gallery */}
          <div className="flex min-h-[300px] items-center justify-center bg-slate-50 p-6 dark:bg-slate-800 sm:min-h-[480px]"><img className="max-h-[460px] w-full rounded-2xl object-contain" src={service.thumbnail || "/placeholder.png"} alt={service.title} />

            {service.multipleImages?.length > 0 && (
              <div className="flex gap-3 overflow-x-auto bg-white p-4 dark:bg-slate-900">
                {service.multipleImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Screenshot ${i}`}
                    className="h-16 w-20 rounded-xl border border-slate-200 object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Details */}
          <div className="flex flex-col justify-between p-6 sm:p-9"><div>
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white">
                {service.title}
              </h2>

              <p className="mb-6 mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                {service.description}
              </p>

              <div className="border-t border-slate-100" />

              <p className="mb-1 mt-5 text-4xl font-extrabold text-slate-950 dark:text-white">
                ₹{service.price}
              </p>

              <p className="mb-6 text-sm text-slate-500">One-time payment · Instant download access</p>

              <button onClick={handlePayment} className="w-full rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 dark:bg-violet-600">Pay securely & get your source code →</button><p className="mt-3 text-center text-xs text-slate-500">Secure payment · Files unlock after successful payment</p>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-5 dark:border-white/10"><h3 className="mb-3 font-bold text-slate-900 dark:text-white">Your purchase includes</h3><ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300"><li>✓ Complete source code and setup instructions</li><li>✓ Ready-to-use project files</li><li>✓ Lifetime access after purchase</li><li className="text-xs text-slate-500">Digital purchases are non-refundable.</li></ul></div>
          </div></div>
        </div>
      </div>
    </Layout>
  );
};

export default SourceCodeBuyNow;
