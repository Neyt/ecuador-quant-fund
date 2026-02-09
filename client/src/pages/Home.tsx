/**
 * Ecuador Quant Fund - Landing Page
 * Design: "Terminal Financiero" — Institutional data-dense aesthetic
 * Colors: Navy deep (#0a0e27), Gold accents, Teal data, Emerald success
 * Fonts: DM Serif Display (titles), DM Sans (body), JetBrains Mono (data)
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp, Shield, Brain, BarChart3, Target, Clock,
  ChevronDown, Code2, Database, LineChart, Zap, Lock,
  AlertTriangle, Users, ArrowRight, CheckCircle2, Activity
} from "lucide-react";

// Image URLs
const IMAGES = {
  heroBg: "https://private-us-east-1.manuscdn.com/sessionFile/Yq3xJZUJTvFC59xtbxYnfD/sandbox/5DOTgi6WyWA8IJpzXbcGIt-img-1_1770674676000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWXEzeEpaVUpUdkZDNTl4dGJ4WW5mRC9zYW5kYm94LzVET1RnaTZXeVdBOElKcHpYYmNHSXQtaW1nLTFfMTc3MDY3NDY3NjAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=QZpUYd3xvrtxxllpMZC3QVKyuK56XAcqB5eDkmBm~idjZQCUrMcAbmz5nq9RYLjYV2~ccKThRbNk~yCvUx-1LWtOn8bXrH0iDAHoBxwksGQ3UDHQdGMa3N2ZNtc4vkZIHy9xiPRlLhXOpOibb1grz7~Zaus00ke57CKgXk3SvoZz6H396UOPPs71yKBFCtBMkZwUmAPJbj-EMFVYQBJIGH9dCzsYuuch4XBJdPAPnpbnv55U~SlCCWyEYbRzYdWIX9mr3i4iZ~2xcMHa0CNKg0I6CL0C332KKEZuovabD0mr2RlAh7zu1z7F47USu7hWhczBjwiRfwsmDOBZYVHU6Q__",
  quantAbstract: "https://private-us-east-1.manuscdn.com/sessionFile/Yq3xJZUJTvFC59xtbxYnfD/sandbox/5DOTgi6WyWA8IJpzXbcGIt-img-2_1770674667000_na1fn_cXVhbnQtYWJzdHJhY3Q.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWXEzeEpaVUpUdkZDNTl4dGJ4WW5mRC9zYW5kYm94LzVET1RnaTZXeVdBOElKcHpYYmNHSXQtaW1nLTJfMTc3MDY3NDY2NzAwMF9uYTFmbl9jWFZoYm5RdFlXSnpkSEpoWTNRLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=HjGesMyOvlzXckjQANidhWQbeODQ~2YelSnzeXf1XONBg6lU73Vb7WsRIs2YNUYfLLi1MGJqj-tI7lkMxdPgFmSj6IicFG7JEg~JiF4-OwPIRAJDYFnZI86Wv0C5ji1U~TSBzkKdEfFt91bIYsVfCYHLwnfVKTDAl82AKsmo~Yscbu905oxWjNaJIYMp~3zOmpWO7vbdUn1CM4R~c~5XIfaWOQFsQWilPEdQEyiLd9G0pmbxNfCo796sAmMwFvG0KQF~WLGjQtVXVM2yByG66BHKrTl3kJ8Ggmyfsvv5iE5YTkirmBVYXMYsl75CvLfeYXx840FlXkUnpGmCzlZdMQ__",
  dataPattern: "https://private-us-east-1.manuscdn.com/sessionFile/Yq3xJZUJTvFC59xtbxYnfD/sandbox/5DOTgi6WyWA8IJpzXbcGIt-img-4_1770674669000_na1fn_ZGF0YS1wYXR0ZXJu.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWXEzeEpaVUpUdkZDNTl4dGJ4WW5mRC9zYW5kYm94LzVET1RnaTZXeVdBOElKcHpYYmNHSXQtaW1nLTRfMTc3MDY3NDY2OTAwMF9uYTFmbl9aR0YwWVMxd1lYUjBaWEp1LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qvVHGabY1xy6Q9GtLiI2sVihDODldi6UFpW2xjlb8NVfE1UAZdH31vjkXL7qWjRhbaUML0FmpOOU1MfAh7bwbmtZSUPNhmo6zenQg9i2LGpt32-Zd-Kol-zXmVYOT6t0DB1uOVwL-~z510xWM5auVK35O85mGS6kf02qshzoKUvbbAd~qsHnHcaH2bv6TYOOCa-8MCcuKe0Ia~BwvYh0mrgzUocO4kYop7drJXBdX17DJp0L6S4-TZQUhec~cYqJBt7T2NClr2JKe17MsjAGwpDHxtsbjbZzRQnJf4oNdC8TKDZdoCRM7ZhwKJGQMY6XEt~t3sRAA2c22noOnnGxXA__",
  ecuadorSkyline: "https://private-us-east-1.manuscdn.com/sessionFile/Yq3xJZUJTvFC59xtbxYnfD/sandbox/5DOTgi6WyWA8IJpzXbcGIt-img-3_1770674672000_na1fn_ZWN1YWRvci1za3lsaW5l.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWXEzeEpaVUpUdkZDNTl4dGJ4WW5mRC9zYW5kYm94LzVET1RnaTZXeVdBOElKcHpYYmNHSXQtaW1nLTNfMTc3MDY3NDY3MjAwMF9uYTFmbl9aV04xWVdSdmNpMXphM2xzYVc1bC5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Kh29fSHeyYF8By3crIhosmdD7G1a2mGGjDcJRa2CCgZZKRYsyMNbuFGePdFiBLpBzcCWlLmXsllGNqPdGYBwlXvDoY23L7xPIFLw0Cl-NGBO00E1lZYzAAZyVXqDBmFL7VC5HPEAps-fmS~CAZkLIDmENOHLPAavCVK37sZ8yy9jih1OfpTGwwzn7~uKlwvDNi5ikbqtJX~czu13Ek56Eo4Iw3sRU9HL-SAFKArGtuUaDAj5mPYt63ekbfz0gFq4Wwn3sfv4-0Ovhhhx16n4wX~56vVYdDxajZtSxMLLjabFiadcJVRg7k2h8b8p6N7TXm1Rm01V2HB2Ia-II-dYpw__",
  equityCurve: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/WeBHnsHyvmDXLdhS.png",
  performance2026: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/XDhIMIiEqsxBpMMT.png",
  equityCurveDetail: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/pFCXIhYVOoHcKKrt.png",
  annualReturns: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/oMAPNKzIMmhPcIwE.png",
  dailyReturnsDist: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/rLlSbdOLZpcEtSKr.png",
  drawdown: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/VqLoPhCXxreSSjKP.png",
  metricsUnderstanding: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/WDKvzcnvuYdWCNGW.png",
  finalThoughts: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/MKvNzVcGpypjDjop.png",
  monthlyHeatmap: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/czCSMVFEUafUfnVF.png",
  buffettChart: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/ZrlHcrBRbRlnNwfF.png",
  networkPhotos: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/nXjRIirBAZCduFqt.jpg",
  networkPhotos2: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/HNOfrrNouVTUsVsS.png",
  networkPhotos3: "https://files.manuscdn.com/user_upload_by_module/session_file/116881280/AJQgWKLTqyXxbPfw.png",
};

// Animated counter component
function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Section wrapper with fade-in
function Section({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Navigation
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#resumen", label: "Resumen" },
    { href: "#estrategia", label: "Estrategia" },
    { href: "#rendimiento", label: "Rendimiento" },
    { href: "#mercado", label: "Mercado" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#equipo", label: "Equipo" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[oklch(0.13_0.03_260/0.95)] backdrop-blur-md border-b border-[oklch(0.85_0.15_85/0.1)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[oklch(0.85_0.15_85)] flex items-center justify-center">
              <Activity className="w-5 h-5 text-[oklch(0.13_0.03_260)]" />
            </div>
            <span className="font-display text-lg text-white tracking-wide">Ecuador Quant Fund</span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-[oklch(0.7_0.02_260)] hover:text-[oklch(0.85_0.15_85)] transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={IMAGES.heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.13_0.03_260/0.7)] via-[oklch(0.13_0.03_260/0.5)] to-[oklch(0.13_0.03_260)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.85_0.15_85/0.3)] bg-[oklch(0.85_0.15_85/0.08)] mb-8">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.17_155)] animate-pulse" />
                <span className="text-sm font-mono text-[oklch(0.85_0.15_85)]">Propuesta de Estructuración con Fideval</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
                Ecuador<br />
                <span className="text-[oklch(0.85_0.15_85)]">Quant Fund</span>
              </h1>

              <p className="text-xl text-[oklch(0.7_0.02_260)] max-w-xl mb-4 leading-relaxed">
                Plataforma Cuantitativa de nivel Institucional
              </p>
              <p className="text-base text-[oklch(0.55_0.02_260)] max-w-xl mb-10">
                El primer vehículo de inversión cuantitativa del Ecuador. 100,000+ líneas de código. 30 años de datos. Trading científico.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#rendimiento" className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.85_0.15_85)] text-[oklch(0.13_0.03_260)] font-semibold rounded-lg hover:bg-[oklch(0.90_0.15_85)] transition-all duration-300 shadow-[0_0_30px_oklch(0.85_0.15_85/0.2)]">
                  Ver Rendimiento
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#resumen" className="inline-flex items-center gap-2 px-6 py-3 border border-[oklch(0.85_0.15_85/0.3)] text-[oklch(0.85_0.15_85)] rounded-lg hover:bg-[oklch(0.85_0.15_85/0.1)] transition-all duration-300">
                  Resumen Ejecutivo
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "CAGR", value: 19, suffix: "%", icon: TrendingUp },
                { label: "Años de Datos", value: 30, suffix: "+", icon: Database },
                { label: "Líneas de Código", value: 100, suffix: "K+", icon: Code2 },
                { label: "Sistemas", value: 22, suffix: "+", icon: BarChart3 },
              ].map((stat, i) => (
                <div key={i} className="bg-[oklch(0.17_0.04_260/0.8)] backdrop-blur-sm border border-[oklch(0.85_0.15_85/0.1)] rounded-xl p-5 hover:border-[oklch(0.85_0.15_85/0.3)] transition-all duration-300 group">
                  <stat.icon className="w-5 h-5 text-[oklch(0.75_0.15_185)] mb-3 group-hover:text-[oklch(0.85_0.15_85)] transition-colors" />
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-mono text-[oklch(0.55_0.02_260)] uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-[oklch(0.85_0.15_85/0.5)]" />
        </motion.div>
      </div>
    </section>
  );
}

// Resumen Ejecutivo
function ResumenEjecutivo() {
  const items = [
    { icon: Code2, title: "Sistema Cuantitativo Institucional", desc: "100,000+ líneas de código, 30 años de datos fundamentales y de precios" },
    { icon: Zap, title: "Primer Vehículo Cuantitativo en Ecuador", desc: "Nadie — ni bancos, ni casas de valores, ni fiduciarias — ofrece algo similar" },
    { icon: Shield, title: "Fideval: Administración", desc: "Estructura fiduciaria existente para escalar con eficiencia fiscal" },
    { icon: Brain, title: "Trading Científico", desc: "Data análisis avanzado. No intuición humana, sino reglas auditables" },
  ];

  return (
    <Section id="resumen" className="py-24 lg:py-32 bg-[oklch(0.13_0.03_260)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-sm text-[oklch(0.85_0.15_85)] uppercase tracking-widest">01 / Resumen</span>
            <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-6">Resumen Ejecutivo</h2>
            <div className="w-16 h-0.5 bg-[oklch(0.85_0.15_85)]" />
            <p className="text-[oklch(0.65_0.02_260)] mt-6 leading-relaxed text-lg">
              Lo que hemos creado era imposible hace 12 meses. Ahora tenemos una fábrica de backtest de trading. Nuestro enfoque no es encontrar el retorno más alto — es encontrar el sistema más robusto.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-xl p-6 hover:border-[oklch(0.85_0.15_85/0.3)] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.85_0.15_85/0.1)] flex items-center justify-center mb-4 group-hover:bg-[oklch(0.85_0.15_85/0.2)] transition-colors">
                  <item.icon className="w-5 h-5 text-[oklch(0.85_0.15_85)]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[oklch(0.55_0.02_260)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// Equity Curve Section
function EquityCurve() {
  return (
    <Section id="rendimiento" className="py-24 lg:py-32 bg-[oklch(0.11_0.03_260)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-[oklch(0.85_0.15_85)] uppercase tracking-widest">02 / Rendimiento</span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-4">Equity Curve</h2>
          <p className="text-[oklch(0.55_0.02_260)] max-w-2xl mx-auto">Crecimiento de una inversión de $100,000 — Período: 2002 a 2024 (23 años)</p>
        </div>

        {/* Main equity curve chart */}
        <div className="bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-2xl p-4 lg:p-8 mb-8">
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="font-mono text-sm text-[oklch(0.7_0.02_260)]">Estrategia (19.0% CAGR)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="font-mono text-sm text-[oklch(0.7_0.02_260)]">S&P 500 (7.3% CAGR)</span>
            </div>
          </div>
          <img src={IMAGES.equityCurve} alt="Equity Curve - Growth of $100,000 Investment" className="w-full rounded-lg" />
        </div>

        {/* Key metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Valor Final Estrategia", value: "$5,430,996", color: "text-[oklch(0.72_0.17_155)]" },
            { label: "Valor Final S&P 500", value: "$501,609", color: "text-[oklch(0.7_0.02_260)]" },
            { label: "CAGR Estrategia", value: "19.0%", color: "text-[oklch(0.85_0.15_85)]" },
            { label: "CAGR S&P 500", value: "7.3%", color: "text-[oklch(0.7_0.02_260)]" },
          ].map((m, i) => (
            <div key={i} className="bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-xl p-5 text-center">
              <div className={`text-2xl font-mono font-bold ${m.color} mb-1`}>{m.value}</div>
              <div className="text-xs font-mono text-[oklch(0.45_0.02_260)] uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Detailed Charts Section
function DetailedCharts() {
  const charts = [
    { src: IMAGES.equityCurveDetail, title: "Equity Curve Detallada", desc: "Análisis detallado de la curva de equity con períodos de drawdown marcados" },
    { src: IMAGES.annualReturns, title: "Retornos Anuales", desc: "Distribución de retornos anuales comparados con el benchmark" },
    { src: IMAGES.dailyReturnsDist, title: "Distribución de Retornos Diarios", desc: "Análisis estadístico de la distribución de retornos diarios" },
    { src: IMAGES.drawdown, title: "Análisis de Drawdown", desc: "Períodos de drawdown y recuperación del sistema" },
  ];

  return (
    <Section className="py-24 lg:py-32 bg-[oklch(0.13_0.03_260)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="font-mono text-sm text-[oklch(0.85_0.15_85)] uppercase tracking-widest">03 / Análisis</span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-4">Análisis Detallado del Sistema</h2>
          <p className="text-[oklch(0.55_0.02_260)] max-w-2xl">Ejemplo de un sistema robusto de Momentum — Solo con este sistema se puede abrir un fondo de inversión. Tenemos 22 hasta el momento.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {charts.map((chart, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-2xl overflow-hidden hover:border-[oklch(0.85_0.15_85/0.2)] transition-all duration-300"
            >
              <div className="p-4 lg:p-6">
                <h3 className="text-white font-semibold mb-1">{chart.title}</h3>
                <p className="text-xs text-[oklch(0.45_0.02_260)]">{chart.desc}</p>
              </div>
              <div className="px-4 pb-4 lg:px-6 lg:pb-6">
                <img src={chart.src} alt={chart.title} className="w-full rounded-lg" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional charts */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-2xl overflow-hidden">
            <div className="p-4 lg:p-6">
              <h3 className="text-white font-semibold mb-1">Métricas del Sistema</h3>
              <p className="text-xs text-[oklch(0.45_0.02_260)]">Comprensión detallada de las métricas de rendimiento</p>
            </div>
            <div className="px-4 pb-4 lg:px-6 lg:pb-6">
              <img src={IMAGES.metricsUnderstanding} alt="Métricas del Sistema" className="w-full rounded-lg" />
            </div>
          </div>
          <div className="bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-2xl overflow-hidden">
            <div className="p-4 lg:p-6">
              <h3 className="text-white font-semibold mb-1">Heatmap Mensual de Retornos</h3>
              <p className="text-xs text-[oklch(0.45_0.02_260)]">Distribución de retornos por mes y año</p>
            </div>
            <div className="px-4 pb-4 lg:px-6 lg:pb-6">
              <img src={IMAGES.monthlyHeatmap} alt="Heatmap Mensual" className="w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* 2026 Performance */}
        <div className="mt-6 bg-[oklch(0.17_0.04_260)] border border-[oklch(0.85_0.15_85/0.2)] rounded-2xl overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-[oklch(0.25_0.04_260)]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.17_155)] animate-pulse" />
              <h3 className="text-white font-semibold">Rendimiento 2026 — En Vivo</h3>
            </div>
            <p className="text-xs text-[oklch(0.45_0.02_260)] mt-1">Performance de momentum vs benchmarks (DIA, SPY, QQQ, NVDA)</p>
          </div>
          <div className="p-4 lg:p-6">
            <img src={IMAGES.performance2026} alt="2026 Performance" className="w-full rounded-lg" />
          </div>
        </div>

        {/* Final Thoughts chart */}
        <div className="mt-6 bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-2xl overflow-hidden">
          <div className="p-4 lg:p-6">
            <h3 className="text-white font-semibold mb-1">Análisis Final del Sistema</h3>
          </div>
          <div className="px-4 pb-4 lg:px-6 lg:pb-6">
            <img src={IMAGES.finalThoughts} alt="Final Thoughts" className="w-full rounded-lg" />
          </div>
        </div>
      </div>
    </Section>
  );
}

