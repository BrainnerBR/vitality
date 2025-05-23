import { motion } from "framer-motion";

const plans = [
  {
    title: "Standard",
    price: "$8",
    features: ["1 usuario", "Soporte básico", "Acceso limitado"],
    delay: 0,
  },
  {
    title: "Standard Plus",
    price: "$12",
    features: ["3 usuarios", "Soporte prioritario", "Acceso completo"],
    delay: 0.2,
  },
  {
    title: "Premium",
    price: "$18",
    features: ["Usuarios ilimitados", "Soporte 24/7", "Acceso VIP + Integraciones"],
    delay: 0.4,
  },
];

const Planes = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10">Nuestros Planes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, delay: plan.delay }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl hover:cursor-pointer transition"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4">{plan.title}</h3>
                <p className="text-3xl font-bold mb-4">{plan.price} / mes</p>
                <ul className="text-gray-600 mb-6 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
              <button className="mt-auto bg-red-500 text-white rounded-xl py-2 px-4 hover:bg-red-700 transition">
                Empezar hoy
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Planes;
