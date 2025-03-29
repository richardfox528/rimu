import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCookie } from "../utils/cookieUtils";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Stats from "../components/Stats";
import FAQ from "../components/FAQ";
import GridPattern from '../components/GridPattern';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = getCookie("token");

  // Redirect based on user type
  useEffect(() => {
    if (token && user) {
      // Redirect based on user type
      navigate(
        user.user_type === 1 ? "/company-dashboard" : "/user-dashboard",
        { replace: true }
      );
    }
  }, [user, token, navigate]);

  const testimonials = [
    {
      name: "John Doe",
      role: "Software Engineer",
      text: "Laboral History ha simplificado mi proceso de solicitud de empleo. Puedo compartir mi historial laboral verificado con posibles empleadores en segundos.",
      initials: "JD",
      avatar: "/images/avatars/avatar-1.jpg",
    },
    {
      name: "Anna Smith",
      role: "HR Manager",
      text: "Como profesional de RRHH, puedo verificar el historial laboral de los candidatos al instante. La verificación con blockchain nos da confianza en la autenticidad de los documentos.",
      initials: "AS",
      avatar: "/images/avatars/avatar-2.jpg",
    },
    {
      name: "Michael Johnson",
      role: "Business Owner",
      text: "Gestionar los documentos de los empleados nunca ha sido tan fácil. La plataforma agiliza nuestro proceso de incorporación y garantiza el cumplimiento de las normativas laborales.",
      initials: "MJ",
      avatar: "/images/avatars/avatar-3.jpg",
    },
    {
      name: "Emily Davis",
      role: "Project Manager",
      text: "La plataforma ha transformado la forma en que gestionamos nuestros registros de empleados. Es eficiente y fácil de usar.",
      initials: "ED",
      avatar: "/images/avatars/avatar-4.jpg",
    },
    {
      name: "Chris Lee",
      role: "Data Analyst",
      text: "Me encanta lo fácil que es acceder a mis documentos desde cualquier lugar. El proceso de verificación es perfecto.",
      initials: "CL",
      avatar: "/images/avatars/avatar-5.jpg",
    },
    {
      name: "Sarah Brown",
      role: "Marketing Specialist",
      text: "Laboral History ha facilitado mucho mi búsqueda de empleo. Puedo proporcionar información verificada a los empleadores rápidamente.",
      initials: "SB",
      avatar: "/images/avatars/avatar-6.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-slate-900 text-black overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-40 overflow-hidden">
        {/* Background elements */}
        <GridPattern className="opacity-10" />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/30 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-primary-dark/40 via-transparent to-transparent"></div>

        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-light/20 filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary-dark/20 filter blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-yellow-400/20 filter blur-3xl animate-pulse"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto">
            <div className="lg:w-1/2 mb-16 lg:mb-0 lg:pr-10">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-yellow-400 to-primary-light rounded-2xl blur opacity-30"></div>
                <div className="relative backdrop-blur-sm bg-slate-800/50 p-8 sm:p-10 rounded-2xl border border-slate-700/50 shadow-2xl">
                  <div className="inline-block mb-6 px-3 py-1 bg-gradient-to-r from-primary-dark to-primary rounded-full text-xs font-semibold uppercase tracking-wider text-black shadow-inner">
                    Plataforma Blockchain
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                      Tu Historia Profesional
                    </span>
                    <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                      Segura e Inmutable
                    </span>
                  </h1>

                  <p className="text-xl text-slate-300 mb-10 max-w-lg">
                    Revoluciona la gestión de tu historial laboral con
                    tecnología blockchain. Documentos verificados, accesibles y
                    a prueba de falsificaciones.
                  </p>

                  <div className="flex flex-wrap gap-6">
                    <Link to="/register" className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-yellow-400 rounded-xl blur opacity-70 group-hover:opacity-100 transition-all duration-300"></div>
                      <button className="relative px-8 py-4 bg-slate-900 rounded-xl font-bold text-black shadow-xl group-hover:bg-slate-800 transition-all duration-300">
                        <span className="flex items-center">
                          <span className="mr-2">Comenzar Ahora</span>
                          <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </Link>

                    <Link
                      to="/login"
                      className="relative px-8 py-4 bg-transparent border-2 border-slate-600 text-black font-bold rounded-xl hover:bg-white/5 hover:border-slate-400 transition-all duration-300 shadow-xl"
                    >
                      Iniciar Sesión
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative group perspective-1000">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-yellow-400 rounded-3xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500 animate-tilt"></div>
                <div className="relative">
                  {/* 3D effect card */}
                  <div className="relative bg-slate-800 p-3 rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:shadow-yellow-400/20 group-hover:rotate-y-12">
                    <img
                      src="/images/home.png"
                      alt="Laboral History Platform"
                      className="w-full max-w-lg rounded-xl transform transition-all shadow-lg"
                    />

                    {/* Badges */}
                    <div className="absolute -top-4 -left-4 bg-primary text-black font-bold py-2 px-4 rounded-full shadow-lg text-sm">
                      100% Verificable
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-primary-dark font-bold py-2 px-4 rounded-full shadow-lg text-sm">
                      Blockchain
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-1/2 -right-16 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl animate-float-slow hidden md:block">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                        <div className="text-slate-900">
                          <p className="font-bold">Documentos Verificados</p>
                          <p className="text-xs text-slate-600">
                            Inmutable & Seguro
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-1/4 -left-12 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl animate-float hidden md:block">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            ></path>
                          </svg>
                        </div>
                        <div className="text-slate-900">
                          <p className="font-bold">Máxima Seguridad</p>
                          <p className="text-xs text-slate-600">
                            Blockchain Technology
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted By Section */}
          <div className="mt-20 text-center max-w-4xl mx-auto">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">
              Confían en nuestra tecnología
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img
                  src="/images/logos/logo-1.svg"
                  alt="Company"
                  className="h-10"
                />
              </div>
              <div className="flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img
                  src="/images/logos/logo-2.svg"
                  alt="Company"
                  className="h-10"
                />
              </div>
              <div className="flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img
                  src="/images/logos/logo-3.svg"
                  alt="Company"
                  className="h-10"
                />
              </div>
              <div className="flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img
                  src="/images/logos/logo-4.svg"
                  alt="Company"
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto fill-slate-800"
          >
            <path d="M0,192L48,186.7C96,181,192,171,288,176C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section (with slate-800 background) */}
      <section className="bg-slate-800 relative z-10">
        <Features />
      </section>

      {/* Stats Section (with slate-900 background) */}
      <section className="bg-slate-900 relative z-10">
        <Stats />
      </section>

      {/* Testimonials Section (with gradient background) */}
      <section className="bg-gradient-to-b from-slate-800 to-slate-900 relative z-10">
        <GridPattern className="opacity-5" />
        <Testimonials testimonials={testimonials} currentIndex={currentIndex} />
      </section>

      {/* FAQ Section (with slate-800 background) */}
      <section className="bg-slate-800 relative z-10">
        <FAQ />
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <GridPattern className="opacity-5" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/20 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-yellow-400 to-primary-light rounded-2xl blur opacity-30 animate-pulse"></div>
            <div className="relative backdrop-blur-sm bg-slate-800/70 p-10 sm:p-12 rounded-2xl border border-slate-700 shadow-2xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                    Comienza a Gestionar Tu
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                    {" Historial Laboral "}
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                    Hoy
                  </span>
                </h2>
                <p className="text-xl text-slate-300 mb-8">
                  Únete a miles de profesionales que confían en Laboral History
                  para proteger y verificar su documentación laboral.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                  <Link to="/register" className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-yellow-400 rounded-xl blur opacity-70 group-hover:opacity-100 transition-all duration-300"></div>
                    <button className="relative px-10 py-4 bg-slate-900 rounded-xl font-bold text-black shadow-xl group-hover:bg-slate-800 transition-all duration-300">
                      <span className="flex items-center">
                        <span className="mr-2">Registrarse</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </Link>

                  <Link
                    to="/login"
                    className="relative px-10 py-4 bg-transparent border-2 border-slate-600 text-black font-bold rounded-xl hover:bg-white/5 hover:border-slate-400 transition-all duration-300 shadow-xl"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              </div>

              {/* Benefit Icons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Máxima Seguridad</h3>
                  <p className="text-sm text-slate-400">
                    Datos protegidos con la mejor tecnología blockchain del
                    mercado
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Rápido y Simple</h3>
                  <p className="text-sm text-slate-400">
                    Accede a tus documentos en segundos desde cualquier
                    dispositivo
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-dark to-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Cumplimiento Legal</h3>
                  <p className="text-sm text-slate-400">
                    Garantiza el cumplimiento normativo con documentos
                    verificables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