// Estrategia Section
function Estrategia() {
  return (
    <Section id="estrategia" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.quantAbstract} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[oklch(0.13_0.03_260/0.88)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="font-mono text-sm text-[oklch(0.85_0.15_85)] uppercase tracking-widest">04 / Ventaja Competitiva</span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-4">¿Qué hace único este proyecto?</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {[
            {
              icon: Lock,
              title: "Propiedad Intelectual Real",
              points: [
                "100,000+ líneas de código desarrolladas durante 3 años",
                "Arquitectura completa: backtesting institucional, pipelines automatizados",
                "Frameworks MLflow / QSAutomate / DuckDB",
                "Esto NO se puede comprar, copiar o improvisar",
              ],
            },
            {
              icon: Database,
              title: "Validación con 30 Años de Datos",
              points: [
                "Backtests sobre: Burbuja dotcom, Crisis 2008, Era ZIRP, Inflación post-COVID",
                "Sharpe > benchmark en todos los ciclos",
                "Drawdowns controlados",
                "Robustez estadística verificable",
              ],
            },
            {
              icon: Target,
              title: "Primer Vehículo Cuantitativo del Ecuador",
              points: [
                "Estrategias sistemáticas",
                "Modelos multifactor",
                "Procesos repetibles y auditables",
                "IA aplicada a inversión",
              ],
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[oklch(0.17_0.04_260/0.9)] backdrop-blur-sm border border-[oklch(0.25_0.04_260)] rounded-2xl p-8 hover:border-[oklch(0.85_0.15_85/0.3)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.85_0.15_85/0.1)] flex items-center justify-center mb-6">
                <card.icon className="w-6 h-6 text-[oklch(0.85_0.15_85)]" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-4">{card.title}</h3>
              <ul className="space-y-3">
                {card.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[oklch(0.65_0.02_260)]">
                    <CheckCircle2 className="w-4 h-4 text-[oklch(0.75_0.15_185)] mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Descorrelación */}
        <div className="mt-12 bg-[oklch(0.17_0.04_260/0.9)] backdrop-blur-sm border border-[oklch(0.25_0.04_260)] rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-2xl text-white mb-4">Riesgo Descorrelacionado</h3>
              <p className="text-[oklch(0.65_0.02_260)] mb-6 leading-relaxed">
                Mientras todos los productos actuales están basados en renta fija local, papel comercial e instituciones ecuatorianas, el fondo ofrece exposición a mercados globales regulados y descorrelación estadística.
              </p>
              <p className="text-[oklch(0.85_0.15_85)] font-medium">
                Un producto que no compite con lo que Fideval ya vende, sino que complementa su oferta.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-white mb-4">Escala Institucional</h3>
              <ul className="space-y-3">
                {[
                  "Pipelines automáticos",
                  "Auditoría, logs, versionamiento",
                  "Modularidad compatible con fideicomiso/fondo colectivo",
                  "No depende de intuición humana → depende de reglas",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[oklch(0.65_0.02_260)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.75_0.15_185)] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[oklch(0.55_0.02_260)] mt-6 italic">
                Esto permite a Fideval operar un vehículo moderno sin necesidad de construir infraestructura interna cuantitativa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Market Context
function ContextoMercado() {
  return (
    <Section id="mercado" className="py-24 lg:py-32 bg-[oklch(0.11_0.03_260)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-sm text-[oklch(0.85_0.15_85)] uppercase tracking-widest">05 / Contexto</span>
            <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-6">Contexto de Mercado</h2>
            <div className="w-16 h-0.5 bg-[oklch(0.85_0.15_85)]" />
            <p className="text-[oklch(0.65_0.02_260)] mt-6 leading-relaxed">
              El Indicador Buffett muestra que el mercado accionario de EE. UU. está fuertemente sobrevalorado, con una capitalización total cercana al 224% del PIB.
            </p>
            <p className="text-[oklch(0.65_0.02_260)] mt-4 leading-relaxed">
              Según las estimaciones históricas de GuruFocus, este nivel implicaría aproximadamente una pérdida anual del 1% durante los próximos 8 años, incluso incluyendo dividendos.
            </p>

            <div className="mt-8 bg-[oklch(0.17_0.04_260)] border border-[oklch(0.65_0.2_25/0.3)] rounded-xl p-6">
              <h4 className="text-[oklch(0.85_0.15_85)] font-semibold mb-3">Timing Perfecto</h4>
              <ul className="space-y-2 text-sm text-[oklch(0.65_0.02_260)]">
                <li>PE del S&P500 alto → próximos 10 años con bajos retornos</li>
                <li>Inversionistas ya están buscando alternativas</li>
                <li>Regulaciones ecuatorianas permiten modelos estructurados con eficiencia fiscal</li>
                <li className="text-[oklch(0.85_0.15_85)] font-medium">La ventana estratégica está abierta ahora mismo</li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-2xl p-4 lg:p-6">
              <h3 className="text-white font-semibold mb-4">Indicador Buffett — GDP vs Wilshire Total Market</h3>
              <img src={IMAGES.buffettChart} alt="Buffett Indicator Chart" className="w-full rounded-lg" />
              <p className="font-mono text-xs text-[oklch(0.45_0.02_260)] mt-3">
                El mercado está posicionado para dar un rendimiento de 1% por 8 años (incluyendo dividendos)
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Oportunidad Section
function Oportunidad() {
  return (
    <Section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.ecuadorSkyline} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.13_0.03_260/0.95)] via-[oklch(0.13_0.03_260/0.85)] to-[oklch(0.13_0.03_260/0.7)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-sm text-[oklch(0.85_0.15_85)] uppercase tracking-widest">06 / Oportunidad</span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-8">La Oportunidad</h2>

          <div className="space-y-6">
            {[
              { icon: Target, text: "Crear el primer fondo cuantitativo del país" },
              { icon: TrendingUp, text: "Complementa renta fija 5–7.5%" },
              { icon: LineChart, text: "Diferenciación total en mercado local" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-5 bg-[oklch(0.17_0.04_260/0.8)] backdrop-blur-sm border border-[oklch(0.25_0.04_260)] rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.85_0.15_85/0.1)] flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-[oklch(0.85_0.15_85)]" />
                </div>
                <span className="text-lg text-white">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// Validación Estadística
function ValidacionEstadistica() {
  return (
    <Section className="py-24 lg:py-32 bg-[oklch(0.13_0.03_260)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-[oklch(0.85_0.15_85)] uppercase tracking-widest">07 / Validación</span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-4">Validación Estadística</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Activity, title: "Consistencia Multi-Ciclo", color: "bg-red-500/20 text-red-400" },
            { icon: CheckCircle2, title: "Sharpe > Benchmark", color: "bg-green-500/20 text-green-400" },
            { icon: Shield, title: "Drawdown Controlado", color: "bg-purple-500/20 text-purple-400" },
            { icon: BarChart3, title: "Metodología Auditable", color: "bg-cyan-500/20 text-cyan-400" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-2xl p-8 text-center hover:border-[oklch(0.85_0.15_85/0.2)] transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-5`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-white font-semibold">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Roadmap
function Roadmap() {
  const phases = [
    { phase: "Fase 1", title: "DD Técnica", time: "2 semanas", desc: "Due diligence técnica del sistema cuantitativo" },
    { phase: "Fase 2", title: "Estructuración", time: "3–4 semanas", desc: "Estructuración legal y fiduciaria con Fideval" },
    { phase: "Fase 3", title: "Fondeo", time: "30–60 días", desc: "Proceso de captación de capital inicial" },
    { phase: "Fase 4", title: "Operación", time: "Continuo", desc: "Operación del fondo y reportes periódicos" },
  ];

  return (
    <Section id="roadmap" className="py-24 lg:py-32 bg-[oklch(0.11_0.03_260)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-[oklch(0.85_0.15_85)] uppercase tracking-widest">08 / Roadmap</span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-4">Roadmap</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.15_85/0.3)] to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-2xl p-6 hover:border-[oklch(0.85_0.15_85/0.3)] transition-all duration-300"
              >
                <div className="font-mono text-xs text-[oklch(0.85_0.15_85)] uppercase tracking-widest mb-2">{p.phase}</div>
                <h3 className="text-xl text-white font-semibold mb-1">{p.title}</h3>
                <div className="font-mono text-sm text-[oklch(0.75_0.15_185)] mb-3">{p.time}</div>
                <p className="text-sm text-[oklch(0.55_0.02_260)]">{p.desc}</p>
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[oklch(0.85_0.15_85)] flex items-center justify-center">
                  <span className="font-mono text-sm font-bold text-[oklch(0.13_0.03_260)]">{i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// Riesgos
function Riesgos() {
  return (
    <Section className="py-24 lg:py-32 bg-[oklch(0.13_0.03_260)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-[oklch(0.65_0.2_25)] uppercase tracking-widest">09 / Riesgos</span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-4">Riesgos y Mitigaciones</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Volatilidad Multifactor", icon: Activity },
            { title: "Complejidad: Documentación + Auditoría", icon: AlertTriangle },
            { title: "Regulación: ETFs Regulados", icon: Shield },
            { title: "Escalabilidad Modular", icon: Zap },
          ].map((risk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[oklch(0.17_0.04_260)] border border-[oklch(0.65_0.2_25/0.2)] rounded-2xl p-6 hover:border-[oklch(0.65_0.2_25/0.4)] transition-all duration-300"
            >
              <risk.icon className="w-8 h-8 text-[oklch(0.65_0.2_25)] mb-4" />
              <h3 className="text-white font-semibold">{risk.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Equipo
function Equipo() {
  return (
    <Section id="equipo" className="py-24 lg:py-32 bg-[oklch(0.11_0.03_260)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-[oklch(0.85_0.15_85)] uppercase tracking-widest">10 / Equipo</span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-4 mb-4">Equipo</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-6 h-6 text-[oklch(0.85_0.15_85)]" />
              <h3 className="text-2xl text-white font-display">Liderazgo</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg text-white font-semibold">Ney Torres</h4>
                <p className="text-sm text-[oklch(0.85_0.15_85)] font-mono">Managing Partner</p>
              </div>
              <ul className="space-y-2 text-[oklch(0.65_0.02_260)]">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.75_0.15_185)] mt-2 shrink-0" />
                  20 años en mercados financieros
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.75_0.15_185)] mt-2 shrink-0" />
                  Consultores senior en Machine Learning y arquitectura cuantitativa
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[oklch(0.17_0.04_260)] border border-[oklch(0.25_0.04_260)] rounded-2xl p-8">
            <h3 className="text-2xl text-white font-display mb-6">Red de Contactos</h3>
            <p className="text-[oklch(0.65_0.02_260)] mb-4 leading-relaxed">
              Conexiones directas con algunos de los inversores más exitosos del mundo, incluyendo mentores y colaboradores en estrategias cuantitativas y de valor.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <img src={IMAGES.networkPhotos} alt="Network" className="rounded-lg w-full h-28 object-cover" />
              <img src={IMAGES.networkPhotos2} alt="Network" className="rounded-lg w-full h-28 object-cover" />
              <img src={IMAGES.networkPhotos3} alt="Network" className="rounded-lg w-full h-28 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Closing Section
function Cierre() {
  return (
    <Section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.dataPattern} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[oklch(0.13_0.03_260/0.92)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl lg:text-5xl text-white mb-8">
          Este proyecto es único<br />porque combina:
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          {[
            "Propiedad intelectual profunda",
            "Prueba estadística irrefutable",
            "Ausencia total de competencia en Ecuador",
            "Capacidad de escalar con estructura fiduciaria existente",
            "Storytelling institucional poderoso para Fideval",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-3 text-left ${i === 4 ? "sm:col-span-2 justify-center" : ""}`}
            >
              <CheckCircle2 className="w-5 h-5 text-[oklch(0.85_0.15_85)] shrink-0" />
              <span className="text-white font-medium">{item}</span>
            </motion.div>
          ))}
        </div>

        <div className="bg-[oklch(0.17_0.04_260/0.8)] backdrop-blur-sm border border-[oklch(0.85_0.15_85/0.3)] rounded-2xl p-8 max-w-lg mx-auto">
          <p className="font-display text-2xl text-[oklch(0.85_0.15_85)] mb-2">Esto no es un producto.</p>
          <p className="font-display text-2xl text-white">Es una ventaja estratégica.</p>
        </div>
      </div>
    </Section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[oklch(0.10_0.03_260)] border-t border-[oklch(0.25_0.04_260)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[oklch(0.85_0.15_85)] flex items-center justify-center">
              <Activity className="w-5 h-5 text-[oklch(0.13_0.03_260)]" />
            </div>
            <span className="font-display text-lg text-white">Ecuador Quant Fund</span>
          </div>
          <p className="text-sm text-[oklch(0.45_0.02_260)] font-mono">
            Propuesta de Estructuración con Fideval
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(0.13_0.03_260)]">
      <Navbar />
      <Hero />
      <ResumenEjecutivo />
      <EquityCurve />
      <DetailedCharts />
      <Estrategia />
      <ContextoMercado />
      <Oportunidad />
      <ValidacionEstadistica />
      <Roadmap />
      <Riesgos />
      <Equipo />
      <Cierre />
      <Footer />
    </div>
  );
}
